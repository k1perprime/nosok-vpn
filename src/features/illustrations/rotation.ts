import {
  illustrationRegistry,
  type IllustrationAsset,
  type IllustrationSlotId,
} from './registry';

export const ILLUSTRATION_WINDOW_MS = 4 * 60 * 60 * 1000;
export const MOSCOW_OFFSET_MS = 3 * 60 * 60 * 1000;
const BOUNDARY_SAFETY_MS = 50;

export function resolveIllustrationRotationEnabled(
  explicit: boolean | undefined,
  publicEnvValue: string | undefined,
): boolean {
  return explicit ?? publicEnvValue === 'true';
}

export function getMoscowBucket(nowMs: number): number {
  return Math.floor(
    (nowMs + MOSCOW_OFFSET_MS) / ILLUSTRATION_WINDOW_MS,
  );
}

export function getMillisecondsUntilNextMoscowBoundary(nowMs: number): number {
  const bucket = getMoscowBucket(nowMs);
  const nextBoundaryUtcMs =
    (bucket + 1) * ILLUSTRATION_WINDOW_MS - MOSCOW_OFFSET_MS;

  return Math.max(0, nextBoundaryUtcMs - nowMs) + BOUNDARY_SAFETY_MS;
}

export function fnv1a(value: string): number {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return hash >>> 0;
}

export function mulberry32(seed: number): () => number {
  let value = seed >>> 0;

  return () => {
    value = (value + 0x6d2b79f5) >>> 0;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function getShuffledIllustrations<Slot extends IllustrationSlotId>(
  slotId: Slot,
  assets: readonly IllustrationAsset<Slot>[],
): IllustrationAsset<Slot>[] {
  const shuffled = [...assets].sort((left, right) =>
    left.assetId.localeCompare(right.assetId, 'en'),
  );
  const random = mulberry32(fnv1a(`nosok-illustrations-v1|${slotId}`));

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }

  return shuffled;
}

export function selectIllustration<Slot extends IllustrationSlotId>(
  slotId: Slot,
  bucket: number,
): IllustrationAsset<Slot> {
  const ordered = getShuffledIllustrations(slotId, illustrationRegistry[slotId]);
  const index = ((bucket % ordered.length) + ordered.length) % ordered.length;

  return ordered[index];
}
