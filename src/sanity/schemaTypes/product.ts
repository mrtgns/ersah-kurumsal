import { defineField, defineType } from 'sanity'

const product = defineType({
  name: 'product',
  title: 'Ürün Kataloğu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Ürün Adı',
      type: 'string',
      description: 'Örn: Polar Mont, Askılı Tulum',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productCode',
      title: 'Ürün Kodu',
      type: 'string',
      description: 'Katalogdaki kod (Örn: ERP-001, ERSM-002)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Uzantısı',
      type: 'slug',
      options: {
        source: (doc) => {
          const title = doc?.title || '';
          const code = doc?.productCode || '';
          return `${title}-${code}`; 
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Ürün Kategorisi',
      type: 'string',
      options: {
        list: [
          { title: 'T-Shirt', value: 't-shirt' },
          { title: 'Polar', value: 'polar' },
          { title: 'Yelek', value: 'yelek' },
          { title: 'Mont', value: 'mont' },
          { title: 'Sweatshirt', value: 'sweatshirt' },
          { title: 'Pantolon', value: 'pantolon' },
          { title: 'Yelek Pantolon', value: 'yelek-pantolon' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // --- KRİTİK ALAN 1: MODEL GRUBU ---
    defineField({
      name: 'modelName',
      title: 'Model Grubu / Adı',
      type: 'string',
      description: 'Aynı modelin farklı renklerini birbirine bağlar. Örn: "Erşah-Klasik-Polar"',
    }),

    // --- KRİTİK ALAN 2: BU ÜRÜNÜN RENGİ ---
    defineField({
      name: 'mainColor',
      title: 'Bu Ürünün Rengi',
      type: 'string',
      description: 'Örn: Siyah, Kırmızı, Mavi. (Renk seçim butonunda bu isim yazacak)',
    }),
    
    defineField({
      name: 'sizes',
      title: 'Beden Seçenekleri',
      type: 'string',
      description: 'Örn: S, M, L, XL, XXL (Aralarına virgül koyun)',
    }),

    defineField({
      name: 'image',
      title: 'Ürün Ana Görseli',
      type: 'image',
      options: { hotspot: true },
      description: 'Vitrinde görünecek olan kapak resmi.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Ürün Detay Galerisi',
      type: 'array',
      description: 'Ürünün arkadan, yandan veya kumaş detaylarını gösteren ek resimler.',
      of: [{ 
        type: 'image',
        options: { hotspot: true }
      }]
    }),

    defineField({
      name: 'description',
      title: 'Ürün Açıklaması / Kumaş Detayları',
      type: 'text',
      description: 'Ürünün özellikleri hakkında teknik bilgi.',
    }),
  ],
})

export default product