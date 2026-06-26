import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],

  eslint: {
    config: {
      stylistic: true,
    },
  },

  experimental: {
    asyncContext: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      // manifest.json is a static public asset, not a route; skip crawling it.
      ignore: ['/manifest.json'],
    },
  },

  css: [
    '@fontsource-variable/space-grotesk',
    '@fontsource-variable/jetbrains-mono',
    '~/assets/tokens.css',
    '~/assets/global.css',
  ],

  app: {
    head: {
      title: 'Interdimensional Field Registry | Rick and Morty Wiki',
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'en',
        'data-theme': 'dark',
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content:
            'A declassified Rick and Morty case-file registry. Browse character dossiers, locations, and episode logs pulled from the Rick and Morty API.',
        },
        {
          name: 'msapplication-TileColor',
          content: '#0a1f1a',
        },
        {
          name: 'msapplication-TileImage',
          content: '/ms-icon-144x144.png',
        },
        {
          name: 'theme-color',
          content: '#0a1f1a',
        },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || 'https://rickandmortyapi.com/api',
    },
  },
})
