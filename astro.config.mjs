import { defineConfig } from 'astro/config';
import contentful from "contentful-astro";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import { i18n, defaultLocaleSitemapFilter } from "astro-i18n-aut";
import sitemap from "@astrojs/sitemap";


const defaultLocale = "en";
const locales = {
  en: "en-NZ", // the `defaultLocale` value must present in `locales` keys
  mi: "mi-NZ",
};
import.meta.env.LOCALES = locales

// https://astro.build/config
import netlify from "@astrojs/netlify/functions"

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  experimental: {
    redirects: true,
  },
  output: 'server',
  trailingSlash: "never",
  build: {
    format: "file",
    split: true
  },
  integrations: [tailwind(),
  react(),
  vue({
    appEntrypoint: '/src/pages/_app'
  }),
  i18n({
    locales:locales,
    defaultLocale:defaultLocale,
  }),
  sitemap({
    i18n: {
      locales:locales,
      defaultLocale:defaultLocale,
    },
    filter: defaultLocaleSitemapFilter({ defaultLocale }),
  }),
  contentful({
    components: {
      contentItems: "components/layout/ContentSection",
      contentCollection: "components/layout/ContentCollection",
      leftAndRightPanels: "components/layout/LeftAndRightPanels",
      slider: "components/layout/Slider",

      copyBlock: "components/widget/CopyBlock",
      marketingPanel: "components/widget/Hero",
      title: "components/widget/TitleBlock",
      sectionTitle: "components/widget/PageSectionTitleBlock",
      imageMetadata: "components/widget/ImageMetadata",
      promoWithBorder: "components/widget/PromoWithBorder",
      page: "components/widget/PageBlock",
      WidgetYouTubeResponsive: "components/widget/Youtube",
      widgetHtmlCode: "components/widget/HtmlCode",
    }
  }),
  compress(),
  partytown({
    // Adds dataLayer.push as a forwarding-event.
    config: {
      forward: ["dataLayer.push"],
      logCalls: true,
      logGetters: true,
      logSetters: true,
      logImageRequests: true,
      logMainAccess: true,
      logSendBeaconRequests: true,
      logStackTraces: false,
      logScriptExecution: true,      
    },
  }),
  ],
  adapter: netlify()
});