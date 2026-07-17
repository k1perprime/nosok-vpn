import styles from './ui.module.css';

export function StatusNotice({
  children,
  tone = 'info',
}: {
  children: string;
  tone?: 'info' | 'error';
}) {
  return (
    <p role="status" className={`${styles.notice} ${styles[tone]}`}>
      {children}
    </p>
  );
}
