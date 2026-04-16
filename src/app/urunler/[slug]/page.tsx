import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products'; // Yeni fonksiyonumuz

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // URL'deki sluga göre JSON dosyasını bulup getiriyor
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const whatsappMessage = `Merhaba, Erşah Kurumsal sitesinden şu ürün hakkında teklif almak istiyorum: ${product.title}`;
  const whatsappUrl = `https://wa.me/905XXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/urunler" className="text-primary mb-8 inline-block hover:underline">
          ← Tüm Ürünlere Dön
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm">
              {product.category.replace('-', ' ')}
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
              {product.title}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-900 text-xl">Toptan Teklif Alın</h3>
              <p className="text-sm text-gray-500 mt-2">
                Kurumsal logonuzla nakış veya baskı seçenekleri, beden tablosu ve toplu fiyatlandırma için hızlıca ulaşın.
              </p>
              
              <Link
                href={whatsappUrl}
                target="_blank"
                className="mt-6 flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition-all shadow-lg text-lg"
              >
                <span>WhatsApp ile Teklif İste</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}