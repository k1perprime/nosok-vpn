'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { StatusNotice } from '@/src/components/ui/StatusNotice';
import type { IntegrationResult } from '@/src/lib/domain';
import { previewAdapters } from '@/src/lib/adapters/notConfigured';
import type { DurationDays, PriceQuote } from '@/src/lib/pricing';
import styles from './PricingCalculator.module.css';

const durations: DurationDays[] = [30, 90, 180, 360];
const rubles = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export function PricingCalculator() {
  const [days, setDays] = useState<DurationDays>(360);
  const [devices, setDevices] = useState(3);
  const [quote, setQuote] = useState<PriceQuote | null>(null);
  const [result, setResult] = useState<IntegrationResult<unknown> | null>(null);
  const currentQuote =
    quote?.days === days && quote.devices === devices ? quote : null;

  useEffect(() => {
    let current = true;

    void previewAdapters.pricing.quote({ days, devices }).then((next) => {
      if (!current) return;
      if (next.status === 'ready') {
        setQuote(next.data);
        return;
      }
      setResult(next);
    });

    return () => {
      current = false;
    };
  }, [days, devices]);

  async function continueToPayment() {
    if (!currentQuote) return;
    setResult(
      await previewAdapters.payment.beginCheckout({ quoteId: currentQuote.id }),
    );
  }

  function chooseDuration(value: DurationDays) {
    if (value === days) return;
    setQuote(null);
    setResult(null);
    setDays(value);
  }

  function chooseDeviceCount(value: number) {
    if (value === devices) return;
    setQuote(null);
    setResult(null);
    setDevices(value);
  }

  return (
    <section
      id="calculator"
      className={`section ${styles.section}`}
      aria-labelledby="calculator-title"
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Калькулятор</p>
          <h2 id="calculator-title">Мягкая цена. По вашим меркам.</h2>
          <p>
            Выберите срок и количество экранов — расчёт обновится сразу.
          </p>
        </div>

        <div className={styles.calculator}>
          <fieldset>
            <legend>Срок подписки</legend>
            <div className={styles.duration}>
              {durations.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} дней`}
                  aria-pressed={days === value}
                  onClick={() => chooseDuration(value)}
                >
                  <span>{value} дней</span>
                  {value === 360 ? (
                    <small aria-hidden="true">Популярный</small>
                  ) : null}
                </button>
              ))}
            </div>
          </fieldset>

          <label htmlFor="calculator-devices">Количество устройств</label>
          <select
            id="calculator-devices"
            value={devices}
            onChange={(event) =>
              chooseDeviceCount(Number(event.target.value))
            }
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ),
            )}
          </select>

          {currentQuote ? (
            <dl className={styles.quote} aria-live="polite">
              <div>
                <dt>В месяц за устройство</dt>
                <dd>
                  {rubles.format(currentQuote.monthlyPerDeviceRubles)}
                </dd>
              </div>
              <div>
                <dt>Итого за {currentQuote.months} мес.</dt>
                <dd className={styles.total}>
                  {rubles.format(currentQuote.totalRubles)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className={styles.loading} role="status">
              Рассчитываем…
            </p>
          )}

          <p className={styles.preliminary}>
            Предварительный расчёт. Точную сумму подтвердит действующая
            система тарифов.
          </p>
          <aside className={styles.telegramGrace} aria-label="Доступ в Telegram после окончания подписки">
            <div className={styles.telegramGraceIcon} aria-hidden="true">
              ↗
            </div>
            <div>
              <p className={styles.telegramGraceEyebrow}>Подписка закончилась?</p>
              <h3>Telegram останется на связи.</h3>
              <p>
                Ещё 6 дней будут доступны специальные серверы для Telegram:
                зайдите в{' '}
                <a
                  href="https://t.me/NosokVPNBot"
                  aria-label="Открыть @NosokVPNBot для продления"
                >
                  @NosokVPNBot
                </a>{' '}
                и спокойно продлите подписку.
              </p>
              <span>Только Telegram · без доступа к остальным сайтам</span>
            </div>
          </aside>
          <Button
            className={styles.continue}
            onClick={continueToPayment}
            disabled={!currentQuote}
          >
            Продолжить
          </Button>
          {result && result.status !== 'ready' ? (
            <StatusNotice>{result.message}</StatusNotice>
          ) : null}
        </div>
      </div>
    </section>
  );
}
