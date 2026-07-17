export type IntegrationResult<T> =
  | { status: 'ready'; data: T }
  | { status: 'empty'; message: string }
  | { status: 'not-configured'; message: string }
  | { status: 'error'; message: string };

export type PlatformId =
  | 'ios'
  | 'android'
  | 'linux'
  | 'macos'
  | 'windows'
  | 'android-tv'
  | 'apple-tv';
export type SubscriptionState =
  | 'none'
  | 'integration-pending'
  | 'active'
  | 'expiring'
  | 'expired';
export type AccountLinkState =
  | 'email-only'
  | 'telegram-only'
  | 'linked'
  | 'telegram-conflict'
  | 'expired'
  | 'not-configured';

export interface AccountSnapshot {
  email: string | null;
  emailVerified: boolean;
  telegram: string | null;
  accountsLinked: boolean;
  linkState: AccountLinkState;
  subscription: {
    state: SubscriptionState;
    planName: string | null;
    expiresAt: string | null;
    deviceLimit: number | null;
  };
}

export interface DeviceRecord {
  id: string;
  name: string;
  platform: PlatformId;
  lastSeenAt: string | null;
}

export interface PaymentRecord {
  id: string;
  paidAt: string;
  amountRubles: number;
  status: 'paid' | 'refunded' | 'failed';
}
