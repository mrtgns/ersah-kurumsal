import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export const revalidate = 60; // 60 saniyede bir yeni ürünleri kontrol eder

interface Product {
  _id: string;
  title: string;
  productCode: string;
  category: string;
  slug: string;
  imageUrl: string;
}

export default async function Home() {
  // 1. DİNAMİK SORGULAMA: En son eklenen 100 ürünü kategorisiyle birlikte çekiyoruz
  const query = groq`*[_type == "product"] | order(_createdAt desc)[0...100] {
    _id,
    title,
    productCode,
    category,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`;

  const allProducts: Product[] = await client.fetch(query);

  // 2. OTOMATİK GRUPLAMA MANTIĞI (Vitrin Raflarını Hazırlıyoruz)
  const groupedProducts: Record<string, Product[]> = {};

  allProducts.forEach(product => {
    if (!product.category) return; // Kategorisi olmayanları atla
    
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = []; // Kategori rafı yoksa oluştur
    }
    
    // Her kategori rafına sadece en yeni 4 ürünü koy (Vitrin mantığı)
    if (groupedProducts[product.category].length < 4) {
      groupedProducts[product.category].push(product);
    }
  });

  // 3. BAŞLIK GÜZELLEŞTİRİCİ
  // URL'deki (t-shirt) yazısını anasayfada şık bir başlığa (T-Shirt Modelleri) çeviririz.
  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      't-shirt': 'T-Shirt Modelleri',
      'polar': 'Polar Modelleri',
      'yelek': 'İş Yelekleri',
      'mont': 'İş Montları',
      'sweatshirt': 'Sweatshirt Modelleri',
      'pantolon': 'Gabardin Pantolonlar',
      'yelek-pantolon': 'Yelek & Pantolon Takımları',
    };
    // Eğer listeye yeni bir şey eklersen (örn: sapka), otomatik olarak "ŞAPKA MODELLERİ" yazar
    return titles[cat] || `${cat.replace('-', ' ').toUpperCase()} MODELLERİ`;
  };

  // Ekrana basılacak bölümleri (Kategorileri) bir diziye alıyoruz
  const sections = Object.keys(groupedProducts).map(cat => ({
    title: getCategoryTitle(cat),
    categorySlug: cat,
    products: groupedProducts[cat]
  }));

  return (
    <div className="bg-white">
      
      {/* 1. HERO SECTION (Güçlü Giriş) */}
      <section className="relative bg-gray-900 py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
              Kurumsal Kimliğinizi <br />
              <span className="text-secondary">Kaliteyle Giydirin</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl font-medium leading-relaxed">
              Erşah Kurumsal olarak; dayanıklı, modern ve firmanıza özel logolu iş elbiseleri üretiyoruz. Toptan siparişleriniz için en uygun fiyat ve yüksek kalite garantisi.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <Link 
                href="/urunler" 
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all text-center text-lg shadow-xl shadow-white/10"
              >
                Tüm Kataloğu İncele
              </Link>
              <Link 
                href="https://wa.me/905521334252" 
                target="_blank"
                className="bg-secondary text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 hover:shadow-lg hover:shadow-secondary/30 transition-all text-center text-lg"
              >
                Hızlı Teklif Al
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DİNAMİK VİTRİN BÖLÜMLERİ (Sistemdeki tüm kategoriler otomatik gelir) */}
      <div className="max-w-350 mx-auto px-4 lg:px-8 py-20 space-y-32">
        {sections.map((section, index) => (
          <section key={index}>
            
            {/* Kategori Başlığı ve "Tümünü Gör" Linki */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
                  {section.title}
                </h2>
                <div className="h-1.5 w-16 bg-secondary mt-4 rounded-full"></div>
              </div>
              <Link 
                href={`/urunler?category=${section.categorySlug}`}
                className="text-gray-500 hover:text-primary font-bold transition-colors flex items-center gap-2 group whitespace-nowrap"
              >
                Tümünü Gör 
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>

            {/* 4'lü Ürün Grid Yapısı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {section.products.map((product) => (
                <Link 
                  key={product._id} 
                  href={`/urunler/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col"
                >
                  {/* Ürün Görseli */}
                  <div className="relative aspect-square bg-gray-50 p-6 overflow-hidden">
                    {product.imageUrl ? (
                      <Image 
                        src={product.imageUrl} 
                        alt={product.title} 
                        fill 
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300">Görsel Yok</div>
                    )}
                    
                    {/* Üzerine gelince çıkan İncele butonu */}
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <div className="bg-gray-900 text-white text-center py-3 rounded-xl font-bold text-sm">
                        Ürünü İncele
                      </div>
                    </div>
                  </div>

                  {/* Ürün Bilgileri */}
                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 uppercase tracking-tight group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-mono mt-auto pt-4">
                      KOD: {product.productCode}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

    </div>
  );
}