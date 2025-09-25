// app/api/submit/route.ts
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getScoreZone } from '@/lib/scoring'
import OpenAI from 'openai'
import nodemailer from 'nodemailer'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { name, email, score, drink_type, treatment_history } = await request.json()
    console.log('📩 Incoming body:', { name, email, score, drink_type, treatment_history })

    // Validate input
    if (!name || !email || score === undefined || !drink_type || !treatment_history) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Insert into Supabase
    const { data, error } = await supabase.from('responses').insert([
      { name, email, score, drink_type, treatment_history },
    ])
    if (error) {
      console.error('❌ Supabase insert error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
    console.log('✅ Supabase insert success:', data)

    // Score zone
    const scoreZone = getScoreZone(score)

    // OpenAI report
    let reportContent = ''
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-nano',
        messages: [
          { role: 'system', content: 'You are a healthcare professional writing empathetic reports.' },
          { role: 'user', content: `Write a short report for ${name}, score ${score}/40 (${scoreZone.zone}), be empathetic about your report,
          use proper sentence structure and write the report without *, and write in nice paragraph format` },
        ],
      })
      reportContent = completion.choices[0].message?.content || ''
      console.log('✅ OpenAI report generated')
    } catch (err) {
      console.error('❌ OpenAI error:', err)
      reportContent = 'Report generation failed.'
    }

    // Send email
    try {
      await transporter.sendMail({
        from: `"MindVibes" <${process.env.GMAIL_EMAIL}>`,
        to: email,
  subject: `Hey ${name}, your AUDIT Screening Report is here!`,
        text: `Your score is ${score}. Risk zone: ${scoreZone.zone}`,
        html: `<p>${reportContent}</p>`,
      })
      console.log('✅ Email sent successfully')
    } catch (err) {
      console.error('❌ Email sending error:', err)
      return NextResponse.json({ error: 'Email sending failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true, zone: scoreZone.zone })
  } catch (err) {
    console.error('❌ API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
