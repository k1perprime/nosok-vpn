import {
  CircleHelp,
  CreditCard,
  Gauge,
  Laptop,
  PlugZap,
  ReceiptText,
  UserRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { AccountLinkState, SubscriptionState } from '@/src/lib/domain';

export type AccountSection =
  | 'overview'
  | 'subscription'
  | 'connection'
  | 'devices'
  | 'payments'
  | 'profile'
  | 'help';

export const accountNavigation = [
  { id: 'overview', label: 'Обзор', icon: Gauge, mobile: true },
  { id: 'subscription', label: 'Подписка', icon: CreditCard, mobile: true },
  { id: 'connection', label: 'Подключение', icon: PlugZap, mobile: true },
  { id: 'devices', label: 'Устройства', icon: Laptop, mobile: true },
  { id: 'payments', label: 'Платежи', icon: ReceiptText, mobile: true },
  { id: 'profile', label: 'Профиль', icon: UserRound, mobile: true },
  { id: 'help', label: 'Помощь', icon: CircleHelp, mobile: false },
] as const satisfies ReadonlyArray<{
  id: AccountSection;
  label: string;
  icon: LucideIcon;
  mobile: boolean;
}>;

export const subscriptionStateLabel: Record<SubscriptionState, string> = {
  none: 'Нет подписки',
  'integration-pending': 'Ожидает данных',
  active: 'Активна',
  expiring: 'Скоро истекает',
  expired: 'Истекла',
};

export const accountLinkStateLabel: Record<AccountLinkState, string> = {
  'email-only': 'Подключён email',
  'telegram-only': 'Подключён Telegram',
  linked: 'Email и Telegram связаны',
  'telegram-conflict': 'Telegram принадлежит другому аккаунту',
  expired: 'Срок подтверждения истёк',
  'not-configured': 'Интеграция недоступна',
};

export const paymentStatusLabel = {
  paid: 'Оплачен',
  refunded: 'Возвращён',
  failed: 'Не прошёл',
} as const;
