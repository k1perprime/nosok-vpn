'use client';

import { useState } from 'react';
import { ArtBriefCard } from '@/src/components/art/ArtBriefCard';
import { locations, type LocationRegion } from '@/src/content/home';
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
            <ArtBriefCard
              scene="Локации"
              action="Носок раскладывает вязаную карту и отмечает города петлями"
              emotion="Любопытство путешественника"
              background="Абстрактная пастельная карта без политических границ"
              aspect="1:1"
              transparency="Маскот и метки отдельными слоями"
              desktopCrop="Карта справа от карточек"
              mobileCrop="Карта под двумя первыми карточками"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
