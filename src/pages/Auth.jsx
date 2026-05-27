import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react'
import useStore from '@/store/useStore'
import ParticleBackground from '@/components/ui/ParticleBackground'
import Navbar from '@/components/layout/Navbar'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    login({ name: form.name || 'Gaming Pro', email: form.email, avatar: null })
    setLoading(false)
    navigate('/')
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    login({ name: 'Google User', email: 'user@gmail.com', avatar: null })
    setLoading(false)
    navigate('/')
  }

  const handleAdminLogin = () => {
    login({ name: 'Admin', email: 'admin@nexforge.com', avatar: null })
    navigate('/admin')
  }

  const input = 'w-full bg-void-200 border border-white/10 rounded-8 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-heat-100/60 transition-all focus-visible:ring-2 focus-visible:ring-heat-100'

  return (
    <div className="min-h-screen bg-void relative overflow-hidden flex flex-col">
      <Navbar />
      <ParticleBackground count={40} className="opacity-40" />
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-12 relative">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Card */}
          <div className="glass border border-border-muted rounded-16 p-8 shadow-elevated">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-heat-100/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-heat-100" />
                </div>
              </div>
              <h1 className="font-display font-black text-2xl text-white">
                {mode === 'login' ? 'Welcome Back' : 'Join NexForge'}
              </h1>
              <p className="text-white/40 text-sm mt-1">
                {mode === 'login' ? 'Sign in to your account' : 'Create your account to start building'}
              </p>
            </div>

            {/* Mode toggle */}
            <div className="flex bg-void-300 rounded-xl p-1 mb-6">
              {['login', 'register'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-lg font-heading font-semibold text-sm capitalize transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 ${
                    mode === m
                      ? 'bg-gradient-to-r from-heat-100 to-accent-amethyst text-white shadow-glow-heat'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {m === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full btn-ghost justify-center mb-5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"
            >
              <Chrome className="w-4 h-4" />
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-white/25 text-xs font-mono">OR</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${input} pl-11`}
                    required={mode === 'register'}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`${input} pl-11`}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`${input} pl-11 pr-11`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {mode === 'login' && (
                <div className="text-right">
                  <button type="button" className="text-xs text-heat-100/70 hover:text-heat-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary justify-center py-3.5 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </button>
            </form>

            {/* Admin shortcut */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <button
                onClick={handleAdminLogin}
                className="w-full text-xs text-white/20 hover:text-white/40 transition-colors font-mono text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded py-1"
              >
                [DEV] Login as Admin →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
