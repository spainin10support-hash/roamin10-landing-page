'use client'

import Script from 'next/script'
import { useEffect, useId } from 'react'

interface BookingAffiliateWidgetConstructor {
  new (options: { iframeSettings: { selector: string; responsive: boolean }; widgetSettings: { destinationurloverride: string } }): unknown
}

declare global {
  interface Window {
    Booking?: { AffiliateWidget: BookingAffiliateWidgetConstructor }
  }
}

const TRACKING_URL = 'http://www.jdoqocy.com/click-101704146-17323125?sid='

export function BookingWidget({ city, hotelName }: { city: string; hotelName?: string }) {
  const rawId = useId()
  const selector = `booking-widget-${rawId.replace(/:/g, '')}`

  function initializeWidget() {
    if (!window.Booking?.AffiliateWidget || document.getElementById(selector)?.children.length) return
    new window.Booking.AffiliateWidget({
      iframeSettings: { selector, responsive: true },
      widgetSettings: { destinationurloverride: TRACKING_URL },
    })
  }

  useEffect(() => {
    initializeWidget()
  }, [selector])

  return <section className="booking-widget-card" aria-labelledby={`${selector}-title`}><Script src="https://www.booking.com/affiliate/prelanding_sdk" strategy="afterInteractive" onLoad={initializeWidget} /><div className="booking-widget-heading"><div><p className="eyebrow">Search Booking.com</p><h2 id={`${selector}-title`}>{hotelName ? `Check ${hotelName}` : `Find a stay in ${city}`}</h2></div><p>Compare current availability and prices through Booking.com.</p></div><div className="booking-widget-frame" id={selector} /></section>
}
