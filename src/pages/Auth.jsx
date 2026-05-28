import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import useStore from '@/store/useStore'

export default function Auth() {
  const [email, setEmail] = useState('admin@challengercomputers.in')
  const [name, setName] = useState('Admin')
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
      <section className="container-max grid place-items-center py-64">
        <form onSubmit={submit} className="w-full max-w-[420px] border border-border-muted bg-surface-1 p-28">
          <p className="meta mb-20">Demo account</p>
          <label className="mb-16 grid gap-8 text-body-small font-semibold">
            Name
            <input className="input-base" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="mb-24 grid gap-8 text-body-small font-semibold">
            Email
            <input className="input-base" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <button type="submit" className="btn-primary w-full" data-tone="heat">Sign in</button>
          <p className="meta mt-20 text-center">Admins are routed to /admin</p>
        </form>
      </section>
    </RetailLayout>
  )
}
