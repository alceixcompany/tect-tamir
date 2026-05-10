import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import References from '@/components/References';
import NewsPreview from '@/components/NewsPreview';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="home-flow min-h-screen">
      <Hero />
      <Services />
      <WhyChooseUs />
      <References />
      <NewsPreview />
      <Contact />
    </main>
  );
}
