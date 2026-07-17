import styles from './SiteFooter.module.css';

const contacts = [
  ['Telegram-канал', '@NosokVPN', 'https://t.me/NosokVPN'],
  ['Telegram-бот', '@NosokVPNBot', 'https://t.me/NosokVPNBot'],
  ['Техподдержка', '@NosokSup', 'https://t.me/NosokSup'],
  ['Email', 'nosoktop@proton.me', 'mailto:nosoktop@proton.me'],
] as const;

export function SiteFooter() {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className="eyebrow">О Носок VPN</p>
            <h2>Интернет, связанный с заботой.</h2>
            <p>
              Мы предоставляем премиальные VPN-услуги с 2020 года. Наша миссия
              — сделать интернет безопасным и доступным для всех.
            </p>
          </div>
          <div>
            <h3>Связь и поддержка</h3>
            <ul>
              {contacts.map(([label, value, href]) => {
                const external = href.startsWith('http');
                return (
                  <li key={label}>
                    <span>{label}</span>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                    >
                      {value}
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className={styles.hours}>
              Пн–Пт 09:00–21:00 · Сб–Вс 10:00–18:00 · МСК
            </p>
          </div>
        </div>
        <div className={styles.bottom}>
          <strong>Nosok VPN</strong>
          <span>© 2026</span>
          <span aria-disabled="true">Политика конфиденциальности</span>
          <span aria-disabled="true">Пользовательское соглашение</span>
        </div>
      </div>
    </footer>
  );
}
