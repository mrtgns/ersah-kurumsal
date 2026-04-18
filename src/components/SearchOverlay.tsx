"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

// 1. Ürün için kesin bir tip tanımlıyoruz (any yerine bu kullanılacak)
interface ProductResult {
  _id: string;
  title: string;
  productCode: string;
  slug: string;
  imageUrl: string;
}

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. State'e any yerine ProductResult[] tipini veriyoruz
  const [results, setResults] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      // Sadece 2 karakterden fazla girilirse ara
      if (searchTerm.trim().length >= 2) {
        setLoading(true);
        try {
          const query = groq`*[_type == "product" && (title match $q + "*" || productCode match $q + "*")][0...5] {
            _id, 
            title, 
            productCode, 
            "slug": slug.current, 
            "imageUrl": image.asset->url
          }`;
          
          // client.fetch metoduna tipini bildiriyoruz
          const data = await client.fetch<ProductResult[]>(query, { q: searchTerm });
          setResults(data);
        } catch (error) {
          console.error("Arama hatası:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white/98 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="flex justify-end p-6 lg:p-10">
        <button 
          onClick={onClose} 
          className="p-3 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-red-500"
          aria-label="Kapat"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full px-6">
        <div className="relative group">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ürün adı veya kodu yazın..."
            className="w-full text-3xl md:text-6xl font-black border-b-4 border-gray-100 py-6 outline-none focus:border-primary transition-all bg-transparent placeholder-gray-200 text-gray-900 uppercase tracking-tighter"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {loading && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          )}
        </div>

        <div className="mt-12 space-y-3">
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product._id}
                href={`/urunler/${product.slug}`}
                onClick={onClose}
                className="flex items-center p-5 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 rounded-2xl transition-all group border border-transparent hover:border-gray-100 overflow-hidden"
              >
                <div className="w-24 h-24 relative bg-gray-50 rounded-xl overflow-hidden border border-gray-100 p-2 shrink-0">
                  {product.imageUrl && (
                    <Image 
                      src={product.imageUrl} 
                      alt={product.title} 
                      fill 
                      className="object-contain group-hover:scale-110 transition-transform duration-500" 
                    />
                  )}
                </div>
                <div className="ml-8">
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-primary transition-colors uppercase tracking-tight">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm mt-1 bg-gray-100 px-2 py-0.5 rounded w-fit">
                    KOD: {product.productCode}
                  </p>
                </div>
                <div className="ml-auto transform translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))
          ) : searchTerm.length >= 2 && !loading ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
              <p className="text-2xl text-gray-300 font-bold italic tracking-tighter">
                &quot;{searchTerm}&quot; ile ilgili bir sonuç bulamadık.
              </p>
            </div>
          ) : null}
        </div>

        {searchTerm.length >= 2 && (
          <div className="mt-12 text-center pb-10">
            <Link 
              href={`/urunler?q=${searchTerm}`} 
              onClick={onClose}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary font-bold transition-colors text-lg uppercase tracking-widest"
            >
              TÜM SONUÇLARI GÖSTER
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}