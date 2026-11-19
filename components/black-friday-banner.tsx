'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const saleStartsAt = new Date(2026, 10, 27).getTime()
const saleEndsAt = new Date(2026, 11, 3).getTime()

function getCountdown(target: number, now: number) {
  const totalSeconds = Math.max(0, Math.floor((target - now) / 1000))
  const days = Math.floor(totalSeconds / 86_400)
  const hours = Math.floor((totalSeconds % 86_400) / 3_600)
  const minutes = Math.floor((totalSeconds % 3_600) / 60)
  const seconds = totalSeconds % 60

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

export function BlackFridayBanner() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    const updateClock = () => setNow(Date.now())
    updateClock()
    const intervalId = window.setInterval(updateClock, 1_000)

    return () => window.clearInterval(intervalId)
  }, [])

  const hasStarted = now !== null && now >= saleStartsAt
  const hasEnded = now !== null && now >= saleEndsAt

  if (hasEnded) return null

  const countdown = now === null ? null : getCountdown(hasStarted ? saleEndsAt : saleStartsAt, now)
  const timeUnits = [
    { label: 'Days', value: countdown?.days ?? '--' },
    { label: 'Hours', value: countdown?.hours ?? '--' },
    { label: 'Mins', value: countdown?.minutes ?? '--' },
    { label: 'Secs', value: countdown?.seconds ?? '--' },
  ]
  const timerLabel = hasStarted ? 'Offer ends in' : 'Starts in'
  const timerDescription = countdown
    ? `${timerLabel} ${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds`
    : 'Countdown to Booking.com Black Friday deals'

  return <section className="black-friday-banner" aria-labelledby="black-friday-title">
    <div className="black-friday-copy">
      <p className="black-friday-eyebrow"><span>Booking.com</span> Black Friday</p>
      <h2 id="black-friday-title">Black Friday stays, for less.</h2>
      <p>{hasStarted ? 'Deals are live now through 2 December 2026.' : 'Deals start Friday 27 November and run until 2 December 2026.'}</p>
    </div>
    <div className="black-friday-timer-panel">
      <p className="black-friday-timer-label">{timerLabel}</p>
      <div className="black-friday-countdown" role="timer" aria-label={timerDescription}>
        {timeUnits.map((unit) => <div className="black-friday-time-unit" key={unit.label}><strong>{unit.value}</strong><small>{unit.label}</small></div>)}
      </div>
      <small className="black-friday-timezone">Local time</small>
    </div>
    <a className="primary-btn black-friday-cta" href="https://www.tkqlhce.com/ka108gv30v2IKJKSMJKPKIKQMRLOJR" target="_blank" rel="sponsored noopener noreferrer">Save with Black Friday Deals until 2 Dec 2026 <ArrowRight size={15} aria-hidden="true" /></a>
    <img className="black-friday-tracking-pixel" src="https://www.awltovhc.com/4m115z15u-yJLKLTNKLQLJLRNSMPKS" width={1} height={1} alt="" aria-hidden="true" />
  </section>
}
