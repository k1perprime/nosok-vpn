import type { PlatformId } from '@/src/lib/domain';

export interface ConnectionApp {
  id: string;
  name: string;
  note: string;
  steps: readonly string[];
}

export interface PlatformConfig {
  id: PlatformId;
  label: string;
  apps: readonly ConnectionApp[];
}

export const platforms: readonly PlatformConfig[] = [
  {
    id: 'ios',
    label: 'iOS',
    apps: [
      {
        id: 'happ-ios',
        name: 'Happ',
        note: 'Клиент для iPhone и iPad',
        steps: [
          'Установите Happ на устройство.',
          'Откройте в приложении раздел добавления подписки.',
          'Выберите добавление по ссылке или QR-коду.',
          'После импорта включите нужную локацию.',
        ],
      },
      {
        id: 'shadowrocket-ios',
        name: 'Shadowrocket',
        note: 'Клиент для iPhone и iPad',
        steps: [
          'Откройте Shadowrocket на устройстве.',
          'Нажмите кнопку добавления конфигурации.',
          'Импортируйте подписку по ссылке или QR-коду.',
          'Выберите локацию и включите подключение.',
        ],
      },
      {
        id: 'hiddify-ios',
        name: 'Hiddify',
        note: 'Клиент для iPhone и iPad',
        steps: [
          'Откройте Hiddify на устройстве.',
          'Выберите добавление нового профиля.',
          'Импортируйте подписку по ссылке или QR-коду.',
          'Откройте профиль и запустите подключение.',
        ],
      },
    ],
  },
  {
    id: 'android',
    label: 'Android',
    apps: [
      {
        id: 'happ-android',
        name: 'Happ',
        note: 'Клиент для смартфонов и планшетов',
        steps: [
          'Установите Happ на устройство.',
          'Откройте добавление новой подписки.',
          'Выберите импорт по ссылке или QR-коду.',
          'Подтвердите подключение в приложении.',
        ],
      },
      {
        id: 'v2rayng-android',
        name: 'v2rayNG',
        note: 'Клиент для Android',
        steps: [
          'Откройте v2rayNG на устройстве.',
          'Нажмите кнопку добавления профиля.',
          'Импортируйте подписку по ссылке или QR-коду.',
          'Обновите подписку и выберите локацию.',
        ],
      },
      {
        id: 'hiddify-android',
        name: 'Hiddify',
        note: 'Клиент для Android',
        steps: [
          'Откройте Hiddify на устройстве.',
          'Выберите добавление нового профиля.',
          'Импортируйте подписку по ссылке или QR-коду.',
          'Откройте профиль и запустите подключение.',
        ],
      },
    ],
  },
  {
    id: 'linux',
    label: 'Linux',
    apps: [
      {
        id: 'throne-linux',
        name: 'Throne',
        note: 'Десктопный клиент для Linux',
        steps: [
          'Установите Throne для своей системы.',
          'Откройте раздел «Группы».',
          'Создайте группу типа «Подписка».',
          'Импортируйте подписку и обновите список локаций.',
        ],
      },
      {
        id: 'clash-verge-linux',
        name: 'Clash Verge Rev',
        note: 'Десктопный клиент для Linux',
        steps: [
          'Установите Clash Verge Rev.',
          'Откройте раздел профилей.',
          'Импортируйте подписку.',
          'Выберите профиль и включите системный прокси.',
        ],
      },
      {
        id: 'hiddify-linux',
        name: 'Hiddify',
        note: 'Десктопный клиент для Linux',
        steps: [
          'Откройте Hiddify на компьютере.',
          'Выберите добавление нового профиля.',
          'Импортируйте подписку.',
          'Откройте профиль и запустите подключение.',
        ],
      },
    ],
  },
  {
    id: 'macos',
    label: 'macOS',
    apps: [
      {
        id: 'happ-macos',
        name: 'Happ',
        note: 'Для Mac на Apple silicon и Intel',
        steps: [
          'Установите Happ на Mac.',
          'Откройте добавление подписки.',
          'Импортируйте её по ссылке или QR-коду.',
          'Выберите локацию и включите подключение.',
        ],
      },
      {
        id: 'shadowrocket-macos',
        name: 'Shadowrocket',
        note: 'Клиент для macOS',
        steps: [
          'Откройте Shadowrocket на Mac.',
          'Нажмите кнопку добавления конфигурации.',
          'Импортируйте подписку.',
          'Выберите локацию и включите подключение.',
        ],
      },
      {
        id: 'clash-verge-macos',
        name: 'Clash Verge Rev',
        note: 'Клиент для macOS',
        steps: [
          'Установите Clash Verge Rev.',
          'Откройте раздел профилей.',
          'Импортируйте подписку.',
          'Выберите профиль и включите системный прокси.',
        ],
      },
      {
        id: 'hiddify-macos',
        name: 'Hiddify',
        note: 'Клиент для macOS',
        steps: [
          'Откройте Hiddify на Mac.',
          'Выберите добавление нового профиля.',
          'Импортируйте подписку.',
          'Откройте профиль и запустите подключение.',
        ],
      },
    ],
  },
  {
    id: 'windows',
    label: 'Windows',
    apps: [
      {
        id: 'throne',
        name: 'Throne',
        note: 'Windows 7, 10 и 11',
        steps: [
          'Установите Throne.',
          'Откройте «Настройки» → «Группы».',
          'Создайте группу типа «Подписка».',
          'Импортируйте подписку и обновите список локаций.',
          'При необходимости включите режим TUN.',
        ],
      },
      {
        id: 'nekobox-windows',
        name: 'NekoBox',
        note: 'Windows 10 и 11',
        steps: [
          'Откройте NekoBox и перейдите в раздел «Группы».',
          'Создайте новую группу типа «Подписка».',
          'Импортируйте подписку и обновите группу.',
          'Выберите нужную локацию и запустите подключение.',
        ],
      },
      {
        id: 'clash-verge',
        name: 'Clash Verge Rev',
        note: 'Windows 10 и 11',
        steps: [
          'Установите Clash Verge Rev.',
          'Откройте раздел профилей.',
          'Импортируйте подписку.',
          'Выберите профиль и включите системный прокси.',
        ],
      },
      {
        id: 'happ-windows',
        name: 'Happ',
        note: 'Windows 10 и 11',
        steps: [
          'Установите Happ на компьютер.',
          'Откройте добавление подписки.',
          'Импортируйте её и выберите нужную локацию.',
          'Включите подключение в приложении.',
        ],
      },
    ],
  },
  {
    id: 'android-tv',
    label: 'Android TV',
    apps: [
      {
        id: 'happ-tv',
        name: 'Happ',
        note: 'Клиент для Android TV',
        steps: [
          'Установите Happ на телевизор.',
          'Откройте добавление подписки.',
          'Отсканируйте QR-код с экрана кабинета.',
          'Выберите локацию и включите подключение.',
        ],
      },
      {
        id: 'v2rayng-android-tv',
        name: 'v2rayNG',
        note: 'Клиент Android с управлением на большом экране',
        steps: [
          'Откройте v2rayNG на телевизоре.',
          'Перейдите к добавлению профиля.',
          'Отсканируйте QR-код с экрана кабинета.',
          'Обновите подписку и выберите локацию.',
        ],
      },
    ],
  },
  {
    id: 'apple-tv',
    label: 'Apple TV',
    apps: [
      {
        id: 'happ-apple-tv',
        name: 'Happ',
        note: 'Клиент для Apple TV',
        steps: [
          'Установите Happ на Apple TV.',
          'Откройте добавление подписки.',
          'Отсканируйте QR-код с экрана кабинета.',
          'Выберите локацию и включите подключение.',
        ],
      },
      {
        id: 'shadowrocket-apple-tv',
        name: 'Shadowrocket',
        note: 'Клиент для Apple TV',
        steps: [
          'Откройте Shadowrocket на Apple TV.',
          'Перейдите к добавлению конфигурации.',
          'Отсканируйте QR-код с экрана кабинета.',
          'Выберите локацию и включите подключение.',
        ],
      },
    ],
  },
];

export function getPlatform(platformId: PlatformId) {
  return platforms.find((platform) => platform.id === platformId) ?? platforms[0];
}
