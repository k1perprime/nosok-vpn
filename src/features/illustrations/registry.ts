export const activeIllustrationSlotIds = [
  'home.hero.main',
  'home.locations.aside',
  'home.privacy.aside',
  'home.final-cta.lifestyle',
  'account.connection.aside',
] as const;

export type IllustrationSlotId = (typeof activeIllustrationSlotIds)[number];

export const reservedIllustrationSlotIds = [
  'showcase.panel.subscription.art',
  'showcase.panel.connection.art',
  'showcase.panel.devices.art',
  'showcase.panel.payments.art',
  'showcase.panel.profile.art',
] as const;

export type ReservedIllustrationSlotId =
  (typeof reservedIllustrationSlotIds)[number];

export const reservedIllustrationRegistry: Readonly<
  Record<ReservedIllustrationSlotId, readonly []>
> = {
  'showcase.panel.subscription.art': [],
  'showcase.panel.connection.art': [],
  'showcase.panel.devices.art': [],
  'showcase.panel.payments.art': [],
  'showcase.panel.profile.art': [],
};

export interface IllustrationAsset<Slot extends IllustrationSlotId = IllustrationSlotId> {
  readonly assetId: string;
  readonly slotId: Slot;
  readonly src: string;
  readonly fit: 'contain';
  readonly objectPosition: string;
  readonly width: number;
  readonly height: number;
}

type IllustrationRegistry = {
  readonly [Slot in IllustrationSlotId]: readonly IllustrationAsset<Slot>[];
};

export const featuredIllustrationAssetIds: Readonly<
  Record<IllustrationSlotId, string>
> = {
  'home.hero.main': '22-hero-connected-devices-v2-b',
  'home.locations.aside': '11-locations-route-editorial',
  'home.privacy.aside': '01-hero-thread-connection',
  'home.final-cta.lifestyle': '19-final-cta-paper-plane',
  'account.connection.aside': '05-connection-device-dock',
};

export const illustrationRegistry: IllustrationRegistry = {
  'home.hero.main': [
    {
      assetId: '02-privacy-yarn-cocoon',
      slotId: 'home.hero.main',
      src: '/images/illustration-library/privacy/02-privacy-yarn-cocoon.webp',
      fit: 'contain',
      objectPosition: '73% 52%',
      width: 1423,
      height: 1067,
    },
    {
      assetId: '09-hero-thread-alt',
      slotId: 'home.hero.main',
      src: '/images/illustration-library/hero/09-hero-thread-alt.webp',
      fit: 'contain',
      objectPosition: '58% 52%',
      width: 1423,
      height: 1067,
    },
    {
      assetId: '10-hero-thread-editorial',
      slotId: 'home.hero.main',
      src: '/images/illustration-library/hero/10-hero-thread-editorial.webp',
      fit: 'contain',
      objectPosition: '57% 51%',
      width: 1423,
      height: 1067,
    },
    {
      assetId: '21-hero-connected-devices-v2-a',
      slotId: 'home.hero.main',
      src: '/images/illustration-library/hero/21-hero-connected-devices-v2-a.webp',
      fit: 'contain',
      objectPosition: 'center',
      width: 1536,
      height: 1024,
    },
    {
      assetId: '22-hero-connected-devices-v2-b',
      slotId: 'home.hero.main',
      src: '/images/illustration-library/hero/22-hero-connected-devices-v2-b.webp',
      fit: 'contain',
      objectPosition: 'center',
      width: 1536,
      height: 1024,
    },
  ],
  'home.locations.aside': [
    {
      assetId: '03-locations-felt-map',
      slotId: 'home.locations.aside',
      src: '/images/illustration-library/locations/03-locations-felt-map.webp',
      fit: 'contain',
      objectPosition: 'center 54%',
      width: 1600,
      height: 900,
    },
    {
      assetId: '07-locations-map-alt',
      slotId: 'home.locations.aside',
      src: '/images/illustration-library/locations/07-locations-map-alt.webp',
      fit: 'contain',
      objectPosition: 'center 53%',
      width: 1600,
      height: 900,
    },
    {
      assetId: '11-locations-route-editorial',
      slotId: 'home.locations.aside',
      src: '/images/illustration-library/locations/11-locations-route-editorial.webp',
      fit: 'contain',
      objectPosition: 'center 52%',
      width: 1067,
      height: 1067,
    },
    {
      assetId: '15-travel-ready',
      slotId: 'home.locations.aside',
      src: '/images/illustration-library/locations/15-travel-ready.webp',
      fit: 'contain',
      objectPosition: '72% 54%',
      width: 1600,
      height: 900,
    },
  ],
  'home.privacy.aside': [
    {
      assetId: '01-hero-thread-connection',
      slotId: 'home.privacy.aside',
      src: '/images/illustration-library/hero/01-hero-thread-connection.webp',
      fit: 'contain',
      objectPosition: '72% 52%',
      width: 1600,
      height: 900,
    },
    {
      assetId: '08-privacy-cocoon-alt',
      slotId: 'home.privacy.aside',
      src: '/images/illustration-library/privacy/08-privacy-cocoon-alt.webp',
      fit: 'contain',
      objectPosition: '70% 52%',
      width: 1423,
      height: 1067,
    },
  ],
  'home.final-cta.lifestyle': [
    {
      assetId: '13-support-kindness',
      slotId: 'home.final-cta.lifestyle',
      src: '/images/illustration-library/support-and-lifestyle/13-support-kindness.webp',
      fit: 'contain',
      objectPosition: '72% 54%',
      width: 1423,
      height: 1067,
    },
    {
      assetId: '16-gaming-smooth-route',
      slotId: 'home.final-cta.lifestyle',
      src: '/images/illustration-library/support-and-lifestyle/16-gaming-smooth-route.webp',
      fit: 'contain',
      objectPosition: '72% 57%',
      width: 1600,
      height: 900,
    },
    {
      assetId: '17-streaming-cozy',
      slotId: 'home.final-cta.lifestyle',
      src: '/images/illustration-library/support-and-lifestyle/17-streaming-cozy.webp',
      fit: 'contain',
      objectPosition: '70% 52%',
      width: 1600,
      height: 900,
    },
    {
      assetId: '19-final-cta-paper-plane',
      slotId: 'home.final-cta.lifestyle',
      src: '/images/illustration-library/support-and-lifestyle/19-final-cta-paper-plane.webp',
      fit: 'contain',
      objectPosition: '69% 51%',
      width: 1600,
      height: 900,
    },
    {
      assetId: '20-quiet-work',
      slotId: 'home.final-cta.lifestyle',
      src: '/images/illustration-library/support-and-lifestyle/20-quiet-work.webp',
      fit: 'contain',
      objectPosition: '70% 52%',
      width: 1600,
      height: 900,
    },
  ],
  'account.connection.aside': [
    {
      assetId: '05-connection-device-dock',
      slotId: 'account.connection.aside',
      src: '/images/illustration-library/connection-and-devices/05-connection-device-dock.webp',
      fit: 'contain',
      objectPosition: '72% 53%',
      width: 1423,
      height: 1067,
    },
    {
      assetId: '12-device-bundle',
      slotId: 'account.connection.aside',
      src: '/images/illustration-library/connection-and-devices/12-device-bundle.webp',
      fit: 'contain',
      objectPosition: '72% 52%',
      width: 1423,
      height: 1067,
    },
    {
      assetId: '18-teamwork-thread',
      slotId: 'account.connection.aside',
      src: '/images/illustration-library/connection-and-devices/18-teamwork-thread.webp',
      fit: 'contain',
      objectPosition: '68% 55%',
      width: 1600,
      height: 900,
    },
  ],
};

export function getFeaturedIllustration<Slot extends IllustrationSlotId>(
  slotId: Slot,
): IllustrationAsset<Slot> {
  const asset = illustrationRegistry[slotId].find(
    (candidate) =>
      candidate.assetId === featuredIllustrationAssetIds[slotId],
  );

  if (!asset) {
    throw new Error(`Missing featured illustration for slot: ${slotId}`);
  }

  return asset;
}
