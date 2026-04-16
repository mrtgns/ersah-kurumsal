// src/lib/products.ts
import fs from 'fs';
import path from 'path';

// JSON dosyalarımızın nerede olduğunu buluyoruz
const productsDirectory = path.join(process.cwd(), 'src/content/products');

export async function getProducts() {
  // Eğer henüz hiç ürün eklenmemişse ve klasör yoksa site çökmesin diye:
  if (!fs.existsSync(productsDirectory)) {
    return [];
  }

  // Klasördeki tüm dosyaların isimlerini al
  const fileNames = fs.readdirSync(productsDirectory);
  
  // Sadece .json uzantılı olanları filtrele ve içeriklerini oku
  const products = fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(productsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      
      return {
        id: data.slug, // Benzersiz anahtar olarak slug kullanıyoruz
        title: data.title,
        slug: data.slug,
        category: data.category,
        image: data.image,
        description: data.description,
        date: data.date,
      };
    });

  // Ürünleri en son eklenenden en eskiye doğru sırala
  return products.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}