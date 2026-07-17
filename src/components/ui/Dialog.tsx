'use client';

import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import styles from './ui.module.css';

const focusableSelector = [
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function Dialog({
  open,
  title,
  busy = false,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  busy?: boolean;
  onClose(): void;
  children: ReactNode;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const firstField = panel?.querySelector<HTMLElement>(
      'input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
    );
    const firstControl = panel?.querySelector<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );
    (firstField ?? firstControl ?? panel)?.focus();

    function getControls() {
      return panel
        ? [...panel.querySelectorAll<HTMLElement>(focusableSelector)]
        : [];
    }

    function containFocus(event: FocusEvent) {
      if (event.target instanceof Node && !panel?.contains(event.target)) {
        getControls()[0]?.focus();
      }
    }

    function containKeyboard(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const controls = getControls();
      const first = controls[0];
      const last = controls.at(-1);
      const activeIsInside =
        document.activeElement instanceof Node &&
        Boolean(panel?.contains(document.activeElement));

      if (!activeIsInside) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener('focusin', containFocus, true);
    document.addEventListener('keydown', containKeyboard, true);

    return () => {
      document.removeEventListener('focusin', containFocus, true);
      document.removeEventListener('keydown', containKeyboard, true);
      previousFocus.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <dialog
        ref={panelRef}
        open
        className={styles.dialog}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-busy={busy}
        onCancel={(event) => {
          event.preventDefault();
          onClose();
        }}
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Закрыть"
          onClick={onClose}
        >
          <X aria-hidden="true" />
        </button>
        <h2 id={titleId}>{title}</h2>
        {children}
      </dialog>
    </div>
  );
}
