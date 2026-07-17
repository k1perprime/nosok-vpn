'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { StatusNotice } from '@/src/components/ui/StatusNotice';
import { accountNavigation, type AccountSection } from '@/src/content/account';
import { AccountNavigation } from '@/src/features/account/AccountNavigation';
import { HelpPanel } from '@/src/features/account/HelpPanel';
import { AuthDialog } from '@/src/features/auth/AuthDialog';
import styles from './AccountShowcase.module.css';
import { ShowcaseConnectionPanel } from './ShowcaseConnectionPanel';
import { ShowcaseDevicesPanel } from './ShowcaseDevicesPanel';
import { ShowcasePaymentsPanel } from './ShowcasePaymentsPanel';
import { ShowcaseProfilePanel } from './ShowcaseProfilePanel';
import { ShowcaseSubscriptionPanel } from './ShowcaseSubscriptionPanel';

export function AccountShowcasePage(): React.JSX.Element {
  const [active, setActive] = useState<AccountSection>('subscription');
  const [authOpen, setAuthOpen] = useState(false);
  const [integrationNotice, setIntegrationNotice] = useState('');

  function navigate(section: AccountSection) {
    setActive(section);
    setIntegrationNotice('');
  }

  const panels = {
    subscription: <ShowcaseSubscriptionPanel onNotice={setIntegrationNotice} />,
    connection: <ShowcaseConnectionPanel onNotice={setIntegrationNotice} />,
    devices: <ShowcaseDevicesPanel onNotice={setIntegrationNotice} />,
    payments: <ShowcasePaymentsPanel onNotice={setIntegrationNotice} />,
    profile: (
      <ShowcaseProfilePanel onNavigate={navigate} onNotice={setIntegrationNotice} />
    ),
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
        <AccountNavigation active={active} onChange={navigate} />
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
            <Link href="/" className={styles.homeLink}>На главную</Link>
          </div>
        </header>

        {integrationNotice ? (
          <div className={styles.statusRow}>
            <StatusNotice tone="info">{integrationNotice}</StatusNotice>
          </div>
        ) : null}

        {panels[active]}
      </div>

      <AccountNavigation mobile active={active} onChange={navigate} />
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  );
}
