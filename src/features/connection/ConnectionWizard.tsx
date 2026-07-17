'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { StatusNotice } from '@/src/components/ui/StatusNotice';
import { getPlatform, platforms } from '@/src/content/connection';
import { RotatingIllustration } from '@/src/features/illustrations/RotatingIllustration';
import type { PlatformId } from '@/src/lib/domain';
import { InstructionAccordion } from './InstructionAccordion';
import { DecorativeQr } from './DecorativeQr';
import styles from './ConnectionWizard.module.css';

interface Feedback {
  message: string;
  tone: 'info' | 'error';
}

interface ConnectionWizardProps {
  id?: string;
  className?: string;
  headingId?: string;
  showArtwork?: boolean;
  onNotice?(message: string): void;
}

const integrationNotice =
  'Ссылки и подключение станут доступны после интеграции.';
const qrPreviewId = 'connection-qr-preview';

export function ConnectionWizard({
  id,
  className = '',
  headingId = 'wizard-title',
  showArtwork = true,
  onNotice,
}: ConnectionWizardProps = {}) {
  const [platformId, setPlatformId] = useState<PlatformId>('ios');
  const platform = getPlatform(platformId);
  const [appId, setAppId] = useState(platform.apps[0].id);
  const app =
    platform.apps.find((candidate) => candidate.id === appId) ?? platform.apps[0];
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [qrVisible, setQrVisible] = useState(false);

  function clearTransientState() {
    setFeedback(null);
    setQrVisible(false);
    onNotice?.('');
  }

  function changePlatform(next: PlatformId) {
    const nextPlatform = getPlatform(next);
    setPlatformId(next);
    setAppId(nextPlatform.apps[0].id);
    clearTransientState();
  }

  function showIntegrationNotice() {
    if (onNotice) {
      onNotice(integrationNotice);
      return;
    }

    setFeedback({ message: integrationNotice, tone: 'info' });
  }

  function toggleQr() {
    const nextQrVisible = !qrVisible;
    setQrVisible(nextQrVisible);
    if (nextQrVisible) {
      showIntegrationNotice();
    }
  }

  return (
    <section
      id={id}
      className={`${styles.wizard} ${className}`}
      aria-labelledby={headingId}
      data-with-artwork={showArtwork ? 'true' : 'false'}
    >
      <div className={styles.controls}>
        <div className={styles.heading}>
          <p className="eyebrow">Установка</p>
          <h2 id={headingId} tabIndex={-1}>
            Подключить устройство
          </h2>
          <p>
            Сначала выберите платформу и приложение, затем пройдите три
            коротких шага подключения.
          </p>
        </div>

        <label className={styles.platformField}>
          <span>Платформа</span>
          <select
            aria-label="Платформа"
            value={platformId}
            onChange={(event) => changePlatform(event.target.value as PlatformId)}
          >
            {platforms.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.appPicker} role="group" aria-label="Приложение">
          {platform.apps.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={app.id === item.id}
              onClick={() => {
                setAppId(item.id);
                clearTransientState();
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        <section className={styles.stage} aria-labelledby="download-title">
          <span className={styles.stageNumber} aria-hidden="true">
            01
          </span>
          <div>
            <h3 id="download-title">Установите приложение</h3>
            <p>{app.note}</p>
            <Button
              variant="secondary"
              className={styles.downloadButton}
              onClick={showIntegrationNotice}
            >
              Скачать {app.name}
            </Button>
          </div>
        </section>

        <section className={styles.stage} aria-labelledby="add-title">
          <span className={styles.stageNumber} aria-hidden="true">
            02
          </span>
          <div>
            <h3 id="add-title">Добавьте подписку</h3>
            <p>Основной способ, резервная ссылка или защищённый QR.</p>
            <div
              className={styles.subscriptionPreview}
              data-qr-visible={qrVisible ? 'true' : 'false'}
            >
              <div
                className={styles.subscriptionActions}
                role="group"
                aria-label="Действия с подпиской"
              >
                <Button
                  className={styles.subscriptionPrimary}
                  onClick={showIntegrationNotice}
                >
                  Добавить подписку
                </Button>
                <div className={styles.subscriptionSecondary}>
                  <Button
                    variant="secondary"
                    onClick={showIntegrationNotice}
                  >
                    Скопировать ссылку
                  </Button>
                  <Button
                    variant="ghost"
                    aria-expanded={qrVisible}
                    aria-controls={qrPreviewId}
                    onClick={toggleQr}
                  >
                    {qrVisible ? 'Скрыть QR' : 'Показать QR'}
                  </Button>
                </div>
                {feedback ? (
                  <StatusNotice tone={feedback.tone}>{feedback.message}</StatusNotice>
                ) : null}
              </div>
              {qrVisible ? <DecorativeQr id={qrPreviewId} /> : null}
            </div>
          </div>
        </section>

        <InstructionAccordion appName={app.name} steps={app.steps} />
      </div>

      {showArtwork ? (
        <div className={styles.art}>
          <RotatingIllustration
            slotId="account.connection.aside"
            className={styles.connectionIllustration}
            sizes="(max-width: 1080px) 100vw, 34vw"
          />
        </div>
      ) : null}
    </section>
  );
}
