'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const saleEndsAt = new Date(2026, 11, 3).getTime()

export function BlackFridayBanner() {
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const millisecondsUntilExpiry = saleEndsAt - Date.now()

    if (millisecondsUntilExpiry <= 0) {
      setIsExpired(true)
      return
    }

    const timeoutId = window.setTimeout(() => setIsExpired(true), millisecondsUntilExpiry)
    return () => window.clearTimeout(timeoutId)
  }, [])

  if (isExpired) return null

  return <section className="black-friday-banner" aria-labelledby="black-friday-title">
    <div className="black-friday-copy">
      <p className="black-friday-eyebrow"><span>Booking.com</span> Black Friday</p>
      <h2 id="black-friday-title">Black Friday stays, for less.</h2>
      <p>Up to 40% off selected hotels and flights. The offer ends at 00:00 on 3 December 2026.</p>
    </div>
    <a className="primary-btn black-friday-cta" href="https://www.tkqlhce.com/ka108gv30v2IKJKSMJKPKIKQMRLOJR" target="_blank" rel="sponsored noopener noreferrer">Save with Black Friday Deals until 2 Dec 2026 <ArrowRight size={15} aria-hidden="true" /></a>
    <img className="black-friday-tracking-pixel" src="https://www.awltovhc.com/4m115z15u-yJLKLTNKLQLJLRNSMPKS" width={1} height={1} alt="" aria-hidden="true" />
  </section>
}
