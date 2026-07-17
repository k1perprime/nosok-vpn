import '@fontsource-variable/onest/index.css';
import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Nosok VPN — всё схвачено',
  description: 'Премиальный VPN с простым подключением на ваших устройствах.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
