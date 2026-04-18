"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; 
import ImageZoom from "@/components/ImageZoom";

// --- TİP TANIMLAMALARI (INTERFACES) ---

interface ProductVariant {
  _id: string;
  color: string;
  slug: string;
}

interface Product {
  _id: string;
  title: string;
  productCode: string;
  category: string;
  slug: string;        // Mevcut sayfanın linki
  mainColor: string;   // Mevcut ürünün rengi
  modelName?: string;
  sizes?: string;
  description?: string;
  mainImageUrl: string;
  gallery?: string[];
  allVariants?: ProductVariant[]; // Aynı modeldeki tüm renkler (sayfalar)
}

interface ProductInteractiveProps {
  product: Product;
}

// --- RENK SINIFLARI ---
const getColorClass = (colorName: string) => {
  const lowerColor = colorName?.toLowerCase().trim();
  const colorMap: Record<string, string> = {
    siyah: "bg-black text-white border-black ring-black",
    beyaz: "bg-white text-gray-800 border-gray-300 ring-gray-300",
    kırmızı: "bg-red-600 text-white border-red-700 ring-red-600",
    lacivert: "bg-blue-900 text-white border-blue-950 ring-blue-900",
    mavi: "bg-blue-500 text-white border-blue-600 ring-blue-500",
    sarı: "bg-yellow-400 text-gray-900 border-yellow-500 ring-yellow-400",
    yeşil: "bg-green-600 text-white border-green-700 ring-green-600",
    gri: "bg-gray-500 text-white border-gray-600 ring-gray-500",
    antrasit: "bg-slate-700 text-white border-slate-800 ring-slate-700",
    bordo: "bg-rose-900 text-white border-rose-950 ring-rose-900",
  };
  return colorMap[lowerColor] || "bg-slate-100 text-slate-800 border-slate-200";
};

export default function ProductInteractive({ product }: ProductInteractiveProps) {
  // Resim havuzu
  const allImages = [product.mainImageUrl, ...(product.gallery || [])].filter(Boolean);
  
  const [activeImage, setActiveImage] = useState<string>(product.mainImageUrl);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizesList = product.sizes ? product.sizes.split(",").map((s) => s.trim()) : [];

  // WhatsApp Mesajı
  const whatsappMessage = `Merhaba, "${product.title}" (Kod: ${product.productCode}) hakkında bilgi almak istiyorum.${selectedSize ? `\nBeden Seçimi: ${selectedSize}` : ""}\nRenk: ${product.mainColor}`;
  const whatsappUrl = `https://wa.me/905521334252?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
      
      {/* SOL: RESİM GALERİSİ (Sadece bu sayfadaki ürünün fotoları) */}
      <div className="md:w-1/2 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
        <div className="relative h-96 md:h-[500px] w-full bg-white">
          <ImageZoom src={activeImage} alt={product.title} />
        </div>
        
        {allImages.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto bg-white border-t border-gray-100 scrollbar-hide">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImage === img ? 'border-secondary scale-105 shadow-md' : 'border-transparent'
                }`}
              >
                <Image src={img} alt={`Detay ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SAĞ: ÜRÜN BİLGİLERİ VE NAVİGASYONEL RENK SEÇİMİ */}
      <div className="p-8 md:p-10 md:w-1/2 flex flex-col">
        <div className="uppercase tracking-wider text-sm text-secondary font-bold mb-3">
          {product.category.replace("-", " ")}
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight uppercase">
          {product.title}
        </h1>

        <div className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-mono text-sm mb-8 w-fit border border-gray-200 shadow-sm">
          Ürün Kodu: <span className="font-bold">{product.productCode}</span>
        </div>

        {/* --- KRİTİK NOKTA: RENKLER ARASI GEÇİŞ (LINKLER) --- */}
        {product.allVariants && product.allVariants.length > 0 && (
          <div className="mb-8">
            <span className="text-sm text-gray-900 font-bold uppercase tracking-wider block mb-3">
              Mevcut Renk Seçenekleri
            </span>
            <div className="flex flex-wrap gap-3">
              {product.allVariants.map((variant) => {
                const isCurrentPage = variant.slug === product.slug;

                return (
                  <Link
                    key={variant._id}
                    href={`/urunler/${variant.slug}`}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex items-center gap-2
                      ${getColorClass(variant.color)}
                      ${isCurrentPage 
                        ? 'ring-4 ring-offset-2 ring-secondary scale-105 shadow-md' 
                        : 'opacity-50 hover:opacity-100 hover:scale-105'}
                    `}
                  >
                    <div className="w-3 h-3 rounded-full border border-black/10 bg-current"></div>
                    {variant.color}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* BEDEN SEÇENEKLERİ */}
        {sizesList.length > 0 && (
          <div className="mb-8">
            <span className="text-sm text-gray-900 font-bold uppercase tracking-wider block mb-3">
              Beden Seçenekleri
            </span>
            <div className="flex flex-wrap gap-2">
              {sizesList.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 font-bold transition-all
                    ${selectedSize === size 
                      ? 'bg-gray-900 text-white border-gray-900 scale-110 shadow-lg' 
                      : 'bg-white text-gray-500 border-gray-100 hover:border-gray-900 hover:text-gray-900'}
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="prose prose-gray max-w-none text-gray-600 mb-8 flex-grow border-t border-gray-100 pt-6">
          <p className="whitespace-pre-wrap leading-relaxed">
            {product.description || "Bu ürün için detaylı teknik bilgi yakında eklenecektir."}
          </p>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-xl hover:bg-[#128C7E] transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Sipariş İçin WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}