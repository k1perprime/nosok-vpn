'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/src/components/ui/Button';
import { Dialog } from '@/src/components/ui/Dialog';
import { Field } from '@/src/components/ui/Field';
import { StatusNotice } from '@/src/components/ui/StatusNotice';
import { previewAdapters } from '@/src/lib/adapters/notConfigured';
import type { AccountSnapshot, IntegrationResult } from '@/src/lib/domain';
import { validateCredentials, type AuthErrors } from './validation';
import styles from './AuthDialog.module.css';

export type AuthMode = 'login' | 'register' | 'recover' | 'confirm';

export interface AuthDialogProps {
  open: boolean;
  onClose(): void;
  initialMode?: AuthMode;
  onAuthenticated?(account: AccountSnapshot): void;
}

const modeCopy = {
  login: { title: 'С возвращением', submit: 'Войти' },
  register: { title: 'Свяжем аккаунт', submit: 'Создать аккаунт' },
  recover: { title: 'Восстановление доступа', submit: 'Отправить письмо' },
  confirm: {
    title: 'Подтверждение email',
    submit: 'Отправить письмо повторно',
  },
} as const;

type OpenAuthDialogProps = Omit<AuthDialogProps, 'open'>;

export function AuthDialog({ open, ...props }: AuthDialogProps) {
  return open ? <OpenAuthDialog {...props} /> : null;
}

function OpenAuthDialog({
  onClose,
  initialMode = 'login',
  onAuthenticated,
}: OpenAuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AuthErrors>({});
  const [result, setResult] = useState<IntegrationResult<unknown> | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validateCredentials(
      email,
      mode === 'recover' || mode === 'confirm' ? '12345678' : password,
    );
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);
    let nextResult: IntegrationResult<unknown>;
    if (mode === 'login') {
      const loginResult = await previewAdapters.auth.login({ email, password });
      nextResult = loginResult;
      if (loginResult.status === 'ready') {
        onAuthenticated?.(loginResult.data);
      }
    } else if (mode === 'register') {
      const registerResult = await previewAdapters.auth.register({
        email,
        password,
      });
      nextResult = registerResult;
      if (registerResult.status === 'ready') {
        onAuthenticated?.(registerResult.data);
      }
    } else if (mode === 'recover') {
      nextResult = await previewAdapters.auth.recover(email);
    } else {
      nextResult = await previewAdapters.auth.requestEmailConfirmation(email);
    }
    setResult(nextResult);
    setPending(false);
  }

  async function telegramLogin() {
    setPending(true);
    const nextResult = await previewAdapters.auth.loginWithTelegram();
    setResult(nextResult);
    if (nextResult.status === 'ready') {
      onAuthenticated?.(nextResult.data);
    }
    setPending(false);
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrors({});
    setResult(null);
  }

  const credentialsLabel =
    mode === 'recover'
      ? 'Email для восстановления доступа'
      : mode === 'confirm'
        ? 'Email для подтверждения'
        : mode === 'register'
          ? 'Данные для регистрации'
          : 'Данные для входа';

  return (
    <Dialog
      open
      onClose={onClose}
      title={modeCopy[mode].title}
      busy={pending}
    >
      <p className={styles.intro}>
        Один аккаунт для email и Telegram — объединение остаётся
        добровольным.
      </p>
      <form className={styles.form} onSubmit={submit} noValidate>
        <fieldset className={styles.credentials} aria-label={credentialsLabel}>
          <Field
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            error={errors.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {mode !== 'recover' && mode !== 'confirm' && (
            <Field
              name="password"
              label="Пароль"
              type="password"
              autoComplete={
                mode === 'register' ? 'new-password' : 'current-password'
              }
              value={password}
              error={errors.password}
              onChange={(event) => setPassword(event.target.value)}
            />
          )}
        </fieldset>
        <Button className={styles.submit} type="submit" disabled={pending}>
          {pending ? 'Подождите…' : modeCopy[mode].submit}
        </Button>
      </form>
      {mode !== 'recover' && mode !== 'confirm' && (
        <div className={styles.telegramArea}>
          <span className={styles.divider}>или через Telegram</span>
          <Button
            className={styles.telegram}
            variant="secondary"
            onClick={telegramLogin}
            disabled={pending}
          >
            {pending ? 'Подождите…' : 'Войти через Telegram'}
          </Button>
        </div>
      )}
      {result && result.status !== 'ready' && (
        <StatusNotice tone={result.status === 'error' ? 'error' : 'info'}>
          {result.message}
        </StatusNotice>
      )}
      <nav className={styles.switches} aria-label="Сценарии авторизации">
        {mode !== 'login' && (
          <button
            type="button"
            disabled={pending}
            onClick={() => changeMode('login')}
          >
            Уже есть аккаунт
          </button>
        )}
        {mode !== 'register' && (
          <button
            type="button"
            disabled={pending}
            onClick={() => changeMode('register')}
          >
            Регистрация
          </button>
        )}
        {mode !== 'recover' && (
          <button
            type="button"
            disabled={pending}
            onClick={() => changeMode('recover')}
          >
            Забыли пароль?
          </button>
        )}
        {mode !== 'confirm' && (
          <button
            type="button"
            disabled={pending}
            onClick={() => changeMode('confirm')}
          >
            Не пришло подтверждение?
          </button>
        )}
      </nav>
    </Dialog>
  );
}
