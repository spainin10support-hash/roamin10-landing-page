import { ArrowRight, Check, Minus, X } from 'lucide-react'

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
    <div className="app-intro-heading">
      <p className="eyebrow">Roamin10 for Android</p>
      <h2 id="app-intro-title">Start free. Upgrade for the juicy bits.</h2>
      <p>Get the essentials at no cost, then unlock deeper planning tools when you need them.</p>
    </div>
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
    <p className="spain-app-note">Looking for Spain-only travel tips? <a href="https://play.google.com/store/apps/details?id=com.spainten.city.twa&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">10 Minute Spain is free for now <ArrowRight size={13} aria-hidden="true" /></a>.</p>
  </section>
}
