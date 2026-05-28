import { useEffect } from 'react'

export default function useDismissable({ open, onDismiss, containerRef, ignorePointerDown = false }) {
  useEffect(() => {
    if (!open) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') onDismiss()
    }
    const onPointer = (event) => {
      if (ignorePointerDown) return
      if (containerRef?.current && !containerRef.current.contains(event.target)) onDismiss()
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [open, onDismiss, containerRef, ignorePointerDown])
}
