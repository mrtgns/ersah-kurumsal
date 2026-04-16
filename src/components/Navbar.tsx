import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Bölümü */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
              ERSAH<span className="text-secondary">KURUMSAL</span>
            </Link>
          </div>

          {/* Menü Linkleri - Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">Anasayfa</Link>
            <Link href="/urunler" className="text-gray-700 hover:text-primary font-medium">Ürün Kataloğu</Link>
            <Link href="/kurumsal" className="text-gray-700 hover:text-primary font-medium">Kurumsal</Link>
            <Link href="/iletisim" className="text-gray-700 hover:text-primary font-medium">İletişim</Link>
            
            {/* Teklif Al Butonu */}
            <Link 
              href="https://wa.me/905XXXXXXXXX" 
              className="bg-secondary text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-all shadow-md"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;