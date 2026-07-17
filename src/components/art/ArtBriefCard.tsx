import Image from 'next/image';
import styles from './ArtBriefCard.module.css';

const imageByAspect = {
  '1:1': '/images/illustration-library/03-locations-felt-map.webp',
  '3:2': '/images/illustration-library/19-final-cta-paper-plane.webp',
  '4:3': '/images/illustration-library/01-hero-thread-connection.webp',
  '4:5': '/images/illustration-library/02-privacy-yarn-cocoon.webp',
  '16:10': '/images/illustration-library/05-connection-device-dock.webp',
} as const;

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

export function ArtBriefCard({ scene, aspect }: ArtBriefCardProps) {
  const imageAspect = aspect.split(',')[0].trim() as keyof typeof imageByAspect;
  const imageSrc = imageByAspect[imageAspect] ?? '/images/nosok-header-icon.png';

  return (
    <aside className={styles.card} aria-label={scene}>
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(max-width: 760px) 100vw, 42vw"
        className={styles.mascot}
      />
    </aside>
  );
}
