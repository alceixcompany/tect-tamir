import { MetadataRoute } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore'

// Statik sayfalar
const staticPages = [
  {
    url: '',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  },
  {
    url: '/hizmetlerimiz',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  },
  {
    url: '/hizmet-bolgelerimiz',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  },
  {
    url: '/galeri',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    url: '/haberler',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  },
  {
    url: '/hakkimizda',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    url: '/iletisim',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
]

// Hizmetler (statik)
const services = [
  {
    url: '/hizmetlerimiz/genel-muhasebe',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/hizmetlerimiz/vergi-beyanname',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/hizmetlerimiz/bordro-sgk',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/hizmetlerimiz/sirket-kurulusu',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/hizmetlerimiz/e-defter-e-fatura',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/hizmetlerimiz/mali-danismanlik',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.demirbasmuhasebe.com'
  
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
      
      // Slug oluşturma fonksiyonu
      const createSlug = (title: string): string => {
        return title
          .toLowerCase()
          .replace(/ğ/g, 'g')
          .replace(/ü/g, 'u')
          .replace(/ş/g, 's')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ç/g, 'c')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      };
      
      const slug = data.slug || createSlug(data.title || '');
      
      return {
        url: `${baseUrl}/haberler/${slug}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })

    // Hizmet bölgeleri için sitemap entries
    const serviceAreaPages: MetadataRoute.Sitemap = serviceAreasSnapshot.docs.map((doc: DocumentData) => {
      const data = doc.data()
      
      // Slug oluşturma fonksiyonu
      const createSlug = (name: string): string => {
        return name
          .toLowerCase()
          .replace(/ğ/g, 'g')
          .replace(/ü/g, 'u')
          .replace(/ş/g, 's')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ç/g, 'c')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      };
      
      const slug = data.slug || createSlug(data.name || '');
      
      return {
        url: `${baseUrl}/hizmet-bolgelerimiz/${slug}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }
    })

    // Tüm sayfaları birleştir
    const allPages: MetadataRoute.Sitemap = [
      // Statik sayfalar
      ...staticPages.map(page => ({
        url: `${baseUrl}${page.url}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })),
      // Hizmetler
      ...services.map(service => ({
        url: `${baseUrl}${service.url}`,
        lastModified: service.lastModified,
        changeFrequency: service.changeFrequency,
        priority: service.priority,
      })),
      // Dinamik haberler
      ...newsPages,
      // Dinamik hizmet bölgeleri
      ...serviceAreaPages,
    ]

    return allPages

  } catch (error) {
    console.error('Sitemap oluşturulurken hata:', error)
    
    // Hata durumunda sadece statik sayfaları döndür
    return [
      ...staticPages.map(page => ({
        url: `${baseUrl}${page.url}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })),
      ...services.map(service => ({
        url: `${baseUrl}${service.url}`,
        lastModified: service.lastModified,
        changeFrequency: service.changeFrequency,
        priority: service.priority,
      })),
    ]
  }
}
