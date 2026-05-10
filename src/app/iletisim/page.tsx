'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '../../store';
import { clearError, fetchContactInfo, sendContactMessage } from '../../store/slices/contactSlice';

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  urgency: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    urgency: 'normal',
    message: '',
  });
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();
  const { isSending, error } = useAppSelector((state: RootState) => state.contact) as {
    isSending: boolean;
    error: string | null;
  };

  useEffect(() => {
    dispatch(fetchContactInfo());
    dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!formData.name || !formData.phone || !formData.email || !formData.serviceType || !formData.message) {
      return;
    }

    try {
      const messageData = {
        ...formData,
        subject: `${formData.serviceType} - ${formData.urgency}`,
        priority:
          formData.urgency === 'cok-acil'
            ? ('high' as const)
            : formData.urgency === 'acil'
              ? ('medium' as const)
              : ('low' as const),
      };

      await dispatch(sendContactMessage(messageData)).unwrap();

      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceType: '',
        urgency: 'normal',
        message: '',
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Mesaj gönderilirken hata:', err);
    }
  };

  return (
    <main className="page-flow min-h-screen bg-white text-[var(--lale-anthracite)]">
      {/* Refined Chic Contact Hero */}
      <section className="relative flex min-h-[450px] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/banner/contact_hero.png"
            alt="Demirbaş Muhasebe İletişim"
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
              Bize Ulaşın
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              İşletmeniz İçin <br />
              <span className="text-[var(--lale-gold)]">Mali Yapıyı Konuşalım</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
              Şirket yapınızı, ihtiyaçlarınızı ve size uygun hizmet kapsamını 
              birlikte değerlendirelim.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-[var(--lale-anthracite)] mb-2">İletişim Formu</h2>
                <p className="text-sm text-[#5a666d] mb-8">Size en kısa sürede dönüş yapacağız.</p>

                {success && (
                  <div className="mb-8 flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-emerald-700">
                    <FiCheckCircle className="h-5 w-5" />
                    <p className="text-sm font-bold">Mesajınız başarıyla iletildi.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#5a666d]">Ad Soyad</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[var(--lale-gold)] text-sm"
                        placeholder="İsminiz"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#5a666d]">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[var(--lale-gold)] text-sm"
                        placeholder="05xx xxx xx xx"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#5a666d]">E-posta</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[var(--lale-gold)] text-sm"
                      placeholder="e-posta@adresiniz.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#5a666d]">Hizmet Başlığı</label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[var(--lale-gold)] text-sm"
                      >
                        <option value="">Hizmet seçiniz</option>
                        <option value="genel-muhasebe">Genel Muhasebe</option>
                        <option value="vergi-beyanname">Vergi ve Beyanname</option>
                        <option value="bordro-sgk">Bordro ve SGK</option>
                        <option value="sirket-kurulusu">Şirket Kuruluşu</option>
                        <option value="e-defter-e-fatura">E-Defter ve E-Fatura</option>
                        <option value="mali-danismanlik">Mali Danışmanlık</option>
                        <option value="diger">Diğer</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#5a666d]">Aciliyet</label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[var(--lale-gold)] text-sm"
                      >
                        <option value="normal">Normal</option>
                        <option value="acil">Acil</option>
                        <option value="cok-acil">Çok Acil</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#5a666d]">Mesajınız</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[var(--lale-gold)] text-sm resize-none"
                      placeholder="İhtiyaçlarınızı kısaca paylaşın."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full flex items-center justify-center gap-2 bg-[var(--lale-gold)] text-white py-4 rounded-xl font-bold text-xs tracking-widest hover:bg-[#f57c00] transition-all shadow-md disabled:bg-gray-300"
                  >
                    {isSending ? 'GÖNDERİLİYOR...' : (
                      <>
                        <FiSend className="w-3 h-3" />
                        MESAJ GÖNDER
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Info and Map */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-8">
                {[
                  { icon: FiPhone, title: 'Telefon', value: '05xx xxx xx xx', sub: 'Müşteri hizmetleri' },
                  { icon: FiMail, title: 'E-posta', value: 'info@lale.com', sub: 'Destek ve Teklif' },
                  { icon: FiMapPin, title: 'Konum', value: 'Bahçelievler, İstanbul', sub: 'Ofis Adresi' },
                  { icon: FiClock, title: 'Çalışma Saatleri', value: '09:00 - 18:00', sub: 'Hafta içi' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--lale-gold)]/10 text-[var(--lale-gold)]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#5a666d]">{item.title}</h4>
                      <p className="text-base font-bold text-[var(--lale-anthracite)]">{item.value}</p>
                      <p className="text-xs text-[#5a666d]">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3184.0400509927945!2d28.842329076039675!3d40.99229797135275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU5JzMyLjMiTiAyOMKwNTAnNDEuNyJF!5e1!3m2!1str!2saz!4v1778048676704!5m2!1str!2saz"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Demirbaş Muhasebe Konum"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
