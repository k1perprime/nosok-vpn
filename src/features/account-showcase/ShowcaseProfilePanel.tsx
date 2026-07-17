import { Button } from '@/src/components/ui/Button';
import type { AccountSection } from '@/src/content/account';
import styles from './AccountShowcase.module.css';
import { showcaseData } from './showcaseData';

export function ShowcaseProfilePanel({
  onNavigate,
  onNotice,
}: {
  onNavigate(value: AccountSection): void;
  onNotice(message: string): void;
}) {
  const { profile } = showcaseData;

  return (
    <section
      id="account-showcase-panel-profile"
      className={styles.panel}
      aria-labelledby="showcase-profile-title"
    >
      <div className={styles.panelHeading}>
        <p className="eyebrow">Аккаунт</p>
        <h2 id="showcase-profile-title">Профиль</h2>
      </div>
      <dl className={styles.dataList}>
        <div><dt>Email</dt><dd>{profile.email}</dd></div>
        <div><dt>Подтверждение email</dt><dd>{profile.emailStatus}</dd></div>
        <div><dt>Telegram</dt><dd>{profile.telegram}</dd></div>
        <div><dt>Статус Telegram</dt><dd>{profile.telegramStatus}</dd></div>
        <div><dt>Способы входа</dt><dd>{profile.loginMethods}</dd></div>
        <div><dt>Связка аккаунтов</dt><dd>{profile.linkStatus}</dd></div>
      </dl>
      <div className={styles.profileActions}>
        <Button onClick={() => onNotice('Изменение пароля станет доступно после интеграции')}>
          Изменить пароль
        </Button>
        <Button
          variant="secondary"
          onClick={() => onNotice('Управление Telegram станет доступно после интеграции')}
        >
          Отвязать Telegram
        </Button>
        <Button variant="ghost" onClick={() => onNotice('Выход станет доступен после интеграции')}>
          Выйти
        </Button>
        <Button variant="ghost" onClick={() => onNavigate('help')}>
          Помощь
        </Button>
      </div>
    </section>
  );
}
