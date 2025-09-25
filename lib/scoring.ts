export interface ScoreZone {
  zone: string
  risk: string
  explanation: string
  action: string
}

export const getScoreZone = (score: number): ScoreZone => {
  if (score <= 3) {
    return {
      zone: "I-Low Risk",
      risk: "low risk for health/social complications",
      explanation: "Your drinking pattern suggests minimal risk for alcohol-related problems.",
      action: "Continue to follow low-risk drinking guidelines: no more than 14 drinks per week for men, 7 for women, with at least 2 alcohol-free days."
    }
  } else if (score <= 9) {
    return {
      zone: "II-Risky",
      risk: "may develop health problems or existing problems may worsen",
      explanation: "Your drinking pattern suggests some risk for developing alcohol-related problems.",
      action: "Consider reducing your alcohol use to lower-risk levels. Brief intervention strategies can help you cut back effectively."
    }
  } else if (score <= 13) {
    return {
      zone: "III-Harmful",
      risk: "has likely experienced negative effects from alcohol",
      explanation: "Your drinking pattern suggests you may have already experienced some negative consequences from alcohol use.",
      action: "It's recommended to reduce your drinking significantly or consider abstaining. Follow-up with a healthcare provider or brief treatment program would be beneficial."
    }
  } else {
    return {
      zone: "IV-Severe",
      risk: "could benefit from more comprehensive assessment and treatment",
      explanation: "Your drinking pattern suggests significant problems that warrant professional evaluation.",
      action: "We strongly recommend seeking professional help. Consider accepting a referral to a specialty treatment program for a comprehensive assessment."
    }
  }
}

export const auditQuestions = [
  {
    id: 1,
    question: "How often do you have a drink containing alcohol?",
    options: [
      { text: "Never", score: 0 },
      { text: "Monthly or less", score: 1 },
      { text: "2-4 times per month", score: 2 },
      { text: "2-3 times per week", score: 3 },
      { text: "4 or more times per week", score: 4 }
    ]
  },
  {
    id: 2,
    question: "How many drinks containing alcohol do you have on a typical day when you are drinking?",
    options: [
      { text: "1 or 2", score: 0 },
      { text: "3 or 4", score: 1 },
      { text: "5 or 6", score: 2 },
      { text: "7, 8, or 9", score: 3 },
      { text: "10 or more", score: 4 }
    ]
  },
  {
    id: 3,
    question: "How often do you have five or more drinks on one occasion?",
    options: [
      { text: "Never", score: 0 },
      { text: "Less than monthly", score: 1 },
      { text: "Monthly", score: 2 },
      { text: "Weekly", score: 3 },
      { text: "Daily or almost daily", score: 4 }
    ]
  },
  {
    id: 4,
    question: "How often during the last year have you found that you were not able to stop drinking once you had started?",
    options: [
      { text: "Never", score: 0 },
      { text: "Less than monthly", score: 1 },
      { text: "Monthly", score: 2 },
      { text: "Weekly", score: 3 },
      { text: "Daily or almost daily", score: 4 }
    ]
  },
  {
    id: 5,
    question: "How often during the last year have you failed to do what was normally expected of you because of drinking?",
    options: [
      { text: "Never", score: 0 },
      { text: "Less than monthly", score: 1 },
      { text: "Monthly", score: 2 },
      { text: "Weekly", score: 3 },
      { text: "Daily or almost daily", score: 4 }
    ]
  },
  {
    id: 6,
    question: "How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?",
    options: [
      { text: "Never", score: 0 },
      { text: "Less than monthly", score: 1 },
      { text: "Monthly", score: 2 },
      { text: "Weekly", score: 3 },
      { text: "Daily or almost daily", score: 4 }
    ]
  },
  {
    id: 7,
    question: "How often during the last year have you had a feeling of guilt or remorse after drinking?",
    options: [
      { text: "Never", score: 0 },
      { text: "Less than monthly", score: 1 },
      { text: "Monthly", score: 2 },
      { text: "Weekly", score: 3 },
      { text: "Daily or almost daily", score: 4 }
    ]
  },
  {
    id: 8,
    question: "How often during the last year have you been unable to remember what happened the night before because of your drinking?",
    options: [
      { text: "Never", score: 0 },
      { text: "Less than monthly", score: 1 },
      { text: "Monthly", score: 2 },
      { text: "Weekly", score: 3 },
      { text: "Daily or almost daily", score: 4 }
    ]
  },
  {
    id: 9,
    question: "Have you or someone else been injured because of your drinking?",
    options: [
      { text: "No", score: 0 },
      { text: "Yes, but not in the last year", score: 2 },
      { text: "Yes, during the last year", score: 4 }
    ]
  },
  {
    id: 10,
    question: "Has a relative, friend, doctor, or other health care worker been concerned about your drinking or suggested you cut down?",
    options: [
      { text: "No", score: 0 },
      { text: "Yes, but not in the last year", score: 2 },
      { text: "Yes, during the last year", score: 4 }
    ]
  }
]