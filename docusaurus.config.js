// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DataHub',
  tagline: 'The Modern Data Discovery & Observability Platform',
  favicon: 'img/favicon.ico',

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  
  markdown: {
    mermaid: true,
  },
  
  themes: ['@docusaurus/theme-mermaid'],

  // Set the production url of your site here
  url: 'https://datahubproject.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'datahub-project',
  projectName: 'datahub',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/datahub-project/datahub/tree/master/docs/',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/datahub-project/datahub/tree/master/blog/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/datahub-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'announcement',
        content: '⭐ If you like DataHub, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/datahub-project/datahub">GitHub</a>! ⭐',
        backgroundColor: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        textColor: '#ffffff',
        isCloseable: true,
      },
      navbar: {
        title: '',
        hideOnScroll: false,
        logo: {
          alt: 'DataHub Logo',
          src: 'img/dataHub_logo_color_black.svg',
          srcDark: 'img/dataHub_logo_color_black.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://github.com/datahub-project/datahub',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            href: 'https://slack.datahubproject.io',
            position: 'right',
            className: 'header-slack-link',
            'aria-label': 'Slack community',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
              {
                label: 'Tutorial Basics',
                to: '/docs/category/tutorial-basics',
              },
              {
                label: 'Tutorial Extras',
                to: '/docs/category/tutorial-extras',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://slack.datahubproject.io',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/datahub-project/datahub',
              },
            ],
          },

        ],
        copyright: `Built by Karan for Datahub Community @2026`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'yaml', 'python', 'java', 'graphql'],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

export default config;
