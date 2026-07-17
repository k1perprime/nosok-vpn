export interface AuthErrors {
  email?: string;
  password?: string;
}

export function validateCredentials(
  email: string,
  password: string,
): AuthErrors {
  const errors: AuthErrors = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Введите корректный email';
  }

  if (password.length < 8) {
    errors.password = 'Минимум 8 символов';
  }

  return errors;
}
