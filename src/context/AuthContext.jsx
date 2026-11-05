import React, { createContext, useContext, useState, useEffect } from 'react'
import { notifications as initialNotifications, chatMessages as initialChats } from '../data/listings'

const AuthContext = createContext(null)

const DEMO_STUDENT = {
  id: 'student_1',
  name: 'Rahul Verma',
  email: 'rahul.verma@coep.ac.in',
  role: 'student',
  college: 'College of Engineering Pune (COEP)',
  course: 'B.Tech Computer Engineering (3rd Year)',
  phone: '+91 98234 56789',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
  budget: '₹6,000 - ₹10,000',
  gender: 'Male',
  preferredArea: 'Shivajinagar, Pune',
  moveInDate: '2025-07-01',
  verified: true,
}

const DEMO_OWNER = {
  id: 'owner_1',
  name: 'Ramesh Sharma',
  businessName: 'Urban Nest & Comfort Stays Group',
  email: 'ramesh.sharma@urbannest.in',
  role: 'owner',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  city: 'Mumbai',
  rating: 4.9,
  verified: true,
  activeListingsCount: 3,
  totalBedsManaged: 36,
  occupiedBeds: 29,
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('basera_user')
      return saved ? JSON.parse(saved) : DEMO_STUDENT // default to student for instant hackathon showcase
    } catch {
      return DEMO_STUDENT
    }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('basera_wishlist')
      return saved ? JSON.parse(saved) : ['1', '3', '5']
    } catch {
      return ['1', '3', '5']
    }
  })

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('basera_bookings')
      return saved ? JSON.parse(saved) : [
        {
          id: 'bkg-101',
          pgId: '1',
          pgName: 'Urban Nest PG',
          college: 'VJTI Mumbai',
          date: 'Tomorrow, 2:30 PM',
          status: 'Confirmed',
          tokenNumber: 'BSR-7821',
          rent: 8500,
          roomType: 'Single Bed AC',
          address: 'Matunga West, Mumbai',
          ownerName: 'Ramesh Sharma',
          ownerPhone: '+91 98765 43210',
          image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        },
        {
          id: 'bkg-102',
          pgId: '2',
          pgName: 'Comfort Stay PG',
          college: 'COEP Pune',
          date: 'Saturday, 11:00 AM',
          status: 'Pending',
          tokenNumber: 'BSR-6590',
          rent: 6500,
          roomType: 'Double Sharing Non-AC',
          address: 'Shivajinagar, Pune',
          ownerName: 'Sunita Patil',
          ownerPhone: '+91 94220 12345',
          image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        }
      ]
    } catch {
      return []
    }
  })

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('basera_notifications')
      return saved ? JSON.parse(saved) : initialNotifications
    } catch {
      return initialNotifications
    }
  })

  const [chats, setChats] = useState(() => {
    try {
      const saved = localStorage.getItem('basera_chats')
      return saved ? JSON.parse(saved) : initialChats
    } catch {
      return initialChats
    }
  })

  useEffect(() => {
    localStorage.setItem('basera_user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('basera_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('basera_bookings', JSON.stringify(bookings))
  }, [bookings])

  useEffect(() => {
    localStorage.setItem('basera_notifications', JSON.stringify(notifications))
  }, [notifications])

  useEffect(() => {
    localStorage.setItem('basera_chats', JSON.stringify(chats))
  }, [chats])

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const isWishlisted = (id) => wishlist.includes(id)

  const loginAs = (role) => {
    if (role === 'owner') {
      setUser(DEMO_OWNER)
    } else {
      setUser(DEMO_STUDENT)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const addBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev])
  }

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const sendMessage = (chatId, text, sender = 'student') => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          lastMessage: text,
          timestamp: 'Just now',
          messages: [
            ...chat.messages,
            { from: sender, text, time: timeNow }
          ]
        }
      }
      return chat
    }))
  }

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loginAs,
      logout,
      wishlist,
      toggleWishlist,
      isWishlisted,
      bookings,
      addBooking,
      notifications,
      markAllNotificationsRead,
      chats,
      sendMessage,
      DEMO_STUDENT,
      DEMO_OWNER
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

