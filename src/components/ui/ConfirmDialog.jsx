import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  destructive = false,
}) {
  const reduceMotion = useReducedMotion()
  const confirmRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => { if (event.key === 'Escape') onCancel?.() }
    window.addEventListener('keydown', onKey)
    confirmRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center p-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
        >
          <button type="button" className="absolute inset-0 bg-ink/40 backdrop-blur-sm" aria-label="Close dialog" onClick={onCancel} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="relative w-full max-w-[420px] border border-line-strong bg-surface-1 p-24"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="meta mb-12">Confirm</p>
            <h2 id="confirm-title" className="text-title-h5 font-semibold tracking-[-.02em]">{title}</h2>
            {description && <p className="mt-12 text-body-medium text-ink-soft">{description}</p>}
            <div className="mt-24 flex gap-8">
              <button type="button" onClick={onCancel} className="btn-secondary flex-1">{cancelLabel}</button>
              <button
                ref={confirmRef}
                type="button"
                onClick={onConfirm}
                className="btn-primary flex-1"
                data-tone={destructive ? 'heat' : undefined}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
