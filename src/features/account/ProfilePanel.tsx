'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { StatusNotice } from '@/src/components/ui/StatusNotice';
import styles from './AccountPage.module.css';

export function ProfilePanel({ onHelp }: { onHelp(): void }) {
  const [message, setMessage] = useState('');

  return (
    <section id="account-panel-profile" className={styles.panel} aria-labelledby="profile-title">
      <div className={styles.panelHeading}>
        <p className="eyebrow">Аккаунт</p>
        <h2 id="profile-title">Профиль</h2>
      </div>
      <dl className={styles.dataList}>
        <div><dt>Email</dt><dd>После входа здесь появится email</dd></div>
        <div><dt>Подтверждение email</dt><dd>После входа здесь появится статус подтверждения</dd></div>
        <div><dt>Telegram</dt><dd>Telegram пока не привязан</dd></div>
        <div><dt>Связка способов входа</dt><dd>Email и Telegram пока не связаны</dd></div>
      </dl>
      <div className={styles.profileActions}>
        <Button onClick={() => setMessage('Привязку email и Telegram подключим после интеграции.')}>Связать email и Telegram</Button>
        <Button variant="secondary" onClick={() => setMessage('Изменение пароля появится после подключения авторизации.')}>Изменить пароль</Button>
        <Button variant="ghost" onClick={() => setMessage('Выход появится вместе с реальной авторизацией.')}>Выйти</Button>
        <Button variant="ghost" onClick={onHelp}>Помощь</Button>
      </div>
      {message ? <StatusNotice tone="info">{message}</StatusNotice> : null}
    </section>
  );
}
