import Image from 'next/image';
import Link from 'next/link';
import { getActiveServiceAreas } from '@/lib/firestore-data';
import { fallbackServiceAreas } from '@/lib/seo';

export const revalidate = 3600;

const fallbackAreas = [
  {
    id: fallbackServiceAreas[0].slug,
    name: fallbackServiceAreas[0].name,
    slug: fallbackServiceAreas[0].slug,
    description: 'Esenler ve çevresinde iPhone anakart tamiri, sıvı teması, veri kurtarma ve mikro lehimleme desteği.',
    imageUrl: '/realistic_hero.png',
  },
  {
    id: fallbackServiceAreas[1].slug,
    name: fallbackServiceAreas[1].name,
    slug: fallbackServiceAreas[1].slug,
    description: 'Bağcılar bölgesinden gelen cihazlar için laboratuvar ortamında çip seviyesinde onarım süreçleri.',
    imageUrl: '/micro_soldering_lab_1778397801389.png',
  },
  {
    id: fallbackServiceAreas[2].slug,
    name: fallbackServiceAreas[2].name,
    slug: fallbackServiceAreas[2].slug,
    description: 'Güngören iPhone anakart arızaları, şebeke sorunları ve veri kurtarma talepleri için teknik analiz.',
    imageUrl: '/iphone_motherboard_repair_1778397775835.png',
  },
  {
    id: fallbackServiceAreas[3].slug,
    name: fallbackServiceAreas[3].name,
    slug: fallbackServiceAreas[3].slug,
    description: 'İstanbul genelinden kargo veya randevu ile gelen elektronik kart ve iPhone anakart onarımları.',
    imageUrl: '/pcb_card_repair_1778397751635.png',
  },
];

export default async function ServiceAreasPage() {
  const serviceAreas = await getActiveServiceAreas();
  const areas = serviceAreas.length > 0 ? serviceAreas : fallbackAreas;

  return (
    <main className="min-h-screen bg-background text-on-background">
      <section className="relative h-[45vh] min-h-[400px] w-full overflow-hidden flex items-end">
        <Image
          src="/realistic_hero.png"
          alt="İstanbul iPhone tamiri ve mikro lehimleme hizmet bölgeleri"
          fill
          priority
          className="object-cover opacity-40 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 w-full pb-16">
          <span className="font-technical text-tertiary tracking-[0.4em] uppercase text-[10px] mb-4 block font-bold">İstanbul Teknik Servis Ağı</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface uppercase tracking-tighter">
            Hizmet <span className="text-tertiary">Bölgelerimiz</span>
          </h1>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-20">
        <div className="max-w-4xl">
          <p className="text-xl text-on-surface-variant leading-relaxed font-display uppercase tracking-tight">
            İstanbul Esenler merkezli laboratuvarımızda iPhone anakart tamiri, mikro lehimleme, veri kurtarma ve elektronik kart onarımı için bölgesel teknik destek sağlıyoruz.
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {areas.map((area) => (
            <Link
              key={area.id}
              href={`/hizmet-bolgelerimiz/${area.slug}`}
              className="group bg-surface-container border border-outline-variant hover:border-tertiary transition-all duration-300 relative circuit-pattern glow-border overflow-hidden"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={area.imageUrl || '/realistic_hero.png'}
                  alt={`${area.name} iPhone anakart tamiri hizmet bölgesi`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent" />
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-display font-bold mb-3 text-on-surface group-hover:text-tertiary transition-colors">{area.name}</h2>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed line-clamp-4">{area.description}</p>
                <span className="font-technical text-tertiary text-[10px] tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                  BÖLGE DETAYI <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop mt-24">
        <div className="bg-surface-container border border-outline-variant rounded-md p-12 md:p-20 relative overflow-hidden circuit-pattern">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-on-surface mb-6 uppercase tracking-tighter">
            Bölgeniz Listede Yoksa <span className="text-tertiary neon-text-glow">Yine Ulaşın</span>
          </h2>
          <p className="text-on-surface-variant max-w-2xl mb-10 text-lg">
            İstanbul dışından gelen cihazlar için kargo ile kabul, ön analiz ve onarım süreci planlanabilir.
          </p>
          <Link href="/iletisim" className="btn-tech px-12 py-4 inline-flex">
            İletişime Geçin
          </Link>
        </div>
      </section>
    </main>
  );
}
