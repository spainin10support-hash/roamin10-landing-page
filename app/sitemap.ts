import type { MetadataRoute } from 'next'
import { destinations } from '@/lib/destinations'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.roamin10.com'
  return [{ url: base, changeFrequency: 'weekly', priority: 1 }, ...destinations.map((destination) => ({ url: `${base}/${destination.countrySlug}/${destination.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 }))]
}
