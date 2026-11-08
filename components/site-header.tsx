'use client'

import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type SiteHeaderProps = { cityPage?: boolean }

export function SiteHeader({ cityPage = false }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)
      setHidden(currentY > lastY && currentY > 88)
      lastY = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = cityPage
    ? [{ label: 'Destinations', href: '/#destinations' }, { label: 'Forecasts', href: '/#forecasts' }, { label: 'Book a trip', href: '/#book' }]
    : [{ label: 'Destinations', href: '#destinations' }, { label: 'Forecasts', href: '#forecasts' }, { label: 'Book a trip', href: '#book' }]
  const ctaHref = cityPage ? '/#destinations' : '#destinations'
  const ctaLabel = cityPage ? 'Explore the edit' : 'Explore the edit'

  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
    <Link className="brand" href="/"><img className="brand-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-512-TFDNlprL9fflJnjafy37Ehvg0pyq75.png" alt="Roamin10" width="40" height="40" /><span>roamin<span>10</span></span></Link>
    <nav className={menuOpen ? 'open' : ''} aria-label="Primary navigation">
      {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
      <a href="https://roamin10.com/privacy.html" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Privacy</a>
      <Link className="header-cta mobile-cta" href={ctaHref} onClick={() => setMenuOpen(false)}>{ctaLabel} <ArrowRight size={15} /></Link>
    </nav>
    <Link className="header-cta desktop-cta" href={ctaHref}>{ctaLabel} <ArrowRight size={15} /></Link>
    <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    {cityPage && <span className="sr-only">Back to destinations</span>}
  </header>
}
