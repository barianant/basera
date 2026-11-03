import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'

// Pages
import Home from './pages/Home'
import Search from './pages/Search'
import ListingDetail from './pages/ListingDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Help from './pages/Help'
import NotFound from './pages/NotFound'

// Student Pages
import StudentDashboard from './pages/student/Dashboard'
import StudentWishlist from './pages/student/Wishlist'
import StudentBookings from './pages/student/Bookings'
import StudentProfile from './pages/student/Profile'
import StudentMessages from './pages/student/Messages'
import StudentNotifications from './pages/student/Notifications'

// Owner Pages
import OwnerDashboard from './pages/owner/Dashboard'
import OwnerListings from './pages/owner/Listings'
import OwnerAddProperty from './pages/owner/AddProperty'
import OwnerProfile from './pages/owner/Profile'
import OwnerMessages from './pages/owner/Messages'

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Page transition wrapper
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public Marketing & Discovery */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
        <Route path="/listing/:id" element={<PageTransition><ListingDetail /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/help" element={<PageTransition><Help /></PageTransition>} />

        {/* Student Dashboard Portal */}
        <Route path="/student/dashboard" element={<PageTransition><StudentDashboard /></PageTransition>} />
        <Route path="/student/wishlist" element={<PageTransition><StudentWishlist /></PageTransition>} />
        <Route path="/student/bookings" element={<PageTransition><StudentBookings /></PageTransition>} />
        <Route path="/student/profile" element={<PageTransition><StudentProfile /></PageTransition>} />
        <Route path="/student/messages" element={<PageTransition><StudentMessages /></PageTransition>} />
        <Route path="/student/notifications" element={<PageTransition><StudentNotifications /></PageTransition>} />

        {/* PG Owner Business Hub */}
        <Route path="/owner/dashboard" element={<PageTransition><OwnerDashboard /></PageTransition>} />
        <Route path="/owner/listings" element={<PageTransition><OwnerListings /></PageTransition>} />
        <Route path="/owner/add-property" element={<PageTransition><OwnerAddProperty /></PageTransition>} />
        <Route path="/owner/profile" element={<PageTransition><OwnerProfile /></PageTransition>} />
        <Route path="/owner/messages" element={<PageTransition><OwnerMessages /></PageTransition>} />

        {/* 404 Fallback */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="top-right"
          gutter={8}
          toastOptions={{
            duration: 3500,
            style: {
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              borderRadius: '14px',
              padding: '12px 18px',
              boxShadow: '0 10px 30px -5px rgba(0,0,0,0.15)',
              fontWeight: '500',
            },
          }}
        />
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
