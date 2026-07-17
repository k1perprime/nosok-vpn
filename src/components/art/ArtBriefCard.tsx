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

export function ArtBriefCard(props: ArtBriefCardProps) {
  const rows = [
    ['Сцена', props.scene],
    ['Действие', props.action],
    ['Эмоция', props.emotion],
    ['Фон', props.background],
    ['Формат', props.aspect],
    ['Слои', props.transparency],
    ['Desktop', props.desktopCrop],
    ['Mobile', props.mobileCrop],
  ];

  return (
    <aside className={styles.card} aria-label={`Арт-бриф: ${props.scene}`}>
      <span className={styles.badge}>место для авторской иллюстрации</span>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
