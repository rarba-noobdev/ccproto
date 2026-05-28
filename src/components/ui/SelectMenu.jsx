import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import useDismissable from '@/hooks/useDismissable'

const easeOut = [0.23, 1, 0.32, 1]

export default function SelectMenu({ ariaLabel, className = '', icon: Icon, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState(() => Math.max(0, options.findIndex((option) => option.value === value)))
  const reduceMotion = useReducedMotion()
  const listboxId = useId()
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const optionRefs = useRef([])
  const selected = options.find((option) => option.value === value) || options[0]

  useDismissable({ open, onDismiss: () => setOpen(false), containerRef: rootRef })

  useEffect(() => {
    if (!open) return
    const next = Math.max(0, options.findIndex((option) => option.value === value))
    setFocusIndex(next)
  }, [open, options, value])

  useEffect(() => {
    if (!open) return
    optionRefs.current[focusIndex]?.focus({ preventScroll: true })
  }, [open, focusIndex])

  const choose = (nextValue) => {
    onChange(nextValue)
    setOpen(false)
    buttonRef.current?.focus({ preventScroll: true })
  }

  const onTriggerKey = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  const onListKey = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setFocusIndex((index) => (index + 1) % options.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setFocusIndex((index) => (index - 1 + options.length) % options.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setFocusIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setFocusIndex(options.length - 1)
    } else if (event.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        className={`select-trigger ${open ? 'select-trigger-open' : ''}`}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onTriggerKey}
      >
        {Icon && <Icon className="h-14 w-14 text-ink-muted" aria-hidden="true" />}
        <span className="min-w-0 truncate">{selected?.label}</span>
        <ChevronDown className={`ml-auto h-14 w-14 text-ink-muted transition-transform duration-4 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            tabIndex={-1}
            onKeyDown={onListKey}
            className="select-menu"
            initial={reduceMotion ? false : { opacity: 0, filter: 'blur(3px)', transform: 'translateY(-6px) scale(.985)' }}
            animate={{ opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px) scale(1)' }}
            exit={{ opacity: 0, filter: 'blur(2px)', transform: 'translateY(-4px) scale(.99)' }}
            transition={{ duration: 0.16, ease: easeOut }}
          >
            {options.map((option, index) => {
              const active = option.value === value
              return (
                <li key={option.value} role="presentation">
                  <button
                    ref={(node) => { optionRefs.current[index] = node }}
                    type="button"
                    role="option"
                    aria-selected={active}
                    tabIndex={focusIndex === index ? 0 : -1}
                    className={`select-option ${active ? 'select-option-active' : ''}`}
                    onClick={() => choose(option.value)}
                    onFocus={() => setFocusIndex(index)}
                  >
                    <span className="truncate">{option.label}</span>
                    {active && <Check className="h-16 w-16" aria-hidden="true" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
