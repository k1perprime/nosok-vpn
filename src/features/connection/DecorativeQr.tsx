import styles from './ConnectionWizard.module.css';

const size = 17;
const finderOrigins = [
  [0, 0],
  [0, 10],
  [10, 0],
] as const;

function finderTile(row: number, column: number): boolean | null {
  for (const [top, left] of finderOrigins) {
    if (row < top || row > top + 6 || column < left || column > left + 6) {
      continue;
    }

    const vertical = row - top;
    const horizontal = column - left;
    const border =
      vertical === 0 || vertical === 6 || horizontal === 0 || horizontal === 6;
    const center =
      vertical >= 2 && vertical <= 4 && horizontal >= 2 && horizontal <= 4;

    return border || center;
  }

  return null;
}

function filledTile(row: number, column: number) {
  const finder = finderTile(row, column);
  return finder ?? (row * 11 + column * 7 + row * column) % 9 < 4;
}

export function DecorativeQr({ id }: { id: string }) {
  return (
    <figure id={id} className={styles.qrPreview}>
      <div
        className={styles.qrCode}
        role="img"
        aria-label="Визуальный QR-код"
      >
        {Array.from({ length: size * size }, (_, index) => {
          const row = Math.floor(index / size);
          const column = index % size;

          return (
            <span
              key={index}
              aria-hidden="true"
              data-filled={filledTile(row, column) ? 'true' : undefined}
            />
          );
        })}
      </div>
      <figcaption>Визуальный QR — без данных подключения.</figcaption>
    </figure>
  );
}
