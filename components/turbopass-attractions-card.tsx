import { ArrowRight } from 'lucide-react'

const turbopassUrl = 'https://www.jdoqocy.com/click-101704146-13916137'

export function TurbopassAttractionsCard() {
  return <section className="editorial-section turbopass-card" aria-labelledby="turbopass-card-title">
    <p className="eyebrow">Attractions</p>
    <h2 id="turbopass-card-title">Save on attractions with a city pass</h2>
    <a className="turbopass-image-link" href={turbopassUrl} target="_blank" rel="sponsored noopener noreferrer" aria-label="Explore Barcelona city passes with Turbopass">
      <img src="https://www.tqlkg.com/image-101704146-13916137" width={240} height={150} alt="" {...{ border: '0' }} />
    </a>
    <p className="turbopass-description">One pass for the top sights and attractions, so you spend less time queuing and less money.</p>
    <a className="primary-btn turbopass-cta" href={turbopassUrl} target="_blank" rel="sponsored noopener noreferrer">Explore Barcelona city passes <ArrowRight size={15} aria-hidden="true" /></a>
    <small className="turbopass-partner">Approved Turbopass affiliate partner.</small>
  </section>
}
