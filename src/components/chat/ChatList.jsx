import React from 'react'
import { Search, CheckCheck } from 'lucide-react'
import Avatar from '../common/Avatar'

export default function ChatList({
  chats = [],
  activeChatId,
  onSelectChat,
  searchQuery,
  setSearchQuery,
}) {
  const filteredChats = chats.filter(
    (c) =>
      c.pgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Search Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PG owners or messages..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => {
            const isSelected = chat.id === activeChatId
            return (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full p-4 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                  isSelected ? 'bg-blue-50/80 border-l-4 border-primary-600' : 'hover:bg-gray-50'
                }`}
              >
                <Avatar
                  src={chat.ownerAvatar}
                  name={chat.ownerName}
                  size="md"
                  online={chat.online}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {chat.ownerName}
                    </p>
                    <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-primary-600 truncate mb-1">
                    {chat.pgName}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="shrink-0 w-4 h-4 bg-primary-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="p-8 text-center text-xs text-gray-400">
            No matching conversations
          </div>
        )}
      </div>
    </div>
  )
}
