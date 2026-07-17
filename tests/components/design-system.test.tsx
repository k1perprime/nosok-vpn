import { render, screen } from '@testing-library/react';
import { ArtBriefCard } from '@/src/components/art/ArtBriefCard';
import { KnitWordmark } from '@/src/components/brand/KnitWordmark';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { StatusNotice } from '@/src/components/ui/StatusNotice';

it('builds the headline from vector stitches rather than SVG text', () => {
  const { container } = render(<KnitWordmark word="БЕЗОПАСНОСТЬ" />);
  const glyphs = container.querySelectorAll('[data-knit-glyph]');

  expect(container.querySelector('svg')).toBeInTheDocument();
  expect(container.querySelector('text')).not.toBeInTheDocument();
  expect(glyphs).toHaveLength(12);
  glyphs.forEach((glyph) => {
    expect(glyph.querySelector('path')).toBeInTheDocument();
  });
});

it('scopes the yarn filter to each wordmark instance', () => {
  const { container } = render(
    <>
      <KnitWordmark word="БЕЗОПАСНОСТЬ" />
      <KnitWordmark word="БЕЗОПАСНОСТЬ" />
    </>,
  );
  const wordmarks = [...container.querySelectorAll('svg')];
  const filterIds = wordmarks.map(
    (wordmark) => wordmark.querySelector('filter')?.id ?? '',
  );

  expect(filterIds.every(Boolean)).toBe(true);
  expect(new Set(filterIds).size).toBe(2);
  wordmarks.forEach((wordmark, index) => {
    wordmark.querySelectorAll('[data-knit-glyph]').forEach((glyph) => {
      expect(glyph).toHaveAttribute('filter', `url(#${filterIds[index]})`);
    });
  });
});

it('exposes the complete replacement brief', () => {
  const brief = {
    scene: 'Герой',
    action: 'Носок обнимает защищённые устройства',
    emotion: 'Уверенное тепло',
    background: 'Мягкая гостиная',
    aspect: '4:3',
    transparency: 'Прозрачный передний план',
    desktopCrop: 'Маскот справа',
    mobileCrop: 'Маскот сверху',
  };

  render(<ArtBriefCard {...brief} />);

  Object.values(brief).forEach((value) => {
    expect(screen.getByText(value)).toBeVisible();
  });
});

it('keeps buttons safe inside forms by default', () => {
  render(<Button>Подключиться</Button>);

  expect(screen.getByRole('button', { name: 'Подключиться' })).toHaveAttribute(
    'type',
    'button',
  );
});

it('renders card content as a labelled article', () => {
  render(<Card aria-label="Тариф">30 дней</Card>);

  expect(screen.getByRole('article', { name: 'Тариф' })).toHaveTextContent(
    '30 дней',
  );
});

it('announces status notices', () => {
  render(<StatusNotice tone="error">Нет соединения</StatusNotice>);

  expect(screen.getByRole('status')).toHaveTextContent('Нет соединения');
});
