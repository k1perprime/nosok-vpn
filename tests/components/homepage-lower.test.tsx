import { render, screen, within } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import userEvent from '@testing-library/user-event';
import { HomePage } from '@/src/features/home/HomePage';

const approvedReviews = [
  {
    author: 'Сергей',
    excerpt:
      'Много езжу и сижу с публичного Wi\u2011Fi в аэропортах. С Носком перестал переживать за данные — скорость держит даже на видеозвонках.',
    role: 'Предприниматель · Москва',
  },
  {
    author: 'Марина',
    excerpt:
      'Нужен доступ к сервисам, которых тут нет. Подключается за секунды, ни разу не подвис.',
    role: 'Дизайнер · Санкт-Петербург',
  },
  {
    author: 'Ирина',
    excerpt:
      'Работаю с зарубежными клиентами. Носок выручает каждый день — и выглядит мило.',
    role: 'Фрилансер · Сочи',
  },
] as const;

const finalArtBriefValues = [
  'Финальный призыв',
  'Расслабленный Носок держит аккуратно связанный набор устройств',
  'Тёплая уверенность',
  'Однотонный шалфейный фон',
  '3:2',
  'Маскот и клубок отдельными слоями',
  'Маскот справа',
  'Маскот под кнопкой',
] as const;

it('shows the exact approved reviews, support details, and no invented audience number', async () => {
  const { container } = render(<HomePage />);

  await screen.findByText('6 300 ₽');

  const reviewsSection = screen
    .getByRole('heading', { name: 'Что говорят носочники' })
    .closest('section');

  expect(reviewsSection).not.toBeNull();
  expect(reviewsSection!.querySelectorAll('figure')).toHaveLength(3);
  approvedReviews.forEach(({ author, excerpt, role }) => {
    expect(within(reviewsSection!).getByText(`«${excerpt}»`)).toBeInTheDocument();
    expect(within(reviewsSection!).getByText(author)).toBeInTheDocument();
    expect(within(reviewsSection!).getByText(role)).toBeInTheDocument();
  });

  [
    ['@NosokVPN', 'https://t.me/NosokVPN'],
    ['@NosokVPNBot', 'https://t.me/NosokVPNBot'],
    ['@NosokSup', 'https://t.me/NosokSup'],
  ].forEach(([handle, href]) => {
    expect(screen.getByRole('link', { name: handle })).toHaveAttribute(
      'href',
      href,
    );
  });
  expect(screen.getByText('nosoktop@proton.me')).toHaveAttribute(
    'href',
    'mailto:nosoktop@proton.me',
  );
  expect(
    screen.getByText('Пн–Пт 09:00–21:00 · Сб–Вс 10:00–18:00 · МСК'),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      'Мы предоставляем премиальные VPN-услуги с 2020 года. Наша миссия — сделать интернет безопасным и доступным для всех.',
    ),
  ).toBeInTheDocument();
  expect(container.textContent).not.toMatch(/12(?:\s|,)000/);
});

it('renders all eight approved final art-brief values', async () => {
  render(<HomePage />);

  await screen.findByText('6 300 ₽');

  const finalSection = screen
    .getByRole('heading', { name: 'Пора связать всё важное.' })
    .closest('section');
  const artBrief = within(finalSection!).getByLabelText(
    'Арт-бриф: Финальный призыв',
  );

  expect(artBrief.querySelectorAll('dd')).toHaveLength(8);
  finalArtBriefValues.forEach((value) => {
    expect(within(artBrief).getByText(value)).toBeInTheDocument();
  });
});

it('gives footer contact links a surface focus ring on blue ink', () => {
  const css = readFileSync(
    resolve(process.cwd(), 'src/components/layout/SiteFooter.module.css'),
    'utf8',
  );
  const footerFocus = css.match(
    /\.footer a:focus-visible\s*\{(?<body>[\s\S]*?)\}/,
  )?.groups?.body;

  expect(footerFocus).toBeDefined();
  expect(footerFocus).toMatch(/outline:\s*3px solid var\(--surface\)/);
  expect(footerFocus).toMatch(/outline-offset:\s*4px/);
  expect(footerFocus).toMatch(/border-radius:\s*var\(--radius-sm\)/);
});

it('answers all seven approved FAQ topics with native disclosures', async () => {
  const user = userEvent.setup();
  render(<HomePage />);
  await screen.findByText('6 300 ₽');
  const faq = screen
    .getByRole('heading', { name: 'Частые вопросы' })
    .closest('section');

  expect(faq).not.toBeNull();
  expect(within(faq!).getAllByRole('group')).toHaveLength(7);

  await user.click(within(faq!).getByText('Как начать?'));

  expect(
    within(faq!).getByText('Как начать?').closest('details'),
  ).toHaveAttribute('open');
  expect(
    within(faq!).getByText('Можно связать email и Telegram?'),
  ).toBeInTheDocument();
  expect(
    within(faq!).getByText(/Куда писать, если не получается подключиться/),
  ).toBeInTheDocument();
});

it('renders the final CTA before a footer with disabled preview legal labels', async () => {
  const { container } = render(<HomePage />);
  const main = container.querySelector('main');
  const footer = container.querySelector('footer');

  await screen.findByText('6 300 ₽');

  expect(
    screen.getByRole('heading', { name: 'Пора связать всё важное.' }),
  ).toBeInTheDocument();
  expect(
    within(
      screen
        .getByRole('heading', { name: 'Пора связать всё важное.' })
        .closest('section')!,
    ).getByRole('link', { name: 'Рассчитать стоимость' }),
  ).toHaveAttribute('href', '#calculator');
  expect(main?.nextElementSibling).toBe(footer);

  const privacyPolicy = screen.getByText('Политика конфиденциальности');
  const terms = screen.getByText('Пользовательское соглашение');
  expect(privacyPolicy).toHaveAttribute('aria-disabled', 'true');
  expect(terms).toHaveAttribute('aria-disabled', 'true');
  expect(privacyPolicy.closest('a')).toBeNull();
  expect(terms.closest('a')).toBeNull();
});
