import type { IntegrationResult } from '../domain';
import { calculatePrice } from '../pricing';
import type { Adapters } from './contracts';

const unavailable = <T>(message: string): Promise<IntegrationResult<T>> =>
  Promise.resolve({ status: 'not-configured', message });

const externalMessage =
  'Действие станет доступно после подключения действующей системы Nosok VPN.';

export const previewAdapters: Adapters = {
  auth: {
    login: () => unavailable(externalMessage),
    register: () => unavailable(externalMessage),
    recover: () => unavailable(externalMessage),
    requestEmailConfirmation: () => unavailable(externalMessage),
    loginWithTelegram: () => unavailable(externalMessage),
    linkTelegram: () => unavailable(externalMessage),
  },
  account: {
    getSnapshot: () => unavailable('Данные аккаунта ожидают интеграции.'),
    getDevices: () =>
      unavailable('Список реальных устройств появится после интеграции.'),
  },
  pricing: {
    quote: async (input) => ({ status: 'ready', data: calculatePrice(input) }),
  },
  subscription: {
    renew: () => unavailable(externalMessage),
  },
  connection: {
    getSecret: () =>
      unavailable(
        'Ключ подключения появится только из действующей системы подписок.',
      ),
    openInApp: () => unavailable(externalMessage),
  },
  payment: {
    beginCheckout: () =>
      unavailable('Оплата выполняется во внешней платёжной системе.'),
    getHistory: () =>
      unavailable(
        'Операции появятся здесь после подключения платёжной системы.',
      ),
  },
};
