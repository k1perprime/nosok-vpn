import { StatusNotice } from '@/src/components/ui/StatusNotice';
import styles from './AccountPage.module.css';

export function DevicesPanel() {
  return (
    <section
      id="account-panel-devices"
      className={styles.panel}
      aria-labelledby="devices-title"
    >
      <div className={styles.panelHeading}>
        <p className="eyebrow">Устройства</p>
        <h2 id="devices-title">Ваши устройства</h2>
        <p className={styles.sectionLead}>
          Здесь появятся только реальные устройства и лимит действующей подписки.
        </p>
      </div>
      <StatusNotice tone="info">
        Подключение нового устройства находится в отдельном разделе «Подключение».
      </StatusNotice>
    </section>
  );
}
