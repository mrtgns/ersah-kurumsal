import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProductInteractive from "../../../components/ProductInteractive";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // SORGUMUZU YENİ MANTIK (AYRI ÜRÜNLERİ BİRLEŞTİRME) İÇİN GÜNCELLEDİK
  const query = groq`*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    productCode,
    category,
    sizes,
    modelName,
    mainColor,
    description,
    "slug": slug.current,
    "mainImageUrl": image.asset->url,
    "gallery": images[].asset->url,
    // AYNI MODEL İSMİNE SAHİP TÜM ÜRÜNLERİ (TÜM RENKLERİ) BULUYORUZ:
    "allVariants": *[_type == "product" && modelName == ^.modelName]{
      _id,
      "color": mainColor,
      "slug": slug.current
    }
  }`;

  const product = await client.fetch(query, { slug });

  if (!product) {
    notFound();
  }

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

      {/* Artık 'allVariants' içinde tüm renklerin linkleri (slug) mevcut */}
      <ProductInteractive product={product} />
    </div>
  );
}