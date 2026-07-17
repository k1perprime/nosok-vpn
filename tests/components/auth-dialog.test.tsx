import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { SiteHeader } from '@/src/components/layout/SiteHeader';
import { AuthDialog } from '@/src/features/auth/AuthDialog';
import { previewAdapters } from '@/src/lib/adapters/notConfigured';
import type { AccountSnapshot, IntegrationResult } from '@/src/lib/domain';
import { validateCredentials } from '@/src/features/auth/validation';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('authentication validation', () => {
  it('reports the required registration field errors', () => {
    expect(validateCredentials('', '')).toEqual({
      email: 'Введите корректный email',
      password: 'Минимум 8 символов',
    });
  });
});

describe('authentication dialog', () => {
  it('groups login credentials into one clearly labelled form block', () => {
    render(<AuthDialog open onClose={() => undefined} />);

    const credentials = screen.getByRole('group', {
      name: 'Данные для входа',
    });

    expect(credentials).toContainElement(
      screen.getByRole('textbox', { name: 'Email' }),
    );
    expect(credentials).toContainElement(screen.getByLabelText('Пароль'));
  });

  it('names the email-only block for password recovery', async () => {
    const user = userEvent.setup();

    render(<AuthDialog open onClose={() => undefined} />);
    await user.click(screen.getByRole('button', { name: 'Забыли пароль?' }));

    expect(
      screen.getByRole('group', { name: 'Email для восстановления доступа' }),
    ).toContainElement(screen.getByRole('textbox', { name: 'Email' }));
  });

  it('validates registration before contacting the adapter', async () => {
    const user = userEvent.setup();
    const register = vi.spyOn(previewAdapters.auth, 'register');

    render(
      <AuthDialog
        open
        onClose={() => undefined}
        initialMode="register"
      />,
    );
    await user.click(
      screen.getByRole('button', { name: 'Создать аккаунт' }),
    );

    expect(screen.getByText('Введите корректный email')).toBeVisible();
    expect(screen.getByText('Минимум 8 символов')).toBeVisible();
    expect(register).not.toHaveBeenCalled();
  });

  it('reports the honest integration state for Telegram', async () => {
    const user = userEvent.setup();

    render(<AuthDialog open onClose={() => undefined} />);
    await user.click(
      screen.getByRole('button', { name: 'Войти через Telegram' }),
    );

    expect(
      await screen.findByText(
        /после подключения действующей системы/i,
      ),
    ).toBeVisible();
    expect(screen.queryByText(/вход выполнен/i)).not.toBeInTheDocument();
  });

  it('submits password recovery with an email only', async () => {
    const user = userEvent.setup();
    const recover = vi.spyOn(previewAdapters.auth, 'recover');

    render(<AuthDialog open onClose={() => undefined} />);
    await user.click(screen.getByRole('button', { name: 'Забыли пароль?' }));
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'user@example.com');
    await user.click(screen.getByRole('button', { name: 'Отправить письмо' }));

    expect(screen.getByRole('heading', { name: 'Восстановление доступа' })).toBeVisible();
    expect(screen.queryByLabelText('Пароль')).not.toBeInTheDocument();
    expect(recover).toHaveBeenCalledWith('user@example.com');
  });

  it('resends an email confirmation with an email only', async () => {
    const user = userEvent.setup();
    const confirm = vi.spyOn(
      previewAdapters.auth,
      'requestEmailConfirmation',
    );

    render(<AuthDialog open onClose={() => undefined} />);
    await user.click(
      screen.getByRole('button', { name: 'Не пришло подтверждение?' }),
    );
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'user@example.com');
    await user.click(
      screen.getByRole('button', { name: 'Отправить письмо повторно' }),
    );

    expect(screen.getByRole('heading', { name: 'Подтверждение email' })).toBeVisible();
    expect(screen.queryByLabelText('Пароль')).not.toBeInTheDocument();
    expect(confirm).toHaveBeenCalledWith('user@example.com');
  });

  it('renders a returned login error without claiming success', async () => {
    const user = userEvent.setup();
    const login = vi
      .spyOn(previewAdapters.auth, 'login')
      .mockResolvedValue({ status: 'error', message: 'Неверный email или пароль' });

    render(<AuthDialog open onClose={() => undefined} />);
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'user@example.com');
    await user.type(screen.getByLabelText('Пароль'), 'password');
    await user.click(screen.getByRole('button', { name: 'Войти' }));

    expect(login).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password',
    });
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Неверный email или пароль',
    );
    expect(screen.queryByText(/вход выполнен/i)).not.toBeInTheDocument();
  });

  it('announces and locks the authentication actions while loading', async () => {
    const user = userEvent.setup();
    let resolveLogin!: (
      result: IntegrationResult<AccountSnapshot>,
    ) => void;
    const loginResult = new Promise<IntegrationResult<AccountSnapshot>>(
      (resolve) => {
        resolveLogin = resolve;
      },
    );
    vi.spyOn(previewAdapters.auth, 'login').mockReturnValue(loginResult);

    render(<AuthDialog open onClose={() => undefined} />);
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'user@example.com');
    await user.type(screen.getByLabelText('Пароль'), 'password');
    await user.click(screen.getByRole('button', { name: 'Войти' }));

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-busy', 'true');
    screen.getAllByRole('button', { name: 'Подождите…' }).forEach((button) => {
      expect(button).toBeDisabled();
    });
    expect(
      screen.getByRole('button', { name: 'Забыли пароль?' }),
    ).toBeDisabled();

    resolveLogin({ status: 'not-configured', message: 'Интеграция не настроена' });
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Интеграция не настроена',
    );
  });

  it('recovers modal focus in both directions after pending disables submit', async () => {
    const user = userEvent.setup();
    const loginResult = new Promise<IntegrationResult<AccountSnapshot>>(
      () => undefined,
    );
    vi.spyOn(previewAdapters.auth, 'login').mockReturnValue(loginResult);

    render(
      <>
        <button type="button">Outside before</button>
        <AuthDialog open onClose={() => undefined} />
        <button type="button">Outside after</button>
      </>,
    );
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'user@example.com');
    await user.type(screen.getByLabelText('Пароль'), 'password');
    await user.click(screen.getByRole('button', { name: 'Войти' }));

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-busy', 'true');
    screen.getAllByRole('button', { name: 'Подождите…' }).forEach((button) => {
      expect(button).toBeDisabled();
    });

    (document.activeElement as HTMLElement).blur();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Закрыть' })).toHaveFocus();

    (document.activeElement as HTMLElement).blur();
    await user.tab({ shift: true });
    expect(screen.getByLabelText('Пароль')).toHaveFocus();
  });

  it('closes once and restores focus when Escape starts from body during pending', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const loginResult = new Promise<IntegrationResult<AccountSnapshot>>(
      () => undefined,
    );
    vi.spyOn(previewAdapters.auth, 'login').mockReturnValue(loginResult);

    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Открыть вход
          </button>
          <AuthDialog
            open={open}
            onClose={() => {
              onClose();
              setOpen(false);
            }}
          />
        </>
      );
    }

    render(<Harness />);
    const opener = screen.getByRole('button', { name: 'Открыть вход' });
    await user.click(opener);
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'user@example.com');
    await user.type(screen.getByLabelText('Пароль'), 'password');
    await user.click(screen.getByRole('button', { name: 'Войти' }));

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-busy', 'true');
    const pendingSubmit = screen.getAllByRole('button', {
      name: 'Подождите…',
    })[0] as HTMLButtonElement;
    pendingSubmit.disabled = false;
    pendingSubmit.blur();
    pendingSubmit.disabled = true;
    expect(document.body).toHaveFocus();
    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledOnce();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('hands a ready login to the optional authenticated callback', async () => {
    const user = userEvent.setup();
    const onAuthenticated = vi.fn();
    const account: AccountSnapshot = {
      email: 'user@example.com',
      emailVerified: true,
      telegram: null,
      accountsLinked: false,
      linkState: 'email-only',
      subscription: {
        state: 'none',
        planName: null,
        expiresAt: null,
        deviceLimit: null,
      },
    };
    vi.spyOn(previewAdapters.auth, 'login').mockResolvedValue({
      status: 'ready',
      data: account,
    });

    render(
      <AuthDialog
        open
        onClose={() => undefined}
        onAuthenticated={onAuthenticated}
      />,
    );
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'user@example.com');
    await user.type(screen.getByLabelText('Пароль'), 'password');
    await user.click(screen.getByRole('button', { name: 'Войти' }));

    expect(onAuthenticated).toHaveBeenCalledWith(account);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('offers voluntary account linking while switching to registration', async () => {
    const user = userEvent.setup();

    render(<AuthDialog open onClose={() => undefined} />);
    expect(
      screen.getByText(
        'Один аккаунт для email и Telegram — объединение остаётся добровольным.',
      ),
    ).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Регистрация' }));

    expect(screen.getByRole('heading', { name: 'Свяжем аккаунт' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Создать аккаунт' })).toBeVisible();
  });

  it('moves focus inside and returns it after Escape closes the dialog', async () => {
    const user = userEvent.setup();

    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Открыть вход
          </button>
          <AuthDialog open={open} onClose={() => setOpen(false)} />
        </>
      );
    }

    render(<Harness />);
    const opener = screen.getByRole('button', { name: 'Открыть вход' });
    await user.click(opener);

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveFocus();
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('keeps Tab focus inside the modal boundaries', async () => {
    const user = userEvent.setup();

    render(
      <>
        <button type="button">Outside before</button>
        <AuthDialog open onClose={() => undefined} />
        <button type="button">Outside after</button>
      </>,
    );
    const close = screen.getByRole('button', { name: 'Закрыть' });
    const last = screen.getByRole('button', {
      name: 'Не пришло подтверждение?',
    });

    close.focus();
    await user.tab({ shift: true });
    expect(last).toHaveFocus();

    await user.tab();
    expect(close).toHaveFocus();
  });

  it('closes only when the pointer targets the backdrop', () => {
    const onClose = vi.fn();

    render(<AuthDialog open onClose={onClose} />);
    const dialog = screen.getByRole('dialog');
    const backdrop = dialog.parentElement;

    expect(backdrop).not.toBeNull();
    fireEvent.mouseDown(dialog);
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.mouseDown(backdrop!);
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe('site header', () => {
  it('keeps the account link while exposing responsive menu state', async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);
    expect(screen.getByRole('link', { name: 'Личный кабинет' })).toHaveAttribute(
      'href',
      '/account',
    );
    const menu = screen.getByRole('button', { name: 'Открыть меню' });
    expect(menu).toHaveAttribute('aria-controls', 'public-navigation');
    expect(menu).toHaveAttribute('aria-expanded', 'false');

    await user.click(menu);
    expect(screen.getByRole('button', { name: 'Закрыть меню' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await user.click(screen.getByRole('link', { name: 'Локации' }));
    expect(screen.getByRole('button', { name: 'Открыть меню' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('tabs from the open menu trigger into the first revealed link', async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);
    await user.click(screen.getByRole('button', { name: 'Открыть меню' }));
    await user.tab();

    expect(screen.getByRole('link', { name: 'Как подключить' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Войти' })).not.toHaveFocus();
  });

  it('opens authentication and restores focus to the header login control', async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);
    const login = screen.getByRole('button', { name: 'Войти' });
    await user.click(login);

    expect(screen.getByRole('dialog', { name: 'С возвращением' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Закрыть' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(login).toHaveFocus();
  });
});
