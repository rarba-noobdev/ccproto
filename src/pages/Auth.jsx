import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import useStore from '@/store/useStore'

const easeOut = [0.23, 1, 0.32, 1]

export default function Auth() {
  const [email, setEmail] = useState('admin@challengercomputers.in')
  const [name, setName] = useState('Admin')
  const reduceMotion = useReducedMotion()
  const { login } = useStore()
  const navigate = useNavigate()

  const submit = (event) => {
    event?.preventDefault()
    login({ email, name })
    navigate(email.includes('admin') ? '/admin' : '/dashboard')
  }

  return (
    <RetailLayout>
      <PageHeader
        kicker="Account"
        title="Sign in."
        description="Access saved builds, carts, and orders."
      />
      <section className="container-max relative grid place-items-center py-64">
        <div className="heat-orb pointer-events-none absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', opacity: 0.4 }} aria-hidden="true" />
        <motion.form
          onSubmit={submit}
          className="relative w-full max-w-[420px] border border-border-muted bg-surface-1 p-28"
          initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <motion.p
            className="meta mb-20"
            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.18 }}
          >
            Demo account
          </motion.p>
          {[
            { id: 'name', label: 'Name', type: 'text', value: name, onChange: setName, autoComplete: 'name' },
            { id: 'email', label: 'Email', type: 'email', value: email, onChange: setEmail, autoComplete: 'email' },
          ].map((field, i) => (
            <motion.label
              key={field.id}
              className="mb-16 grid gap-8 text-body-small font-semibold"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.25 + i * 0.08 }}
            >
              {field.label}
              <input
                className="input-base"
                name={field.id}
                type={field.type}
                inputMode={field.type === 'email' ? 'email' : undefined}
                autoComplete={field.autoComplete}
                spellCheck={false}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required
              />
            </motion.label>
          ))}
          <motion.button
            type="submit"
            className="btn-primary magnetic w-full"
            data-tone="heat"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.45 }}
          >
            Sign in
          </motion.button>
          <p className="meta mt-20 text-center">Admins are routed to /admin</p>
        </motion.form>
      </section>
    </RetailLayout>
  )
}
