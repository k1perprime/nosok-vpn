import { ConnectionWizard } from '@/src/features/connection/ConnectionWizard';
import styles from './AccountShowcase.module.css';

export function ShowcaseConnectionPanel({
  onNotice,
}: {
  onNotice(message: string): void;
}) {
  return (
    <ConnectionWizard
      id="account-showcase-panel-connection"
      className={styles.panel}
      headingId="showcase-connection-title"
      showArtwork={false}
      onNotice={onNotice}
    />
  );
}
