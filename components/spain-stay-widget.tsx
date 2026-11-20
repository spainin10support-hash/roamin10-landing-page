'use client'

import { useEffect, useState } from 'react'

type WidgetLayout = 'tall' | 'broad'

export function SpainStayWidget({ city }: { city: string }) {
  const [layout, setLayout] = useState<WidgetLayout | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const updateLayout = () => setLayout(mediaQuery.matches ? 'broad' : 'tall')

    updateLayout()
    mediaQuery.addEventListener('change', updateLayout)

    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  return <section className="booking-widget-card" aria-labelledby="spain-booking-widget-title">
    <div className="booking-widget-heading">
      <div>
        <p className="eyebrow">Search Booking.com</p>
        <h2 id="spain-booking-widget-title">Find a stay in {city}</h2>
      </div>
      <p>Compare current availability and prices through Booking.com.</p>
    </div>
    {layout && <iframe
      className="booking-widget-frame booking-widget-iframe"
      src={layout === 'tall' ? '/stay-widget-tall.html' : '/stay-widget-broad.html'}
      title="Search stays on Booking.com"
      width="100%"
      height={layout === 'tall' ? 620 : 340}
      style={{ border: 0 }}
    />}
  </section>
}
