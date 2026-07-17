import styles from './AccountPage.module.css';

const supportLinks = [
  ['Канал @NosokVPN', 'https://t.me/NosokVPN'],
  ['Бот @NosokVPNBot', 'https://t.me/NosokVPNBot'],
  ['Техподдержка @NosokSup', 'https://t.me/NosokSup'],
  ['nosoktop@proton.me', 'mailto:nosoktop@proton.me'],
] as const;

export function HelpPanel() {
  return (
    <section
      id="account-panel-help"
      className={styles.panel}
      aria-labelledby="help-title"
    >
      <div className={styles.panelHeading}>
        <p className="eyebrow">Мы рядом</p>
        <h2 id="help-title">Помощь</h2>
        <p className={styles.sectionLead}>
          Напишите удобным способом. Живой человек подключится в часы работы
          поддержки.
        </p>
      </div>
      <ul className={styles.helpGrid}>
        {supportLinks.map(([label, href]) => {
          const external = href.startsWith('http');
          return (
            <li key={href}>
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
      <p className={styles.supportHours}>
        Пн–Пт 09:00–21:00 · Сб–Вс 10:00–18:00 · МСК
      </p>
    </section>
  );
}
