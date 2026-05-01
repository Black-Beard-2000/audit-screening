'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
      </div>
      <span className="ml-3 text-purple-600 text-sm">Processing your results...</span>
    </div>
  )
}