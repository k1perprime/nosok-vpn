import Image from 'next/image';
import styles from './ArtBriefCard.module.css';

export interface ArtBriefCardProps {
  scene: string;
  action: string;
  emotion: string;
  background: string;
  aspect: string;
  transparency: string;
  desktopCrop: string;
  mobileCrop: string;
}

export function ArtBriefCard({ scene }: ArtBriefCardProps) {
  return (
    <aside className={styles.card} aria-label={scene}>
      <Image
        src="/images/nosok-header-icon.png"
        alt=""
        width={220}
        height={220}
        className={styles.mascot}
      />
    </aside>
  );
}
