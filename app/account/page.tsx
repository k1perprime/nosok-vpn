import type { Metadata } from 'next';
import { AccountShowcasePage } from '@/src/features/account-showcase/AccountShowcasePage';

export const metadata: Metadata = {
  title: 'Личный кабинет — Nosok VPN',
  robots: { index: false, follow: false },
};

export default function AccountRoute() {
  return <AccountShowcasePage />;
}
