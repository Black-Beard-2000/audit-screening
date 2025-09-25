'use client'

import { useState } from 'react'
import { useScreeningStore } from '@/stores/useScreeningStore'
import { auditQuestions } from '@/lib/scoring'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function QuestionInput() {
  const { 
    currentStep, 
    currentQuestionIndex,
    setName, 
    setEmail, 
    setDrinkType, 
    setTreatmentHistory,
    recordAuditAnswer,
    addMessage,
    error,
    name
  } = useScreeningStore()
  
  const [inputValue, setInputValue] = useState('')
  
  const handleTextSubmit = (action: (value: string) => void) => {
    if (inputValue.trim()) {
      action(inputValue.trim())
      setInputValue('')
    }
  }
  
  const handleAuditAnswer = (score: number, text: string) => {
    addMessage({
      type: 'user',
      content: text
    })
    recordAuditAnswer(score)
  }
  
  // Text input for name and email
  if (currentStep === 'welcome' || currentStep === 'name' || currentStep === 'email') {
    const isWelcome = currentStep === 'welcome'
    const isEmail = currentStep === 'email'
    const placeholder = isWelcome ? 'Enter your name' : isEmail ? 'Enter your email address' : 'Enter your name'
    const action = isWelcome ? setName : isEmail ? setEmail : setName
    
    return (
      <div className="space-y-3">
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            type={isEmail ? 'email' : 'text'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1 text-base"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTextSubmit(action)
              }
            }}
            autoFocus
          />
          <Button 
            onClick={() => handleTextSubmit(action)}
            disabled={!inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Send
          </Button>
        </div>
      </div>
    )
  }
  
  // Button options for drink type
  if (currentStep === 'drink_type') {
    const drinkTypes = ['Beer', 'Wine', 'Liquor']
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {drinkTypes.map((type) => (
          <Button
            key={type}
            onClick={() => setDrinkType(type)}
            variant="outline"
            className="h-12 text-base hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            {type}
          </Button>
        ))}
      </div>
    )
  }
  
  // Button options for treatment history
  if (currentStep === 'treatment_history') {
    const treatmentOptions = ['Never', 'Currently', 'In the past']
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {treatmentOptions.map((option) => (
          <Button
            key={option}
            onClick={() => setTreatmentHistory(option)}
            variant="outline"
            className="h-12 text-base hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            {option}
          </Button>
        ))}
      </div>
    )
  }
  
  // AUDIT questions
  if (currentStep === 'audit_questions' && currentQuestionIndex < 10) {
    const currentQuestion = auditQuestions[currentQuestionIndex]
    
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600 mb-1">
            Question {currentQuestionIndex + 1} of 10
          </div>
          <div className="font-medium text-blue-900">
            {currentQuestion.question}
          </div>
        </div>
        
        <div className="grid gap-2">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAuditAnswer(option.score, option.text)}
              variant="outline"
              className="h-auto py-3 px-4 text-left justify-start text-wrap hover:bg-green-50 hover:border-green-300 transition-colors"
            >
              {option.text}
            </Button>
          ))}
        </div>
      </div>
    )
  }
  
  return null
}