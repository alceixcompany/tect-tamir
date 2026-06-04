import Image from 'next/image';
import Link from 'next/link';
import { getActiveNews } from '@/lib/firestore-data';
import { resolveNewsImage } from '@/lib/images';
import { createSlug } from '@/lib/slug';

export const revalidate = 3600;

export default async function NewsPage() {
  const haberler = await getActiveNews();

  return (
    <main className="min-h-screen bg-background text-on-background">
      <section className="relative h-[45vh] min-h-[400px] w-full overflow-hidden flex items-end">
        <Image
          src="/micro_soldering_lab_1778397801389.png"
          alt="iPhone anakart tamiri ve mikro lehimleme teknik analizleri"
          fill
          priority
          className="object-cover opacity-40 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 w-full pb-16">
          <span className="font-technical text-tertiary tracking-[0.4em] uppercase text-[10px] mb-4 block font-bold">Teknik Analiz & Gündem</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface uppercase tracking-tighter">
            Laboratuvar <span className="text-tertiary">Raporları</span>
          </h1>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-20">
        <div className="max-w-4xl">
          <p className="text-xl text-on-surface-variant leading-relaxed font-display uppercase tracking-tight">
            iPhone anakart tamiri, mikro lehimleme, veri kurtarma ve elektronik kart onarımında laboratuvarımızdan güncel teknik analizler.
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        {haberler.length === 0 ? (
          <div className="bg-surface-container border border-outline-variant p-10 text-center">
            <h2 className="text-2xl font-display font-bold text-on-surface mb-3">Henüz teknik analiz eklenmedi</h2>
            <p className="text-on-surface-variant">Yeni laboratuvar raporları eklendiğinde bu sayfada yayınlanacak.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {haberler.map((news) => {
              const slug = news.slug || createSlug(news.title);

              return (
                <article
                  key={news.id}
                  className="group flex flex-col bg-surface-container border border-outline-variant hover:border-tertiary transition-all duration-500 overflow-hidden glow-border"
                >
                  <Link href={`/haberler/${slug}`} className="relative h-80 overflow-hidden block">
                    <Image
                      src={resolveNewsImage(news.imageUrl)}
                      alt={`${news.title} teknik analizi`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent opacity-60" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-background/80 backdrop-blur-md border border-outline-variant text-tertiary text-[10px] font-technical px-4 py-1 uppercase tracking-widest">
                        {news.tags?.[0] || 'TEKNİK RAPOR'}
                      </span>
                    </div>
                  </Link>

                  <div className="p-10 flex flex-col flex-1">
                    <time className="flex items-center gap-4 text-[10px] font-technical text-on-surface-variant mb-6 uppercase tracking-[0.2em]" dateTime={news.createdAt}>
                      <span className="w-2 h-2 bg-tertiary rounded-full" />
                      {new Date(news.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>

                    <h2 className="text-3xl font-display font-bold text-on-surface mb-6 group-hover:text-tertiary transition-colors leading-tight">
                      <Link href={`/haberler/${slug}`}>{news.title}</Link>
                    </h2>

                    <p className="text-on-surface-variant leading-relaxed mb-10 line-clamp-3">
                      {news.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-8 border-t border-outline-variant">
                      <Link
                        href={`/haberler/${slug}`}
                        className="group/link inline-flex items-center gap-4 font-technical text-xs text-on-surface uppercase tracking-[0.3em]"
                      >
                        Tam Analizi Oku
                        <span className="material-symbols-outlined text-tertiary transition-transform group-hover/link:translate-x-2">trending_flat</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop mt-32">
        <div className="bg-surface-container-high border border-outline-variant p-12 md:p-20 relative overflow-hidden circuit-pattern">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-on-surface mb-6 uppercase tracking-tighter">
              Arızanız İçin <span className="text-tertiary neon-text-glow">Teknik Ön Analiz</span>
            </h2>
            <p className="text-on-surface-variant mb-10 text-lg">
              iPhone anakart, sıvı teması, veri kurtarma veya mikro lehimleme ihtiyacınız için laboratuvar ekibiyle görüşün.
            </p>
            <Link href="/iletisim" className="btn-tech px-10 py-4 uppercase tracking-widest text-xs font-technical inline-flex">
              Analiz Talebi Gönder
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
