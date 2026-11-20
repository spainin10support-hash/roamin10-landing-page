import { ArrowRight } from 'lucide-react'

interface TurbopassCardConfig {
  label: string
  heading: string
  imageUrl: string
  imageWidth: number
  imageHeight: number
  imageAlt: string
  imageLinkLabel?: string
  description: string
  buttonUrl: string
  buttonLabel: string
  partnerLabel: string
}

const genericTurbopassConfig: TurbopassCardConfig = {
  label: 'Attractions',
  heading: 'Save on attractions with a city pass',
  imageUrl: 'https://www.awltovhc.com/image-101930161-13182296',
  imageWidth: 200,
  imageHeight: 200,
  imageAlt: 'Turbopass',
  description: 'One pass for the top sights and attractions, so you spend less time queuing and less money.',
  buttonUrl: 'https://dpbolvw.net/click-101930161-13182296',
  buttonLabel: 'Explore Turbopass city passes',
  partnerLabel: 'Approved Turbopass affiliate partner.',
}

const turbopassConfigByCity: Record<string, TurbopassCardConfig> = {
  alicante: genericTurbopassConfig,
  benidorm: genericTurbopassConfig,
  valencia: genericTurbopassConfig,
  barcelona: {
    ...genericTurbopassConfig,
    imageUrl: 'https://www.tqlkg.com/image-101704146-13916137',
    imageWidth: 240,
    imageHeight: 150,
    imageAlt: '',
    imageLinkLabel: 'Explore Barcelona city passes with Turbopass',
    buttonUrl: 'https://www.jdoqocy.com/click-101704146-13916137',
    buttonLabel: 'Explore Barcelona city passes',
  },
  madrid: genericTurbopassConfig,
  seville: genericTurbopassConfig,
  bilbao: genericTurbopassConfig,
  santander: genericTurbopassConfig,
  malaga: genericTurbopassConfig,
  marbella: genericTurbopassConfig,
  'puerto-banus': genericTurbopassConfig,
  cordoba: genericTurbopassConfig,
  granada: genericTurbopassConfig,
}

export function TurbopassAttractionsCard({ citySlug }: { citySlug: string }) {
  const config = turbopassConfigByCity[citySlug] ?? genericTurbopassConfig

  return <section className="editorial-section turbopass-card" aria-labelledby="turbopass-card-title">
    <p className="eyebrow">{config.label}</p>
    <h2 id="turbopass-card-title">{config.heading}</h2>
    <a className="turbopass-image-link" href={config.buttonUrl} target="_blank" rel="sponsored noopener noreferrer" aria-label={config.imageLinkLabel}>
      <img src={config.imageUrl} width={config.imageWidth} height={config.imageHeight} alt={config.imageAlt} {...{ border: '0' }} />
    </a>
    <p className="turbopass-description">{config.description}</p>
    <a className="primary-btn turbopass-cta" href={config.buttonUrl} target="_blank" rel="sponsored noopener noreferrer">{config.buttonLabel} <ArrowRight size={15} aria-hidden="true" /></a>
    <small className="turbopass-partner">{config.partnerLabel}</small>
  </section>
}
