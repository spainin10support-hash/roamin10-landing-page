'use client'

import type { MouseEvent, ReactNode } from 'react'

export function AffiliateLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    window.open(href, '_blank', 'noopener')
  }

  return <a className={className} href={href} target="_blank" rel="sponsored noopener" onClick={handleClick}>{children}</a>
}
