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

  const submit = () => {
    login({ email, name })
    navigate(email.includes('admin') ? '/admin' : '/dashboard')
  }

  return (
    <RetailLayout>
      <PageHeader
        kicker="Account"
        title="Sign in to manage builds, carts, and admin tools"
        description="Demo authentication is wired to local Zustand state. Admin email opens the operations dashboard."
      />
      <section className="container-max grid place-items-center py-12">
        <div className="panel w-full max-w-md rounded-2xl p-6">
          <label className="mb-4 grid gap-2 text-sm font-bold">Name<input className="input-base" value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label className="mb-5 grid gap-2 text-sm font-bold">Email<input className="input-base" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <button onClick={submit} className="btn-primary w-full">Continue</button>
        </div>
      </section>
    </RetailLayout>
  )
}
