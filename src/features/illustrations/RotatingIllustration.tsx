'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './RotatingIllustration.module.css';
import {
  getFeaturedIllustration,
  illustrationRegistry,
  type IllustrationSlotId,
} from './registry';
import {
  resolveIllustrationRotationEnabled,
  selectIllustration,
} from './rotation';
import { useIllustrationBucket } from './useIllustrationBucket';

export interface RotatingIllustrationProps {
  readonly slotId: IllustrationSlotId;
  readonly initialBucket?: number;
  readonly rotation?: boolean;
  readonly priority?: boolean;
  readonly className?: string;
  readonly sizes?: string;
}

export function RotatingIllustration({
  slotId,
  initialBucket = 0,
  rotation,
  priority = false,
  className,
  sizes = '(max-width: 900px) 100vw, 45vw',
}: RotatingIllustrationProps): React.JSX.Element {
  const rotationEnabled = resolveIllustrationRotationEnabled(
    rotation,
    process.env.NEXT_PUBLIC_ENABLE_ILLUSTRATION_ROTATION,
  );
  const bucket = useIllustrationBucket(initialBucket, rotationEnabled);
  const selectedAsset = rotationEnabled
    ? selectIllustration(slotId, bucket)
    : getFeaturedIllustration(slotId);
  const [failedAssetIds, setFailedAssetIds] = useState<readonly string[]>([]);
  const assets = illustrationRegistry[slotId];
  const asset = [selectedAsset, ...assets].find(
    (candidate) => !failedAssetIds.includes(candidate.assetId),
  ) ?? selectedAsset;

  return (
    <figure
      className={[styles.media, className].filter(Boolean).join(' ')}
      data-slot-id={slotId}
      data-asset-id={asset.assetId}
      data-asset-width={asset.width}
      data-asset-height={asset.height}
      data-rotation-enabled={rotationEnabled}
      aria-hidden="true"
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <Image
        key={asset.assetId}
        src={asset.src}
        alt=""
        fill
        sizes={sizes}
        preload={priority}
        className={styles.image}
        style={{
          objectFit: asset.fit,
          objectPosition: asset.objectPosition,
        }}
        onError={() => {
          setFailedAssetIds((current) =>
            current.includes(asset.assetId)
              ? current
              : [...current, asset.assetId],
          );
        }}
      />
    </figure>
  );
}
