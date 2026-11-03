import React, { useState } from 'react'
import OwnerDashboardLayout from '../../components/layout/OwnerDashboardLayout'
import ChatList from '../../components/chat/ChatList'
import ChatWindow from '../../components/chat/ChatWindow'
import { useAuth } from '../../context/AuthContext'

export default function OwnerMessages() {
  const { chats } = useAuth()
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || 'c1')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileShowChat, setMobileShowChat] = useState(false)

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0]

  const handleSelectChat = (id) => {
    setActiveChatId(id)
    setMobileShowChat(true)
  }

  return (
    <OwnerDashboardLayout
      title="Student Inquiries & Leads"
      subtitle="Respond directly to students asking about vacancies and walkthrough visits"
    >
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm h-[680px] flex">
        {/* Left Inquiries List */}
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

        {/* Right Chat Window */}
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
    </OwnerDashboardLayout>
  )
}
