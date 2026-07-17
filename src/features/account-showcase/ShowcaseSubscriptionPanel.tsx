import { Button } from '@/src/components/ui/Button';
import styles from './AccountShowcase.module.css';
import { showcaseData } from './showcaseData';

export function ShowcaseSubscriptionPanel({
  onNotice,
}: {
  onNotice(message: string): void;
}) {
  const { subscription } = showcaseData;

  return (
    <section
      id="account-showcase-panel-subscription"
      className={styles.panel}
      aria-labelledby="showcase-subscription-title"
    >
      <div className={styles.panelHeading}>
        <p className="eyebrow">Тариф</p>
        <h2 id="showcase-subscription-title">Подписка</h2>
        <p className={styles.statusBadge}>{subscription.status}</p>
      </div>
      <dl className={styles.dataList}>
        <div><dt>Тариф</dt><dd>{subscription.plan}</dd></div>
        <div><dt>Начало подписки</dt><dd>{subscription.startsAt}</dd></div>
        <div><dt>Окончание подписки</dt><dd>{subscription.expiresAt}</dd></div>
        <div><dt>Лимит устройств</dt><dd>{subscription.deviceLimit}</dd></div>
        <div><dt>Занято мест</dt><dd>{subscription.connectedDevices}</dd></div>
        <div><dt>Стоимость периода</dt><dd>{subscription.periodPrice}</dd></div>
        <div><dt>Автопродление</dt><dd>{subscription.autoRenewal}</dd></div>
      </dl>
      <div className={styles.panelActions}>
        <Button
          onClick={() =>
            onNotice('Управление тарифом станет доступно после интеграции')
          }
        >
          Управлять тарифом
        </Button>
      </div>
    </section>
  );
}
