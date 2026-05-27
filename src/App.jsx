import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import CartDrawer from '@/components/ui/CartDrawer'
import ErrorBoundary from '@/components/ErrorBoundary'
import Home from '@/pages/Home'
import BuildPC from '@/pages/BuildPC'
import Prebuilt from '@/pages/Prebuilt'
import GamingPCs from '@/pages/GamingPCs'
import Workstations from '@/pages/Workstations'
import Accessories from '@/pages/Accessories'
import CategoryShop from '@/pages/CategoryShop'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Blog from '@/pages/Blog'
import Auth from '@/pages/Auth'
import UserDashboard from '@/pages/UserDashboard'
import AdminDashboard from '@/pages/AdminDashboard'

const PageWrapper = ({ children }) => (
  <motion.div
    id="main-content"
    tabIndex={-1}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.22 }}
  >
    {children}
  </motion.div>
)

export default function App() {
  const location = useLocation()

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111318',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
          },
        }}
      />
      <CartDrawer />
      <ErrorBoundary resetKey={location.pathname}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/build" element={<PageWrapper><BuildPC /></PageWrapper>} />
            <Route path="/prebuilt" element={<PageWrapper><Prebuilt /></PageWrapper>} />
            <Route path="/gaming-pcs" element={<PageWrapper><GamingPCs /></PageWrapper>} />
            <Route path="/workstations" element={<PageWrapper><Workstations /></PageWrapper>} />
            <Route path="/accessories" element={<PageWrapper><Accessories /></PageWrapper>} />
            <Route path="/category/:category" element={<PageWrapper><CategoryShop /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
            <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
            <Route path="/dashboard" element={<PageWrapper><UserDashboard /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
    </>
  )
}
