import { calculatePrice } from '@/src/lib/pricing';

describe('calculatePrice', () => {
  it.each([
    [{ days: 30, devices: 1 }, 250],
    [{ days: 90, devices: 3 }, 2025],
    [{ days: 360, devices: 10 }, 21000],
  ] as const)('quotes %o as %i rubles', (input, expected) => {
    expect(calculatePrice(input).totalRubles).toBe(expected);
  });

  it('rejects unsupported inputs', () => {
    expect(() => calculatePrice({ days: 30, devices: 0 })).toThrow(
      'devices must be between 1 and 10',
    );
  });
});
