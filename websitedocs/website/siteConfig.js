/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

const siteConfig = {
  title: 'IHMC Robotics' /* title for your website */,
  tagline: 'Our Open Source Software Documentation',
  url: 'https://ihmcrobotics.github.io' /* your website url */,
  baseUrl: '/' /* base url for your project */,

  // Used for publishing and more
  projectName: 'ihmcrobotics.github.io',
  organizationName: 'ihmcrobotics',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {
      href: 'https://ihmcrobotics.github.io/ihmc-open-robotics-software/docs/quickstarthome.html',
      label: 'Quick Start',
    },
        {doc: 'docshome', label: 'Docs'},
    {
      href: 'http://robots.ihmc.us/',
      label: 'About',
    },
    {blog: true, label: 'Blog'},
  ],

  /* path to images for header/footer */
  headerIcon: 'img/running-man-logo.png',
  footerIcon: 'img/running-man-logo.png',
  favicon: 'img/favicon.png',

  /* colors for website */
  colors: {
    primaryColor: '#064282',
    secondaryColor: '#4283c9',
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' IHMC Robotics ',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

};

module.exports = siteConfig;
