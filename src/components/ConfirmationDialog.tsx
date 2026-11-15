import { useCallback, useEffect, useId, useRef, useState } from "react";

type Confirmation = {
  title: string;
  description: string;
  confirmLabel: string;
};

// Keep confirmation in the renderer on every platform. Electron's native
// window.confirm can terminate a headless process before an answer is returned.
export function useConfirmationDialog() {
  const [request, setRequest] = useState<Confirmation | null>(null);
  const pending = useRef<{
    resolve: (accepted: boolean) => void;
    trigger: HTMLElement | null;
  } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const id = useId();

  const finish = useCallback((accepted: boolean) => {
    const current = pending.current;
    if (!current) return;
    // Clear the resolver synchronously so repeated clicks settle only once.
    pending.current = null;
    dialog.current?.close();
    setRequest(null);
    // Callers may disable the trigger until this promise settles. Restore after
    // their state update, and never steal focus from a newly opened dialog.
    requestAnimationFrame(() => {
      if (current.trigger?.isConnected && !dialog.current?.open)
        current.trigger.focus();
    });
    current.resolve(accepted);
  }, []);

  const confirm = useCallback(
    (options: Confirmation, trigger?: HTMLElement | null) => {
      if (pending.current) return Promise.resolve(false);
      return new Promise<boolean>((resolve) => {
        pending.current = {
          resolve,
          trigger:
            trigger ??
            (document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null),
        };
        setRequest(options);
      });
    },
    [],
  );

  useEffect(() => {
    if (!request) return;
    dialog.current?.showModal();
    cancel.current?.focus();
  }, [request]);

  useEffect(
    () => () => {
      const current = pending.current;
      pending.current = null;
      current?.resolve(false);
    },
    [],
  );

  const confirmationDialog = (
    <dialog
      ref={dialog}
      className="reset-dialog panel confirmation-dialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onCancel={(event) => {
        event.preventDefault();
        finish(false);
      }}
      onClose={() => {
        if (!dialog.current?.open) finish(false);
      }}
    >
      <h2 id={`${id}-title`}>{request?.title}</h2>
      <p id={`${id}-description`}>{request?.description}</p>
      <div className="dialog-actions">
        <button
          className="secondary"
          ref={cancel}
          onClick={() => finish(false)}
        >
          Vazgeç
        </button>
        <button className="primary" onClick={() => finish(true)}>
          {request?.confirmLabel}
        </button>
      </div>
    </dialog>
  );

  return { confirm, confirmationDialog };
}
