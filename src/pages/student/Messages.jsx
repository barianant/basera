import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import ChatList from '../../components/chat/ChatList'
import ChatWindow from '../../components/chat/ChatWindow'
import { useAuth } from '../../context/AuthContext'
import { listings } from '../../data/listings'

export default function StudentMessages() {
  const [searchParams] = useSearchParams()
  const pgParam = searchParams.get('pg')
  const { chats } = useAuth()

  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || 'c1')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileShowChat, setMobileShowChat] = useState(false)

  // If redirected with ?pg=id, select or create matching chat
  useEffect(() => {
    if (pgParam) {
      const existing = chats.find((c) => c.pgId === pgParam)
      if (existing) {
        setActiveChatId(existing.id)
        setMobileShowChat(true)
      } else {
        const pg = listings.find((l) => l.id === pgParam)
        if (pg) {
          setActiveChatId('c1')
          setMobileShowChat(true)
        }
      }
    }
  }, [pgParam, chats])

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0]

  const handleSelectChat = (id) => {
    setActiveChatId(id)
    setMobileShowChat(true)
  }

  return (
    <DashboardLayout
      title="Direct Messages"
      subtitle="Chat with verified PG owners without sharing personal contact info"
    >
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm h-[680px] flex">
        {/* Left Conversation List (Hidden on mobile when chat is active) */}
        <div
          className={`w-full md:w-80 lg:w-96 shrink-0 h-full ${
            mobileShowChat ? 'hidden md:block' : 'block'
          }`}
        >
          <ChatList
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Right Chat Window (Hidden on mobile when conversation list is visible) */}
        <div
          className={`flex-1 h-full flex flex-col ${
            !mobileShowChat ? 'hidden md:flex' : 'flex'
          }`}
        >
          <ChatWindow
            chat={activeChat}
            onBack={() => setMobileShowChat(false)}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
