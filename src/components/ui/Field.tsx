import { useId, type InputHTMLAttributes } from 'react';
import styles from './ui.module.css';

export function Field({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  const fallbackId = useId();
  const id = props.id ?? props.name ?? fallbackId;
  const errorId = `${id}-error`;

  return (
    <label className={styles.field} htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && <small id={errorId}>{error}</small>}
    </label>
  );
}
