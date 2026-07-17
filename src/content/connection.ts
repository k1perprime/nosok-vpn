import type { PlatformId } from '@/src/lib/domain';

export interface ConnectionApp {
  id: string;
  name: string;
  downloadUrl: string;
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
        downloadUrl:
          'https://apps.apple.com/us/app/happ-proxy-utility/id6504287215',
        note: 'Официальная страница App Store',
        steps: [
          'Установите Happ из App Store.',
          'Вернитесь в кабинет.',
          'Нажмите «Добавить подписку».',
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
        downloadUrl:
          'https://play.google.com/store/apps/details?id=com.happproxy',
        note: 'Официальная страница Google Play',
        steps: [
          'Установите Happ.',
          'Разрешите открытие ссылки из браузера.',
          'Подтвердите добавление подписки в приложении.',
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
        downloadUrl: 'https://github.com/throneproj/Throne/releases',
        note: 'Официальные релизы проекта',
        steps: [
          'Скачайте сборку для своей системы.',
          'Откройте раздел групп.',
          'Добавьте URL из кабинета после интеграции.',
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
        downloadUrl:
          'https://apps.apple.com/us/app/happ-proxy-utility/id6504287215',
        note: 'Официальная страница App Store',
        steps: [
          'Установите приложение.',
          'Вернитесь в браузер.',
          'Добавьте подписку одной кнопкой.',
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
        downloadUrl: 'https://github.com/throneproj/Throne/releases',
        note: 'Windows 7, 10, 11',
        steps: [
          'Установите Throne.',
          'Откройте «Настройки» → «Группы».',
          'Создайте группу типа «Подписка».',
          'Добавьте URL из кабинета и обновите подписку.',
          'Включите режим TUN.',
        ],
      },
      {
        id: 'clash-verge',
        name: 'Clash Verge Rev',
        downloadUrl:
          'https://github.com/clash-verge-rev/clash-verge-rev/releases',
        note: 'Официальные релизы проекта',
        steps: [
          'Установите приложение.',
          'Откройте раздел профилей.',
          'Импортируйте подписку из URL.',
        ],
      },
      {
        id: 'happ-windows',
        name: 'Happ',
        downloadUrl: 'https://github.com/Happ-proxy/happ-desktop/releases',
        note: 'Официальные релизы проекта',
        steps: [
          'Установите приложение.',
          'Нажмите «Добавить подписку» в кабинете.',
          'Подтвердите открытие приложения.',
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
        downloadUrl:
          'https://play.google.com/store/apps/details?id=com.happproxy',
        note: 'Официальная страница Google Play',
        steps: [
          'Установите приложение на телевизор.',
          'Откройте сканирование QR.',
          'QR появится после подключения подписочной системы.',
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
        downloadUrl:
          'https://apps.apple.com/us/app/happ-proxy-utility/id6504287215',
        note: 'Официальная страница App Store',
        steps: [
          'Установите приложение на Apple TV.',
          'Откройте добавление подписки.',
          'Используйте защищённый QR из кабинета.',
        ],
      },
    ],
  },
];

export function getPlatform(platformId: PlatformId) {
  return platforms.find((platform) => platform.id === platformId) ?? platforms[0];
}
