import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'

const easeOut = [0.23, 1, 0.32, 1]

export default function SelectMenu({ ariaLabel, className = '', icon: Icon, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const id = useId()
  const rootRef = useRef(null)
  const selected = options.find((option) => option.value === value) || options[0]

  useEffect(() => {
    if (!open) return undefined

    const close = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const closeOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false)
    }

    window.addEventListener('keydown', close)
    window.addEventListener('pointerdown', closeOutside)
    return () => {
      window.removeEventListener('keydown', close)
      window.removeEventListener('pointerdown', closeOutside)
    }
  }, [open])

  const choose = (nextValue) => {
    onChange(nextValue)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        className={`select-trigger ${open ? 'select-trigger-open' : ''}`}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
      >
        {Icon && <Icon className="h-4 w-4 muted" aria-hidden="true" />}
        <span className="min-w-0 truncate">{selected?.label}</span>
        <ChevronDown className={`ml-auto h-4 w-4 text-[var(--ink-muted)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            role="listbox"
            className="select-menu"
            initial={reduceMotion ? false : { opacity: 0, filter: 'blur(3px)', transform: 'translateY(-6px) scale(.985)' }}
            animate={{ opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px) scale(1)' }}
            exit={{ opacity: 0, filter: 'blur(2px)', transform: 'translateY(-4px) scale(.99)' }}
            transition={{ duration: 0.16, ease: easeOut }}
          >
            {options.map((option) => {
              const active = option.value === value
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`select-option ${active ? 'select-option-active' : ''}`}
                  onClick={() => choose(option.value)}
                >
                  <span className="truncate">{option.label}</span>
                  {active && <Check className="h-4 w-4" aria-hidden="true" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
