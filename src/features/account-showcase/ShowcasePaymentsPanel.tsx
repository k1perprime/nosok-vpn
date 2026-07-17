import { Button } from '@/src/components/ui/Button';
import styles from './AccountShowcase.module.css';
import { showcaseData } from './showcaseData';

export function ShowcasePaymentsPanel({
  onNotice,
}: {
  onNotice(message: string): void;
}) {
  return (
    <section
      id="account-showcase-panel-payments"
      className={styles.panel}
      aria-labelledby="showcase-payments-title"
    >
      <div className={styles.panelHeading}>
        <p className="eyebrow">Оплата</p>
        <h2 id="showcase-payments-title">История платежей</h2>
      </div>
      <div className={styles.paymentList}>
        {showcaseData.payments.map((payment) => (
          <article key={payment.id} className={styles.paymentRow}>
            <time dateTime={payment.dateTime}>{payment.date}</time>
            <div>
              <strong>{payment.description}</strong>
              <span>{payment.status}</span>
            </div>
            <strong>{payment.amount}</strong>
            <Button
              variant="ghost"
              aria-label={`Получить чек за ${payment.date}`}
              onClick={() =>
                onNotice('Скачивание чеков станет доступно после интеграции')
              }
            >
              Чек
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
