import { useState, useEffect, useRef } from 'react'

/* ─── Images ─── */
import heroBearImg from './assets/hero-bear.jpg'
import coinLogoImg from './assets/coin-logo.jpg'

/* ════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK (appear on scroll)
   ════════════════════════════════════════════ */
function useInView(options = {}) {
    const ref = useRef(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true)
                observer.unobserve(entry.target)
            }
        }, { threshold: 0.15, ...options })

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return [ref, isInView]
}

/* ─── Animated Section wrapper ─── */
function AnimatedSection({ children, className = '', style = {} }) {
    const [ref, isInView] = useInView()
    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...style,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
        >
            {children}
        </div>
    )
}

/* ════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════ */
const CONTRACT_ADDRESS = '0x000...DeployAfterLaunch'

const STEPS = [
    { num: 1, title: 'Купи $GBEAR', desc: 'Приобрети токены на децентрализованной бирже Trader Joe (Avalanche C-Chain). Тебе понадобится кошелёк MetaMask и немного AVAX на газ.' },
    { num: 2, title: 'Подключи кошелёк', desc: 'При оформлении заказа на гранит подключи свой кошелёк. Мы автоматически проверим баланс $GBEAR и определим твой уровень скидки.' },
    { num: 3, title: 'Получи скидку', desc: 'Чем больше токенов на балансе — тем ниже цена. Токены не списываются: они остаются у тебя как "клубная карта" навсегда.' },
]

const TIERS = [
    {
        icon: '🪨',
        name: 'Галька',
        requirement: 'Hold 1 000 $GBEAR',
        discount: '3%',
        perks: ['Скидка 3% на любой заказ', 'Доступ в закрытый Telegram-канал', 'Ранний доступ к новостям'],
        featured: false,
    },
    {
        icon: '🧱',
        name: 'Булыжник',
        requirement: 'Hold 10 000 $GBEAR',
        discount: '7%',
        perks: ['Скидка 7% на любой заказ', 'Приоритетная обработка заявок', 'Бесплатная доставка (регион)'],
        featured: false,
    },
    {
        icon: '⛰️',
        name: 'Скала',
        requirement: 'Hold 100 000 $GBEAR',
        discount: '15%',
        perks: ['Скидка 15% на любой заказ', 'Эксклюзивные цвета и текстуры', 'Персональный менеджер', 'Приглашение на карьер'],
        featured: true,
    },
    {
        icon: '🏔️',
        name: 'Гора',
        requirement: 'Hold 1 000 000+ $GBEAR',
        discount: 'VIP',
        perks: ['Индивидуальные условия', 'Партнёрская программа', 'Голосования по развитию', 'Доля от реферальных продаж'],
        featured: false,
    },
]

const TOKENOMICS = [
    { label: 'Ликвидность (LP)', value: '80%', color: '#e8420c', desc: 'Заблокирована навсегда' },
    { label: 'Маркетинг', value: '10%', color: '#ff6a00', desc: 'Листинги, реклама, блогеры' },
    { label: 'Команда', value: '10%', color: '#3a3a48', desc: 'Заморожена на 12 месяцев' },
]

const ROADMAP = [
    { quarter: 'Q1 2026', title: 'Запуск', items: ['Деплой контракта на Avalanche', 'Листинг на Trader Joe', 'Запуск сайта и соцсетей', 'Первичный маркетинг'], active: true },
    { quarter: 'Q2 2026', title: 'Рост', items: ['Первые отгрузки гранита со скидкой', 'Партнёрства с карьерами', 'Листинг на CoinGecko & CMC', 'NFT-коллекция "Granite Rocks"'], active: false },
    { quarter: 'Q3 2026', title: 'Масштаб', items: ['Листинг на CEX (Bybit / MEXC)', 'Расширение ассортимента гранита', 'DAO-голосования для холдеров', 'Международные продажи'], active: false },
]

/* ════════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════════ */
function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const links = [
        { label: 'Как это работает', href: '#how' },
        { label: 'Скидки', href: '#tiers' },
        { label: 'Токеномика', href: '#tokenomics' },
        { label: 'Roadmap', href: '#roadmap' },
        { label: 'Сообщество', href: '#community' },
    ]

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <a href="#" className="navbar-logo">
                        <img src={coinLogoImg} alt="GraniteBear Logo" />
                        <span>Granite<span className="logo-accent">Bear</span></span>
                    </a>

                    <div className="navbar-links">
                        {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
                    </div>

                    <div className="navbar-cta">
                        <a href="#" className="btn btn-primary btn-sm">Купить $GBEAR</a>
                    </div>

                    <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Menu">
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* Mobile overlay */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close">✕</button>
                {links.map(l => (
                    <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
                ))}
                <a href="#" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Купить $GBEAR</a>
            </div>
        </>
    )
}

/* ════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════ */
function Hero() {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(CONTRACT_ADDRESS)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section className="hero" id="hero">
            {/* Background */}
            <div className="hero-bg">
                <div className="hero-bg-image" style={{ backgroundImage: `url(${heroBearImg})` }} />
                <div className="hero-bg-overlay" />
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge badge-avalanche">🔺 Avalanche C-Chain</span>
                    </div>

                    <h1 className="hero-title">
                        Первый в мире токен,<br />
                        <span className="lava-text">твёрдый как Гранит.</span>
                    </h1>

                    <p className="hero-description">
                        $GBEAR — мем-токен на Avalanche, который даёт реальные скидки
                        на сырьё и изделия из натурального гранита. Не воздух — камень.
                    </p>

                    <div className="hero-buttons">
                        <a href="#" className="btn btn-primary">
                            🔥 Купить $GBEAR
                        </a>
                        <a href="#tiers" className="btn btn-secondary">
                            Уровни скидок ↓
                        </a>
                    </div>

                    <div className="hero-contract" onClick={handleCopy} title="Нажми, чтобы скопировать">
                        <span className="hero-contract-label">Контракт:</span>
                        <span className="hero-contract-address">{CONTRACT_ADDRESS}</span>
                        <span className="hero-contract-copy">{copied ? '✓ Скопировано' : '📋 Copy'}</span>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-image-wrapper">
                        <div className="hero-image-glow" />
                        <img src={coinLogoImg} alt="GraniteBear Coin" />
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ════════════════════════════════════════════
   HOW IT WORKS
   ════════════════════════════════════════════ */
function HowItWorks() {
    return (
        <section className="section how-it-works" id="how">
            <div className="container">
                <AnimatedSection>
                    <h2 className="section-title">Как это <span className="accent">работает?</span></h2>
                    <p className="section-subtitle">
                        Мы не продаём гранит за токены. Мы даём элитный клуб, где камень покупается дешевле. Всё в рамках законов РФ.
                    </p>
                </AnimatedSection>

                <div className="steps-grid">
                    {STEPS.map((step, i) => (
                        <AnimatedSection key={step.num} style={{ transitionDelay: `${i * 0.15}s` }}>
                            <div className="step-card card">
                                <div className="step-number">{step.num}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ════════════════════════════════════════════
   TIER SYSTEM
   ════════════════════════════════════════════ */
function TierSystem() {
    return (
        <section className="section tiers" id="tiers">
            <div className="container">
                <AnimatedSection>
                    <h2 className="section-title">Уровни <span className="accent">скидок</span></h2>
                    <p className="section-subtitle">
                        Держи $GBEAR на кошельке — получай скидку на натуральный гранит. Чем больше токенов, тем ниже цена.
                    </p>
                </AnimatedSection>

                <div className="tiers-grid">
                    {TIERS.map((tier, i) => (
                        <AnimatedSection key={tier.name} style={{ transitionDelay: `${i * 0.1}s` }}>
                            <div className={`tier-card card ${tier.featured ? 'featured' : ''}`}>
                                <div className="tier-icon">{tier.icon}</div>
                                <div className="tier-name">{tier.name}</div>
                                <div className="tier-requirement">{tier.requirement}</div>
                                <div className="tier-discount">{tier.discount}</div>
                                <ul className="tier-perks">
                                    {tier.perks.map(p => <li key={p}>{p}</li>)}
                                </ul>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ════════════════════════════════════════════
   TOKENOMICS
   ════════════════════════════════════════════ */
function Tokenomics() {
    return (
        <section className="section tokenomics" id="tokenomics">
            <div className="container">
                <AnimatedSection>
                    <h2 className="section-title">Токено<span className="accent">мика</span></h2>
                    <p className="section-subtitle">
                        Прозрачное распределение. Ликвидность заблокирована. Контракт верифицирован.
                    </p>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="tokenomics-content">
                        {/* Chart */}
                        <div className="tokenomics-chart">
                            <div className="donut-chart">
                                <div className="donut-center">
                                    <div className="total">1B</div>
                                    <div className="label">$GBEAR</div>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="tokenomics-details">
                            {TOKENOMICS.map(t => (
                                <div className="token-stat" key={t.label}>
                                    <div className="token-stat-color" style={{ background: t.color }} />
                                    <div className="token-stat-info">
                                        <h4>{t.label}</h4>
                                        <p>{t.desc}</p>
                                    </div>
                                    <div className="token-stat-value">{t.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Features row */}
                <AnimatedSection>
                    <div className="token-features">
                        <div className="token-feature">
                            <h4>0% Tax</h4>
                            <p>Без комиссий на покупку и продажу</p>
                        </div>
                        <div className="token-feature">
                            <h4>LP Locked 🔒</h4>
                            <p>Ликвидность заблокирована навсегда</p>
                        </div>
                        <div className="token-feature">
                            <h4>Renounced ✅</h4>
                            <p>Контракт отречён, без rug-pull</p>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}

/* ════════════════════════════════════════════
   ROADMAP
   ════════════════════════════════════════════ */
function Roadmap() {
    return (
        <section className="section" id="roadmap">
            <div className="container">
                <AnimatedSection>
                    <h2 className="section-title">Дорожная <span className="accent">карта</span></h2>
                    <p className="section-subtitle">
                        От запуска до международных продаж гранита со скидкой для холдеров.
                    </p>
                </AnimatedSection>

                <div className="roadmap-timeline">
                    {ROADMAP.map((phase, i) => (
                        <AnimatedSection key={phase.quarter} style={{ transitionDelay: `${i * 0.15}s` }}>
                            <div className="roadmap-item">
                                <div className={`roadmap-dot ${phase.active ? 'active' : ''}`} />
                                <div className="roadmap-card card">
                                    <div className="quarter">{phase.quarter}</div>
                                    <h3>{phase.title}</h3>
                                    <ul>
                                        {phase.items.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ════════════════════════════════════════════
   COMMUNITY
   ════════════════════════════════════════════ */
function Community() {
    return (
        <section className="section community" id="community">
            <div className="community-bg" />
            <div className="container">
                <div className="community-content">
                    <AnimatedSection>
                        <h2 className="section-title">Granite <span className="accent">Hands</span> 🤘</h2>
                        <p className="section-subtitle">
                            Присоединяйся к сообществу каменных рук. Мемы, новости, скидки на гранит и вайб тяжёлого люкса.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection>
                        <div className="community-links">
                            <a href="#" className="community-link">
                                <span className="community-link-icon">✈️</span>
                                Telegram
                            </a>
                            <a href="#" className="community-link">
                                <span className="community-link-icon">🐦</span>
                                Twitter (X)
                            </a>
                            <a href="#" className="community-link">
                                <span className="community-link-icon">📊</span>
                                DexScreener
                            </a>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection>
                        <div className="community-stats">
                            <div className="community-stat">
                                <div className="number">—</div>
                                <div className="label">Холдеров</div>
                            </div>
                            <div className="community-stat">
                                <div className="number">—</div>
                                <div className="label">В Telegram</div>
                            </div>
                            <div className="community-stat">
                                <div className="number">—</div>
                                <div className="label">Транзакций</div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}

/* ════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════ */
function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="navbar-logo">
                            <img src={coinLogoImg} alt="GraniteBear" />
                            <span>Granite<span className="logo-accent">Bear</span></span>
                        </div>
                        <p>
                            Первый в мире мем-токен, обеспеченный твёрдостью натурального гранита. Держи $GBEAR — покупай камень дешевле.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4>Навигация</h4>
                        <a href="#how">Как это работает</a>
                        <a href="#tiers">Уровни скидок</a>
                        <a href="#tokenomics">Токеномика</a>
                        <a href="#roadmap">Roadmap</a>
                    </div>

                    <div className="footer-col">
                        <h4>Сообщество</h4>
                        <a href="#">Telegram</a>
                        <a href="#">Twitter (X)</a>
                        <a href="#">DexScreener</a>
                    </div>

                    <div className="footer-col">
                        <h4>Ресурсы</h4>
                        <a href="#">Каталог гранита</a>
                        <a href="#">Whitepaper</a>
                        <a href="#">Snowtrace (контракт)</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 GraniteBear. Все права защищены.</p>
                    <div className="footer-disclaimer">
                        Токен $GBEAR является утилитарным скидочным инструментом (Utility Token)
                        и не является средством платежа. Не является финансовой рекомендацией.
                    </div>
                </div>
            </div>
        </footer>
    )
}

/* ════════════════════════════════════════════
   APP
   ════════════════════════════════════════════ */
export default function App() {
    return (
        <>
            <Navbar />
            <Hero />
            <HowItWorks />
            <TierSystem />
            <Tokenomics />
            <Roadmap />
            <Community />
            <Footer />
        </>
    )
}
