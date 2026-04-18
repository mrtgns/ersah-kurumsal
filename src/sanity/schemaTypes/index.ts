import { type SchemaTypeDefinition } from 'sanity'
import product from './product' // Yazdığımız şemayı içeri alıyoruz

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product], // Buradaki diziye product'ı ekledik
}