import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import LoadingScreen from '@/components/ui/LoadingScreen'
import CartDrawer from '@/components/ui/CartDrawer'
import Home from '@/pages/Home'
import BuildPC from '@/pages/BuildPC'
import Prebuilt from '@/pages/Prebuilt'
import GamingPCs from '@/pages/GamingPCs'
import Workstations from '@/pages/Workstations'
import Accessories from '@/pages/Accessories'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Blog from '@/pages/Blog'
import Auth from '@/pages/Auth'
import UserDashboard from '@/pages/UserDashboard'
import AdminDashboard from '@/pages/AdminDashboard'

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
)

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#11111c',
            color: '#fff',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '12px',
            fontFamily: 'Space Grotesk, sans-serif',
          },
        }}
      />
      <CartDrawer />

      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/build" element={<PageWrapper><BuildPC /></PageWrapper>} />
            <Route path="/prebuilt" element={<PageWrapper><Prebuilt /></PageWrapper>} />
            <Route path="/gaming-pcs" element={<PageWrapper><GamingPCs /></PageWrapper>} />
            <Route path="/workstations" element={<PageWrapper><Workstations /></PageWrapper>} />
            <Route path="/accessories" element={<PageWrapper><Accessories /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
            <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
            <Route path="/dashboard" element={<PageWrapper><UserDashboard /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      )}
    </>
  )
}
