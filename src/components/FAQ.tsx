'use client'
import React, { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const faqs = [
  {
    question: 'iPhone anakart tamiri hangi arızalarda gerekir?',
    answer:
      'Sıvı teması, cihazın açılmaması, şebeke yok hatası, sürekli yeniden başlama, şarj almama, kısa devre ve veri erişimi sorunlarında anakart seviyesinde teknik inceleme gerekir.',
  },
  {
    question: 'Sıvı temaslı iPhone için ilk ne yapmalıyım?',
    answer:
      'Cihazı şarja takmayın, açmaya çalışmayın ve sıcak hava uygulamayın. En kısa sürede laboratuvar incelemesine getirilmesi veri kurtarma ve onarım şansını artırır.',
  },
  {
    question: 'Verilerim silinmeden onarım yapılabilir mi?',
    answer:
      'Birçok anakart arızasında öncelik veriyi korumaktır. NAND, CPU hattı, güç devresi veya sıvı teması durumuna göre veri kurtarma olasılığı teknik analiz sonrası netleşir.',
  },
  {
    question: 'Mikro lehimleme işlemi ne kadar sürer?',
    answer:
      'Arızanın türüne göre değişir. Basit entegre ve hat onarımları daha kısa sürebilir; katman arızası, reballing veya veri kurtarma işlemlerinde süreç daha detaylı ilerler.',
  },
  {
    question: 'Onarım öncesi fiyat veriyor musunuz?',
    answer:
      'Cihazın arıza tespiti yapıldıktan sonra onarım kapsamı, riskler ve ücret bilgisi paylaşılır. Onay alınmadan onarım süreci başlatılmaz.',
  },
  {
    question: 'İstanbul dışından cihaz gönderebilir miyim?',
    answer:
      'Evet. İstanbul dışından gelen cihazlar için kargo ile kabul yapılabilir. Gönderim öncesi cihaz durumu ve arıza belirtisi için iletişim kurmanız yeterlidir.',
  },
] as const;

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-background py-24 sm:py-28">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-7 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 border border-outline-variant bg-surface-container px-4 py-2 font-technical text-[10px] uppercase tracking-[0.3em] text-tertiary">
            <FiHelpCircle className="h-4 w-4" />
            SIK SORULAN SORULAR
          </div>

          <h2 className="mt-8 font-display text-4xl font-bold leading-tight text-on-surface sm:text-5xl uppercase tracking-tighter">
            Anakart tamiri öncesi
            <span className="block text-tertiary">bilmeniz gerekenler</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
            iPhone anakart tamiri, sıvı teması, mikro lehimleme ve veri kurtarma
            süreçleriyle ilgili en çok gelen soruları derledik.
          </p>
        </div>

        <div className="mt-14 space-y-3">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-md border bg-surface-container shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition-all duration-300 ${
                  isActive ? 'border-tertiary/60' : 'border-outline-variant'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7"
                >
                  <h3 className="text-base font-medium leading-7 text-on-surface sm:text-lg">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'border-tertiary bg-tertiary/10 text-tertiary'
                        : 'border-outline-variant bg-background text-on-surface-variant'
                    }`}
                  >
                    <FiChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isActive ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-outline-variant px-5 pb-5 pt-4 sm:px-7">
                      <p className="max-w-4xl text-sm leading-7 text-on-surface-variant">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
