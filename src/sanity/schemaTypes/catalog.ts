import { defineField, defineType } from 'sanity'

export const catalog = defineType({
  name: 'catalog',
  title: 'Kataloglar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Katalog Adı',
      type: 'string',
      description: 'Örn: 2026 Forma Koleksiyonu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Katalog Kapak Resmi',
      type: 'image',
      options: { hotspot: true },
      description: 'Kataloğun ilk sayfasının görseli.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'PDF Dosyası',
      type: 'file',
      options: { accept: '.pdf' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'İlgili Kategori',
      type: 'string',
      description: 'Hangi kategori sayfasında görünsün? (opsiyonel)',
    }),
  ],
})