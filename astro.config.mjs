import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import contentful from "contentful-astro";
const spaceID = process.env.CONTENTFUL_SPACE_ID;
const CMA = process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN;

// https://astro.build/config
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), vue(/*{
    appEntrypoint: '/src/pages/_app'
  }*/), contentful({
    space: spaceID,
    accessToken: CMA,
    components: {
      contentSection: "components/ContentSection",
      copyBlock: "components/CopyBlock",
      marketingPanel: "components/Hero",
      leftAndRightPanels: "components/LeftAndRightPanels",
      title: "components/Title",
      imageMetadata: "components/ImageMetadata",
      WidgetYouTubeResponsive: "components/Youtube"
    }
  }), compress()],
  adapter: netlify()
});