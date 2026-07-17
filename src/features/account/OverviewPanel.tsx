import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import type { AccountSection } from '@/src/content/account';
import styles from './AccountPage.module.css';

const facts = [
  'Срок подписки',
  'Тариф',
  'Устройства',
  'Связка аккаунтов',
] as const;

export function OverviewPanel({
  onNavigate,
}: {
  onNavigate(value: AccountSection): void;
}) {
  return (
    <section
      id="account-panel-overview"
      className={`${styles.panel} ${styles.overviewPanel}`}
      aria-labelledby="overview-title"
    >
      <div className={styles.panelHeading}>
        <p className="eyebrow">Ваш Носок</p>
        <h2 id="overview-title">Всё важное — в одном клубке</h2>
        <p className={styles.sectionLead}>
          Здесь — готовая структура личного кабинета. Реальные значения подключим к действующей системе отдельно.
        </p>
      </div>
      <div className={styles.facts}>
        {facts.map((label) => (
          <Card key={label} className={styles.factCard} aria-label={label}>
            <span>{label}</span>
            <strong>Подключим после интеграции</strong>
            <small>Место для данных действующего аккаунта</small>
          </Card>
        ))}
      </div>
      <div className={styles.panelActions}>
        <Button onClick={() => onNavigate('subscription')}>Продлить</Button>
        <Button variant="secondary" onClick={() => onNavigate('devices')}>
          Открыть инструкцию
        </Button>
      </div>
    </section>
  );
}
