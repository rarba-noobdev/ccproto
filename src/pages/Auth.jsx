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
        title="Sign in"
        description="Saved builds, carts, and operations tools."
      />
      <section className="container-max grid place-items-center py-12">
        <form onSubmit={submit} className="w-full max-w-md rounded-[30px] border border-[var(--line)] bg-[var(--surface-1)] p-2 shadow-[0_18px_50px_rgba(38,38,38,.09)]">
          <div className="rounded-[24px] bg-[var(--surface-2)] p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--ink)] text-sm font-black text-[var(--canvas)]">CC</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black muted">Demo</span>
            </div>
            <label className="mb-4 grid gap-2 text-sm font-black">Name<input className="input-base bg-white" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} /></label>
            <label className="mb-5 grid gap-2 text-sm font-black">Email<input className="input-base bg-white" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          </div>
          <button type="submit" className="btn-primary w-full">Sign In</button>
        </form>
      </section>
    </RetailLayout>
  )
}
