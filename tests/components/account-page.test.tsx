import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccountPage } from '@/src/features/account/AccountPage';
it('shows visual account placeholders without invented records', async () => {
  const user = userEvent.setup();
  render(<AccountPage />);

  expect(
    screen.getByText('Визуальная версия кабинета'),
  ).toBeVisible();
  expect(
    screen.queryByText(/VPN включ[её]н|test key|последний платёж/i),
  ).not.toBeInTheDocument();

  await user.click(screen.getAllByRole('button', { name: 'Платежи' })[0]);

  expect(
    screen.getByRole('heading', { name: 'История платежей' }),
  ).toBeVisible();
  expect(
    screen.getByText('Здесь появится история оплат после интеграции.'),
  ).toBeVisible();
});

it('provides desktop and mobile navigation without hiding help', async () => {
  const user = userEvent.setup();
  render(<AccountPage />);

  expect(screen.getAllByRole('button', { name: 'Обзор' })).toHaveLength(2);
  expect(screen.getAllByRole('button', { name: 'Подключение' })).toHaveLength(2);
  expect(screen.getAllByRole('button', { name: 'Профиль' })).toHaveLength(2);
  expect(screen.getAllByRole('button', { name: 'Помощь' })).toHaveLength(1);

  await user.click(screen.getAllByRole('button', { name: 'Подключение' })[0]);
  expect(
    screen.getByRole('heading', { name: 'Подключить устройство' }),
  ).toBeVisible();
  expect(
    screen.queryByRole('button', { name: 'Закрыть мастер подключения' }),
  ).not.toBeInTheDocument();

  await user.click(screen.getAllByRole('button', { name: 'Обзор' })[0]);
  await user.click(screen.getByRole('button', { name: 'Открыть инструкцию' }));
  expect(screen.getByRole('heading', { name: 'Ваши устройства' })).toBeVisible();

  await user.click(screen.getAllByRole('button', { name: 'Обзор' })[0]);
  await user.click(screen.getByRole('button', { name: 'Продлить' }));
  expect(screen.getByRole('heading', { name: 'Подписка' })).toBeVisible();
});

it('keeps profile controls visual and exposes help from the profile', async () => {
  const user = userEvent.setup();
  render(<AccountPage />);

  await user.click(screen.getAllByRole('button', { name: 'Профиль' })[0]);

  const profile = screen.getByRole('region', { name: 'Профиль' });
  expect(within(profile).getAllByText('Подключим после интеграции')).toHaveLength(4);

  await user.click(
    within(profile).getByRole('button', {
      name: 'Связать email и Telegram',
    }),
  );
  expect(
    within(profile).getByText('Привязку email и Telegram подключим после интеграции.'),
  ).toBeVisible();

  await user.click(within(profile).getByRole('button', { name: 'Помощь' }));
  expect(screen.getByRole('heading', { name: 'Помощь' })).toBeVisible();
  expect(screen.getByRole('link', { name: /Техподдержка @NosokSup/i })).toHaveAttribute(
    'href',
    'https://t.me/NosokSup',
  );
});

it('opens the existing login form from the account header', async () => {
  const user = userEvent.setup();
  render(<AccountPage />);

  await user.click(screen.getByRole('button', { name: 'Войти' }));

  expect(
    screen.getByRole('dialog', { name: 'С возвращением' }),
  ).toBeVisible();
});
