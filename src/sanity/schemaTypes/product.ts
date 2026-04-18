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
        // Otomatik URL oluşturucu (Ürün Adı + Ürün Kodu)
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
    defineField({
      name: 'colors',
      title: 'Mevcut Renkler',
      type: 'string',
      description: 'Katalogdaki renk seçenekleri (Örn: Lacivert, Siyah, Turuncu)',
    }),
    defineField({
      name: 'image',
      title: 'Ürün Ana Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Ürün Açıklaması / Kumaş Detayları',
      type: 'text',
      description: 'Ürünün özellikleri, gramajı veya kumaş türü hakkında bilgi.',
    }),
  ],
})

export default product