import { SiteFooter } from '@/src/components/layout/SiteFooter';
import { SiteHeader } from '@/src/components/layout/SiteHeader';
import { benefits, proofItems, steps } from '@/src/content/home';
import { RotatingIllustration } from '@/src/features/illustrations/RotatingIllustration';
import { Hero } from './Hero';
import { HomeLowerSections } from './HomeLowerSections';
import { Locations } from './Locations';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />

        <section className={styles.proof} aria-label="Коротко о сервисе">
          <ul className="container">
            {proofItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          id="how"
          className={`section ${styles.how}`}
          aria-labelledby="how-title"
        >
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className="eyebrow">Три шага</p>
              <h2 id="how-title">Подключение без квеста</h2>
              <p>
                Сначала выбираете подходящие условия, затем добавляете свои
                устройства — приложение подскажет остальное.
              </p>
            </div>
            <ol className={styles.steps}>
              {steps.map((step) => (
                <li key={step.number}>
                  <article>
                    <span className={styles.stepNumber} aria-hidden="true">
                      {step.number}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Locations />

        <section
          id="privacy"
          className={`section ${styles.privacy}`}
          aria-labelledby="privacy-title"
        >
          <div className="container">
            <div className={`${styles.sectionIntro} ${styles.privacyIntro}`}>
              <p className="eyebrow">Приватность без тревоги</p>
              <h2 id="privacy-title">
                Связано для своих. Закрыто для чужих.
              </h2>
            </div>
            <div className={styles.privacyGrid}>
              <div className={styles.privacyArt}>
                <RotatingIllustration
                  slotId="home.privacy.aside"
                  className={styles.privacyIllustration}
                  sizes="(max-width: 980px) min(720px, 100vw), 34vw"
                />
              </div>
              <ol className={styles.benefits}>
                {benefits.map((benefit, index) => (
                  <li key={benefit.title}>
                    <article>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3>{benefit.title}</h3>
                        <p>{benefit.text}</p>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
        <HomeLowerSections />
      </main>
      <SiteFooter />
    </>
  );
}
