'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiBarChart2, FiCheck, FiFileText, FiFolder, FiLayers, FiShield, FiUsers, FiTarget } from 'react-icons/fi';
import { motion } from 'framer-motion';

const services = [
  {
    slug: 'genel-muhasebe',
    icon: FiFileText,
    title: 'Genel Muhasebe',
    image: '/banner/service_accounting.png',
    description:
      'Yevmiye kayıtları, dönemsel kontroller ve resmi yükümlülük takibini planlı biçimde yürütüyoruz.',
    highlights: ['Aylık kayıt düzeni', 'Evrak kontrol akışı', 'Dönem sonu hazırlığı'],
  },
  {
    slug: 'vergi-beyanname',
    icon: FiShield,
    title: 'Vergi ve Beyanname',
    image: '/banner/service_accounting.png',
    description:
      'KDV, muhtasar, geçici vergi ve diğer beyan süreçlerini mevzuata uygun, zamanında ve kontrollü şekilde yönetiyoruz.',
    highlights: ['Beyan takvimi yönetimi', 'Son tarih disiplini', 'Risk azaltan kontrol'],
  },
  {
    slug: 'bordro-sgk',
    icon: FiUsers,
    title: 'Bordro ve SGK',
    image: '/banner/service_consulting.png',
    description:
      'Personel bordroları, işe giriş-çıkış işlemleri ve SGK bildirimlerini düzenli operasyon akışıyla takip ediyoruz.',
    highlights: ['Aylık bordro hazırlığı', 'SGK bildirim desteği', 'Personel süreç takibi'],
  },
  {
    slug: 'sirket-kurulusu',
    icon: FiFolder,
    title: 'Şirket Kuruluşu',
    image: '/banner/service_consulting.png',
    description:
      'Yeni girişimler için şirket türü seçimi, kuruluş evrakları ve başlangıç yükümlülükleri konusunda net yol haritası sunuyoruz.',
    highlights: ['Kuruluş yönlendirmesi', 'Evrak hazırlık desteği', 'Başlangıç planlaması'],
  },
  {
    slug: 'e-defter-e-fatura',
    icon: FiLayers,
    title: 'E-Defter ve E-Fatura',
    image: '/banner/service_digital.png',
    description:
      'Dijital mali süreçleri işletmenizin operasyonuna uyumlu hale getirerek e-dönüşüm tarafını daha sürdürülebilir kılıyoruz.',
    highlights: ['E-dönüşüm uyumu', 'Dijital süreç takibi', 'Düzenli kayıt akışı'],
  },
  {
    slug: 'mali-danismanlik',
    icon: FiBarChart2,
    title: 'Mali Danışmanlık',
    image: '/banner/service_digital.png',
    description:
      'Yalnızca muhasebe kaydı değil, karar destek bakışıyla işletmenizin mali yapısına yönelik yönlendirme sağlıyoruz.',
    highlights: ['Yönetici görünürlüğü', 'Finansal değerlendirme', 'Karar destek yaklaşımı'],
  },
] as const;

const values = [
  {
    icon: FiShield,
    title: 'Kontrollü Süreç',
    description: 'Her ay neyin, ne zaman ve hangi sırayla yapılacağını netleştiren iş disiplini.',
  },
  {
    icon: FiUsers,
    title: 'Ulaşılabilir İletişim',
    description: 'Soru işareti bırakmayan, açık ve çözüm odaklı iletişim yaklaşımı.',
  },
  {
    icon: FiBarChart2,
    title: 'İşletmeye Uyum',
    description: 'Her firmanın işlem yoğunluğuna ve yapısına göre şekillenen hizmet modeli.',
  },
] as const;

const ServicesPage = () => {
  return (
    <main className="page-flow min-h-screen bg-white">
      {/* High-Impact Hero Section */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/banner/services_hero.png"
            alt="Demirbaş Muhasebe Hizmetlerimiz"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(30,51,60,0.70)] mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(150,73,0,0.3)] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-block rounded bg-[var(--lale-gold)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Uzmanlık Alanlarımız
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
              İşletmenize Değer Katan <br />
              <span className="text-[var(--lale-gold)]">Mali Stratejiler</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/90">
              Modern dijital araçlar ve köklü mali disiplini birleştirerek, 
              işletmenizin sürdürülebilir büyümesine profesyonel destek sağlıyoruz.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/20 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-bold text-[var(--lale-gold)]">20+</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/70">Uzman Kadro</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[var(--lale-gold)]">500+</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/70">Mutlu İşletme</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-3xl font-bold text-[var(--lale-gold)]">100%</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/70">Yasal Uyum</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Structured */}
      <section id="hizmet-listesi" className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 border-l-4 border-[var(--lale-gold)] pl-6">
            <h2 className="text-2xl font-bold text-[var(--lale-anthracite)]">
              Hizmet Alanlarımız
            </h2>
            <p className="mt-2 text-base text-[#5a666d]">
              Geniş hizmet yelpazemizle işletmenizin her ihtiyacına cevap veriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.slug}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5"></div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-[var(--lale-gold)]">
                    <service.icon className="h-5 w-5" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[var(--lale-anthracite)]">
                    {service.title}
                  </h3>
                  
                  <p className="mt-3 text-sm leading-6 text-[#5a666d]">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {service.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-xs font-medium text-[#5a666d]">
                        <FiCheck className="h-3 w-3 text-[var(--lale-gold)]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/hizmetlerimiz/${service.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[var(--lale-gold)] hover:underline"
                    >
                      DETAYI GÖRÜNTÜLE
                      <FiArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="text-left">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[var(--lale-gold)] shadow-sm">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--lale-anthracite)]">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5a666d]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate CTA */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-[#1e333c] p-8 md:p-16 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Profesyonel Destek İçin Bizimle <span className="text-[var(--lale-gold)]">İletişime Geçin</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300">
              İşletmenizin mali süreçlerini birlikte değerlendirelim ve size özel çözümler üretelim.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/iletisim"
                className="rounded-lg bg-[var(--lale-gold)] px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#f57c00] transition-colors"
              >
                İletişim Formu
              </Link>
              <Link
                href="tel:+905320000000"
                className="rounded-lg border border-white/20 px-8 py-3 text-sm font-bold text-white hover:bg-white/5 transition-colors"
              >
                Bizi Arayın
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
