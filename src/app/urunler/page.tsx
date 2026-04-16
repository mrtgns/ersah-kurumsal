import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Ürün Kataloğu</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Erşah Kurumsal güvencesiyle üretilen tüm iş elbiselerimizi inceleyebilir, toplu sipariş için teklif isteyebilirsiniz.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}