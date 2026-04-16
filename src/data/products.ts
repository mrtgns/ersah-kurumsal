// src/data/products.ts
export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Softshell Reflektörlü İş Montu',
    slug: 'softshell-reflektorlu-is-montu',
    category: 'is-montlari',
    image: '/img/urunler/mont-1.jpg',
    description: 'Su itici özellikli, içi polarlı, yüksek görünürlüklü reflektör şeritli kurumsal iş montu.'
  },
  // Buraya 100 ürünü benzer şekilde ekleyebilirsin
];