import ProductCard from '@/components/ProductCard';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

interface Product {
  _id: string;
  title: string;
  productCode: string;
  slug: string;
  category: string;
  imageUrl: string;
}

// BU İKİ SATIR ÇOK KRİTİK: Sayfayı her aramada sıfırdan hesaplatır
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // 1. Next.js 15'te parametreleri mutlaka 'await' ile beklemeliyiz
  const resolvedParams = await searchParams;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;

  let query = '';
  const queryParams: Record<string, string> = {};

  // 2. SORGUNUN BELİRLENMESİ
  if (q) {
    // GROQ sorgusunda 'match' kullanarak en esnek aramayı yapıyoruz
    query = groq`*[_type == "product" && (title match $q + "*" || productCode match $q + "*" || description match $q + "*")] {
      _id,
      title,
      productCode,
      "slug": slug.current,
      category,
      "imageUrl": image.asset->url
    }`;
    queryParams.q = q;
  } else if (category) {
    query = groq`*[_type == "product" && category == $category] {
      _id,
      title,
      productCode,
      "slug": slug.current,
      category,
      "imageUrl": image.asset->url
    }`;
    queryParams.category = category;
  } else {
    query = groq`*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      productCode,
      "slug": slug.current,
      category,
      "imageUrl": image.asset->url
    }`;
  }

  // 3. VERİ ÇEKME
  const products: Product[] = await client.fetch(query, queryParams);

  // Başlık Belirleme
  const pageTitle = q 
    ? `"${q}" İçin Sonuçlar` 
    : category 
      ? `${category.replace('-', ' ').toUpperCase()} Modelleri` 
      : "Tüm Ürünler";

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase">
          {pageTitle}
        </h1>
        <div className="h-1 bg-secondary w-20 mx-auto mt-3 rounded-full"></div>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-400 font-medium italic">
            Aradığınız kriterlere uygun ürün bulunamadı.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}