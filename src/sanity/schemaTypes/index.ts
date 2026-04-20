import { type SchemaTypeDefinition } from 'sanity'
import product from './product' // Yazdığımız şemayı içeri alıyoruz
import { catalog } from './catalog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, catalog], // Buradaki diziye product'ı ekledik
}