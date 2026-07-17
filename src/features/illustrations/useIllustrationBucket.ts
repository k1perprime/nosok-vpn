'use client';

import { useEffect, useState } from 'react';
import {
  getMillisecondsUntilNextMoscowBoundary,
  getMoscowBucket,
} from './rotation';

export function useIllustrationBucket(
  initialBucket: number,
  enabled: boolean,
): number {
  const [bucket, setBucket] = useState(initialBucket);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let timeoutId: number | undefined;

    function synchronize() {
      const nowMs = Date.now();
      setBucket(getMoscowBucket(nowMs));

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(
        synchronize,
        getMillisecondsUntilNextMoscowBoundary(nowMs),
      );
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        synchronize();
      }
    }

    synchronize();
    window.addEventListener('focus', synchronize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener('focus', synchronize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled]);

  return bucket;
}
