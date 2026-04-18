"use client";

import { useState } from 'react';
import Link from 'next/link';
import SearchOverlay from './SearchOverlay'; // Yeni bileşeni çağır

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { title: 'Anasayfa', href: '/' },
    { title: 'T-Shirt', href: '/urunler?category=t-shirt' },
    { title: 'Polar', href: '/urunler?category=polar' },
    { title: 'Yelek', href: '/urunler?category=yelek' },
    { title: 'Mont', href: '/urunler?category=mont' },
    { title: 'Pantolon', href: '/urunler?category=pantolon' },
    { title: 'İletişim', href: '/iletisim' },
  ];

  return (
    <nav className="sticky top-0 z-[90] bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-black text-gray-900 tracking-tighter shrink-0">
            ERSAH<span className="text-secondary">KURUMSAL</span>
          </Link>

          {/* Menü Linkleri (Desktop) */}
          <div className="hidden xl:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link key={item.title} href={item.href} className="text-[15px] font-semibold text-gray-600 hover:text-primary transition-colors">
                {item.title}
              </Link>
            ))}
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex items-center space-x-4">
            {/* Profesyonel Arama Butonu */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-3 text-gray-700 hover:bg-gray-50 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Teklif Al (Modern Stil) */}
            <Link 
              href="https://wa.me/905521334252" 
              className="hidden md:flex bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-primary transition-all shadow-xl shadow-gray-200"
            >
              TEKLİF AL
            </Link>

            {/* Mobil Menü Burger */}
            <button className="xl:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ARAMA KATMANI (Overlay) */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;