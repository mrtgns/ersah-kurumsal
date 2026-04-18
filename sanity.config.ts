'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  
  title: 'Erşah Kurumsal Yönetim',

  schema,
  plugins: [
    structureTool({structure}),
  ],
  
  // İşte o inatçı Releases sekmesini yok eden sihirli kod:
  tools: (prevTools) => prevTools.filter((tool) => tool.name !== 'releases'),
})