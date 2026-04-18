import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Üst Kısım: Grid Yapısı */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Sütun: Marka ve Hakkımızda */}
          <div className="space-y-6">
            <Link href="/" className="inline-block text-2xl font-black text-white tracking-tighter">
              ERSAH<span className="text-secondary">KURUMSAL</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Kaliteli, dayanıklı ve firmanıza özel kurumsal iş elbiseleri çözümleri. İş güvenliğini ve marka imajınızı en üst seviyeye taşıyoruz.
            </p>
          </div>

          {/* 2. Sütun: Hızlı Linkler */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Kurumsal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Anasayfa</Link>
              </li>
              <li>
                <Link href="/urunler" className="hover:text-primary transition-colors">Tüm Ürünler</Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* 3. Sütun: Kategoriler */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Kategoriler</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/urunler?category=t-shirt" className="hover:text-primary transition-colors">T-Shirt & Polo</Link>
              </li>
              <li>
                <Link href="/urunler?category=polar" className="hover:text-primary transition-colors">Polar Modelleri</Link>
              </li>
              <li>
                <Link href="/urunler?category=mont" className="hover:text-primary transition-colors">İş Montları</Link>
              </li>
              <li>
                <Link href="/urunler?category=pantolon" className="hover:text-primary transition-colors">Gabardin Pantolon</Link>
              </li>
            </ul>
          </div>

          {/* 4. Sütun: İletişim Bilgileri (Senin Verdiğin Veriler) */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">İletişim</h4>
            
            {/* HTML5 <address> etiketi SEO için çok önemlidir */}
            <address className="not-italic space-y-5 text-sm text-gray-400">
              
              {/* Adres */}
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  Eşmekaya Belediye Binası<br />
                  Yeni Mahalle Cumhuriyet Cad.<br />
                  Eskil / Aksaray<br />
                  Türkiye
                </span>
              </div>

              {/* Telefon */}
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {/* tel: uzantısı sayesinde mobilden tıklanınca anında aramaya geçer */}
                <a href="tel:+905521334252">+90 552 133 42 52</a>
              </div>

              {/* E-Posta */}
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {/* mailto: uzantısı sayesinde tıklanınca otomatik mail uygulaması açılır */}
                <a href="mailto:info@ersahkurumsal.com">info@ersahkurumsal.com</a>
              </div>

            </address>
          </div>

        </div>

        {/* Alt Kısım: Copyright Bölümü */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Erşah Kurumsal. Tüm Hakları Saklıdır.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-white transition-colors">Çerez Politikası</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}