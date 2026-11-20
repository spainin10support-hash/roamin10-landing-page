'use client'

import { useEffect, useRef } from 'react'

interface WidgetSettings {
  destinationurloverride: string
  ss?: string
  start?: string
  end?: string
  languagecode?: string
  selected_currency?: string
  clickLabel?: string
}

interface WidgetVariant {
  layout: 'wide' | 'vertical'
  selector: string
  trackingPixel: string
  settings: WidgetSettings
}

interface BookingAffiliateWidgetApi {
  AffiliateWidget: new (options: {
    iframeSettings: { selector: string; responsive: boolean }
    widgetSettings: WidgetSettings
  }) => unknown
}

const WIDE_WIDGET: WidgetVariant = {
  layout: 'wide',
  selector: 'bookingAffiliateWidget_c848139d-9dab-4241-bf2e-93c7147e270d',
  trackingPixel: 'https://www.awltovhc.com/image-101930161-17323125',
  settings: {
    destinationurloverride: 'http://www.jdoqocy.com/click-101930161-17323125?sid=',
  },
}

const VERTICAL_WIDGET: WidgetVariant = {
  layout: 'vertical',
  selector: 'bookingAffiliateWidget_e893728b-511b-4a33-a796-65c92eaae72a',
  trackingPixel: 'https://www.ftjcfx.com/image-101930161-17388354',
  settings: {
    destinationurloverride: 'http://www.jdoqocy.com/click-101930161-17388354?sid=',
    ss: 'Barcelona',
    start: '2027-02-10',
    end: '2027-02-15',
    languagecode: 'en',
    selected_currency: 'EUR',
    clickLabel: 'publisher-trip-widget',
  },
}

export function BarcelonaStayWidget() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    const mediaQuery = window.matchMedia('(min-width: 769px)')
    let activeScript: HTMLScriptElement | null = null
    let trackingPixel: HTMLImageElement | null = null
    let observer: MutationObserver | null = null
    let iframeTimeout: number | undefined

    const cleanupWidget = () => {
      if (iframeTimeout !== undefined) {
        window.clearTimeout(iframeTimeout)
        iframeTimeout = undefined
      }
      observer?.disconnect()
      observer = null
      trackingPixel?.remove()
      trackingPixel = null
      activeScript?.remove()
      activeScript = null
      container.replaceChildren()
      container.removeAttribute('id')
      delete section.dataset.widgetLayout
      section.hidden = true
    }

    const loadWidget = (variant: WidgetVariant) => {
      cleanupWidget()
      container.id = variant.selector
      section.dataset.widgetLayout = variant.layout

      const script = document.createElement('script')
      activeScript = script
      script.src = 'https://www.booking.com/affiliate/prelanding_sdk'
      script.async = true
      script.onload = () => {
        if (activeScript !== script) return

        const bookingApi = (window as Window & { Booking?: BookingAffiliateWidgetApi }).Booking
        if (!bookingApi?.AffiliateWidget) {
          cleanupWidget()
          return
        }

        const revealWidget = () => {
          if (activeScript !== script) return
          section.hidden = false
          if (iframeTimeout !== undefined) {
            window.clearTimeout(iframeTimeout)
            iframeTimeout = undefined
          }
          observer?.disconnect()
          observer = null
        }

        let observedIframe: HTMLIFrameElement | null = null
        const observeIframe = () => {
          const iframe = container.querySelector('iframe')
          if (!iframe || iframe === observedIframe) return
          observedIframe = iframe
          if (!iframe.title) iframe.title = 'Search stays in Barcelona on Booking.com'
          iframe.addEventListener('load', revealWidget, { once: true })
        }

        observer = new MutationObserver(observeIframe)
        observer.observe(container, { childList: true, subtree: true })

        try {
          new bookingApi.AffiliateWidget({
            iframeSettings: { selector: variant.selector, responsive: true },
            widgetSettings: variant.settings,
          })
          observeIframe()
        } catch {
          cleanupWidget()
          return
        }

        const pixel = document.createElement('img')
        pixel.src = variant.trackingPixel
        pixel.width = 1
        pixel.height = 1
        pixel.alt = ''
        pixel.setAttribute('border', '0')
        pixel.setAttribute('aria-hidden', 'true')
        pixel.style.position = 'absolute'
        pixel.style.width = '1px'
        pixel.style.height = '1px'
        section.append(pixel)
        trackingPixel = pixel

        iframeTimeout = window.setTimeout(() => {
          if (activeScript === script && section.hidden) cleanupWidget()
        }, 20000)
      }
      script.onerror = () => {
        if (activeScript === script) cleanupWidget()
      }
      document.head.appendChild(script)
    }

    const selectWidget = () => loadWidget(mediaQuery.matches ? WIDE_WIDGET : VERTICAL_WIDGET)
    selectWidget()
    mediaQuery.addEventListener('change', selectWidget)

    return () => {
      mediaQuery.removeEventListener('change', selectWidget)
      cleanupWidget()
    }
  }, [])

  return <section ref={sectionRef} className="booking-widget-card booking-widget-card--responsive" aria-labelledby="barcelona-booking-widget-title" hidden>
    <div className="booking-widget-heading"><div><p className="eyebrow">Search Booking.com</p><h2 id="barcelona-booking-widget-title">Find a stay in Barcelona</h2></div><p>Compare current availability and prices through Booking.com.</p></div>
    <div ref={containerRef} className="booking-widget-frame" />
  </section>
}
