import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGalleryImages, getServiceAreaBySlug } from '@/lib/firestore-data';
import { titleFromSlug } from '@/lib/slug';
import { siteConfig } from '@/lib/seo';

export const revalidate = 3600;

function fallbackArea(slug: string) {
  const name = titleFromSlug(slug);

  return {
    id: slug,
    name,
    slug,
    description: `${name} bölgesinde iPhone anakart tamiri, mikro lehimleme, veri kurtarma ve elektronik kart onarımı için teknik analiz desteği.`,
    content: `<p>${name} ve çevresinden gelen cihazlar laboratuvarımızda mikroskop altında incelenir. Sıvı teması, açılmama, şebeke sorunu, kısa devre, NAND ve entegre arızalarında önce arıza tespiti yapılır, ardından onarım süreci net şekilde paylaşılır.</p><p>İstanbul Esenler merkezli teknik laboratuvarımıza randevu ile cihaz teslim edebilir veya uygun durumlarda kargo ile ön analiz talebi oluşturabilirsiniz.</p>`,
    imageUrl: '/realistic_hero.png',
    isActive: true,
    order: 0,
  };
}

export default async function ServiceAreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const serviceArea = (await getServiceAreaBySlug(slug)) || fallbackArea(slug);
  const galleryImages = await getGalleryImages(6);

  if (!serviceArea) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-on-background">
      <section className="relative h-[50vh] min-h-[460px] w-full overflow-hidden flex items-end">
        <Image
          src={serviceArea.imageUrl || '/realistic_hero.png'}
          alt={`${serviceArea.name} iPhone tamiri ve mikro lehimleme`}
          fill
          priority
          className="object-cover opacity-45 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 w-full pb-16">
          <Link href="/hizmet-bolgelerimiz" className="inline-flex items-center gap-2 text-[10px] font-bold text-tertiary uppercase tracking-[0.4em] mb-8 hover:opacity-70 transition-all">
            <span className="material-symbols-outlined text-sm">west</span>
            Hizmet Bölgelerine Dön
          </Link>
          <span className="font-technical text-tertiary tracking-[0.4em] uppercase text-[10px] mb-4 block font-bold">Bölgesel Teknik Destek</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface uppercase tracking-tighter">
            {serviceArea.name} <span className="text-tertiary">iPhone Tamiri</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-on-surface-variant/80 leading-relaxed max-w-3xl font-display uppercase tracking-tight">
            {serviceArea.description}
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-20">
        <div className="grid lg:grid-cols-12 gap-16">
          <article className="lg:col-span-8">
            <div
              className="article-content text-lg leading-relaxed text-on-surface-variant space-y-8"
              dangerouslySetInnerHTML={{ __html: serviceArea.content }}
            />

            <div className="mt-14 grid sm:grid-cols-2 gap-4">
              {[
                'iPhone anakart tamiri',
                'Sıvı teması ve kısa devre analizi',
                'Mikro lehimleme ve BGA reballing',
                'Veri kurtarma ön incelemesi',
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 p-5 rounded-md border border-outline-variant/30 bg-surface-container/50">
                  <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                  <span className="text-[10px] font-technical font-bold uppercase tracking-widest text-on-surface-variant/80">{item}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-32 bg-surface-container border border-outline-variant p-10 rounded-md">
              <h2 className="text-xl font-display font-bold text-on-surface uppercase tracking-tight mb-6">Hızlı İletişim</h2>
              <div className="space-y-5 text-sm text-on-surface-variant mb-8">
                <p><strong className="text-on-surface">Adres:</strong> {siteConfig.address}</p>
                <p><strong className="text-on-surface">Telefon:</strong> {siteConfig.phone}</p>
                <p><strong className="text-on-surface">Hizmet:</strong> {serviceArea.name} ve çevresi</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/iletisim" className="btn-tech py-4 text-center text-[10px]">
                  Analiz Talebi Gönder
                </Link>
                <Link href={`tel:${siteConfig.phoneHref}`} className="btn-tech-outline py-4 text-center text-[10px]">
                  Hemen Ara
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-on-surface mb-10 uppercase tracking-tighter">
            Laboratuvar <span className="text-tertiary">Çalışmalarımız</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {galleryImages.map((image) => {
              const src = image.url || image.imageUrl || '/lab_workstation_1778396468117.png';
              const alt = image.alt || image.title || `${serviceArea.name} iPhone tamiri laboratuvar çalışması`;

              return (
                <div key={image.id} className="relative h-64 overflow-hidden border border-outline-variant bg-surface-container">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
