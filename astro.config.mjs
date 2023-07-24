import { defineConfig } from 'astro/config';
import contentfulAstro from "contentful-astro";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

// https://astro.build/config
import netlify from "@astrojs/netlify/edge-functions"

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite:{
    server:{headers:{"X-Frame-Options":"ALLOW-FROM https://app.contentful.com",
                      "Access-Control-Allow-Origin":"app.contentful.com",
                      "Access-Control-Allow-Credentials":"true",
                      "Content-Security-Policy":"default-src 'self' https://static.contentful.com; script-src 'self' 'unsafe-eval'  https://cdn.staging.data.contentful.org https://static.contentful.com https://static.zuora.com https://cdn.segment.com https://widget.intercom.io https://js.intercomcdn.com https://*.cloudfront.net https://cmp.osano.com https://cdn.embedly.com https://contentful.github.io https://fullstory.com https://*.fullstory.com https://www.google-analytics.com https://www.googletagmanager.com https://*.googleapis.com https://googleapis.com https://static.filestackapi.com https://cdn.wootric.com https://cdnjs.cloudflare.com https://fast.wistia.com 'sha256-FEVAuH+6Bm6VUdmFF4FitBNJ0zorKj7OmFzwVinkffY=' https://sgmnt-cdn.ctfassets.net; style-src 'self' 'unsafe-inline' https://cdn.staging.data.contentful.org https://static.contentful.com https://www.contentful.com https://cmp.osano.com https://cdn.embedly.com https://cdnjs.cloudflare.com https://contentful.github.io https://fonts.googleapis.com https://s3.eu-central-1.amazonaws.com https://static.filestackapi.com; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.intercomcdn.com https://static.contentful.com https://www.contentful.com https://cdn.embedly.com https://cdnjs.cloudflare.com https://fonts.gstatic.com https://js.intercomcdn.com https://use.typekit.net; connect-src 'self' https: wss: blob:; media-src blob: data: https://fast.wistia.net https://embedwistia-a.akamaihd.net; object-src 'none'; child-src 'self' blob:; frame-src https: http:; worker-src 'self' blob:;upgrade-insecure-requests 'none';"}}
    //ssr:{noExternal:['contentful']}
  },
  integrations: [tailwind(),
  react(),
  vue({
    appEntrypoint: '/src/pages/_app'
  }),
  contentfulAstro({
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