'use client'

import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const supabase = createClient()

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <main style={{
      fontFamily: 'sans-serif',
      maxWidth: '400px',
      margin: '100px auto',
      textAlign: 'center',
      padding: '0 20px'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>LogicXplr 🚀</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>
        Your AI-powered career roadmap
      </p>
      <button
        onClick={signInWithGoogle}
        style={{
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          padding: '14px 32px',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Sign in with Google
      </button>
    </main>
  )
}