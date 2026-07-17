import { redirect } from 'next/navigation';

export default function LegacyAccountShowcaseRoute(): never {
  redirect('/account');
}
