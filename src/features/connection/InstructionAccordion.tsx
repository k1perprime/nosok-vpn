import styles from './ConnectionWizard.module.css';

export function InstructionAccordion({
  appName,
  steps,
}: {
  appName: string;
  steps: readonly string[];
}) {
  return (
    <section className={styles.stage} aria-labelledby="instructions-title">
      <span className={styles.stageNumber} aria-hidden="true">
        03
      </span>
      <div>
        <h3 id="instructions-title">Подключение и использование</h3>
        <p>Последовательность действий для выбранного приложения.</p>
        <details className={styles.instructions}>
          <summary>Подробная инструкция для {appName}</summary>
          <ol>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </details>
      </div>
    </section>
  );
}
