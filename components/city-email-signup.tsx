'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function CityEmailSignup() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('loading')
    const normalizedEmail = email.trim().toLowerCase()
    const { error } = await createClient().from('email_subscribers').insert({ email: normalizedEmail })
    if (error && !error.message.toLowerCase().includes('duplicate')) {
      setState('error')
      return
    }
    setEmail('')
    setState('success')
  }

  return <section className="city-email-signup" aria-labelledby="city-email-title"><div><p className="eyebrow">Before you go</p><h2 id="city-email-title">Get the next city guide by email.</h2><p>Short, useful travel notes from Roamin10. No spam. Unsubscribe whenever you like.</p></div><form onSubmit={handleSubmit}><label htmlFor="city-email">Email address</label><div className="email-signup-row"><input id="city-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /><button type="submit" disabled={state === 'loading'}>{state === 'loading' ? 'Joining…' : 'Join the list'}</button></div>{state === 'success' && <p className="form-message success" role="status">You&apos;re on the list.</p>}{state === 'error' && <p className="form-message error" role="alert">Something went wrong. Please try again.</p>}</form></section>
}
