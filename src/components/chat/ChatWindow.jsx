import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Send,
  Paperclip,
  Phone,
  ExternalLink,
  CheckCheck,
  Smile,
  ShieldCheck,
  Calendar,
} from 'lucide-react'
import Avatar from '../common/Avatar'
import { useAuth } from '../../context/AuthContext'
import notify from '../common/Toast'

export default function ChatWindow({ chat, onBack }) {
  const { sendMessage } = useAuth()
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat?.messages, isTyping])

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8 text-center">
        <div>
          <p className="text-sm font-semibold text-gray-700">Select a conversation</p>
          <p className="text-xs text-gray-400 mt-1">
            Choose a PG owner from the left list to view your chat
          </p>
        </div>
      </div>
    )
  }

  const handleSend = (e) => {
    e?.preventDefault()
    if (!inputText.trim()) return

    const sentText = inputText.trim()
    sendMessage(chat.id, sentText, 'student')
    setInputText('')

    // Simulate owner typing & response after 1.5s
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const cannedReplies = [
        'Sure, let me check the bed status! Yes, 1 single bed is currently open. Would you like to schedule a visit?',
        'Yes, WiFi is 100 Mbps fiber optic and electricity backup is 24/7. Food is served 3 times daily.',
        'Deposit is 2 months rent, fully refundable on checkout with 1 month notice.',
        'You can visit anytime between 10 AM to 7 PM. I will keep the room unlocked for you.',
      ]
      const randomReply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)]
      sendMessage(chat.id, randomReply, 'owner')
    }, 1500)
  }

  const sendQuickQuestion = (question) => {
    setInputText(question)
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="px-6 py-3.5 bg-white border-b border-gray-200 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden text-xs text-primary-600 font-bold mr-1"
            >
              ← Back
            </button>
          )}
          <Avatar
            src={chat.ownerAvatar}
            name={chat.ownerName}
            size="md"
            online={chat.online}
            verified={true}
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900">{chat.ownerName}</h3>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified Host
              </span>
            </div>
            <Link
              to={`/listing/${chat.pgId}`}
              className="text-xs text-primary-600 hover:underline flex items-center gap-1 font-medium"
            >
              <span>{chat.pgName}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/listing/${chat.pgId}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </Link>
          <a
            href="tel:+919876543210"
            className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors"
            title="Call Owner"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Safety Notice */}
        <div className="max-w-md mx-auto p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-[11px] text-amber-800 text-center">
          <p className="font-semibold">🔒 BASERA Safe Chat Guarantee</p>
          <p className="text-amber-700/80 mt-0.5">
            Never pay token amounts before physically visiting the room. Verified owners never ask for money via UPI QR codes in chat.
          </p>
        </div>

        {chat.messages?.map((msg, index) => {
          const isMe = msg.from === 'student'
          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <Avatar
                  src={chat.ownerAvatar}
                  name={chat.ownerName}
                  size="xs"
                />
              )}
              <div
                className={`max-w-[75%] sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-xs ${
                  isMe
                    ? 'bg-primary-600 text-white rounded-br-xs'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${
                    isMe ? 'text-blue-100' : 'text-gray-400'
                  }`}
                >
                  <span>{msg.time}</span>
                  {isMe && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-400 text-xs pl-2">
            <span className="font-medium text-gray-500">{chat.ownerName} is typing</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggested Chips */}
      <div className="px-4 py-2 bg-white/70 border-t border-gray-100 flex gap-2 overflow-x-auto text-xs whitespace-nowrap">
        <button
          onClick={() => sendQuickQuestion('Is single bed room available right now?')}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full cursor-pointer transition-colors"
        >
          🛏️ Is single bed available?
        </button>
        <button
          onClick={() => sendQuickQuestion('Can I schedule a visit tomorrow at 2 PM?')}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full cursor-pointer transition-colors"
        >
          📅 Visit tomorrow 2 PM?
        </button>
        <button
          onClick={() => sendQuickQuestion('What is the security deposit amount?')}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full cursor-pointer transition-colors"
        >
          💰 What is the deposit?
        </button>
      </div>

      {/* Input Field */}
      <form
        onSubmit={handleSend}
        className="p-3 sm:p-4 bg-white border-t border-gray-200 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => notify.info('Attachment mock: Images can be shared with owner')}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 cursor-pointer"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask owner about available beds, amenities, or schedule visit..."
          className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white rounded-xl shadow-md transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
