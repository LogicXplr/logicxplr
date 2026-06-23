import Link from 'next/link'

export default function Home() {
  return (
    <main style={{
      fontFamily: "'Space Grotesk', sans-serif",
      background: '#0A0F1E',
      color: '#F0F4FF',
      minHeight: '100vh',
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '0.5px solid #1E2B4A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00C2FF' }} />
          LogicXplr
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#4A5680', cursor: 'pointer' }}>Roadmaps</span>
          <span style={{ fontSize: '13px', color: '#4A5680', cursor: 'pointer' }}>Community</span>
          <span style={{ fontSize: '13px', color: '#4A5680', cursor: 'pointer' }}>AI Mentor</span>
          <Link href="/login" style={{ background: '#00C2FF', color: '#0A0F1E', border: 'none', padding: '8px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '4rem 2rem 3rem', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#00C2FF', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          Career Operating System
        </p>
        <h1 style={{ fontSize: '40px', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-1.5px', marginBottom: '1rem' }}>
          Stop piecing it together.<br />
          <span style={{ color: '#00C2FF' }}>Start following a path.</span>
        </h1>
        <p style={{ fontSize: '15px', color: '#4A5680', lineHeight: 1.7, marginBottom: '2rem' }}>
          The fragmented YouTube-Reddit-Discord loop isn't a career plan. LogicXplr puts the entire journey — your roadmap, your progress, your next step — in one place.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/login" style={{ background: '#00C2FF', color: '#0A0F1E', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
            Find my path ↗
          </Link>
          <button style={{ background: 'transparent', color: '#F0F4FF', border: '0.5px solid #1E2B4A', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
            See how it works
          </button>
        </div>
      </section>

      {/* Chaos tags */}
      <div style={{ padding: '2rem', maxWidth: '680px', margin: '0 auto' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4A5680', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '1.25rem' }}>
          Where people get lost
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '1rem', opacity: 0.5 }}>
          {['YouTube', 'Reddit', 'Discord', 'LinkedIn', 'CompTIA', 'ChatGPT', 'Job boards', 'Study guides', 'TryHackMe', 'Professor Messer'].map(tag => (
            <span key={tag} style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '20px', border: '0.5px solid #1E2B4A', color: '#4A5680', fontFamily: "'JetBrains Mono', monospace" }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '1rem 0' }}>
          <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, #1E2B4A, #00C2FF)' }} />
          <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '7px solid #00C2FF' }} />
        </div>
      </div>

      {/* Features */}
      <section style={{ padding: '2rem', borderTop: '0.5px solid #1E2B4A' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#7B4FFF', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '1.5rem' }}>
          Everything connected
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', maxWidth: '640px', margin: '0 auto' }}>
          {[
            { icon: 'ti-map-2', title: 'Guided roadmaps', desc: 'Role-specific paths from zero to first job. No guessing what\'s next.' },
            { icon: 'ti-brain', title: 'AI Mentor', desc: 'Context-aware. Knows your progress, weak spots, and next objective.' },
            { icon: 'ti-users', title: 'Study communities', desc: 'Find people studying the same cert. Form groups, share notes, stay accountable.' },
            { icon: 'ti-briefcase', title: 'Live job postings', desc: 'Real listings matched to where you are in your roadmap.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#111827', border: '0.5px solid #1E2B4A', borderRadius: '10px', padding: '1rem' }}>
              <i className={`ti ${f.icon}`} style={{ fontSize: '20px', color: '#7B4FFF', display: 'block', marginBottom: '10px' }} />
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#F0F4FF', marginBottom: '4px' }}>{f.title}</div>
              <div style={{ fontSize: '12px', color: '#4A5680', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '0.5px solid #1E2B4A' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.75px', marginBottom: '0.75rem' }}>
          The problem isn't lack of information.<br />
          It's knowing what to learn <span style={{ color: '#00C2FF' }}>next.</span>
        </h2>
        <p style={{ fontSize: '14px', color: '#4A5680', marginBottom: '1.75rem' }}>
          LogicXplr answers that question — for every stage of the journey.
        </p>
        <Link href="/login" style={{ background: '#00C2FF', color: '#0A0F1E', border: 'none', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
          Build my roadmap ↗
        </Link>
      </section>
    </main>
  )
}