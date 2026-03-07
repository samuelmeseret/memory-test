"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200/60">
        <div className="p-8">
          <h2 id="confirm-title" className="text-2xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">{message}</p>
        </div>
        <div className="flex flex-col gap-3 bg-slate-50 p-6 sm:flex-row-reverse sm:p-8">
          <button
            onClick={onConfirm}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-red-600 px-6 text-xl font-bold text-white shadow-md shadow-red-900/20 transition-all hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-[0.98] sm:w-auto"
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-white px-6 text-xl font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 transition-all hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 active:scale-[0.98] sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
