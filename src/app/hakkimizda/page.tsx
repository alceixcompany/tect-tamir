'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiBarChart2, FiCheckCircle, FiClock, FiEye, FiShield, FiTarget, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';

const milestones = [
  { year: '2016', title: 'Kurumsal hizmet yapısı kuruldu', subtitle: 'KOBİ ve şahıs işletmelerine düzenli destek modeli' },
  { year: '2019', title: 'Bordro ve SGK operasyonları genişledi', subtitle: 'Personel süreçleri için daha kapsamlı takip sistemi' },
  { year: '2022', title: 'Dijital belge ve e-dönüşüm desteği', subtitle: 'E-fatura ve e-defter süreçlerinde operasyonel uyum' },
  { year: '2025', title: 'Danışmanlık odağı güçlendirildi', subtitle: 'Muhasebe dışında karar destek yaklaşımı' },
] as const;

const AboutPage = () => {
  return (
    <main className="page-flow min-h-screen bg-white text-[var(--lale-anthracite)]">
      {/* Refined Chic Hero */}
      <section className="relative flex min-h-[450px] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/banner/about_hero.png"
            alt="Demirbaş Muhasebe Hakkımızda"
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-block rounded bg-[var(--lale-gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Hakkımızda
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Deneyim ve Güvenle <br />
              <span className="text-[var(--lale-gold)]">Geleceğe Bakıyoruz</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
              Demirbaş Muhasebe olarak, işletmelerin finansal süreçlerini profesyonel 
              disiplin ve modern dijital çözümlerle destekleyen bir iş ortağıyız.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Structured Intro Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-[var(--lale-gold)]">
                <FiAward className="h-5 w-5" />
              </div>

              <h2 className="text-2xl font-bold text-[var(--lale-anthracite)] sm:text-3xl">
                Kurumsal Yaklaşımımız
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#5a666d]">
                <p>
                  Modern iş dünyasında muhasebe, sadece evrak işlemekten çok daha fazlasıdır. 
                  Biz, verilerin arkasındaki hikayeyi okuyor ve işletmenizin mali sağlığını 
                  korumak için disiplinli bir çalışma modeli sunuyoruz.
                </p>
                <p>
                  Süreci sadece mevzuat çerçevesinde değil, işletme sahibinin karar alma 
                  mekanizmalarını güçlendirecek bir şeffaflıkla yönetiyoruz.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                <div>
                  <div className="text-2xl font-bold text-[var(--lale-gold)]">15+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#5a666d]">Yıllık Deneyim</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--lale-gold)]">500+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#5a666d]">İş Ortaklığı</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <Image
                  src="/banner/mission.png"
                  alt="Kurumsal Yaklaşım"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Compact */}
      <section className="py-20 bg-gray-50/50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 border-l-4 border-[var(--lale-gold)] pl-6">
            <h2 className="text-2xl font-bold text-[var(--lale-anthracite)]">Yolculuğumuz</h2>
            <p className="mt-1 text-sm text-[#5a666d]">Önemli kilometre taşları</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((item) => (
              <div key={item.year} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <span className="text-lg font-bold text-[var(--lale-gold)]">{item.year}</span>
                <h3 className="mt-2 text-sm font-bold text-[var(--lale-anthracite)]">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#5a666d]">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Chic Design with Images */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-24">
            {/* Mission */}
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
              >
                <Image src="/banner/mission.png" alt="Misyonumuz" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--lale-gold)] text-white shadow-lg">
                    <FiTarget className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
              <div className="max-w-xl">
                <h3 className="text-3xl font-bold text-[var(--lale-anthracite)]">Misyonumuz</h3>
                <p className="mt-6 text-base leading-relaxed text-[#5a666d]">
                  İşletmelerin mali süreçlerini mevzuata tam uyumlu, şeffaf ve güvenilir şekilde yöneterek; 
                  teknolojik dönüşümün getirdiği hızla kurumsal disiplini harmanlamak. İş ortaklarımızın 
                  finansal sürdürülebilirliğini en üst düzeye çıkarmak temel önceliğimizdir.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1 max-w-xl">
                <h3 className="text-3xl font-bold text-[var(--lale-anthracite)]">Vizyonumuz</h3>
                <p className="mt-6 text-base leading-relaxed text-[#5a666d]">
                  Muhasebeyi bir yükümlülük olmaktan çıkarıp, işletmelerin büyüme stratejilerine yön veren, 
                  değer üreten bir finansal rehberlik modeline dönüştürmek. Sektörümüzde dijitalleşmenin 
                  ve güvenin simgesi haline gelerek küresel standartlarda hizmet sunmak.
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
              >
                <Image src="/banner/vision.png" alt="Vizyonumuz" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 right-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg">
                    <FiEye className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Structured Grid */}
      <section className="py-20 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-[var(--lale-anthracite)]">Değerlerimiz</h2>
            <p className="mt-1 text-sm text-[#5a666d]">Bizi biz yapan profesyonel ilkelerimiz</p>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { icon: FiShield, title: 'Güven', desc: 'Tam şeffaflık ve etik değerler.', bg: 'bg-blue-50', text: 'text-blue-600' },
              { icon: FiCheckCircle, title: 'Doğruluk', desc: 'Hatasız işlem ve titiz kontrol.', bg: 'bg-emerald-50', text: 'text-emerald-600' },
              { icon: FiClock, title: 'Zamanlama', desc: 'Süreçlerin takvim disiplinine uyumu.', bg: 'bg-rose-50', text: 'text-rose-600' },
              { icon: FiTrendingUp, title: 'Gelişim', desc: 'Sürekli gelişim ve teknolojik uyum.', bg: 'bg-indigo-50', text: 'text-indigo-600' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                <div className={`mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${item.bg} ${item.text}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-[var(--lale-anthracite)]">{item.title}</h4>
                <p className="mt-2 text-xs leading-5 text-[#5a666d]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Corporate */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-[#1e333c] p-10 md:p-16 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Birlikte <span className="text-[var(--lale-gold)]">Güçlü Adımlar</span> Atalım
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-300">
              İşletmenizin finansal geleceğini profesyonel bir ekiple planlamak için bugün ilk adımı atın.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/iletisim" className="rounded-lg bg-[var(--lale-gold)] px-8 py-3 text-sm font-bold text-white hover:bg-[#f57c00] transition-colors">
                İLETİŞİME GEÇİN
              </Link>
              <Link href="/hizmetlerimiz" className="rounded-lg border border-white/20 px-8 py-3 text-sm font-bold text-white hover:bg-white/5 transition-colors">
                HİZMETLERİ KEŞFEDİN
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
