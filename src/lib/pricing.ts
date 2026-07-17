export type DurationDays = 30 | 90 | 180 | 360;

export interface PriceInput {
  days: DurationDays;
  devices: number;
}

export interface PriceQuote {
  id: string;
  days: DurationDays;
  months: number;
  devices: number;
  monthlyPerDeviceRubles: number;
  totalRubles: number;
  preliminary: true;
}

const MONTHS: Record<DurationDays, number> = {
  30: 1,
  90: 3,
  180: 6,
  360: 12,
};
const MONTHLY_RATE: Record<DurationDays, number> = {
  30: 250,
  90: 225,
  180: 200,
  360: 175,
};

export function calculatePrice(input: PriceInput): PriceQuote {
  if (
    !Number.isInteger(input.devices) ||
    input.devices < 1 ||
    input.devices > 10
  ) {
    throw new RangeError('devices must be between 1 and 10');
  }
  const months = MONTHS[input.days];
  const monthlyPerDeviceRubles = MONTHLY_RATE[input.days];
  return {
    id: `preview-${input.days}-${input.devices}`,
    ...input,
    months,
    monthlyPerDeviceRubles,
    totalRubles: months * monthlyPerDeviceRubles * input.devices,
    preliminary: true,
  };
}
