'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ArtBriefCard } from '@/src/components/art/ArtBriefCard';
import { Button } from '@/src/components/ui/Button';
import { StatusNotice } from '@/src/components/ui/StatusNotice';
import { getPlatform, platforms } from '@/src/content/connection';
import type { PlatformId } from '@/src/lib/domain';
import { InstructionAccordion } from './InstructionAccordion';
import { DecorativeQr } from './DecorativeQr';
import styles from './ConnectionWizard.module.css';

interface Feedback {
  message: string;
  tone: 'info' | 'error';
}

export function ConnectionWizard() {
  const [platformId, setPlatformId] = useState<PlatformId>('ios');
  const platform = getPlatform(platformId);
  const [appId, setAppId] = useState(platform.apps[0].id);
  const app =
    platform.apps.find((candidate) => candidate.id === appId) ?? platform.apps[0];
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function changePlatform(next: PlatformId) {
    const nextPlatform = getPlatform(next);
    setPlatformId(next);
    setAppId(nextPlatform.apps[0].id);
    setFeedback(null);
  }

  function showIntegrationNotice() {
    setFeedback({
      message: 'Ключ подключения и QR появятся после интеграции.',
      tone: 'info',
    });
  }

  return (
    <section className={styles.wizard} aria-labelledby="wizard-title">
      <div className={styles.controls}>
        <div className={styles.heading}>
          <p className="eyebrow">Установка</p>
          <h3 id="wizard-title" tabIndex={-1}>
            Подключить устройство
          </h3>
          <p>
            Выберите платформу и приложение. Ключ появится только после
            подключения действующей системы подписок.
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
                setFeedback(null);
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
            <h4 id="download-title">Установите приложение</h4>
            <p>{app.note}</p>
            <a href={app.downloadUrl} target="_blank" rel="noreferrer">
              Скачать {app.name}
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className={styles.stage} aria-labelledby="add-title">
          <span className={styles.stageNumber} aria-hidden="true">
            02
          </span>
          <div>
            <h4 id="add-title">Добавьте подписку</h4>
            <p>Основной способ, резервная ссылка или защищённый QR.</p>
            <div className={styles.subscriptionPreview}>
              <div>
                <div className={styles.actions}>
                  <Button onClick={showIntegrationNotice}>Добавить подписку</Button>
                  <Button
                    variant="secondary"
                    onClick={showIntegrationNotice}
                  >
                    Скопировать ссылку
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={showIntegrationNotice}
                  >
                    Показать QR
                  </Button>
                </div>
                {feedback ? (
                  <StatusNotice tone={feedback.tone}>{feedback.message}</StatusNotice>
                ) : null}
              </div>
              <DecorativeQr />
            </div>
          </div>
        </section>

        <InstructionAccordion appName={app.name} steps={app.steps} />
      </div>

      <div className={styles.art}>
        <ArtBriefCard
          scene="Подключение"
          action="Носок протягивает одну нить от кабинета к выбранному устройству"
          emotion="Сосредоточенная дружелюбность"
          background="Светлое техническое поле без киберпанка"
          aspect="16:10"
          transparency="Маскот и нить на прозрачном фоне"
          desktopCrop="Инструкция слева, маскот справа"
          mobileCrop="Вертикальный маскот после выбора приложения"
        />
      </div>
    </section>
  );
}
