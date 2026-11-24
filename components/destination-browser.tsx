'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { countryFilters, destinations } from '@/lib/destinations'

const availableCountries = new Set(destinations.map((destination) => destination.country))

export function DestinationBrowser() {
  const [selectedCountry, setSelectedCountry] = useState('Spain')
  const filteredDestinations = destinations.filter((destination) => destination.country === selectedCountry)

  return (
    <section id="destinations" className="destinations-section">
      <div className="section-heading split">
        <div>
          <p className="eyebrow">The Roamin10 edit</p>
          <h2>Places worth the detour.</h2>
        </div>
        <div className="search-box"><Search size={17} /><span>Search 60+ Mediterranean cities...</span></div>
      </div>
      <div className="filter-row" role="group" aria-label="Country guide availability">
        {countryFilters.map((country) => {
          const isAvailable = availableCountries.has(country)
          const isSelected = selectedCountry === country

          return isAvailable ? (
            <button
              key={country}
              type="button"
              className={`available-country${isSelected ? ' is-active' : ''}`}
              aria-pressed={isSelected}
              onClick={() => setSelectedCountry(country)}
            >
              <strong>{country}</strong>
              <small>Available now</small>
            </button>
          ) : (
            <button
              key={country}
              type="button"
              className="coming-soon-country"
              title={`${country} guides are coming soon`}
              disabled
            >
              {country}<small>Coming soon</small>
            </button>
          )
        })}
      </div>
      <p className="country-selector-note" aria-live="polite">
        Showing {selectedCountry} guides. More Mediterranean countries are on the way.
      </p>
      <div className="destination-grid">
        {filteredDestinations.map((destination) => (
          <article className="destination-card" key={destination.slug}>
            <Link href={`/${destination.countrySlug}/${destination.slug}`}>
              <div className={`card-image${destination.slug === 'alicante' ? ' card-image-alicante' : ''}`}>
                <img src={destination.imageData?.src ?? destination.image} alt={destination.imageData?.alt ?? `${destination.name} travel guide`} />
                <span>10-Min Read</span>
              </div>
              <div className="card-content">
                <div className="card-line"><span>{destination.country} · {destination.region}</span><small>{destination.weather}</small></div>
                <h3>{destination.name}</h3>
                <p>{destination.highlights}</p>
                <span className="card-link">Explore Guide <ArrowRight size={14} /></span>
              </div>
            </Link>
            {destination.imageData?.credit && (
              <p className="destination-photo-credit">
                Photo: <a href={destination.imageData.creditUrl} target="_blank" rel="noreferrer">{destination.imageData.credit}</a>
                {destination.imageData.license && <> · <a href={destination.imageData.licenseUrl} target="_blank" rel="noreferrer">{destination.imageData.license}</a></>}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
