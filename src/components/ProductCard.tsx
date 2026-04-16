import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    title: string;
    slug: string;
    image: string;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <Link href={`/urunler/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
            {product.category.replace('-', ' ')}
          </span>
          <h3 className="mt-1 text-lg font-bold text-gray-900 line-clamp-2">
            {product.title}
          </h3>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-primary font-medium text-sm">Detayları Gör</span>
            <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;