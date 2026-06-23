'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type Step = {
  id: string
  step_order: number
  title: string
  description: string
  estimated_weeks: number | null
  salary_impact: string | null
  status: 'not_started' | 'in_progress' | 'complete'
  progress_id: string | null
}

type Profile = {
  current_role_name: string
  target_role_name: string
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [steps, setSteps] = useState<Step[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('current_role_name, target_role_name')
        .eq('id', user.id)
        .single()

      if (!profileData?.current_role_name) { router.push('/onboarding'); return }
      setProfile(profileData)

      const { data: roadmap } = await supabase
        .from('roadmaps')
        .select('id')
        .eq('from_role', profileData.current_role_name)
        .eq('to_role', profileData.target_role_name)
        .single()

      if (!roadmap) { setLoading(false); return }

      const { data: stepsData } = await supabase
        .from('roadmap_steps')
        .select('*')
        .eq('roadmap_id', roadmap.id)
        .order('step_order')

      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('roadmap_id', roadmap.id)

      const merged = (stepsData || []).map(step => {
        const progress = (progressData || []).find(p => p.step_id === step.id)
        return {
          ...step,
          status: progress?.status || 'not_started',
          progress_id: progress?.id || null,
        }
      })

      setSteps(merged)
      setLoading(false)
    }

    loadDashboard()
  }, [])

  async function updateStatus(step: Step, newStatus: Step['status']) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: roadmap } = await supabase
      .from('roadmaps')
      .select('id')
      .eq('from_role', profile?.current_role_name)
      .eq('to_role', profile?.target_role_name)
      .single()

    if (!roadmap) return

    await supabase.from('user_progress').upsert({
      ...(step.progress_id ? { id: step.progress_id } : {}),
      user_id: user.id,
      roadmap_id: roadmap.id,
      step_id: step.id,
      status: newStatus,
      updated_at: new Date().toISOString(),
    })

    setSteps(prev => prev.map(s =>
      s.id === step.id ? { ...s, status: newStatus } : s
    ))
  }

  const completed = steps.filter(s => s.status === 'complete').length
  const percent = steps.length ? Math.round((completed / steps.length) * 100) : 0

  if (loading) return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A5680', fontFamily: 'sans-serif' }}>
      Loading your roadmap...
    </div>
  )

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#0A0F1E', color: '#F0F4FF', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Space Grotesk', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '0.5px solid #1E2B4A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00C2FF' }} />
          LogicXplr
        </div>
        <button
          onClick={async () => { await supabase.auth.signOut(); router.push('/login') }}
          style={{ fontSize: '13px', color: '#4A5680', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Sign out
        </button>
      </nav>

      <section style={{ padding: '2rem', maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <p className="mono" style={{ fontSize: '11px', color: '#00C2FF', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Your roadmap
        </p>
        <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
          {profile?.current_role_name} → {profile?.target_role_name}
        </h1>

        {/* Progress bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span className="mono" style={{ fontSize: '11px', color: '#4A5680' }}>
              {completed} of {steps.length} steps complete
            </span>
            <span className="mono" style={{ fontSize: '11px', color: '#00C2FF' }}>
              {percent}%
            </span>
          </div>
          <div style={{ height: '4px', background: '#1E2B4A', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${percent}%`, background: '#00C2FF', borderRadius: '2px', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative', paddingLeft: '1rem' }}>
          <div style={{ position: 'absolute', left: '7px', top: 0, bottom: 0, width: '2px', background: '#1E2B4A' }} />
          <div style={{ display: 'grid', gap: '1rem' }}>
            {steps.map((step) => (
              <div
                key={step.id}
                style={{
                  position: 'relative',
                  padding: '1rem 1rem 1rem 1.5rem',
                  borderRadius: '18px',
                  background: '#121A33',
                  border: '1px solid #1E2B4A',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: step.status === 'complete' ? '#00C2FF' : '#4A5680' }} />
                  <div>
                    <p style={{ fontSize: '11px', color: '#4A5680', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                      Step {step.step_order}
                    </p>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#F0F4FF' }}>
                      {step.title}
                    </h2>
                  </div>
                </div>

                <p style={{ fontSize: '14px', color: '#B8C0E0', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {step.description}
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem', fontSize: '13px', color: '#4A5680' }}>
                  <span>{step.estimated_weeks ? `${step.estimated_weeks} wk${step.estimated_weeks === 1 ? '' : 's'}` : 'No estimate'}</span>
                  <span>{step.salary_impact ?? 'No salary impact'}</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {(['not_started', 'in_progress', 'complete'] as Step['status'][]).map((statusOption) => (
                    <button
                      key={statusOption}
                      onClick={() => updateStatus(step, statusOption)}
                      style={{
                        border: 'none',
                        borderRadius: '999px',
                        padding: '0.55rem 0.9rem',
                        background: step.status === statusOption ? '#00C2FF' : '#1E2B4A',
                        color: step.status === statusOption ? '#0A0F1E' : '#F0F4FF',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      {statusOption === 'not_started' ? 'Not started' : statusOption === 'in_progress' ? 'In progress' : 'Complete'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
