import { useState, useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/* ══════════════════════════════════════════════════════════
   Hooks
══════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.12): [RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function useCountUp(target: number, duration = 1800, active = false): number {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let t0: number | null = null
    const tick = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, active])
  return val
}

/* ══════════════════════════════════════════════════════════
   SVG Illustrations
══════════════════════════════════════════════════════════ */
function RobotSVG({ size = 180 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" aria-hidden="true">
      {/* Antenna */}
      <rect x="86" y="8" width="8" height="22" rx="4" fill="#FFD94A"/>
      <circle cx="90" cy="6" r="7" fill="#FF7B7B"/>
      {/* Head */}
      <rect x="40" y="28" width="100" height="72" rx="20" fill="#3B9EFF"/>
      <rect x="48" y="36" width="84" height="56" rx="14" fill="white" opacity="0.15"/>
      {/* Eyes */}
      <circle cx="68" cy="60" r="14" fill="white"/>
      <circle cx="112" cy="60" r="14" fill="white"/>
      <circle cx="70" cy="62" r="8" fill="#1E3A5F"/>
      <circle cx="114" cy="62" r="8" fill="#1E3A5F"/>
      <circle cx="73" cy="59" r="3" fill="white"/>
      <circle cx="117" cy="59" r="3" fill="white"/>
      {/* Smile */}
      <path d="M70 80 Q90 95 110 80" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Ears/side panels */}
      <rect x="24" y="44" width="18" height="32" rx="9" fill="#2DD4A0"/>
      <rect x="138" y="44" width="18" height="32" rx="9" fill="#2DD4A0"/>
      {/* Body */}
      <rect x="50" y="106" width="80" height="52" rx="16" fill="#3B9EFF"/>
      <rect x="62" y="116" width="56" height="32" rx="10" fill="white" opacity="0.15"/>
      {/* Chest buttons */}
      <circle cx="75" cy="128" r="6" fill="#FFD94A"/>
      <circle cx="90" cy="128" r="6" fill="#FF7B7B"/>
      <circle cx="105" cy="128" r="6" fill="#2DD4A0"/>
      {/* Arms */}
      <rect x="16" y="110" width="36" height="20" rx="10" fill="#2DD4A0"/>
      <rect x="128" y="110" width="36" height="20" rx="10" fill="#2DD4A0"/>
      {/* Hands */}
      <circle cx="24" cy="140" r="10" fill="#FFD94A"/>
      <circle cx="156" cy="140" r="10" fill="#FFD94A"/>
      {/* Legs */}
      <rect x="60" y="156" width="24" height="20" rx="10" fill="#1A6FD4"/>
      <rect x="96" y="156" width="24" height="20" rx="10" fill="#1A6FD4"/>
    </svg>
  )
}

function LaptopSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 100" fill="none" aria-hidden="true">
      <rect x="10" y="8" width="100" height="68" rx="8" fill="#1E3A5F"/>
      <rect x="16" y="14" width="88" height="56" rx="5" fill="#0F2040"/>
      {/* Code lines */}
      <rect x="22" y="22" width="28" height="5" rx="2" fill="#3B9EFF" opacity="0.9"/>
      <rect x="26" y="32" width="44" height="5" rx="2" fill="#2DD4A0" opacity="0.9"/>
      <rect x="26" y="42" width="36" height="5" rx="2" fill="#FFD94A" opacity="0.9"/>
      <rect x="22" y="52" width="22" height="5" rx="2" fill="#FF7B7B" opacity="0.9"/>
      <rect x="48" y="52" width="32" height="5" rx="2" fill="#3B9EFF" opacity="0.7"/>
      <rect x="26" y="62" width="50" height="5" rx="2" fill="#2DD4A0" opacity="0.7"/>
      {/* Cursor */}
      <rect x="78" y="22" width="3" height="10" rx="1" fill="white" opacity="0.9"/>
      {/* Base */}
      <rect x="0" y="78" width="120" height="10" rx="5" fill="#2C5282"/>
      <rect x="40" y="76" width="40" height="4" rx="2" fill="#1E3A5F"/>
    </svg>
  )
}

function StarSVG({ size = 40, color = '#FFD94A' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 3L24.5 15H37.5L27 23L31 35.5L20 28L9 35.5L13 23L2.5 15H15.5Z" fill={color}/>
    </svg>
  )
}

function RocketSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M40 4C40 4 56 16 56 40L40 54L24 40C24 16 40 4 40 4Z" fill="#3B9EFF"/>
      <path d="M40 4C40 4 52 18 52 40L40 52V4Z" fill="#1A6FD4"/>
      <circle cx="40" cy="32" r="8" fill="white"/>
      <circle cx="40" cy="32" r="5" fill="#7EC8FF"/>
      <path d="M24 40L16 52L28 48Z" fill="#FF7B7B"/>
      <path d="M56 40L64 52L52 48Z" fill="#FF7B7B"/>
      <path d="M34 54L32 72L40 66L48 72L46 54Z" fill="#FFD94A"/>
    </svg>
  )
}

function CodeBlockSVG({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#1E3A5F"/>
      <rect x="6" y="6" width="52" height="8" rx="3" fill="#2C5282"/>
      <circle cx="14" cy="10" r="3" fill="#FF7B7B"/>
      <circle cx="23" cy="10" r="3" fill="#FFD94A"/>
      <circle cx="32" cy="10" r="3" fill="#2DD4A0"/>
      <rect x="8" y="20" width="22" height="4" rx="2" fill="#3B9EFF" opacity="0.9"/>
      <rect x="12" y="28" width="32" height="4" rx="2" fill="#2DD4A0" opacity="0.9"/>
      <rect x="12" y="36" width="28" height="4" rx="2" fill="#FFD94A" opacity="0.9"/>
      <rect x="8" y="44" width="18" height="4" rx="2" fill="#FF7B7B" opacity="0.9"/>
      <rect x="30" y="44" width="26" height="4" rx="2" fill="#3B9EFF" opacity="0.7"/>
      <rect x="12" y="52" width="36" height="4" rx="2" fill="#2DD4A0" opacity="0.7"/>
    </svg>
  )
}

function GameControllerSVG({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="4" y="20" width="56" height="30" rx="15" fill="#3B9EFF"/>
      <rect x="10" y="28" width="12" height="4" rx="2" fill="white" opacity="0.9"/>
      <rect x="14" y="24" width="4" height="12" rx="2" fill="white" opacity="0.9"/>
      <circle cx="42" cy="30" r="4" fill="#FF7B7B"/>
      <circle cx="52" cy="30" r="4" fill="#FFD94A"/>
      <circle cx="47" cy="38" r="4" fill="#2DD4A0"/>
      <rect x="26" y="24" width="12" height="4" rx="2" fill="#1E3A5F" opacity="0.3"/>
      <ellipse cx="20" cy="50" rx="10" ry="6" fill="#1A6FD4"/>
      <ellipse cx="44" cy="50" rx="10" ry="6" fill="#1A6FD4"/>
    </svg>
  )
}

function GlobeSVG({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#3B9EFF"/>
      <ellipse cx="32" cy="32" rx="14" ry="28" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      <line x1="4" y1="32" x2="60" y2="32" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      <line x1="10" y1="18" x2="54" y2="18" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      <line x1="10" y1="46" x2="54" y2="46" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="32" cy="32" r="28" fill="none" stroke="white" strokeWidth="2" opacity="0.8"/>
    </svg>
  )
}

function RobotSmallSVG({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <rect x="10" y="8" width="36" height="26" rx="8" fill="#3B9EFF"/>
      <circle cx="20" cy="20" r="5" fill="white"/>
      <circle cx="36" cy="20" r="5" fill="white"/>
      <circle cx="21" cy="21" r="2.5" fill="#1E3A5F"/>
      <circle cx="37" cy="21" r="2.5" fill="#1E3A5F"/>
      <path d="M20 30 Q28 36 36 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <rect x="4" y="14" width="8" height="14" rx="4" fill="#2DD4A0"/>
      <rect x="44" y="14" width="8" height="14" rx="4" fill="#2DD4A0"/>
      <rect x="14" y="34" width="28" height="16" rx="6" fill="#3B9EFF"/>
      <circle cx="22" cy="42" r="3" fill="#FFD94A"/>
      <circle cx="34" cy="42" r="3" fill="#FF7B7B"/>
      <rect x="24" y="24" width="4" height="8" rx="2" fill="#FFD94A"/>
    </svg>
  )
}

function ShieldCheckSVG({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 4L40 10V24C40 33 33 41 24 44C15 41 8 33 8 24V10Z" fill="#2DD4A0" opacity="0.2"/>
      <path d="M24 4L40 10V24C40 33 33 41 24 44C15 41 8 33 8 24V10Z" stroke="#2DD4A0" strokeWidth="2.5" fill="none"/>
      <path d="M16 24L22 30L32 18" stroke="#2DD4A0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DiamondSVG({ size = 32, color = '#3B9EFF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2L28 12L16 30L4 12Z" fill={color} opacity="0.8"/>
      <path d="M4 12H28" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      <path d="M16 2L10 12L16 30L22 12Z" fill="white" opacity="0.2"/>
    </svg>
  )
}

function CircleDotSVG({ size = 24, color = '#FFD94A' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill={color} opacity="0.3"/>
      <circle cx="12" cy="12" r="5" fill={color}/>
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════
   Navbar
══════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [['学べること', '#learn'], ['コース', '#courses'], ['作品例', '#works'], ['保護者の声', '#voices'], ['FAQ', '#faq']]

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky flex items-center justify-center shadow-md">
            <span className="text-white font-black text-base leading-none">&lt;/&gt;</span>
          </div>
          <span className={`font-black text-xl tracking-tight ${scrolled ? 'text-navy' : 'text-white'}`}>
            Code<span className="text-lemon">Kids</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(([label, href]) => (
            <a key={label} href={href}
              className={`text-sm font-bold transition-colors hover:text-sky ${scrolled ? 'text-navy/70' : 'text-white/85'}`}
            >{label}</a>
          ))}
          <a href="#trial"
            className="bg-lemon text-navy font-black text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >🎮 無料体験</a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(v => !v)}
          className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-navy' : 'text-white'}`}
          aria-label="メニュー"
        >
          <div className="flex flex-col gap-1.5">
            {[0,1,2].map(i => (
              <span key={i} className={`block w-5 h-0.5 ${scrolled ? 'bg-navy' : 'bg-white'} transition-all`}/>
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-sky/20 px-5 pb-5 pt-2 shadow-xl">
          {[...links, ['🎮 無料体験', '#trial']].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}
              className="block py-3 text-navy font-bold border-b border-sky/10 last:border-none"
            >{label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ══════════════════════════════════════════════════════════
   Hero
══════════════════════════════════════════════════════════ */
function Hero() {
  const texts = ['ゲームをつくろう！', 'Webをデザインしよう！', 'ロボットを動かそう！', 'AIを学ぼう！']
  const [textIdx, setTextIdx] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false)
      setTimeout(() => { setTextIdx(i => (i + 1) % texts.length); setShow(true) }, 400)
    }, 2600)
    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #1A6FD4 0%, #3B9EFF 40%, #2DD4A0 100%)' }}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Floating circles */}
        <div className="absolute top-16 left-[8%] animate-float" style={{ animationDelay: '0s' }}>
          <CircleDotSVG size={48} color="#FFD94A"/>
        </div>
        <div className="absolute top-32 right-[12%] animate-floatSlow" style={{ animationDelay: '0.8s' }}>
          <StarSVG size={44} color="#FFD94A"/>
        </div>
        <div className="absolute bottom-32 left-[14%] animate-float" style={{ animationDelay: '1.2s' }}>
          <DiamondSVG size={36} color="#FF7B7B"/>
        </div>
        <div className="absolute top-1/4 right-[6%] animate-spinSlow">
          <CodeBlockSVG size={56}/>
        </div>
        <div className="absolute bottom-24 right-[18%] animate-floatSlow" style={{ animationDelay: '0.4s' }}>
          <DiamondSVG size={28} color="#FFD94A"/>
        </div>
        <div className="absolute top-1/2 left-[4%] animate-float" style={{ animationDelay: '1.6s' }}>
          <CircleDotSVG size={32} color="#FF7B7B"/>
        </div>
        {/* Big blurred blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: '#FFD94A', filter: 'blur(80px)' }}/>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-20"
          style={{ background: '#FF7B7B', filter: 'blur(70px)' }}/>
        {/* Grid dots */}
        <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 pt-24 pb-16 w-full grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left */}
        <div className="animate-fadeUp">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full mb-6 border border-white/30">
            🚀 2024年度 生徒募集中！
          </div>
          <h1 className="text-white font-black leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            プログラミングで、<br/>
            <span className="text-lemon drop-shadow-sm">未来をつくろう！</span>
          </h1>

          {/* Typewriter subtitle */}
          <div className="bg-navy/30 backdrop-blur-sm rounded-2xl px-5 py-3 mb-6 border border-white/20 min-h-[52px] flex items-center">
            <span className="text-white font-bold text-lg"
              style={{ transition: 'opacity 0.4s', opacity: show ? 1 : 0 }}
            >
              {texts[textIdx]}
            </span>
            <span className="inline-block w-0.5 h-6 bg-lemon ml-1 animate-blink"/>
          </div>

          <p className="text-white/85 font-medium leading-relaxed mb-8 text-base">
            小学生から中学生まで、楽しみながら本物の力が身につく。<br/>
            少人数制・実践重視のプログラミングスクール。
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#trial"
              className="bg-lemon text-navy font-black px-7 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 text-base flex items-center gap-2"
            >
              🎮 無料体験に申し込む
            </a>
            <a href="#courses"
              className="bg-white/20 backdrop-blur-sm text-white font-bold px-6 py-3.5 rounded-full border border-white/40 hover:bg-white/30 transition-all duration-200 text-base"
            >
              コースを見る →
            </a>
          </div>

          {/* Mini stats */}
          <div className="flex gap-6 mt-8 flex-wrap">
            {[['🧒', '300+', '在籍生徒'], ['⭐', '4.9', '満足度'], ['🏆', '8年', '運営実績']].map(([icon, v, l]) => (
              <div key={l} className="text-center">
                <div className="text-white font-black text-xl">{icon} {v}</div>
                <div className="text-white/60 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Robot + floating cards */}
        <div className="hidden md:flex items-center justify-center relative" style={{ minHeight: 380 }}>
          <div className="animate-float">
            <RobotSVG size={220}/>
          </div>
          {/* Floating info cards */}
          <div className="absolute top-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl animate-floatSlow flex items-center gap-2" style={{ animationDelay: '0.5s' }}>
            <span className="text-xl">🎮</span>
            <div>
              <div className="font-black text-navy text-sm">ゲーム制作</div>
              <div className="text-sky text-xs">自分だけのゲームを！</div>
            </div>
          </div>
          <div className="absolute bottom-16 -right-2 bg-white rounded-2xl px-4 py-3 shadow-xl animate-floatSlow flex items-center gap-2" style={{ animationDelay: '1.1s' }}>
            <span className="text-xl">🤖</span>
            <div>
              <div className="font-black text-navy text-sm">ロボット制御</div>
              <div className="text-mint text-xs">動かすって楽しい！</div>
            </div>
          </div>
          <div className="absolute top-1/2 -right-8 bg-lemon rounded-2xl px-3 py-2.5 shadow-xl animate-bounce2">
            <div className="font-black text-navy text-sm">✨ 無料体験あり</div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', height: 80 }}>
          <path d="M0 80L0 40Q360 0 720 40Q1080 80 1440 40L1440 80Z" fill="#F0F9FF"/>
        </svg>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   What You Can Learn
══════════════════════════════════════════════════════════ */
function LearnSection() {
  const [ref, vis] = useReveal(0.1)
  const items = [
    { icon: <GameControllerSVG size={56}/>, color: '#3B9EFF', bg: '#EFF6FF', title: 'ゲームプログラミング', desc: 'Scratchや Python でオリジナルゲームを開発。アイデアを形にする喜びを体験！', badge: '人気No.1' },
    { icon: <GlobeSVG size={56}/>,          color: '#2DD4A0', bg: '#ECFDF5', title: 'Webデザイン・開発',    desc: 'HTML/CSS/JavaScriptを使って、自分だけのWebサイトを作ろう。デザインも学べる！' },
    { icon: <RobotSmallSVG size={56}/>,     color: '#FF7B7B', bg: '#FFF1F2', title: 'ロボット・IoT',        desc: 'センサーとプログラムを組み合わせてロボットを自在に操作。ものづくりの醍醐味！' },
    { icon: <LaptopSVG size={56}/>,         color: '#FFD94A', bg: '#FFFBEB', title: 'AI・データサイエンス',  desc: 'AIの仕組みをやさしく学び、機械学習の基礎を体験。未来のエンジニアへの第一歩！' },
  ]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="learn" className="py-24 bg-[#F0F9FF]">
      <div className="max-w-6xl mx-auto px-5">
        <div className={`text-center mb-14 reveal ${vis ? 'show' : ''}`}>
          <span className="inline-block bg-sky/10 text-sky font-bold text-xs px-4 py-1.5 rounded-full tracking-widest mb-3">WHAT YOU LEARN</span>
          <h2 className="text-navy font-black text-3xl md:text-4xl mb-3">4つの学習領域</h2>
          <div className="w-12 h-1.5 bg-lemon rounded-full mx-auto mb-4"/>
          <p className="text-navy/60 text-base max-w-md mx-auto">自分の好きな分野から始めよう。興味に合わせて自由にカスタマイズできます。</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div key={item.title}
              className={`group reveal ${vis ? 'show' : ''} bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-sky/20 cursor-pointer relative overflow-hidden`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {item.badge && (
                <span className="absolute top-4 right-4 bg-coral text-white text-[10px] font-black px-2.5 py-1 rounded-full">{item.badge}</span>
              )}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-bounce2" style={{ background: item.bg }}>
                {item.icon}
              </div>
              <h3 className="font-black text-navy text-base mb-2">{item.title}</h3>
              <p className="text-navy/55 text-sm leading-relaxed">{item.desc}</p>
              <div className="mt-4 flex items-center gap-1 font-bold text-sm" style={{ color: item.color }}>
                詳しく見る
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   Features
══════════════════════════════════════════════════════════ */
function Features() {
  const [ref, vis] = useReveal(0.1)
  const n1 = useCountUp(6,  1400, vis)
  const n2 = useCountUp(98, 1600, vis)
  const n3 = useCountUp(300,1800, vis)
  const n4 = useCountUp(8,  1200, vis)

  const features = [
    { emoji: '👥', color: 'bg-sky/10 text-sky',    title: '少人数制（定員6名）',   desc: '一人ひとりに目が届く少人数クラス。つまずいてもすぐフォロー。' },
    { emoji: '🛠️', color: 'bg-mint/10 text-mint',  title: '作りながら学ぶ',         desc: '講義より実践。毎回何かを完成させることで達成感を積み重ねます。' },
    { emoji: '🧑‍💻', color: 'bg-coral/10 text-coral',title: 'プロ講師が担当',         desc: '現役エンジニア・デザイナーが子どもの目線で分かりやすく指導。' },
    { emoji: '📚', color: 'bg-lemon/20 text-lemon-dark', title: 'オリジナル教材',   desc: '子どもが飽きない、楽しい独自テキストと動画コンテンツを完備。' },
    { emoji: '🏠', color: 'bg-sky/10 text-sky',    title: 'オンライン対応',         desc: '通学・オンライン両対応。全国どこからでも受講できます。' },
    { emoji: '🔒', color: 'bg-mint/10 text-mint',  title: '安心・安全な環境',       desc: '保護者への定期レポート送付、教室の安全管理も徹底しています。' },
  ]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className={`text-center mb-14 reveal ${vis ? 'show' : ''}`}>
          <span className="inline-block bg-mint/10 text-mint font-bold text-xs px-4 py-1.5 rounded-full tracking-widest mb-3">OUR FEATURES</span>
          <h2 className="text-navy font-black text-3xl md:text-4xl mb-3">CodeKidsが選ばれる理由</h2>
          <div className="w-12 h-1.5 bg-mint rounded-full mx-auto"/>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 reveal ${vis ? 'show' : ''}`} style={{ transitionDelay: '0.1s' }}>
          {[
            [n1,   '名',  '定員（少人数制）', '#3B9EFF'],
            [n2,   '%',  '保護者満足度',     '#2DD4A0'],
            [n3,   '名+', '卒業生数',         '#FF7B7B'],
            [n4,   '年',  '運営実績',         '#FFD94A'],
          ].map(([v, unit, label, color]) => (
            <div key={String(label)} className="bg-[#F0F9FF] rounded-2xl p-5 text-center">
              <div className="font-black text-3xl" style={{ color: String(color) }}>
                {v}<span className="text-lg">{unit}</span>
              </div>
              <div className="text-navy/55 text-xs mt-1.5 font-medium">{String(label)}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={f.title}
              className={`reveal ${vis ? 'show' : ''} flex gap-4 p-5 rounded-2xl bg-[#F8FBFF] border border-sky/10 hover:shadow-lg transition-all duration-300`}
              style={{ transitionDelay: `${0.12 + i * 0.07}s` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${f.color.split(' ')[0]}`}>
                {f.emoji}
              </div>
              <div>
                <h3 className="font-black text-navy text-sm mb-1.5">{f.title}</h3>
                <p className="text-navy/55 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   Courses (Age-based)
══════════════════════════════════════════════════════════ */
function Courses() {
  const [ref, vis] = useReveal(0.1)
  const [active, setActive] = useState(0)

  const courses = [
    {
      age: '6〜9歳', label: '小学生低学年',
      color: '#FF7B7B', bg: 'from-[#FF7B7B] to-[#FFB3B3]', icon: '🌱',
      name: 'スタータークラス',
      desc: 'Scratchを使ったビジュアルプログラミングで、プログラミングの楽しさを体験。論理的思考の基礎を育てます。',
      curriculum: ['Scratch基本操作', 'アニメーション制作', '簡単なゲーム作り', 'プレゼン発表'],
      price: '月額 8,800円〜', freq: '週1回 / 60分',
    },
    {
      age: '10〜12歳', label: '小学生高学年',
      color: '#3B9EFF', bg: 'from-[#3B9EFF] to-[#7EC8FF]', icon: '🚀',
      name: 'ジュニアクラス',
      desc: 'Python入門・Webデザインを本格的に学習。オリジナル作品を完成させ、発表する達成感を体験できます。',
      curriculum: ['Python基礎', 'HTML/CSS入門', 'ゲーム開発', 'Webサイト制作'],
      price: '月額 11,000円〜', freq: '週1回 / 90分',
    },
    {
      age: '13〜15歳', label: '中学生',
      color: '#2DD4A0', bg: 'from-[#2DD4A0] to-[#A7F3D0]', icon: '💻',
      name: 'アドバンスクラス',
      desc: 'Python・JavaScript・AIを深く学習。ポートフォリオ制作から発表まで、本格エンジニアへの第一歩。',
      curriculum: ['Python応用', 'JavaScript', 'AI/機械学習', 'ポートフォリオ制作'],
      price: '月額 14,300円〜', freq: '週2回 / 90分',
    },
  ]

  const c = courses[active]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="courses" className="py-24 bg-[#F0F9FF]">
      <div className="max-w-6xl mx-auto px-5">
        <div className={`text-center mb-14 reveal ${vis ? 'show' : ''}`}>
          <span className="inline-block bg-lemon/20 text-lemon-dark font-bold text-xs px-4 py-1.5 rounded-full tracking-widest mb-3">COURSES</span>
          <h2 className="text-navy font-black text-3xl md:text-4xl mb-3">年齢別コース</h2>
          <div className="w-12 h-1.5 bg-lemon rounded-full mx-auto mb-4"/>
          <p className="text-navy/60 text-base max-w-md mx-auto">お子さんの年齢と興味に合わせた3つのコースをご用意しています。</p>
        </div>

        {/* Tab buttons */}
        <div className={`flex justify-center gap-3 mb-8 flex-wrap reveal ${vis ? 'show' : ''}`}>
          {courses.map((c, i) => (
            <button key={c.label} onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full font-black text-sm transition-all duration-200 ${active === i ? 'text-white shadow-lg scale-105' : 'bg-white text-navy/60 hover:bg-sky/10'}`}
              style={active === i ? { background: c.color } : {}}
            >
              {c.icon} {c.label}（{c.age}）
            </button>
          ))}
        </div>

        {/* Course card */}
        <div className={`reveal ${vis ? 'show' : ''} bg-white rounded-3xl overflow-hidden shadow-xl`} key={active}>
          <div className={`bg-gradient-to-r ${c.bg} p-8 md:p-10 text-white`}>
            <div className="flex items-start gap-6 flex-wrap">
              <div className="text-6xl">{c.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-white/70 text-sm font-bold mb-1">{c.label}（{c.age}）</div>
                <h3 className="font-black text-2xl md:text-3xl mb-3">{c.name}</h3>
                <p className="text-white/85 leading-relaxed text-base max-w-xl">{c.desc}</p>
              </div>
            </div>
          </div>
          <div className="p-8 md:p-10 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h4 className="font-black text-navy mb-4">カリキュラム例</h4>
              <div className="grid grid-cols-2 gap-3">
                {c.curriculum.map((item, i) => (
                  <div key={item} className="flex items-center gap-2.5 bg-[#F0F9FF] rounded-xl px-4 py-3">
                    <span className="w-6 h-6 rounded-full text-white text-xs font-black flex items-center justify-center flex-shrink-0"
                      style={{ background: c.color }}
                    >{i + 1}</span>
                    <span className="text-navy font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#F0F9FF] rounded-2xl p-5">
                <div className="text-navy/50 text-xs font-bold mb-1">月謝</div>
                <div className="font-black text-navy text-lg" style={{ color: c.color }}>{c.price}</div>
              </div>
              <div className="bg-[#F0F9FF] rounded-2xl p-5">
                <div className="text-navy/50 text-xs font-bold mb-1">授業頻度</div>
                <div className="font-black text-navy text-sm">{c.freq}</div>
              </div>
              <a href="#trial"
                className="text-white font-black text-center py-4 rounded-2xl transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 shadow-lg"
                style={{ background: c.color }}
              >
                無料体験を申し込む →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   Works
══════════════════════════════════════════════════════════ */
function Works() {
  const [ref, vis] = useReveal(0.1)
  const works = [
    { emoji: '🎮', tag: 'ゲーム',    title: 'シューティングゲーム', author: '小5・K.T.さん',    color: '#3B9EFF', bg: '#EFF6FF', desc: 'Pythonで制作した本格的なシューティングゲーム。スコアランキングつき！' },
    { emoji: '🌐', tag: 'Web',       title: 'ポートフォリオサイト',  author: '中2・A.M.さん',    color: '#2DD4A0', bg: '#ECFDF5', desc: '自分の作品を紹介するWebサイト。アニメーションもすべて自作！' },
    { emoji: '🤖', tag: 'ロボット',  title: '自動障害物回避ロボット',author: '小6・S.H.さん',    color: '#FF7B7B', bg: '#FFF1F2', desc: 'センサーで障害物を検知して自動で避けるロボットを作成！' },
    { emoji: '🧠', tag: 'AI',        title: '手書き文字認識AI',      author: '中3・R.N.さん',    color: '#FFD94A', bg: '#FFFBEB', desc: '機械学習を使って自分で書いた文字を読み取るAIを開発！' },
    { emoji: '🎵', tag: 'アプリ',   title: '音楽リズムゲーム',       author: '小4・Y.K.さん',    color: '#3B9EFF', bg: '#EFF6FF', desc: 'Scratchで作った本格的なリズムゲーム。BGMも自作！' },
    { emoji: '📊', tag: 'データ',    title: '天気予報ダッシュボード', author: '中1・T.O.さん',    color: '#2DD4A0', bg: '#ECFDF5', desc: 'APIを使ってリアルタイムの天気を表示するWebアプリ！' },
  ]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className={`text-center mb-14 reveal ${vis ? 'show' : ''}`}>
          <span className="inline-block bg-coral/10 text-coral font-bold text-xs px-4 py-1.5 rounded-full tracking-widest mb-3">STUDENT WORKS</span>
          <h2 className="text-navy font-black text-3xl md:text-4xl mb-3">生徒の作品例</h2>
          <div className="w-12 h-1.5 bg-coral rounded-full mx-auto mb-4"/>
          <p className="text-navy/60 text-base max-w-md mx-auto">みんなが実際に作ったすごい作品を紹介！あなたも作れるようになります。</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {works.map((w, i) => (
            <div key={w.title}
              className={`reveal ${vis ? 'show' : ''} bg-[#F8FBFF] rounded-3xl overflow-hidden border border-sky/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group`}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {/* Preview area */}
              <div className="h-40 flex items-center justify-center relative overflow-hidden" style={{ background: w.bg }}>
                <span className="text-7xl group-hover:animate-bounce2 transition-all">{w.emoji}</span>
                <div className="absolute top-3 left-3">
                  <span className="text-white text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: w.color }}>{w.tag}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-20" style={{ background: w.color }}/>
              </div>
              <div className="p-5">
                <h3 className="font-black text-navy text-base mb-1">{w.title}</h3>
                <p className="text-navy/50 text-xs mb-2.5 font-bold">{w.author}</p>
                <p className="text-navy/60 text-sm leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   Voices (Parent Testimonials)
══════════════════════════════════════════════════════════ */
function Voices() {
  const [ref, vis] = useReveal(0.1)
  const voices = [
    { name: 'K.Tさん（小5・男の子のお母さま）', stars: 5, comment: '最初は「プログラミングって難しそう」と言っていた息子が、今では「学校に行く前にコード書いたよ！」って言うくらいハマっています。先生の説明がわかりやすく、毎回楽しそうに通っています。', tag: 'ゲーム制作コース', color: '#3B9EFF' },
    { name: 'A.Mさん（中2・女の子のお父さま）', stars: 5, comment: 'スクールに通ってから娘の論理的思考力が格段に伸びました。学校の数学も得意になったと聞いて驚いています。作ったWebサイトを自慢げに見せてくれる姿が嬉しいです。', tag: 'Webデザインコース', color: '#2DD4A0' },
    { name: 'S.Hさん（小6・男の子のお母さま）', stars: 5, comment: '少人数なので先生が丁寧に見てくれます。うちの子は少し内気でしたが、作品発表を通じて自信をつけたようで、今では発表が楽しみだと言っています！', tag: 'ロボットコース', color: '#FF7B7B' },
    { name: 'R.Nさん（中3・女の子のお母さま）', stars: 5, comment: 'AIについて学べるカリキュラムが充実していて、将来の進路選択の幅が広がりました。娘の「将来はエンジニアになりたい」という夢も後押ししてもらっています。', tag: 'AIコース', color: '#FFD94A' },
  ]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="voices" className="py-24 bg-[#F0F9FF]">
      <div className="max-w-6xl mx-auto px-5">
        <div className={`text-center mb-14 reveal ${vis ? 'show' : ''}`}>
          <span className="inline-block bg-sky/10 text-sky font-bold text-xs px-4 py-1.5 rounded-full tracking-widest mb-3">VOICES</span>
          <h2 className="text-navy font-black text-3xl md:text-4xl mb-3">保護者の声</h2>
          <div className="w-12 h-1.5 bg-sky rounded-full mx-auto mb-4"/>
          <p className="text-navy/60 text-base max-w-md mx-auto">実際に通っているご家庭からの嬉しいお声をご紹介します。</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {voices.map((v, i) => (
            <div key={v.name}
              className={`reveal ${vis ? 'show' : ''} bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2`}
              style={{ transitionDelay: `${i * 0.08}s`, borderColor: v.color + '33' }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: v.stars }).map((_, si) => (
                  <StarSVG key={si} size={18} color="#FFD94A"/>
                ))}
              </div>
              {/* Quote mark */}
              <div className="text-4xl font-black mb-2 leading-none" style={{ color: v.color, opacity: 0.3 }}>"</div>
              <p className="text-navy/70 text-sm leading-relaxed mb-4">{v.comment}</p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="font-bold text-navy text-sm">{v.name}</div>
                <span className="text-white text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: v.color }}>{v.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   Trial CTA
══════════════════════════════════════════════════════════ */
function TrialCTA() {
  const [ref, vis] = useReveal(0.15)
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="trial" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #1A6FD4 0%, #3B9EFF 50%, #2DD4A0 100%)' }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-8 left-[10%] animate-float"><StarSVG size={48} color="rgba(255,217,74,0.5)"/></div>
        <div className="absolute bottom-8 right-[8%] animate-floatSlow"><RocketSVG size={64}/></div>
        <div className="absolute top-1/2 left-[3%] animate-spinSlow opacity-20"><CodeBlockSVG size={64}/></div>
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-10" style={{ background: '#FFD94A', filter: 'blur(50px)' }}/>
      </div>

      <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
        <div className={`reveal ${vis ? 'show' : ''}`}>
          <div className="text-5xl mb-5 animate-bounce2">🎮</div>
          <h2 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4">
            まずは<span className="text-lemon">無料体験</span>から<br/>始めてみよう！
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            入会前に実際の授業を体験できます。<br/>
            お子さんが楽しめるか、無料でお試しいただけます。予約は1分で完了！
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['✅ 完全無料', '✅ 予約3分で完了', '✅ 入会強要なし', '✅ 全コース対応'].map(t => (
              <span key={t} className="bg-white/20 backdrop-blur-sm text-white font-bold text-sm px-4 py-2 rounded-full border border-white/30">{t}</span>
            ))}
          </div>

          {/* Simple form-like CTA */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/20 max-w-xl mx-auto">
            <p className="text-white font-bold mb-5 text-sm">コースを選んで体験を申し込む</p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[['🌱', 'スタータークラス', '6〜9歳'], ['🚀', 'ジュニアクラス', '10〜12歳'], ['💻', 'アドバンスクラス', '13〜15歳']].map(([icon, label, age]) => (
                <button key={String(label)}
                  className="bg-white/20 hover:bg-white/35 text-white rounded-2xl p-3 text-center transition-all duration-200 hover:-translate-y-0.5 border border-white/20"
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="font-black text-xs leading-tight">{label}</div>
                  <div className="text-white/70 text-[10px] mt-0.5">{age}</div>
                </button>
              ))}
            </div>
            <a href="#"
              className="block bg-lemon text-navy font-black text-base py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
            >
              🎉 無料体験を予約する →
            </a>
            <p className="text-white/50 text-xs mt-3">※ 担当者より1〜2営業日以内にご連絡します</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════════════ */
function FAQ() {
  const [ref, vis] = useReveal(0.1)
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    { q: 'プログラミング経験がなくても大丈夫ですか？', a: 'もちろんです！ほとんどの生徒さんが未経験でスタートしています。最初はScratchのようなビジュアルツールから始めるので、小学生でも楽しく学べます。' },
    { q: 'パソコンを持っていないのですが…', a: '教室にはパソコンを完備しています。オンライン受講の場合は、ご家庭のパソコン・タブレットが必要になりますが、スペックのご相談も承っています。' },
    { q: '途中でコースを変更できますか？',             a: 'はい、1ヶ月前にご連絡いただければコース変更が可能です。お子さんの成長に合わせて柔軟に対応します。' },
    { q: '振替授業はありますか？',                     a: '毎月2回まで振替対応しています。お休みの場合は前日までにご連絡ください。振替は同月内に実施します。' },
    { q: '費用はどのくらいかかりますか？',             a: 'コースにより月額8,800円〜14,300円です（入会金別途）。教材費は月謝に含まれています。詳しくはお気軽にご相談ください。' },
    { q: '親が同席することはできますか？',             a: 'もちろんです！特に最初の数回は保護者の方の見学を推奨しています。授業の様子を実際にご覧いただけます。' },
  ]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-5">
        <div className={`text-center mb-14 reveal ${vis ? 'show' : ''}`}>
          <span className="inline-block bg-lemon/20 text-lemon-dark font-bold text-xs px-4 py-1.5 rounded-full tracking-widest mb-3">FAQ</span>
          <h2 className="text-navy font-black text-3xl md:text-4xl mb-3">よくある質問</h2>
          <div className="w-12 h-1.5 bg-lemon rounded-full mx-auto"/>
        </div>

        <div className={`flex flex-col gap-3 reveal ${vis ? 'show' : ''}`} style={{ transitionDelay: '0.1s' }}>
          {faqs.map((f, i) => (
            <div key={i}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${open === i ? 'border-sky/50 shadow-md' : 'border-sky/15 bg-[#F8FBFF]'}`}
            >
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-sky/5 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-sky text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">Q</span>
                  <span className="font-bold text-navy text-sm leading-relaxed">{f.q}</span>
                </div>
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open === i ? 'border-sky bg-sky text-white rotate-45' : 'border-sky/30 text-sky/50'}`}>
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </div>
              </button>
              <div className={`faq-body ${open === i ? 'open' : ''}`}>
                <div className="px-5 pb-5 pt-1 border-t border-sky/10">
                  <div className="flex items-start gap-3 pt-3">
                    <span className="w-7 h-7 rounded-full bg-mint/20 text-mint text-xs font-black flex items-center justify-center flex-shrink-0">A</span>
                    <p className="text-navy/65 text-sm leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   Footer
══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: '#0F1B32' }} className="text-white">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-sky flex items-center justify-center">
                <span className="text-white font-black text-sm">&lt;/&gt;</span>
              </div>
              <span className="font-black text-xl">Code<span className="text-lemon">Kids</span></span>
            </div>
            <p className="text-white/45 text-sm leading-relaxed mb-4">
              子どもたちが「プログラミングって楽しい！」と思える環境づくりを大切にしています。<br/>
              東京・大阪・名古屋に教室あり。全国オンライン受講対応。
            </p>
            <div className="flex gap-3">
              {['Twitter', 'Instagram', 'YouTube', 'LINE'].map(s => (
                <button key={s} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-sky/30 transition-colors flex items-center justify-center text-xs font-bold">{s[0]}</button>
              ))}
            </div>
          </div>

          {[
            { title: 'コース',     links: ['スタータークラス（6-9歳）', 'ジュニアクラス（10-12歳）', 'アドバンスクラス（13-15歳）', '料金案内'] },
            { title: 'CodeKids',  links: ['スクールについて', 'アクセス', '講師紹介', 'よくある質問', '採用情報'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-sky text-xs font-black tracking-widest mb-4 uppercase">{col.title}</h4>
              {col.links.map(l => (
                <a key={l} href="#"
                  className="block text-white/40 hover:text-white/75 text-sm py-1.5 transition-colors"
                >{l}</a>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-wrap justify-between gap-3 items-center">
          <p className="text-white/25 text-xs">© 2024 CodeKids All Rights Reserved.</p>
          <div className="flex gap-4">
            {['プライバシーポリシー', '利用規約', 'お問い合わせ'].map(l => (
              <a key={l} href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════════
   App
══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <LearnSection />
      <Features />
      <Courses />
      <Works />
      <Voices />
      <TrialCTA />
      <FAQ />
      <Footer />
    </>
  )
}
