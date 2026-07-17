'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { AuthDialog } from '@/src/features/auth/AuthDialog';
import styles from './SiteHeader.module.css';

const links = [
  ['Локации', '#locations'],
  ['Стоимость', '#calculator'],
  ['Помощь', '#contacts'],
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function openAuthFromMenu() {
    menuButtonRef.current?.focus();
    setMenuOpen(false);
    setAuthOpen(true);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo}>
            {/* Decorative brand mark; the link label remains the accessible name. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.logoMark}
              src="/images/nosok-header-icon.png"
              alt=""
              width="60"
              height="60"
            />
            Nosok VPN
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            aria-controls="public-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <nav
            id="public-navigation"
            className={menuOpen ? styles.navOpen : styles.nav}
            aria-label="Основная навигация"
          >
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            {menuOpen ? (
              <button
                type="button"
                className={styles.mobileLogin}
                onClick={openAuthFromMenu}
              >
                Войти
              </button>
            ) : null}
          </nav>
          <Link href="/account" className={styles.account}>
            Личный кабинет
          </Link>
          <button
            type="button"
            className={styles.login}
            onClick={() => setAuthOpen(true)}
          >
            Войти
          </button>
        </div>
      </header>
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
