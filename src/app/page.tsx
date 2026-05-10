import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import References from '@/components/References';
import Gallery from '@/components/Gallery';
import NewsPreview from '@/components/NewsPreview';
import Contact from '@/components/Contact';
import AboutSection from '@/components/AboutSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <AboutSection />
      <Services />
      <References />
      <Gallery />
      <NewsPreview />
      <Contact />
    </main>
  );
}


