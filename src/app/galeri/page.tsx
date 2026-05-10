'use client'
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiEye } from 'react-icons/fi';
import { db } from '@/lib/firebase';

interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

const itemsPerPage = 9;

const GaleriPage = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);

        const categoriesSnapshot = await getDocs(collection(db, 'gallery_categories'));
        const categoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as GalleryCategory[];

        categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(categoriesData.filter((category) => category.isActive));

        const itemsSnapshot = await getDocs(collection(db, 'gallery_items'));
        const itemsData = itemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as GalleryItem[];

        itemsData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setGalleryItems(itemsData.filter((item) => item.isActive));
      } catch (error) {
        console.error('Galeri verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.categoryId === selectedCategory);
  }, [galleryItems, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const featuredItems = filteredItems.filter((item) => item.isFeatured).slice(0, 3);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Genel Koleksiyon';
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="lale-dark-section py-24">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-7 lg:px-10">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[var(--lale-gold)] border-t-transparent" />
          <p className="mt-5 text-sm tracking-[0.18em] text-[rgba(251,250,246,0.72)]">
            GALERI HAZIRLANIYOR
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="page-flow min-h-screen bg-[var(--lale-emerald-deep)]">
      <section className="lale-page-hero flex min-h-[450px] h-[60vh] items-center">
        <div className="absolute inset-0">
          <Image
            src="/banner/galeri_banner.png"
            alt="Lale Guzellik Merkezi Galeri"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,35,31,0.96)_0%,rgba(6,35,31,0.90)_34%,rgba(6,35,31,0.62)_58%,rgba(6,35,31,0.18)_78%,rgba(6,35,31,0)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(13,77,63,0.42),rgba(6,35,31,0.16)_40%,transparent_66%)]" />
        </div>
        
        <div className="relative z-10 w-full mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="max-w-2xl pt-[20px]">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-[var(--lale-gold)]" />
              <span className="text-sm tracking-[0.3em] text-[var(--lale-gold)] uppercase font-medium">KOLEKSIYONUMUZ</span>
            </div>
            
            <h1 className="mb-6 font-serif text-[64px] leading-[0.9] text-[var(--lale-ivory)] sm:text-[86px]">
              Kurumsal <span className="block text-[var(--lale-gold)]">Galeri</span>
            </h1>
            
            <p className="max-w-lg text-lg leading-relaxed text-[rgba(251,250,246,0.74)] sm:text-xl">
              Ofis yaklaşımımızı, çalışma düzenimizi ve kurumsal sunum alanlarımızı yansıtan seçili görselleri inceleyin.
            </p>
          </div>
        </div>
      </section>

      <section className="lale-dark-section py-24 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="lale-kicker bg-[rgba(6,35,31,0.56)]">
              SEÇİLİ GÖRSELLER
            </div>

            <h2 className="mt-8 font-serif text-4xl leading-tight text-[var(--lale-ivory)] sm:text-5xl">
              Çalışma biçimimizi anlatan
              <span className="block text-[var(--lale-gold)]">kurumsal yansımalar</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[rgba(251,250,246,0.72)]">
              Her karede düzen, güven ve kurumsal iletişim hissini öne çıkaran
              bir seçki sunuyoruz.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full px-5 py-3 text-sm font-semibold tracking-[0.08em] transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[var(--lale-gold)] text-[var(--lale-emerald-deep)] shadow-[0_12px_30px_rgba(212,175,55,0.25)]'
                  : 'border border-[rgba(212,175,55,0.28)] bg-[rgba(251,250,246,0.06)] text-[var(--lale-gold)] hover:bg-[rgba(212,175,55,0.10)]'
              }`}
            >
              Tum Kareler ({galleryItems.length})
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-5 py-3 text-sm font-semibold tracking-[0.08em] transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[var(--lale-gold)] text-[var(--lale-emerald-deep)] shadow-[0_12px_30px_rgba(212,175,55,0.25)]'
                    : 'border border-[rgba(212,175,55,0.28)] bg-[rgba(251,250,246,0.06)] text-[var(--lale-gold)] hover:bg-[rgba(212,175,55,0.10)]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {featuredItems.length > 0 && selectedCategory === 'all' && (
            <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="lale-card-dark overflow-hidden rounded-[14px]">
                <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[340px]">
                    <Image
                      src={featuredItems[0].imageUrl || featuredItems[0].thumbnailUrl}
                      alt={featuredItems[0].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,35,31,0.40)] to-transparent" />
                    <div className="absolute left-6 top-6 rounded-full border border-[rgba(212,175,55,0.34)] bg-[rgba(6,35,31,0.74)] px-4 py-2 text-xs font-medium tracking-[0.16em] text-[var(--lale-gold)] backdrop-blur">
                      ONE CIKAN KARE
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-9">
                    <div>
                      <p className="text-xs tracking-[0.16em] text-[var(--lale-gold)]">
                        {getCategoryName(featuredItems[0].categoryId)}
                      </p>
                      <h3 className="mt-4 font-serif text-3xl leading-tight text-[var(--lale-ivory)]">
                        {featuredItems[0].title}
                      </h3>
                      <p className="mt-5 text-sm leading-7 text-[rgba(251,250,246,0.68)]">
                        {featuredItems[0].description || 'Kurumsal çalışma yapımızı ve hizmet yaklaşımımızı yansıtan seçili bir görsel.'}
                      </p>
                      {featuredItems[0].tags?.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {featuredItems[0].tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-3 py-1 text-xs text-[var(--lale-gold)]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedItem(featuredItems[0])}
                      className="lale-gold-button mt-8 gap-3"
                    >
                      Detayli Incele
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>

              <div className="space-y-6">
                {featuredItems.slice(1, 3).map((item) => (
                  <article
                    key={item.id}
                    className="lale-card-dark rounded-[14px] p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[rgba(251,250,246,0.06)]">
                        <Image
                          src={item.thumbnailUrl || item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs tracking-[0.14em] text-[var(--lale-gold)]">
                          {getCategoryName(item.categoryId)}
                        </p>
                        <h3 className="mt-2 line-clamp-2 text-xl font-semibold text-[var(--lale-ivory)]">
                          {item.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[rgba(251,250,246,0.66)]">
                          {item.description || 'Bakim seanslarimizdan secilen zarif ve ilham veren bir detay.'}
                        </p>
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--lale-gold)] transition-colors hover:text-[var(--lale-gold-soft)]"
                        >
                          Buyuterek Gor
                          <FiArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="lale-card-dark mt-16 rounded-[14px] p-6 sm:p-8">
            <div className="mb-8 flex flex-col gap-4 border-b border-[rgba(212,175,55,0.14)] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--lale-gold)]">
                  Gorsel Arsiv
                </p>
                <h3 className="mt-2 font-serif text-3xl text-[var(--lale-ivory)]">
                  {selectedCategory === 'all' ? 'Tum Kareler' : getCategoryName(selectedCategory)}
                </h3>
              </div>
              <div className="rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-4 py-2 text-sm text-[var(--lale-gold)]">
                {filteredItems.length} gorsel bulundu
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-[rgba(212,175,55,0.18)] bg-[rgba(251,250,246,0.04)] px-6 py-16 text-center">
                <div className="text-5xl">🖼️</div>
                <h3 className="mt-5 font-serif text-3xl text-[var(--lale-ivory)]">Bu koleksiyonda gorsel yok</h3>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[rgba(251,250,246,0.68)]">
                  Secili kategori icin henuz gorsel eklenmemis. Dilerseniz tum karelere
                  donerek diger secimleri inceleyebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {currentItems.map((item) => (
                  <article
                    key={item.id}
                    className="group lale-card-dark overflow-hidden rounded-[14px] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.42)] hover:shadow-[0_24px_40px_rgba(0,0,0,0.24)]"
                  >
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="block w-full text-left"
                    >
                      <div className="relative h-80 overflow-hidden bg-[rgba(251,250,246,0.06)]">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-5xl text-[var(--lale-gold)]">
                            ✦
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,35,31,0.42)] via-transparent to-transparent opacity-90" />
                        <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(6,35,31,0.78)] text-[var(--lale-gold)] shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-105">
                          <FiEye className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-serif text-2xl text-[var(--lale-ivory)]">
                          {item.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[rgba(251,250,246,0.68)]">
                          {item.description || 'Merkezimizdeki uygulamalardan secilen zarif ve ilham veren bir kare.'}
                        </p>
                        {item.tags?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-3 py-1 text-xs text-[var(--lale-gold)]"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                      currentPage === 1
                        ? 'cursor-not-allowed bg-[rgba(251,250,246,0.06)] text-[rgba(251,250,246,0.32)]'
                        : 'border border-[rgba(212,175,55,0.28)] bg-[rgba(251,250,246,0.06)] text-[var(--lale-gold)] hover:bg-[rgba(212,175,55,0.10)]'
                    }`}
                  >
                    <FiChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`flex h-11 min-w-[44px] items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors ${
                        currentPage === page
                          ? 'bg-[var(--lale-gold)] text-[var(--lale-emerald-deep)] shadow-[0_12px_30px_rgba(212,175,55,0.2)]'
                          : 'border border-[rgba(212,175,55,0.28)] bg-[rgba(251,250,246,0.06)] text-[var(--lale-gold)] hover:bg-[rgba(212,175,55,0.10)]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                      currentPage === totalPages
                        ? 'cursor-not-allowed bg-[rgba(251,250,246,0.06)] text-[rgba(251,250,246,0.32)]'
                        : 'border border-[rgba(212,175,55,0.28)] bg-[rgba(251,250,246,0.06)] text-[var(--lale-gold)] hover:bg-[rgba(212,175,55,0.10)]'
                    }`}
                  >
                    <FiChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="lale-dark-section py-24 sm:py-28">
        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-7 lg:px-10">
          <div className="lale-card-dark rounded-[14px] p-8 sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--lale-gold)]">
              Randevu ve Bilgi
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[var(--lale-ivory)] sm:text-5xl">
              Sizi de bu deneyimin bir parcasi olmaya davet ediyoruz
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[rgba(251,250,246,0.68)] sm:text-lg">
              Galeride gordugunuz uygulamalar hakkinda bilgi almak veya size uygun
              bakim planini olusturmak icin bizimle iletisime gecebilirsiniz.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/iletisim"
                className="lale-gold-button gap-3"
              >
                İletişime Geçin
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hizmetlerimiz"
                className="lale-outline-button"
              >
                Hizmetleri Inceleyin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {selectedItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(6,35,31,0.82)] p-4 backdrop-blur-sm">
          <div className="max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[20px] border border-[rgba(212,175,55,0.28)] bg-[var(--lale-emerald-deep)] shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
            <div className="flex items-center justify-between border-b border-[rgba(212,175,55,0.12)] px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs tracking-[0.16em] text-[var(--lale-gold)]">
                  {getCategoryName(selectedItem.categoryId)}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-[var(--lale-ivory)] sm:text-3xl">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(212,175,55,0.18)] text-[var(--lale-gold)] transition-colors hover:bg-[rgba(212,175,55,0.10)]"
              >
                ✕
              </button>
            </div>

            <div className="grid max-h-[calc(88vh-96px)] overflow-y-auto lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[320px] bg-[rgba(251,250,246,0.06)] lg:min-h-[620px]">
                {selectedItem.imageUrl ? (
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-6xl text-[var(--lale-gold)]">
                    ✦
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-sm leading-8 text-[rgba(251,250,246,0.68)]">
                  {selectedItem.description || 'Merkezimizin bakim atmosferini ve uygulama detaylarini yansitan ozel bir kare.'}
                </p>

                {selectedItem.tags?.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-3 py-1 text-xs text-[var(--lale-gold)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 rounded-[18px] border border-[rgba(212,175,55,0.14)] bg-[rgba(251,250,246,0.05)] p-5">
                  <p className="text-xs tracking-[0.16em] text-[var(--lale-gold)]">MERKEZ DILI</p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(251,250,246,0.68)]">
                    Dogal sonuc, sakin deneyim ve ozenli hizmet anlayisimiz galerimizin
                    her kosesinde ayni zarif dili korur.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/iletisim"
                    className="lale-gold-button gap-3"
                  >
                    Randevu Planla
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="lale-outline-button"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GaleriPage;
