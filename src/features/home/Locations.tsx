'use client';

import { useState } from 'react';
import { locations, type LocationRegion } from '@/src/content/home';
import { RotatingIllustration } from '@/src/features/illustrations/RotatingIllustration';
import styles from './HomePage.module.css';

const regions = [
  ['all', 'Все'],
  ['europe', 'Европа'],
  ['americas', 'Америка'],
  ['asia', 'Азия'],
  ['special', 'Спецмаршруты'],
] as const satisfies ReadonlyArray<readonly [LocationRegion, string]>;

export function Locations() {
  const [region, setRegion] = useState<LocationRegion>('all');
  const visibleLocations =
    region === 'all'
      ? locations
      : locations.filter((location) => location.region === region);

  return (
    <section
      id="locations"
      className={`section ${styles.locations}`}
      aria-labelledby="locations-title"
    >
      <div className="container">
        <div className={styles.sectionIntro}>
          <p className="eyebrow">Локации</p>
          <h2 id="locations-title">Локации под рукой</h2>
          <p>
            Выберите страну или специальный маршрут — доступные локации всегда
            собраны под рукой.
          </p>
        </div>

        <div
          className={styles.regionFilters}
          role="group"
          aria-label="Регион"
        >
          {regions.map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={region === value}
              onClick={() => setRegion(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="srOnly" aria-live="polite">
          Показано локаций: {visibleLocations.length}
        </p>

        <div className={styles.locationsGrid}>
          <div className={styles.locationCards}>
            {visibleLocations.map((location) => (
              <article
                key={location.city}
                className={location.flag ? undefined : styles.autoBypassCard}
                data-flag={location.flag ?? undefined}
                data-art={location.flag ? undefined : 'auto-bypass'}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.locationFlag}
                  src={`/images/flags/${location.flag ?? 'auto-bypass'}.webp`}
                  alt=""
                />
                <strong>{location.city}</strong>
                <span>{location.country}</span>
              </article>
            ))}
          </div>
          <div className={styles.locationsArt}>
            <RotatingIllustration
              slotId="home.locations.aside"
              className={styles.locationsIllustration}
              sizes="(max-width: 980px) min(720px, 100vw), 38vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
