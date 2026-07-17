'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { StatusNotice } from '@/src/components/ui/StatusNotice';
import { accountNavigation, type AccountSection } from '@/src/content/account';
import { AuthDialog } from '@/src/features/auth/AuthDialog';
import { AccountNavigation } from './AccountNavigation';
import { ConnectionWizard } from '@/src/features/connection/ConnectionWizard';
import { DevicesPanel } from './DevicesPanel';
import { HelpPanel } from './HelpPanel';
import { OverviewPanel } from './OverviewPanel';
import { PaymentsPanel } from './PaymentsPanel';
import { ProfilePanel } from './ProfilePanel';
import { SubscriptionPanel } from './SubscriptionPanel';
import styles from './AccountPage.module.css';

export function AccountPage() {
  const [active, setActive] = useState<AccountSection>('overview');
  const [authOpen, setAuthOpen] = useState(false);

  const panels = {
    overview: <OverviewPanel onNavigate={setActive} />,
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
        <p className={styles.sidebarNote}>
          Визуальная версия кабинета: структура готова к подключению действующих сервисов.
        </p>
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

        <div className={styles.statusRow}>
          <StatusNotice tone="info">Визуальная версия кабинета</StatusNotice>
        </div>

        {panels[active]}
      </div>

      <AccountNavigation mobile active={active} onChange={setActive} />
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  );
}
