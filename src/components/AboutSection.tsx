import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="relative lg:w-1/2">
            <div className="relative z-10 overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/banner/hero_bg_home.png"
                alt="Demirbaş Muhasebe ofis atmosferi"
                width={900}
                height={1100}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-xl bg-[var(--lale-gold)] opacity-10" />
            <div className="absolute -left-6 top-12 z-20 hidden rounded-lg bg-white p-6 shadow-xl md:block">
              <div className="mb-1 text-3xl font-bold text-[var(--lale-gold)]">15+ Yıl</div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#5a666d]">Sektörel Deneyim</div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold tracking-[-0.02em] text-[var(--lale-anthracite)] sm:text-5xl">
              Dijital Dönüşümde Mali Otorite
            </h2>
            <p className="mt-6 text-base leading-8 text-[#546067]">
              Demirbaş Muhasebe olarak, klasik mali müşavirlik anlayışını modern
              dijital stratejilerle birleştiriyoruz. Vergi mevzuatındaki
              uzmanlığımızı teknolojik araçların hızıyla harmanlayarak
              işletmenize özel çözümler üretiyoruz.
            </p>
            <p className="mt-6 text-base leading-8 text-[#546067]">
              Hassasiyet ve kurumsal disiplin ilkelerimizden ödün vermeden,
              karmaşık finansal süreçleri sizin için anlaşılır ve yönetilebilir
              hale getiriyoruz. Her müşterimizi uzun vadeli iş ortağı olarak
              görüyor, sürdürülebilir büyüme için gerekli güven zeminini
              oluşturuyoruz.
            </p>

            <div className="mb-10 mt-10 grid grid-cols-2 gap-8">
              <div>
                <h4 className="mb-2 text-lg font-bold text-[var(--lale-anthracite)]">Hassas Analiz</h4>
                <p className="text-sm leading-6 text-[#5a666d]">Tüm verilerinizi düşük hata payıyla ve dikkatle inceliyoruz.</p>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-bold text-[var(--lale-anthracite)]">Yasal Uyumluluk</h4>
                <p className="text-sm leading-6 text-[#5a666d]">Değişen mevzuatı izleyerek riskleri önceden görünür kılıyoruz.</p>
              </div>
            </div>

            <Link href="/hakkimizda" className="rounded-lg bg-[#546067] px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#3c494f]">
              Hikayemizi Okuyun
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
