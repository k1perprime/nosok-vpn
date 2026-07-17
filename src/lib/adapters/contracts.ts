import type {
  AccountSnapshot,
  DeviceRecord,
  IntegrationResult,
  PaymentRecord,
  PlatformId,
} from '../domain';
import type { PriceInput, PriceQuote } from '../pricing';

export interface AuthAdapter {
  login(input: {
    email: string;
    password: string;
  }): Promise<IntegrationResult<AccountSnapshot>>;
  register(input: {
    email: string;
    password: string;
  }): Promise<IntegrationResult<AccountSnapshot>>;
  recover(email: string): Promise<IntegrationResult<null>>;
  requestEmailConfirmation(email: string): Promise<IntegrationResult<null>>;
  loginWithTelegram(): Promise<IntegrationResult<AccountSnapshot>>;
  linkTelegram(): Promise<IntegrationResult<AccountSnapshot>>;
}

export interface AccountAdapter {
  getSnapshot(): Promise<IntegrationResult<AccountSnapshot>>;
  getDevices(): Promise<IntegrationResult<DeviceRecord[]>>;
}

export interface PricingAdapter {
  quote(input: PriceInput): Promise<IntegrationResult<PriceQuote>>;
}

export interface SubscriptionAdapter {
  renew(quoteId: string): Promise<IntegrationResult<null>>;
}

export interface ConnectionAdapter {
  getSecret(): Promise<IntegrationResult<{ subscriptionUrl: string }>>;
  openInApp(input: {
    platform: PlatformId;
    appId: string;
  }): Promise<IntegrationResult<null>>;
}

export interface PaymentAdapter {
  beginCheckout(input: {
    quoteId: string;
  }): Promise<IntegrationResult<{ redirectUrl: string }>>;
  getHistory(): Promise<IntegrationResult<PaymentRecord[]>>;
}

export interface Adapters {
  auth: AuthAdapter;
  account: AccountAdapter;
  pricing: PricingAdapter;
  subscription: SubscriptionAdapter;
  connection: ConnectionAdapter;
  payment: PaymentAdapter;
}
