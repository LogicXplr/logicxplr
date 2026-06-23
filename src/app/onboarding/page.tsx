'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const fromRoles = [
  'No experience',
  'Help desk',
  'IT professional',
  'Career changer',
  'College student',
  'Security pro',
]

const toRoles = [
  'IT Support',
  'Cybersecurity',
  'Cloud',
  'DevOps',
  'Networking',
  'Programming',
]

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [currentRole, setCurrentRole] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!currentRole || !targetRole) return
    if (currentRole === targetRole) {
      alert('Your current and target role can\'t be the same!')
      return
    }

    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      current_role_name: currentRole,
      target_role_name: targetRole,
    })

    if (error) {
      alert('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  const btnStyle = (selected: boolean) => ({
    background: selected ? 'rgba(0, 194, 255, 0.08)' : '#0A0F1E',
    border: selected ? '0.5px solid #00C2FF' : '0.5px solid #1E2B4A',
    color: selected ? '#00C2FF' : '#F0F4FF',
    padding: '10px 14px',
    borderRadius: '8px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'all 0.15s',
  })

  return (
    <main style={{
      fontFamily: "'Space Grotesk', sans-serif",
      background: '#0A0F1E',
      color: '#F0F4FF',
      minHeight: '100vh',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '0.5px solid #1E2B4A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00C2FF' }} />
          LogicXplr
        </div>
      </nav>

      {/* Onboarding Card */}
      <section style={{ padding: '3rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#00C2FF', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '1.25rem' }}>
          One onboarding. One direction.
        </p>

        <div style={{ background: '#111827', border: '0.5px solid #1E2B4A', borderRadius: '12px', padding: '1.75rem' }}>

          {/* Current role */}
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#4A5680', marginBottom: '1rem', letterSpacing: '1px' }}>
            // where are you now?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '1.5rem' }}>
            {fromRoles.map(role => (
              <button
                key={role}
                style={btnStyle(currentRole === role)}
                onClick={() => setCurrentRole(role)}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Target role */}
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#4A5680', marginBottom: '1rem', letterSpacing: '1px' }}>
            // where do you want to go?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '1.5rem' }}>
            {toRoles.map(role => (
              <button
                key={role}
                style={btnStyle(targetRole === role)}
                onClick={() => setTargetRole(role)}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!currentRole || !targetRole || loading}
            style={{
              width: '100%',
              padding: '14px',
              background: currentRole && targetRole ? '#00C2FF' : '#1E2B4A',
              color: currentRole && targetRole ? '#0A0F1E' : '#4A5680',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: currentRole && targetRole ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            {loading ? 'Saving...' : 'Build my roadmap →'}
          </button>
        </div>
      </section>
    </main>
  )
}