import Link from 'next/link';
import Image from 'next/image';

// 1. Yeni Sanity veri yapımıza göre tipleri güncelledik
interface Product {
  _id?: string;
  title: string;
  productCode: string;
  slug: string;
  category: string;
  imageUrl: string; // Eski 'image' yerine artık 'imageUrl' kullanıyoruz
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden flex flex-col">
      {/* Resim Kısmı */}
      <Link href={`/urunler/${product.slug}`} className="relative h-64 w-full bg-gray-100 flex-shrink-0 block">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Resim Yok
          </div>
        )}
      </Link>

      {/* İçerik Kısmı */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">
          {product.category}
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          <Link href={`/urunler/${product.slug}`} className="hover:text-blue-600">
            {product.title}
          </Link>
        </h2>
        <div className="text-sm text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded-md mb-4 self-start">
          Kod: {product.productCode}
        </div>
        
        {/* Butonu en alta itmek için mt-auto kullanıyoruz */}
        <Link 
          href={`/urunler/${product.slug}`} 
          className="mt-auto block w-full text-center bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Detayları İncele
        </Link>
      </div>
    </div>
  );
}