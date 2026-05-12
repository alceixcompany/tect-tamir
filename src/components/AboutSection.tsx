import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16 lg:gap-20">
          <div className="relative w-full lg:w-1/2 group order-2 lg:order-1">
            <div className="relative z-10 border border-outline-variant overflow-hidden">
              <Image
                src="/tech_lab_overview_1778397945364.png"
                alt="iPhone Tamir Atölyesi Laboratuvar Ortamı"
                width={800}
                height={1000}
                className="aspect-[4/5] object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </div>
            {/* Experience badge - moved to top right on mobile for better visibility */}
            <div className="absolute -right-4 -top-4 lg:-left-10 lg:top-20 z-20 bg-surface-container border border-tertiary p-4 lg:p-6 shadow-[0_0_20px_rgba(173,199,255,0.2)]">
              <div className="text-2xl lg:text-4xl font-display font-bold text-tertiary">10+ Yıl</div>
              <div className="font-technical text-[8px] lg:text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Sektörel Uzmanlık</div>
            </div>
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-full h-full border border-tertiary/10 -z-10 translate-x-2 translate-y-2 lg:translate-x-4 lg:translate-y-4"></div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="font-technical text-tertiary tracking-[0.3em] uppercase text-[10px] font-bold">VİZYONUMUZ</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-on-surface leading-[1.1] uppercase tracking-tighter">
                Teknolojinin Kalbine <br className="hidden md:block"/> <span className="text-tertiary neon-text-glow">Cerrahi Müdahale</span>
              </h2>
            </div>
            
            <p className="text-on-surface-variant leading-relaxed text-base lg:text-lg opacity-80">
              iPhone Tamir Atölyesi olarak, modern elektroniğin en karmaşık sorunlarını çip seviyesinde çözüme ulaştırıyoruz. Sadece tamir etmiyoruz; cihazlarınızı orijinal performansına ve güvenilirliğine geri döndürüyoruz.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 py-4">
              <div className="space-y-2 border-l-2 border-tertiary pl-4">
                <h4 className="font-technical text-[10px] font-bold text-tertiary uppercase tracking-widest">İleri Diagnostik</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">Yüksek frekanslı osiloskoplar ve termal kamera analizleri ile hatasız arıza tespiti.</p>
              </div>
              <div className="space-y-2 border-l-2 border-outline-variant pl-4">
                <h4 className="font-technical text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Global Standartlar</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">Uluslararası IPC standartlarında lehimleme ve PCB onarım protokolleri.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href="/hakkimizda" 
                className="btn-tech inline-block w-full sm:w-auto text-center"
              >
                KURUMSAL PROFİLİMİZ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
