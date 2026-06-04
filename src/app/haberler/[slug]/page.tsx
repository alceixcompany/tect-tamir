import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getActiveNews, getNewsBySlug } from '@/lib/firestore-data';
import { resolveNewsImage } from '@/lib/images';
import { createSlug } from '@/lib/slug';

export const revalidate = 3600;

export default async function HaberDetay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const haber = await getNewsBySlug(slug);

  if (!haber) {
    notFound();
  }

  const relatedHaberler = (await getActiveNews())
    .filter((item) => item.id !== haber.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-on-background pb-32">
      <article>
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
          <Image
            src={resolveNewsImage(haber.imageUrl)}
            alt={`${haber.title} - iPhone Tamir Atölyesi teknik analiz`}
            fill
            priority
            className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full">
            <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop pb-16">
              <Link href="/haberler" className="group inline-flex items-center gap-4 font-technical text-[10px] text-tertiary uppercase tracking-[0.4em] mb-12 hover:drop-shadow-[0_0_8px_rgba(173,199,255,0.5)] transition-all">
                <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-2">west</span>
                Tüm Analizlere Dön
              </Link>
              <time className="flex items-center gap-4 font-technical text-[10px] text-on-surface-variant mb-6 uppercase tracking-widest" dateTime={haber.createdAt}>
                <span className="w-2 h-2 bg-tertiary rounded-full" />
                {new Date(haber.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface leading-[0.9] uppercase tracking-tighter max-w-5xl">
                {haber.title}
              </h1>
            </div>
          </div>
        </section>

        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid lg:grid-cols-12 gap-20 mt-20">
          <div className="lg:col-span-8">
            {haber.subtitle && (
              <p className="text-2xl font-display font-medium text-tertiary leading-relaxed mb-12 italic border-l-2 border-tertiary/30 pl-8">
                {haber.subtitle}
              </p>
            )}

            <div
              className="article-content font-sans text-lg leading-relaxed text-on-surface-variant space-y-8"
              dangerouslySetInnerHTML={{ __html: haber.content || `<p>${haber.description}</p>` }}
            />

            <div className="mt-14 rounded-md border border-outline-variant bg-surface-container/50 p-8">
              <h2 className="text-2xl font-display font-bold text-on-surface mb-4">Bu Arıza İçin Laboratuvar Desteği</h2>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Benzer bir iPhone anakart, veri kurtarma veya mikro lehimleme sorunu yaşıyorsanız cihazı açmadan önce teknik ekibimizle görüşün.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/hizmetlerimiz/iphone-anakart-tamiri" className="btn-tech-outline px-6 py-3 text-[10px]">
                  iPhone Anakart Tamiri
                </Link>
                <Link href="/iletisim" className="btn-tech px-6 py-3 text-[10px]">
                  Analiz Talebi
                </Link>
              </div>
            </div>

            {haber.tags && haber.tags.length > 0 && (
              <div className="mt-20 flex flex-wrap gap-4 pt-10 border-t border-outline-variant">
                {haber.tags.map((tag) => (
                  <span key={tag} className="font-technical text-[10px] text-on-surface-variant border border-outline-variant px-4 py-1 uppercase tracking-widest bg-surface-container">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-12">
            {relatedHaberler.length > 0 && (
              <div className="bg-surface-container border border-outline-variant p-10">
                <h2 className="font-technical text-[10px] text-tertiary uppercase tracking-[0.3em] mb-8 border-b border-outline-variant pb-4">İlgili Analizler</h2>
                <div className="space-y-10">
                  {relatedHaberler.map((item) => {
                    const relatedSlug = item.slug || createSlug(item.title);

                    return (
                      <Link key={item.id} href={`/haberler/${relatedSlug}`} className="group block">
                        <div className="relative aspect-video overflow-hidden mb-4 border border-outline-variant group-hover:border-tertiary transition-colors">
                          <Image src={resolveNewsImage(item.imageUrl)} alt={`${item.title} ilgili teknik analiz`} fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-on-surface leading-tight group-hover:text-tertiary transition-colors line-clamp-2 uppercase tracking-tight">
                          {item.title}
                        </h3>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-tertiary/5 border border-tertiary/20 p-10">
              <h2 className="font-technical text-[10px] text-tertiary uppercase tracking-[0.3em] mb-4">Teknik Destek</h2>
              <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                Bu raporla ilgili teknik sorularınız için mühendislik birimimizle iletişime geçin.
              </p>
              <Link href="/iletisim" className="btn-tech w-full py-4 text-[10px] uppercase tracking-[0.2em] inline-flex justify-center">
                Analiz Talebi Gönder
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
