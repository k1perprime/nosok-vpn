import { Button } from '@/src/components/ui/Button';
import styles from './AccountShowcase.module.css';
import { showcaseData } from './showcaseData';

export function ShowcaseDevicesPanel({
  onNotice,
}: {
  onNotice(message: string): void;
}) {
  return (
    <section
      id="account-showcase-panel-devices"
      className={styles.panel}
      aria-labelledby="showcase-devices-title"
    >
      <div className={styles.panelHeading}>
        <p className="eyebrow">Устройства</p>
        <h2 id="showcase-devices-title">Ваши устройства</h2>
        <p className={styles.sectionLead}>
          Подключено {showcaseData.subscription.connectedDevices} из {showcaseData.subscription.deviceLimit}
        </p>
      </div>
      <div className={styles.deviceList}>
        {showcaseData.devices.map((device) => (
          <article key={device.id} className={styles.deviceRow}>
            <div>
              <strong>{device.name}</strong>
              <span>{device.platform}</span>
            </div>
            <time dateTime={device.lastSeenDateTime}>{device.lastSeen}</time>
            <Button
              variant="ghost"
              aria-label={`Отключить ${device.name}`}
              onClick={() =>
                onNotice('Отключение устройства станет доступно после интеграции')
              }
            >
              Отключить
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
