import { accountNavigation, type AccountSection } from '@/src/content/account';
import styles from './AccountPage.module.css';

export function AccountNavigation({
  active,
  onChange,
  mobile = false,
}: {
  active: AccountSection;
  onChange(value: AccountSection): void;
  mobile?: boolean;
}) {
  const items = mobile
    ? accountNavigation.filter((item) => item.mobile)
    : accountNavigation;

  return (
    <nav
      className={mobile ? styles.mobileNav : styles.sideNav}
      aria-label={
        mobile ? 'Навигация кабинета на мобильном' : 'Навигация кабинета'
      }
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-current={active === item.id ? 'page' : undefined}
          onClick={() => onChange(item.id)}
        >
          <item.icon aria-hidden="true" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
