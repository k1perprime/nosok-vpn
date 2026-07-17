import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DevicesPanel } from '@/src/features/account/DevicesPanel';
import { ConnectionWizard } from '@/src/features/connection/ConnectionWizard';

it('changes platform guidance and never renders a subscription secret', async () => {
  const user = userEvent.setup();
  render(<ConnectionWizard />);

  await user.selectOptions(screen.getByLabelText('Платформа'), 'windows');

  expect(screen.getByLabelText('Платформа')).toHaveValue('windows');
  expect(screen.getByRole('button', { name: 'Throne' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(screen.getByRole('link', { name: /Скачать Throne/i })).toHaveAttribute(
    'href',
    'https://github.com/throneproj/Throne/releases',
  );

  await user.click(screen.getByRole('button', { name: 'Добавить подписку' }));

  expect(
    screen.getByText('Ключ подключения и QR появятся после интеграции.'),
  ).toBeVisible();
  expect(document.body.textContent).not.toMatch(/https?:\/\/[^\s]+\/sub\//i);
  expect(
    screen.getByRole('img', { name: 'Демонстрационный QR-код' }),
  ).toBeVisible();
  expect(
    screen.getByText('Настоящий QR появится после интеграции.'),
  ).toBeVisible();
});

it('offers all approved platforms and resets the app when platform changes', async () => {
  const user = userEvent.setup();
  render(<ConnectionWizard />);

  expect(screen.getByLabelText('Платформа').querySelectorAll('option')).toHaveLength(
    7,
  );

  await user.selectOptions(screen.getByLabelText('Платформа'), 'windows');
  expect(screen.getAllByRole('button', { name: /Throne|Clash Verge Rev|Happ/ })).toHaveLength(
    3,
  );

  await user.click(screen.getByRole('button', { name: 'Clash Verge Rev' }));
  expect(screen.getByRole('button', { name: 'Clash Verge Rev' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  await user.selectOptions(screen.getByLabelText('Платформа'), 'android-tv');
  expect(screen.getByRole('button', { name: 'Happ' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(screen.queryByRole('button', { name: 'Clash Verge Rev' })).not.toBeInTheDocument();
});

it('reveals the selected application instructions on request', async () => {
  const user = userEvent.setup();
  render(<ConnectionWizard />);

  const summary = screen.getByText('Подробная инструкция для Happ');
  expect(summary.closest('details')).not.toHaveAttribute('open');

  await user.click(summary);

  expect(summary.closest('details')).toHaveAttribute('open');
  expect(screen.getByText('Установите Happ из App Store.')).toBeVisible();
});

it('keeps devices as an honest list placeholder with connection in its own section', async () => {
  render(<DevicesPanel />);

  expect(
    screen.getByText(
      'Подключение нового устройства находится в отдельном разделе «Подключение».',
    ),
  ).toBeVisible();
  expect(
    screen.queryByRole('button', { name: 'Подключить устройство' }),
  ).not.toBeInTheDocument();
});
