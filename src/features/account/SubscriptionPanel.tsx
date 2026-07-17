import Link from 'next/link';
import styles from './AccountPage.module.css';

export function SubscriptionPanel() {
  return (
    <section id="account-panel-subscription" className={styles.panel} aria-labelledby="subscription-title">
      <div className={styles.panelHeading}>
        <p className="eyebrow">Тариф</p>
        <h2 id="subscription-title">Подписка</h2>
      </div>
      <div className={styles.emptyState}>
        <strong>Подписка появится здесь</strong>
        <p>Срок, тариф и лимит устройств подключим к действующей системе на следующем этапе.</p>
      </div>
      <Link href="/#calculator" className={styles.textLink}>
        Рассчитать продление
      </Link>
    </section>
  );
}
