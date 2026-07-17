import styles from './ConnectionWizard.module.css';

export function InstructionAccordion({
  appName,
  steps,
}: {
  appName: string;
  steps: readonly string[];
}) {
  return (
    <details className={styles.instructions}>
      <summary>Подробная инструкция для {appName}</summary>
      <ol>
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </details>
  );
}
