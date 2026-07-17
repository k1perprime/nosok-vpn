import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { HomePage } from '@/src/features/home/HomePage';

it('presents the approved story in order without forbidden claims', async () => {
  const { container } = render(<HomePage />);
  await screen.findByText('6 300 ₽');
  const sectionHeadings = [...container.querySelectorAll('main h2')].map(
    (node) => node.textContent,
  );

  expect(sectionHeadings).toEqual([
    'Подключение без квеста',
    'Локации под рукой',
    'Связано для своих. Закрыто для чужих.',
    'Мягкая цена. По вашим меркам.',
    'Что говорят носочники',
    'Частые вопросы',
    'Пора связать всё важное.',
  ]);
  expect(screen.getByText('Всё схвачено. И связано.')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Nosok VPN — Натяни безопасность',
    }),
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[src="/images/nosok-knit-security.png"]'),
  ).toBeInTheDocument();
  expect(
    container.querySelector('svg[aria-label="БЕЗОПАСНОСТЬ"]'),
  ).not.toBeInTheDocument();
  expect(container.textContent).not.toMatch(
    /12(?:\s|,)000|VPN включ[её]н|Выдохни/i,
  );
  expect(container.querySelector('#how')).toBeInTheDocument();
  expect(container.querySelector('#locations')).toBeInTheDocument();
  expect(container.querySelector('#privacy')).toBeInTheDocument();
});

it('shows all six approved privacy benefits', async () => {
  render(<HomePage />);
  await screen.findByText('6 300 ₽');

  [
    'Без логов',
    'Высокая скорость',
    'Обход ограничений',
    'Блокировка рекламы',
    'До 10 устройств',
    'Простое подключение',
  ].forEach((benefit) => {
    expect(screen.getByRole('heading', { name: benefit })).toBeInTheDocument();
  });
});

it('uses an approved palette token for the proof marks', () => {
  const css = readFileSync(
    resolve(process.cwd(), 'src/features/home/HomePage.module.css'),
    'utf8',
  );
  const proofMark = css.match(/\.proof li::before\s*\{(?<body>[\s\S]*?)\}/)
    ?.groups?.body;

  expect(proofMark).toBeDefined();
  expect(proofMark).not.toContain('#95583f');
  expect(proofMark).toMatch(/border:\s*1px solid var\(--[\w-]+\)/);
});

it('puts the knit auto-bypass route first and keeps country flags on the country cards', async () => {
  const user = userEvent.setup();
  const { container } = render(<HomePage />);
  await screen.findByText('6 300 ₽');
  const locationsSection = screen
    .getByRole('heading', { name: 'Локации под рукой' })
    .closest('section');

  expect(container.querySelectorAll('article[data-flag]')).toHaveLength(16);
  expect(screen.getByText('LTE — все операторы')).toBeVisible();
  const autoBypassCard = screen.getByText('Авто-обход').closest('article');
  expect(autoBypassCard).toHaveAttribute('data-art', 'auto-bypass');
  expect(autoBypassCard?.querySelector('img')).toHaveAttribute(
    'src',
    '/images/flags/auto-bypass.webp',
  );
  expect(autoBypassCard?.parentElement?.querySelector('article')).toBe(
    autoBypassCard,
  );
  expect(screen.getByText('Великобритания').closest('article')).not.toBe(
    autoBypassCard,
  );
  expect(screen.getByText('LTE — все операторы').closest('article')).toHaveAttribute(
    'data-flag',
    'eu',
  );
  expect(locationsSection?.textContent).not.toMatch(/пинг|мс/i);

  await user.click(screen.getByRole('button', { name: 'Америка' }));

  expect(screen.getByText('США')).toBeVisible();
  expect(screen.getByText('Канада')).toBeVisible();
  expect(screen.queryByText('Хельсинки')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Америка' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
