import { useId } from 'react';
import styles from './KnitWordmark.module.css';

const glyphs: Record<string, string[]> = {
  Б: ['11111', '10000', '11110', '10001', '10001', '11110', '00000'],
  Е: ['11111', '10000', '11110', '10000', '10000', '11111', '00000'],
  З: ['11110', '00001', '01110', '00001', '00001', '11110', '00000'],
  О: ['01110', '10001', '10001', '10001', '10001', '01110', '00000'],
  П: ['11111', '10001', '10001', '10001', '10001', '10001', '00000'],
  А: ['01110', '10001', '10001', '11111', '10001', '10001', '00000'],
  С: ['01111', '10000', '10000', '10000', '10000', '01111', '00000'],
  Н: ['10001', '10001', '11111', '10001', '10001', '10001', '00000'],
  Т: ['11111', '00100', '00100', '00100', '00100', '00100', '00000'],
  Ь: ['10000', '10000', '11110', '10001', '10001', '11110', '00000'],
};

export function KnitWordmark({ word }: { word: 'БЕЗОПАСНОСТЬ' }) {
  const glyphWidth = 62;
  const filterId = `yarn-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg
      className={styles.word}
      viewBox={`0 0 ${word.length * glyphWidth} 98`}
      role="img"
      aria-label={word}
    >
      <defs>
        <filter id={filterId}>
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="2"
            floodOpacity=".22"
          />
        </filter>
      </defs>
      {[...word].map((letter, glyphIndex) => (
        <g
          key={`${letter}-${glyphIndex}`}
          data-knit-glyph
          transform={`translate(${glyphIndex * glyphWidth} 0)`}
          filter={`url(#${filterId})`}
        >
          {glyphs[letter].flatMap((row, y) =>
            [...row].map((cell, x) =>
              cell === '1' ? (
                <g
                  key={`${x}-${y}`}
                  transform={`translate(${x * 11 + 7} ${y * 13 + 8})`}
                >
                  <path
                    d="M1 7 C2 1, 10 1, 11 7 C10 12, 2 12, 1 7 Z"
                    className={styles.stitch}
                  />
                  <path
                    d="M3 7 C5 4, 7 4, 9 7"
                    className={styles.loop}
                  />
                </g>
              ) : null,
            ),
          )}
        </g>
      ))}
    </svg>
  );
}
