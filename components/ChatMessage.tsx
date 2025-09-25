'use client'

import { Message } from '@/stores/useScreeningStore'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: Message
  isLatest?: boolean
}

export default function ChatMessage({ message, isLatest = false }: ChatMessageProps) {
  const isBot = message.type === 'bot'
  
  return (
    <div 
      className={cn(
        "flex mb-4 animate-in slide-in-from-bottom-2 duration-300",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl shadow-sm",
          "whitespace-pre-wrap text-sm sm:text-base leading-relaxed",
          isBot 
            ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 rounded-bl-sm border border-blue-200" 
            : "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-sm",
          isLatest && "animate-pulse"
        )}
      >
        {message.content}
      </div>
    </div>
  )
}