import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PricingCalculator } from '@/src/features/calculator/PricingCalculator';

it('recalculates a preliminary quote and refuses fake checkout', async () => {
  const user = userEvent.setup();
  render(<PricingCalculator />);

  expect(
    screen.getByRole('button', { name: '360 дней' }),
  ).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByLabelText('Количество устройств')).toHaveValue('3');
  expect(await screen.findByText('6 300 ₽')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: '90 дней' }));
  await user.selectOptions(screen.getByLabelText('Количество устройств'), '3');

  expect(await screen.findByText('2 025 ₽')).toBeInTheDocument();
  expect(screen.getByText(/предварительный расчёт/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Продолжить' }));

  expect(
    await screen.findByText(/внешней платёжной системе/i),
  ).toBeInTheDocument();
  expect(
    screen.queryByText(/оплата (?:прошла|успешна)/i),
  ).not.toBeInTheDocument();
});

it('offers only approved durations and device counts', async () => {
  render(<PricingCalculator />);

  await screen.findByText('6 300 ₽');

  expect(
    within(
      screen.getByRole('group', { name: 'Срок подписки' }),
    )
      .getAllByRole('button')
      .map((button) => button.getAttribute('aria-label')),
  ).toEqual(['30 дней', '90 дней', '180 дней', '360 дней']);

  const deviceCount = screen.getByLabelText('Количество устройств');

  expect(
    [...(deviceCount as HTMLSelectElement).options].map((option) => ({
      label: option.text,
      value: option.value,
    })),
  ).toEqual(
    Array.from({ length: 10 }, (_, index) => {
      const value = String(index + 1);
      return { label: value, value };
    }),
  );
});

it('explains the Telegram-only renewal grace period without promising general access', () => {
  render(<PricingCalculator />);

  expect(screen.getByText('Telegram останется на связи.')).toBeInTheDocument();
  expect(screen.getByText(/Ещё 6 дней будут доступны специальные серверы для Telegram/i)).toBeInTheDocument();
  expect(
    screen.getByText('Только Telegram · без доступа к остальным сайтам'),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Открыть @NosokVPNBot для продления' }),
  ).toHaveAttribute('href', 'https://t.me/NosokVPNBot');
});
