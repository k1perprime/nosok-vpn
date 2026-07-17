import Link from 'next/link';
import { ArtBriefCard } from '@/src/components/art/ArtBriefCard';
import styles from './HomePage.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Всё схвачено. И связано.</p>
          <h1 id="hero-title">
            <span className="srOnly">
              Nosok VPN — Натяни безопасность
            </span>
            <span className={styles.heroTitleVisual} aria-hidden="true">
              <span className={styles.natyani}>Натяни</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/nosok-knit-security.png"
                alt=""
                width={1917}
                height={324}
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
        </div>
        <div className={styles.heroArt}>
          <ArtBriefCard
            scene="Первый экран"
            action="Вязаный Носок бережно связывает телефон, ноутбук и телевизор одной нитью"
            emotion="Уверенный, добрый, без детскости"
            background="Пастельная цифровая гостиная с большим свободным полем"
            aspect="4:3, отдельный прозрачный передний план"
            transparency="Маскот и нить на прозрачном фоне"
            desktopCrop="Маскот справа, нить ведёт взгляд к CTA слева"
            mobileCrop="Маскот над CTA, устройства не мельче 44 px"
          />
        </div>
      </div>
    </section>
  );
}
