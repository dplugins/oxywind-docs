import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'

const nav = [
  {
    text: 'Docs',
    activeMatch: `^/(guide)/`,
    items: [
      { text: 'Guide', link: '/guide/introduction' }
    ]
  },
  {
    text: 'Ecosystem',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Plugins',
        items: [
          { text: 'Collaboration', link: 'https://dplugins.com/collaboration' },
          { text: 'Script Organizer', link: 'https://dplugins.com/products/scripts-organizer/' },
          { text: 'Swiss Knife', link: 'https://dplugins.com/products/swiss-knife/' },
        ]
      },
      {
        text: 'Video Tutorials',
        items: [
          {
            text: 'DPlugins YouTube Channel',
            link: 'https://www.youtube.com/c/dPlugins'
          }
        ]
      }
    ]
  },
  {
    text: 'About',
    activeMatch: `^/about/`,
    items: [
      { text: 'FAQ', link: '/about/faq' },
      { text: 'Feedback', link: 'https://github.com/dplugins/oxywind-docs/issues' },
      { text: 'Roadmap', link: 'https://github.com/dplugins/oxywind-docs/projects/1' },
      // { text: 'Change Log', link: '/about/releases' },
      // { text: 'Variant', link: '/about/variant' },
    ]
  }
]

export const sidebar = {
  '/guide/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: '/guide/introduction' },
        {
          text: 'Quick Start',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'Essentials',
      items: [
        { text: 'Customization', link: '/guide/essentials/customization' },
        { text: 'Optimizing for Production', link: '/guide/essentials/production' },
      ]
    },
    {
      text: 'Extra Topics',
      items: [
        {
          text: 'Worker',
          link: '/guide/extras/worker'
        },
        // { text: 'Fluid', link: '/guide/extras/fluid' }
      ]
    }
  ],
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'en-US',
  title: 'Oxywind',
  description: 'Oxywind - Tailwind CSS Integration for Oxygen Builder',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],
  scrollOffset: 'header',

  head: [
    ['meta', { name: 'twitter:site', content: '@dplugins' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://i0.wp.com/dplugins.com/wp-content/uploads/edd/2022/03/OxyWind-Hero.jpg'
      }
    ],
    [
      'meta',
      {
        name: 'og:image',
        content: 'https://i0.wp.com/dplugins.com/wp-content/uploads/edd/2022/03/OxyWind-Hero.jpg'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ]
  ],

  themeConfig: {
    nav,
    sidebar,

    algolia: {
      indexName: '',
      apiKey: '',
      appId: '',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },
    socialLinks: [
      { icon: 'facebook', link: 'https://www.facebook.com/groups/dplugins' },
    ],

    editLink: {
      repo: 'dplugins/oxywind-docs',
      text: 'Edit this page on GitHub'
    },

    footer: {
      // license: {
      //   text: 'MIT License',
      //   link: 'https://opensource.org/licenses/MIT'
      // },
      copyright: `Copyright © 2021-${new Date().getFullYear()} dplugins.com`,
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})
