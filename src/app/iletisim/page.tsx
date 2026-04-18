"use client";

import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Lütfen gerekli alanları doldurunuz.");
      return;
    }

    // Profesyonel yönlendirme: Formu mail taslağına dönüştürür
    const mailBody = `Ad Soyad: ${formData.name}%0AE-posta: ${formData.email}%0A%0AMesaj:%0A${formData.message}`;
    window.location.href = `mailto:info@ersahkurumsal.com?subject=${encodeURIComponent(formData.subject || 'Yeni İletişim Formu')}&body=${mailBody}`;
  };

  return (
    <div className="bg-white">
      {/* Hero Başlık */}
      <section className="bg-gray-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            BİZE ULAŞIN
          </h1>
          <div className="h-1.5 w-24 bg-secondary mx-auto mt-6 rounded-full"></div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* İletişim Bilgileri ve Form */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Telefon</p>
                <a href="tel:+905521334252" className="text-xl font-bold text-gray-900 hover:text-primary transition-colors">
                  +90 552 133 42 52
                </a>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">E-posta</p>
                <a href="mailto:info@ersahkurumsal.com" className="text-xl font-bold text-gray-900 hover:text-primary transition-colors italic">
                  info@ersahkurumsal.com
                </a>
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl text-white">
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">Hızlı İletişim</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Adınız Soyadınız" 
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl outline-none focus:border-secondary transition-all text-white" 
                />
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="E-posta Adresiniz" 
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl outline-none focus:border-secondary transition-all text-white" 
                />
                <input 
                  type="text" name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="Konu" 
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl outline-none focus:border-secondary transition-all text-white" 
                />
                <textarea 
                  name="message" value={formData.message} onChange={handleChange}
                  placeholder="Mesajınız..." rows={4} 
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl outline-none focus:border-secondary transition-all text-white resize-none"
                ></textarea>
                <button 
                  type="submit"
                  className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg"
                >
                  MESAJI GÖNDER
                </button>
              </form>
            </div>
          </div>

          {/* HARİTA (DÜZELTİLDİ VE ÇALIŞIR HALE GETİRİLDİ) */}
          <div className="flex flex-col h-full min-h-[500px]">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Merkez Ofisimiz</h3>
              <p className="text-gray-500 text-sm mt-1 italic">
                Eşmekaya Belediye Binası, Yeni Mahalle Cumhuriyet Cad., Eskil / Aksaray
              </p>
            </div>
            <div className="flex-grow rounded-3xl overflow-hidden border-4 border-gray-100 shadow-2xl relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.4285810260715!2d33.41113067645391!3d38.29210087185807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d0f04df900d75b%3A0xe5426f849e776077!2zRcSfbWVrYXlhIEJlbGVkaXllc2k!5e0!3m2!1str!2str!4v1715691234567!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Erşah Kurumsal Adres"
              ></iframe>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}