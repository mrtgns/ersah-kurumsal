import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ImageZoom from "@/components/ImageZoom";

interface Product {
  _id: string;
  title: string;
  productCode: string;
  category: string;
  colors?: string;
  description?: string;
  imageUrl: string;
}

// RENK SÖZLÜĞÜMÜZ
const getColorClass = (colorName: string) => {
  const lowerColor = colorName.toLowerCase().trim();

  const colorMap: Record<string, string> = {
    siyah: "bg-black text-white border-black",
    beyaz: "bg-white text-gray-800 border-gray-300",
    kırmızı: "bg-red-600 text-white border-red-700",
    lacivert: "bg-blue-900 text-white border-blue-950",
    mavi: "bg-blue-500 text-white border-blue-600",
    sarı: "bg-yellow-400 text-gray-900 border-yellow-500",
    yeşil: "bg-green-600 text-white border-green-700",
    turuncu: "bg-orange-500 text-white border-orange-600",
    gri: "bg-gray-500 text-white border-gray-600",
    antrasit: "bg-slate-700 text-white border-slate-800",
    haki: "bg-emerald-800 text-white border-emerald-900",
    bordo: "bg-rose-900 text-white border-rose-950",
  };

  return colorMap[lowerColor] || "bg-slate-100 text-slate-800 border-slate-200";
};

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const query = groq`*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    productCode,
    category,
    colors,
    description,
    "imageUrl": image.asset->url
  }`;

  const product: Product = await client.fetch(query, { slug });

  if (!product) {
    notFound();
  }

  // WHATSAPP MESAJI OLUŞTURMA (Dinamik ve SEO uyumlu URL kodlaması ile)
  const whatsappMessage = `Merhaba, web sitenizden ulaşıyorum. "${product.title}" (Ürün Kodu: ${product.productCode}) isimli ürününüz hakkında bilgi ve fiyat almak istiyorum.`;
  const whatsappUrl = `https://wa.me/905521334252?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <Link
          href="/urunler"
          className="text-gray-500 hover:text-gray-900 flex items-center gap-2 w-fit transition-colors font-medium"
        >
          <span>←</span> Tüm Ürünlere Dön
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* Sol Taraf - Ürün Resmi */}
        <div className="relative h-96 md:h-auto md:w-1/2 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 min-h-[400px]">
          {product.imageUrl ? (
            <ImageZoom src={product.imageUrl} alt={product.title} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Görsel Bulunamadı
            </div>
          )}
        </div>

        {/* Sağ Taraf - Ürün Bilgileri */}
        <div className="p-8 md:p-10 md:w-1/2 flex flex-col">
          <div className="uppercase tracking-wider text-sm text-secondary font-bold mb-3">
            {product.category.replace("-", " ")}
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            {product.title}
          </h1>

          <div className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-mono text-sm mb-8 w-fit border border-gray-200 shadow-sm">
            Ürün Kodu: <span className="font-bold">{product.productCode}</span>
          </div>

          {/* RENK ALANI */}
          {product.colors && (
            <div className="mb-8">
              <span className="text-sm text-gray-900 font-bold uppercase tracking-wider block mb-3">
                Renk Seçenekleri
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colors.split(",").map((color, index) => {
                  const cleanColor = color.trim();
                  return (
                    <span
                      key={index}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold border shadow-sm ${getColorClass(cleanColor)}`}
                    >
                      {cleanColor}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div className="prose prose-gray max-w-none text-gray-600 mb-8 flex-grow border-t border-gray-100 pt-6">
            {product.description ? (
              <p className="whitespace-pre-wrap leading-relaxed">
                {product.description}
              </p>
            ) : (
              <p className="italic text-gray-400">
                Bu ürün için henüz bir açıklama eklenmemiş.
              </p>
            )}
          </div>

          {/* DİNAMİK WHATSAPP BUTONU */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-xl hover:bg-[#128C7E] transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp&apos;tan Sipariş Ver
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
