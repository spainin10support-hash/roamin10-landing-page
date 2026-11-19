import { ArrowRight, Check, ChevronDown, Minus, X } from 'lucide-react'
import { CollapseComparisonButton } from '@/components/collapse-comparison-button'

type FeatureValue = { included: boolean; label: string }
type Feature = { name: string; free: FeatureValue; premium: FeatureValue }
type FeatureGroup = { name: string; features: Feature[] }

const included = (label = 'Included'): FeatureValue => ({ included: true, label })
const excluded = (): FeatureValue => ({ included: false, label: 'Not included' })

const groups: FeatureGroup[] = [
  {
    name: 'Sarah AI',
    features: [
      { name: 'Day 1 itinerary', free: included(), premium: included() },
      { name: 'Full multi-day itinerary (Day 2–14)', free: excluded(), premium: included() },
      { name: 'Sarah chat', free: included('3 questions'), premium: included('Unlimited') },
      { name: 'Live research (timetables, fares, availability)', free: included('1 lookup'), premium: included('Unlimited') },
      { name: 'In-chat nudges (packing checklist / expenses)', free: excluded(), premium: included() },
    ],
  },
  {
    name: 'App features & content',
    features: [
      { name: 'Base country/city guides (Top 5, restaurants, hidden gems, flights, areas, weather, transport)', free: included(), premium: included() },
      { name: 'Fiestas, phrases, legal and help pages', free: included(), premium: included() },
      { name: 'Currency converter', free: included(), premium: included() },
      { name: 'Neighbourhood deep-dives (safety, walkability, best-for, tips)', free: excluded(), premium: included() },
      { name: 'Inter-city route planner (prices, times, booking links)', free: excluded(), premium: included() },
      { name: 'Live inter-city rail feed', free: excluded(), premium: included() },
      { name: 'Pharmacy & hospital locator (Near Me)', free: excluded(), premium: included() },
      { name: 'Offline city/country downloads', free: excluded(), premium: included() },
      { name: 'My Saved Cities with personal notes', free: excluded(), premium: included() },
      { name: 'Expense tracker', free: excluded(), premium: included() },
      { name: 'Travel checklist', free: excluded(), premium: included() },
      { name: 'Exclusive deals', free: excluded(), premium: included() },
      { name: 'Saved trips (view / reload itineraries)', free: excluded(), premium: included() },
    ],
  },
  {
    name: 'Plan controls',
    features: [
      { name: 'Start 7-day free trial, then £14.99/year', free: included('Available'), premium: { included: false, label: '—' } },
      { name: 'Restore purchases', free: included(), premium: included() },
      { name: 'Manage subscription', free: included(), premium: included() },
    ],
  },
]

function FeatureValueCell({ value }: { value: FeatureValue }) {
  const Icon = value.label === '—' ? Minus : value.included ? Check : X
  return <span className={`feature-value${value.included ? ' is-included' : ' is-excluded'}`}><Icon size={15} aria-hidden="true" /><span>{value.label}</span></span>
}

export function FeatureComparison() {
  return <section className="app-intro" id="app" aria-labelledby="app-intro-title">
    <div className="app-intro-product">
      <div className="app-intro-showcase">
        <div className="app-intro-heading">
          <p className="eyebrow">The Roamin10 Android app</p>
          <h2 id="app-intro-title">Your trip, <em>in your pocket.</em></h2>
          <p>Roamin10 is the travel app for planning and taking your trip. Start free, then unlock Sarah AI, offline guides and more with Premium.</p>
          <div className="app-intro-download-row">
            <a className="primary-btn app-intro-download" href="https://play.google.com/store/apps/details?id=com.roamin10.twa&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">Download on Google Play <ArrowRight size={16} aria-hidden="true" /></a>
            <small>Free to install · Premium optional · Android</small>
          </div>
        </div>
        <figure className="app-intro-device" aria-labelledby="app-intro-device-caption">
          <div className="app-device-frame" aria-hidden="true">
            <div className="app-device-screen">
              <div className="app-device-status"><span>9:41</span><span className="app-device-status-icons"><i /><i /><i /><b /></span></div>
              <div className="app-device-topbar"><span className="app-device-wordmark">roamin<span>10</span></span><span className="app-device-avatar">S</span></div>
              <div className="app-device-trip-card"><span className="app-device-overline">Your next trip</span><strong>Benidorm</strong><small>Spain · Costa Blanca</small><span className="app-device-trip-dates">12–17 Jun <span>5 nights</span></span></div>
              <div className="app-device-plan-heading"><strong>Today&apos;s plan</strong><span>Day 1 of 4</span></div>
              <div className="app-device-activity"><time>09:30</time><div><strong>Old Town walk</strong><small>Local favourite · 1.2 km</small></div></div>
              <div className="app-device-activity"><time>13:00</time><div><strong>Lunch by the sea</strong><small>Market-fresh · Levante</small></div></div>
              <div className="app-device-offline"><span className="app-device-offline-mark">↓</span><div><strong>Offline guide saved</strong><small>Premium · ready anywhere</small></div></div>
              <div className="app-device-bottom-nav"><span>Plan</span><span>Explore</span><span>Saved</span></div>
            </div>
          </div>
          <figcaption id="app-intro-device-caption">Roamin10 app preview: a Benidorm itinerary with an offline guide saved.</figcaption>
        </figure>
      </div>
    </div>
    <details className="feature-details" id="roamin10-feature-details">
      <summary className="feature-details-summary" aria-controls="feature-table-content">
        <span className="feature-summary-copy"><strong>Compare Free and Premium</strong><small>All 21 features, usage limits, and the annual plan.</small></span>
        <span className="feature-summary-toggle"><span className="closed-copy">Show comparison</span><span className="open-copy">Hide comparison</span><ChevronDown size={18} aria-hidden="true" /></span>
      </summary>
      <div className="feature-details-content" id="feature-table-content">
        <div className="feature-table-shell" role="region" aria-label="Roamin10 Free and Premium feature comparison" tabIndex={0}>
          <p className="feature-table-hint" id="feature-table-hint">Scroll horizontally to compare all features.</p>
          <table className="feature-table" aria-describedby="feature-table-hint">
            <caption className="sr-only">Features included with Roamin10 Free and Roamin10 Premium</caption>
            <thead><tr><th scope="col">Features</th><th scope="col">Free</th><th scope="col" className="premium-column">Premium</th></tr></thead>
            {groups.map((group) => <tbody key={group.name}>
              <tr className="feature-group-heading"><th scope="colgroup" colSpan={3}>{group.name}</th></tr>
              {group.features.map((feature) => <tr className="feature-row" key={feature.name}>
                <th scope="row">{feature.name}</th>
                <td><FeatureValueCell value={feature.free} /></td>
                <td className="premium-column"><FeatureValueCell value={feature.premium} /></td>
              </tr>)}
            </tbody>)}
          </table>
        </div>
        <div className="feature-comparison-footer">
          <div><span className="feature-price-label">Premium</span><p>Try it free for 7 days, then £14.99/year.</p><small>Android app · Google Play</small></div>
          <a className="primary-btn" href="https://play.google.com/store/apps/details?id=com.roamin10.twa&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">Get Roamin10 <ArrowRight size={16} /></a>
        </div>
        <div className="feature-details-actions"><CollapseComparisonButton detailsId="roamin10-feature-details" /></div>
      </div>
    </details>
    <p className="spain-app-note">Looking for Spain-only travel tips? <a href="https://play.google.com/store/apps/details?id=com.spainten.city.twa&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">10 Minute Spain is free for now <ArrowRight size={13} aria-hidden="true" /></a>.</p>
  </section>
}
