'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { accountNavigation, type AccountSection } from '@/src/content/account';
import { AuthDialog } from '@/src/features/auth/AuthDialog';
import { AccountNavigation } from './AccountNavigation';
import { ConnectionWizard } from '@/src/features/connection/ConnectionWizard';
import { DevicesPanel } from './DevicesPanel';
import { HelpPanel } from './HelpPanel';
import { PaymentsPanel } from './PaymentsPanel';
import { ProfilePanel } from './ProfilePanel';
import { SubscriptionPanel } from './SubscriptionPanel';
import styles from './AccountPage.module.css';

export function AccountPage() {
  const [active, setActive] = useState<AccountSection>('subscription');
  const [authOpen, setAuthOpen] = useState(false);

  const panels = {
    subscription: <SubscriptionPanel />,
    connection: (
      <div className={`${styles.panel} ${styles.connectionPanel}`}>
        <ConnectionWizard />
      </div>
    ),
    devices: <DevicesPanel />,
    payments: <PaymentsPanel />,
    profile: <ProfilePanel onHelp={() => setActive('help')} />,
    help: <HelpPanel />,
  } satisfies Record<AccountSection, ReactNode>;

  const activeLabel = accountNavigation.find((item) => item.id === active)?.label;

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <span aria-hidden="true">N</span>
          <strong>Nosok VPN</strong>
        </Link>
        <p className={styles.sidebarLabel}>Личный кабинет</p>
        <AccountNavigation active={active} onChange={setActive} />
      </aside>

      <div className={styles.workspace}>
        <header className={styles.accountHeader}>
          <div>
            <p>Личный кабинет</p>
            <h1>
              <span className="srOnly">Личный кабинет — </span>
              {activeLabel}
            </h1>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.loginButton}
              onClick={() => setAuthOpen(true)}
            >
              Войти
            </button>
            <Link href="/" className={styles.homeLink}>
              На главную
            </Link>
          </div>
        </header>

        {panels[active]}
      </div>

      <AccountNavigation mobile active={active} onChange={setActive} />
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  );
}
