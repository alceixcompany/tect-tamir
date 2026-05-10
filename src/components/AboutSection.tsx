import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="relative lg:w-1/2 group">
            <div className="relative z-10 border border-outline-variant overflow-hidden">
              <Image
                src="/tech_lab_overview_1778397945364.png"
                alt="TECH-LAB Laboratuvar Ortamı"
                width={800}
                height={1000}
                className="aspect-[4/5] object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </div>
            <div className="absolute -left-10 top-20 z-20 hidden md:block bg-surface-container border border-tertiary p-6 shadow-[0_0_20px_rgba(173,199,255,0.2)]">
              <div className="text-4xl font-display font-bold text-tertiary">10+ Yıl</div>
              <div className="font-technical text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Sektörel Uzmanlık</div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-tertiary/10 -z-10 translate-x-4 translate-y-4"></div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="font-technical text-tertiary tracking-[0.3em] uppercase text-xs">VİZYONUMUZ</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-on-surface leading-tight">
                Teknolojinin Kalbine <br/> <span className="text-tertiary neon-text-glow">Cerrahi Müdahale</span>
              </h2>
            </div>
            
            <p className="text-on-surface-variant leading-relaxed text-lg">
              TECH-LAB PRECISION olarak, modern elektroniğin en karmaşık sorunlarını çip seviyesinde çözüme ulaştırıyoruz. Sadece tamir etmiyoruz; sistemlerinizi orijinal performansına ve güvenilirliğine geri döndürüyoruz.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              <div className="space-y-2 border-l-2 border-tertiary pl-4">
                <h4 className="font-display font-bold text-on-surface">İleri Diagnostik</h4>
                <p className="text-sm text-on-surface-variant">Yüksek frekanslı osiloskoplar ve termal kamera analizleri ile hatasız arıza tespiti.</p>
              </div>
              <div className="space-y-2 border-l-2 border-outline-variant pl-4">
                <h4 className="font-display font-bold text-on-surface">Global Standartlar</h4>
                <p className="text-sm text-on-surface-variant">Uluslararası IPC standartlarında lehimleme ve PCB onarım protokolleri.</p>
              </div>
            </div>

            <Link 
              href="/hakkimizda" 
              className="btn-tech inline-block mt-4"
            >
              TEKNOLOJİK ALTYAPIMIZI İNCELEYİN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
