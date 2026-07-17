import { faq, reviews } from '@/src/content/home';
import { PricingCalculator } from '@/src/features/calculator/PricingCalculator';
import { RotatingIllustration } from '@/src/features/illustrations/RotatingIllustration';
import styles from './HomePage.module.css';

export function HomeLowerSections() {
  return (
    <>
      <PricingCalculator />

      <section
        className={`section ${styles.reviewsSection}`}
        aria-labelledby="reviews-title"
      >
        <div className="container">
          <div className={styles.lowerIntro}>
            <p className="eyebrow">Отзывы</p>
            <h2 id="reviews-title">Что говорят носочники</h2>
          </div>
          <div className={styles.reviews}>
            {reviews.map((review) => (
              <figure key={review.author}>
                <blockquote>«{review.quote}»</blockquote>
                <figcaption>
                  <strong>{review.author}</strong>
                  <span>{review.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`section ${styles.faqSection}`}
        aria-labelledby="faq-title"
      >
        <div className={`container ${styles.faq}`}>
          <div className={styles.faqIntro}>
            <p className="eyebrow">Без недомолвок</p>
            <h2 id="faq-title">Частые вопросы</h2>
          </div>
          <div className={styles.disclosures}>
            {faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`section ${styles.finalSection}`}
        aria-labelledby="final-title"
      >
        <div className={`container ${styles.finalCta}`}>
          <div className={styles.finalCopy}>
            <p className="eyebrow">Всё готово</p>
            <h2 id="final-title">Пора связать всё важное.</h2>
            <a href="#calculator" className={styles.primaryLink}>
              Рассчитать стоимость
            </a>
          </div>
          <div className={styles.finalArt}>
            <RotatingIllustration
              slotId="home.final-cta.lifestyle"
              className={styles.finalIllustration}
              sizes="(max-width: 980px) min(720px, 100vw), 38vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
