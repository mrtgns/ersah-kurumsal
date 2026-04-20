import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export const revalidate = 60; // 60 saniyede bir yeni verileri kontrol eder

// --- TİP TANIMLAMALARI ---
interface Product {
  _id: string;
  title: string;
  productCode: string;
  category: string;
  slug: string;
  imageUrl: string;
}

interface Catalog {
  _id: string;
  title: string;
  coverImageUrl: string;
  fileUrl: string;
}

export default async function Home() {
  // 1. SORGULAR: Hem ürünleri hem katalogları çekmek için hazırlıyoruz
  const productsQuery = groq`*[_type == "product"] | order(_createdAt desc)[0...100] {
    _id,
    title,
    productCode,
    category,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`;

  const catalogsQuery = groq`*[_type == "catalog"] | order(_createdAt desc) {
    _id,
    title,
    "coverImageUrl": coverImage.asset->url,
    "fileUrl": file.asset->url
  }`;

  // 2. VERİ ÇEKİMİ: İkisini aynı anda çekerek hızı artırıyoruz (Promise.all)
  const [allProducts, catalogs]: [Product[], Catalog[]] = await Promise.all([
    client.fetch(productsQuery),
    client.fetch(catalogsQuery)
  ]);

  // 3. ÜRÜN GRUPLAMA MANTIĞI (Vitrin Rafları)
  const groupedProducts: Record<string, Product[]> = {};

  allProducts.forEach(product => {
    if (!product.category) return; 
    
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = [];
    }
    
    if (groupedProducts[product.category].length < 4) {
      groupedProducts[product.category].push(product);
    }
  });

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
    return titles[cat] || `${cat.replace('-', ' ').toUpperCase()} MODELLERİ`;
  };

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

     
     {/* KATALOGLAR BÖLÜMÜ */}
{catalogs && catalogs.length > 0 && (
  <section className="bg-gray-50 py-24 border-y border-gray-100">
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Dijital Kataloglarımız</h2>
        <p className="mt-4 text-gray-500 text-lg">İncelemek istediğiniz kataloğun üzerine tıklayarak anında görüntüleyebilirsiniz.</p>
        <div className="h-1.5 w-20 bg-secondary mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {catalogs.map((cat) => (
          <div key={cat._id} className="group relative flex flex-col">
            
            {/* TÜM KARTI PDF'E BAĞLIYORUZ (Tıklayınca Açılsın Diye) */}
            <a 
              href={cat.fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-white shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 border border-gray-100 block"
            >
              {cat.coverImageUrl ? (
                <Image 
                  src={cat.coverImageUrl} 
                  alt={cat.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center p-8">
                  <span className="text-white/20 font-black text-6xl -rotate-12 absolute">ERSAH</span>
                  <h3 className="text-white text-2xl font-bold text-center relative z-10">{cat.title}</h3>
                </div>
              )}

              {/* Hover Efekti: Üzerine gelince "Tıkla İncele" yazısı çıksın */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white text-gray-900 font-bold px-8 py-3 rounded-full shadow-2xl flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Kataloğu Aç
                </div>
              </div>
            </a>

            {/* BAŞLIK VE İNDİR BUTONU (Resmin altında ayrı durur) */}
            <div className="mt-6">
              <h3 className="text-gray-900 text-xl font-bold text-center mb-4 truncate">
                {cat.title}
              </h3>
              
              {/* Sadece İndirmek İsteyenler İçin Küçük Buton */}
              <a 
                href={`${cat.fileUrl}?dl=`} 
                className="flex items-center justify-center gap-2 w-full text-gray-500 hover:text-secondary font-bold text-sm transition-colors border-t border-gray-100 pt-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF Olarak İndir
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}

      {/* 2. DİNAMİK VİTRİN BÖLÜMLERİ (Sistemdeki tüm kategoriler otomatik gelir) */}
      <div className="max-w-350 mx-auto px-4 lg:px-8 py-20 space-y-32">
        {sections.map((section, index) => (
          <section key={index}>
            
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {section.products.map((product) => (
                <Link 
                  key={product._id} 
                  href={`/urunler/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col"
                >
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
                    
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <div className="bg-gray-900 text-white text-center py-3 rounded-xl font-bold text-sm">
                        Ürünü İncele
                      </div>
                    </div>
                  </div>

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