'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useScreeningStore } from '@/stores/useScreeningStore'
import ChatMessage from '@/components/ChatMessage'
import QuestionInput from '@/components/QuestionInput'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { RefreshCw, Clock } from 'lucide-react'

export default function Home() {
  const { 
    messages, 
    currentStep, 
    isLoading, 
    name, 
    email, 
    drink_type, 
    treatment_history, 
    totalScore,
    setCurrentStep,
    setLoading,
    addMessage,
    reset
  } = useScreeningStore()
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(scrollToBottom, [messages])
  
  // Handle submission when all questions are completed
  useEffect(() => {
    if (currentStep === 'submitting' && !isLoading) {
      return // Already processed
    }
    
    if (currentStep === 'submitting' && isLoading) {
      submitScreening()
    }
  }, [currentStep, isLoading])
  
  const submitScreening = async () => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          score: totalScore,
          drink_type,
          treatment_history
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit screening')
      }
      
      const result = await response.json()
      
      addMessage({
        type: 'bot',
        content: `✅ Success! Your personalized report has been sent to ${email}.\n\nYour screening score: ${totalScore}/40\nRisk category: ${result.zone}\n\nPlease check your email (including spam folder) within the next few minutes. The report includes personalized recommendations and helpful resources.\n\nThank you for taking this important step in understanding your relationship with alcohol.`
      })
      
      setCurrentStep('complete')
      setLoading(false)
      
    } catch (error) {
      console.error('Submission error:', error)
      addMessage({
        type: 'bot',
        content: 'I apologize, but there was an error sending your report. Please try again or contact support if the issue persists.'
      })
      setLoading(false)
    }
  }
  
  const shouldShowInput = currentStep !== 'complete' && currentStep !== 'submitting' && currentStep !== 'reminder'
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-purple-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Mind Vibes Logo"
                width={100}
                height={100}
                className="object-contain"
              />
              <div>
                <h1 className="text-4xl font-extrabold text-purple-900">Mind Vibes</h1>
                <p className="text-sm text-gray-600">Alcohol Screening Tool | Based on AUDIT Questionnaire | Confidential & Secure</p>

              </div>
            </div>
            
            {currentStep === 'complete' && (
              <Button
                onClick={reset}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                New Assessment
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
          {/* Chat Messages */}
          <div className="h-[60vh] sm:h-[65vh] overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-purple-50 to-white">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLatest={index === messages.length - 1}
                />
              ))}
              
              {currentStep === 'submitting' && isLoading && <LoadingSpinner />}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input Area */}
          {shouldShowInput && (
            <div className="border-t border-purple-100 p-4 sm:p-6 bg-white">
              <QuestionInput />
            </div>
          )}
        </div>
        
        {/* Footer Disclaimer */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-purple-800">
              <p className="font-medium mb-1">Important Disclaimer</p>
              <p>
                This screening tool is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. 
                Always consult with a qualified healthcare provider or addiction specialist for comprehensive evaluation and treatment recommendations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Privacy Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Your responses are confidential and securely stored. This assessment takes approximately 5-10 minutes to complete.
          </p>
        </div>
      </main>
    </div>
  )
}