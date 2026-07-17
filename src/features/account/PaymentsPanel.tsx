import styles from './AccountPage.module.css';

export function PaymentsPanel() {
  return (
    <section id="account-panel-payments" className={styles.panel} aria-labelledby="payments-title">
      <div className={styles.panelHeading}>
        <p className="eyebrow">Оплата</p>
        <h2 id="payments-title">История платежей</h2>
      </div>
      <div className={styles.emptyState}>
        <strong>Здесь появится история оплат после интеграции.</strong>
        <p>Сейчас это визуальная оболочка: без тестовых платежей и вымышленных операций.</p>
      </div>
    </section>
  );
}
