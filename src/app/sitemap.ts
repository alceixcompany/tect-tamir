import { MetadataRoute } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore'
import { absoluteUrl, fallbackServiceAreas, servicePages } from '@/lib/seo'
import { createSlug } from '@/lib/slug'

const staticLastModified = new Date('2026-06-04')

function toDate(value: unknown): Date {
  if (!value) return staticLastModified
  if (value instanceof Date) return value
  if (typeof value === 'string' || typeof value === 'number') return new Date(value)
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate()
  }
  return staticLastModified
}

// Statik sayfalar
const staticPages = [
  {
    url: '',
    lastModified: staticLastModified,
    changeFrequency: 'weekly' as const,
    priority: 1,
  },
  {
    url: '/hizmetlerimiz',
    lastModified: staticLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  },
  {
    url: '/hizmet-bolgelerimiz',
    lastModified: staticLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  },
  {
    url: '/galeri',
    lastModified: staticLastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    url: '/haberler',
    lastModified: staticLastModified,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  },
  {
    url: '/hakkimizda',
    lastModified: staticLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    url: '/iletisim',
    lastModified: staticLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
]

const services = servicePages.map((service) => ({
  url: `/hizmetlerimiz/${service.slug}`,
  lastModified: staticLastModified,
  changeFrequency: 'monthly' as const,
  priority: 0.85,
}))

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Firebase'den dinamik verileri al
    const [newsSnapshot, serviceAreasSnapshot] = await Promise.all([
      // Haberler - sadece aktif olanları al
      getDocs(query(
        collection(db, 'haberler'),
        where('isActive', '==', true)
      )),
      // Hizmet bölgeleri - sadece aktif olanları al
      getDocs(query(
        collection(db, 'hizmet_bolgeleri'),
        where('isActive', '==', true)
      ))
    ])

    // Haberler için sitemap entries
    const newsPages: MetadataRoute.Sitemap = newsSnapshot.docs.map((doc: DocumentData) => {
      const data = doc.data()
      const slug = data.slug || createSlug(data.title || '');
      
      return {
        url: absoluteUrl(`/haberler/${slug}`),
        lastModified: toDate(data.updatedAt || data.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })

    // Hizmet bölgeleri için sitemap entries
    const serviceAreaPages: MetadataRoute.Sitemap = serviceAreasSnapshot.docs.map((doc: DocumentData) => {
      const data = doc.data()
      const slug = data.slug || createSlug(data.name || '');
      
      return {
        url: absoluteUrl(`/hizmet-bolgelerimiz/${slug}`),
        lastModified: toDate(data.updatedAt || data.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }
    })

    const dynamicServiceAreaUrls = new Set(serviceAreaPages.map((page) => page.url))
    const fallbackServiceAreaPages: MetadataRoute.Sitemap = fallbackServiceAreas
      .map((area) => ({
        url: absoluteUrl(`/hizmet-bolgelerimiz/${area.slug}`),
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      }))
      .filter((page) => !dynamicServiceAreaUrls.has(page.url))

    // Tüm sayfaları birleştir
    const allPages: MetadataRoute.Sitemap = [
      // Statik sayfalar
      ...staticPages.map(page => ({
        url: absoluteUrl(page.url),
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })),
      // Hizmetler
      ...services.map(service => ({
        url: absoluteUrl(service.url),
        lastModified: service.lastModified,
        changeFrequency: service.changeFrequency,
        priority: service.priority,
      })),
      // Dinamik haberler
      ...newsPages,
      // Dinamik hizmet bölgeleri
      ...serviceAreaPages,
      ...fallbackServiceAreaPages,
    ]

    return allPages

  } catch (error) {
    console.error('Sitemap oluşturulurken hata:', error)
    
    // Hata durumunda sadece statik sayfaları döndür
    return [
      ...staticPages.map(page => ({
        url: absoluteUrl(page.url),
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })),
      ...services.map(service => ({
        url: absoluteUrl(service.url),
        lastModified: service.lastModified,
        changeFrequency: service.changeFrequency,
        priority: service.priority,
      })),
      ...fallbackServiceAreas.map(area => ({
        url: absoluteUrl(`/hizmet-bolgelerimiz/${area.slug}`),
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      })),
    ]
  }
}
