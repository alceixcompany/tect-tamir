'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { FiArrowRight, FiCheckCircle, FiArrowLeft, FiClock, FiSettings, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const servicesData = {
  'genel-muhasebe': {
    title: 'Genel Muhasebe',
    image: '/banner/srv_accounting.png',
    icon: '01',
    description: 'Aylık muhasebe kayıtları, belge akışı ve dönem sonu hazırlıkları için düzenli operasyon desteği.',
    features: ['Yevmiye ve resmi kayıt takibi', 'Belge düzeni ve kontrol akışı', 'Dönem sonu hazırlıkları', 'Aylık operasyon disiplini'],
    overview: 'Genel muhasebe hizmetimiz, işletmenin mali kayıt tarafını düzenli, öngörülebilir ve denetime hazır biçimde sürdürmek için planlanır.',
    whyChoose: ['Aylık düzenli kontrol', 'Belgelerde dağınıklığı azaltan akış', 'İşletmeye uygun çalışma modeli'],
    process: [
      { step: 1, title: 'İhtiyaç Analizi', description: 'Mevcut evrak ve işlem yoğunluğu değerlendirilir.' },
      { step: 2, title: 'Süreç Kurgusu', description: 'Belge teslim ve kontrol düzeni netleştirilir.' },
      { step: 3, title: 'Aylık Takip', description: 'Kayıt, kontrol ve resmi süreçler takvimli biçimde yürütülür.' },
      { step: 4, title: 'Dönemsel Değerlendirme', description: 'Eksikler ve iyileştirme alanları görünür hale getirilir.' },
    ],
  },
  'vergi-beyanname': {
    title: 'Vergi ve Beyanname',
    image: '/banner/srv_tax.png',
    icon: '02',
    description: 'Beyanname yükümlülüklerini zamanında ve mevzuata uygun yerine getiren kontrollü vergi süreci yönetimi.',
    features: ['KDV ve muhtasar beyanları', 'Geçici vergi süreci', 'Son tarih takibi', 'Kontrollü bildirim akışı'],
    overview: 'Vergi ve beyanname hizmetimiz, yasal yükümlülüklerin son gün stresine bırakılmadan planlı şekilde hazırlanmasını hedefler.',
    whyChoose: ['Takvim odaklı işleyiş', 'Gecikme riskini azaltan kontrol', 'Mevzuata uygun takip'],
    process: [
      { step: 1, title: 'Takvimleme', description: 'Dönemsel yükümlülükler tarih bazında planlanır.' },
      { step: 2, title: 'Veri Kontrolü', description: 'Gerekli belge ve kayıtlar gözden geçirilir.' },
      { step: 3, title: 'Hazırlık', description: 'Beyannameler ve ilgili hesaplamalar hazırlanır.' },
      { step: 4, title: 'Bildirim', description: 'İşlem tamamlanır ve gerekli bilgilendirme yapılır.' },
    ],
  },
  'bordro-sgk': {
    title: 'Bordro ve SGK',
    image: '/banner/srv_payroll.png',
    icon: '03',
    description: 'Personel özlük, maaş bordroları ve SGK bildirimleri için düzenli ve güvenli süreç yönetimi.',
    features: ['Bordro hazırlanması', 'İşe giriş-çıkış işlemleri', 'SGK bildirim takibi', 'Personel süreç disiplini'],
    overview: 'Bordro ve SGK hizmetimiz, personel tarafındaki resmi yükümlülüklerin aksamasını önleyecek bir operasyon akışı kurar.',
    whyChoose: ['Personel süreçlerinde hız', 'SGK tarafında düzenli takip', 'İş yükünü azaltan destek'],
    process: [
      { step: 1, title: 'Personel Yapısı Analizi', description: 'Çalışan sayısı ve işlem tipi değerlendirilir.' },
      { step: 2, title: 'Bordro Planı', description: 'Aylık bordro işleyişi ve teslim düzeni kurulur.' },
      { step: 3, title: 'SGK İşlemleri', description: 'Giriş, çıkış ve bildirim süreçleri yürütülür.' },
      { step: 4, title: 'Aylık Kontrol', description: 'Dönem sonu bordro ve bildirge kontrolleri tamamlanır.' },
    ],
  },
  'sirket-kurulusu': {
    title: 'Şirket Kuruluşu',
    image: '/banner/hero_bg_home.png',
    icon: '04',
    description: 'Yeni girişimler için şirket türü seçimi, kuruluş evrakları ve başlangıç yükümlülükleri konusunda yol haritası.',
    features: ['Şirket türü yönlendirmesi', 'Kuruluş evrak planı', 'Başlangıç yükümlülükleri', 'İlk dönem mali rehberlik'],
    overview: 'Şirket kuruluş hizmetimiz, girişimlerin en baştan doğru mali zeminde ilerlemesini sağlamak için kurgulanır.',
    whyChoose: ['Kuruluş öncesi net yönlendirme', 'Evrak sürecinde düzen', 'Başlangıç risklerini azaltan plan'],
    process: [
      { step: 1, title: 'Ön Görüşme', description: 'Faaliyet alanı ve şirket yapısı değerlendirilir.' },
      { step: 2, title: 'Kuruluş Hazırlığı', description: 'Evrak listesi ve izlenecek yol netleştirilir.' },
      { step: 3, title: 'Resmi Süreç', description: 'Kuruluş adımları plan dahilinde yürütülür.' },
      { step: 4, title: 'İlk Dönem Uyum', description: 'Kuruluş sonrası yükümlülükler açıklanır ve süreç başlatılır.' },
    ],
  },
  'e-defter-e-fatura': {
    title: 'E-Defter ve E-Fatura',
    image: '/banner/srv_consulting.png',
    icon: '05',
    description: 'Dijital belge süreçlerini işletmenize uyumlu hale getiren e-dönüşüm desteği.',
    features: ['E-fatura uyum desteği', 'E-defter işleyişi', 'Dijital belge akışı', 'Süreç sürdürülebilirliği'],
    overview: 'E-dönüşüm hizmetimiz, dijital mali süreçlerin yalnızca kurulmasını değil, düzenli çalışmasını da hedefler.',
    whyChoose: ['Dijital düzene geçiş kolaylığı', 'Operasyonla uyumlu kurgu', 'Süreç sürekliliği'],
    process: [
      { step: 1, title: 'Uygunluk Analizi', description: 'Şirketin e-dönüşüm kapsamı belirlenir.' },
      { step: 2, title: 'Kurulum Planı', description: 'Gerekli dijital adımlar planlanır.' },
      { step: 3, title: 'İşleyiş Takibi', description: 'Belge akışı ve kayıt düzeni izlenir.' },
      { step: 4, title: 'Süreç Kontrolü', description: 'Devamlılık için gerekli kontroller tamamlanır.' },
    ],
  },
  'mali-danismanlik': {
    title: 'Mali Danışmanlık',
    image: '/banner/srv_consulting.png',
    icon: '06',
    description: 'Muhasebe verilerini yorumlayarak işletme sahibine karar desteği sunan mali danışmanlık yaklaşımı.',
    features: ['Finansal görünürlük', 'Yönetici bilgilendirmesi', 'Karar destek bakışı', 'Operasyonel yönlendirme'],
    overview: 'Mali danışmanlık hizmetimiz, yalnızca kayıt tutmakla kalmayıp bu kayıtların işletme yönetimine katkı sunmasını amaçlar.',
    whyChoose: ['Rakamları anlaşılır hale getirme', 'İşletmeye özel değerlendirme', 'Yönetim kararlarını destekleme'],
    process: [
      { step: 1, title: 'Mevcut Durum Analizi', description: 'İşletmenin mali yapısı genel hatlarıyla incelenir.' },
      { step: 2, title: 'Önceliklerin Belirlenmesi', description: 'Odak alanları ve riskli başlıklar saptanır.' },
      { step: 3, title: 'Yönlendirme', description: 'Uygulanabilir ve sade öneriler sunulur.' },
      { step: 4, title: 'Periyodik Takip', description: 'Gerekli görülen alanlarda düzenli değerlendirme yapılır.' },
    ],
  },
} as const;

type ServiceSlug = keyof typeof servicesData;

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as ServiceSlug;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-[var(--lale-anthracite)]">
      {/* Hero Section */}
      <section className="relative flex min-h-[450px] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link href="/hizmetlerimiz" className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-[0.2em] mb-8 hover:text-[var(--lale-gold)] transition-colors">
              <FiArrowLeft /> HİZMETLERE DÖN
            </Link>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--lale-gold)]" />
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--lale-gold)]">Hizmet Detayı</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            
            {/* Left Column: Scope & Features */}
            <div className="lg:col-span-7">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Hizmet Kapsamı</h2>
                <p className="text-lg leading-relaxed text-[#5a666d] mb-10">
                  {service.overview}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-xl border border-gray-50 bg-gray-50/50">
                      <FiCheckCircle className="h-5 w-5 text-[var(--lale-gold)] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[var(--lale-anthracite)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Section */}
              <div className="pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold mb-10">Süreç Nasıl İlerler?</h2>
                <div className="space-y-8">
                  {service.process.map((item) => (
                    <div key={item.step} className="relative flex gap-8 group">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--lale-gold)] text-white text-sm font-bold shadow-lg shadow-[var(--lale-gold)]/20 z-10">
                          {item.step}
                        </div>
                        {item.step !== service.process.length && (
                          <div className="h-full w-px bg-gray-100 absolute top-10" />
                        )}
                      </div>
                      <div className="pb-8">
                        <h4 className="text-xl font-bold mb-2 group-hover:text-[var(--lale-gold)] transition-colors">{item.title}</h4>
                        <p className="text-sm leading-relaxed text-[#5a666d]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Why Us & CTA */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-8">
                {/* Why Choose Card */}
                <div className="bg-[#1e333c] rounded-[2.5rem] p-10 text-white shadow-2xl">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <FiActivity className="text-[var(--lale-gold)]" />
                    Neden Biz?
                  </h3>
                  <div className="space-y-6">
                    {service.whyChoose.map((item) => (
                      <div key={item} className="flex gap-4">
                        <div className="h-2 w-2 rounded-full bg-[var(--lale-gold)] mt-2.5 shrink-0" />
                        <p className="text-sm leading-relaxed text-gray-300 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consultation CTA */}
                <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 text-center">
                  <FiSettings className="h-10 w-10 text-[var(--lale-gold)] mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Size Özel Çözüm</h3>
                  <p className="text-sm text-[#5a666d] mb-8">
                    İşletmenizin yapısına uygun çalışma modelini birlikte belirleyelim.
                  </p>
                  <Link href="/iletisim" className="block w-full rounded-xl bg-[var(--lale-gold)] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[var(--lale-gold)]/10 hover:bg-[#f57c00] transition-all">
                    TEKLİF ALIN
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
