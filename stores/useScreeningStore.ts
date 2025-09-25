import { create } from 'zustand'

export type StepType = 
  | 'welcome'
  | 'name'
  | 'email'
  | 'drink_type'
  | 'treatment_history'
  | 'reminder'
  | 'audit_questions'
  | 'submitting'
  | 'complete'

export interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: Date
}

interface ScreeningState {
  // User data
  name: string
  email: string
  drink_type: string
  treatment_history: string
  
  // Progress tracking
  currentStep: StepType
  currentQuestionIndex: number
  auditScores: number[]
  totalScore: number
  
  // UI state
  messages: Message[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setName: (name: string) => void
  setEmail: (email: string) => void
  setDrinkType: (type: string) => void
  setTreatmentHistory: (history: string) => void
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  nextStep: () => void
  setCurrentStep: (step: StepType) => void
  recordAuditAnswer: (score: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const useScreeningStore = create<ScreeningState>((set, get) => ({
  // Initial state
  name: '',
  email: '',
  drink_type: '',
  treatment_history: '',
  
  currentStep: 'welcome',
  currentQuestionIndex: 0,
  auditScores: [],
  totalScore: 0,
  
  messages: [{
    id: 'welcome',
    type: 'bot',
    content: 'Welcome to the Alcohol Screening Tool. This assessment is completely confidential and will help provide you with personalized information about your drinking habits.\n\nFirst, what\'s your name?',
    timestamp: new Date()
  }],
  isLoading: false,
  error: null,
  
  // Actions
  setName: (name: string) => {
    const trimmedName = name.trim()
    set({ name: trimmedName })
    
    if (trimmedName) {
      get().addMessage({ 
        type: 'user', 
        content: trimmedName 
      })
      get().addMessage({ 
        type: 'bot', 
        content: `Thanks, ${capitalize(trimmedName)}! Next, please enter your email address to receive your personalized screening report.` 
      })
      set({ currentStep: 'email' })
    }
  },
  
  setEmail: (email: string) => {
    const trimmedEmail = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!emailRegex.test(trimmedEmail)) {
      get().setError('Please enter a valid email address.')
      return
    }
    
    set({ email: trimmedEmail, error: null })
    get().addMessage({ 
      type: 'user', 
      content: trimmedEmail 
    })
    get().addMessage({ 
      type: 'bot', 
      content: `Got it, ${capitalize(get().name)}! Now, what do you primarily drink?` 
    })
    set({ currentStep: 'drink_type' })
  },
  
  setDrinkType: (type: string) => {
    set({ drink_type: type })
    get().addMessage({ 
      type: 'user', 
      content: type 
    })
    get().addMessage({ 
      type: 'bot', 
      content: 'Have you ever been in treatment for an alcohol problem?' 
    })
    set({ currentStep: 'treatment_history' })
  },
  
  setTreatmentHistory: (history: string) => {
    set({ treatment_history: history })
    get().addMessage({ 
      type: 'user', 
      content: history 
    })
    get().addMessage({ 
      type: 'bot', 
      content: 'Perfect! Before we begin the screening questions, please keep this in mind:\n\n**One standard drink equals:**\n• 12 oz beer (5% alcohol)\n• 5 oz wine (12% alcohol)\n• 1.5 oz liquor (40% alcohol)\n\nReady to start? Let\'s begin with the first question.' 
    })
    set({ currentStep: 'reminder' })
    
    // Auto-advance to questions after a brief delay
    setTimeout(() => {
      set({ currentStep: 'audit_questions' })
    }, 2000)
  },
  
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    
    set(state => ({
      messages: [...state.messages, newMessage]
    }))
  },
  
  nextStep: () => {
    const currentStep = get().currentStep
    // This is handled by individual action methods
  },
  
  setCurrentStep: (step: StepType) => {
    set({ currentStep: step })
  },
  
  recordAuditAnswer: (score: number) => {
    const state = get()
    const newScores = [...state.auditScores, score]
    const newQuestionIndex = state.currentQuestionIndex + 1
    
    set({ 
      auditScores: newScores,
      currentQuestionIndex: newQuestionIndex,
      totalScore: newScores.reduce((sum, s) => sum + s, 0)
    })
    
    if (newQuestionIndex >= 10) {
      // All questions completed
      get().addMessage({
        type: 'bot',
        content: `Thank you for completing the screening, ${capitalize(state.name)}. Your personalized report will be emailed to you shortly. Please check your inbox (and spam folder) in the next few minutes.`
      })
      set({ currentStep: 'submitting', isLoading: true })
    }
  },
  
  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },
  
  setError: (error: string | null) => {
    set({ error })
  },
  
  reset: () => {
    set({
      name: '',
      email: '',
      drink_type: '',
      treatment_history: '',
      currentStep: 'welcome',
      currentQuestionIndex: 0,
      auditScores: [],
      totalScore: 0,
      messages: [{
        id: 'welcome',
        type: 'bot',
        content: 'Welcome to the Alcohol Screening Tool. This assessment is completely confidential and will help provide you with personalized information about your drinking habits.\n\nFirst, what\'s your name?',
        timestamp: new Date()
      }],
      isLoading: false,
      error: null
    })
  }
}))