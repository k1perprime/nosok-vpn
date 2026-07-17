import Link from 'next/link';
import { RotatingIllustration } from '@/src/features/illustrations/RotatingIllustration';
import styles from './HomePage.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.heroGrid}`}>
        <p className={`eyebrow ${styles.heroEyebrow}`}>
          Всё схвачено. И связано.
        </p>
        <h1 id="hero-title" className={styles.heroTitle}>
          <span className="srOnly">
            Nosok VPN — Натяни безопасность
          </span>
          <span className={styles.heroTitleVisual} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/nosok-knit-natyani-v2.png"
              alt=""
              width={1050}
              height={282}
              className={styles.knitNatyaniImage}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/nosok-knit-security-v2.png"
              alt=""
              width={1699}
              height={286}
              className={styles.knitSecurityImage}
            />
          </span>
        </h1>
        <p className={styles.lead}>
          VPN, который легко подключить и приятно оставить частью своей
          цифровой жизни.
        </p>
        <div className={styles.actions}>
          <a href="#calculator" className={styles.primaryLink}>
            Рассчитать стоимость
          </a>
          <Link href="/account" className={styles.secondaryLink}>
            Уже с нами
          </Link>
        </div>
        <div className={styles.heroArt}>
          <RotatingIllustration
            slotId="home.hero.main"
            className={styles.heroIllustration}
            priority
            sizes="(max-width: 980px) min(720px, 100vw), 42vw"
          />
        </div>
      </div>
    </section>
  );
}
