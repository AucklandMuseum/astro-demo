import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import contentful from "contentful-astro";

// https://astro.build/config
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), vue(),
    contentful({
      space: 'ocrj77v5idm0',
      accessToken: 'CFPAT-MGcwVDgPKXjFyHuOxVrKoulJkFabIh0bL6dKO_lRrfM',
      components: {
        contentSection: "components/ContentSection",
        copyBlock:"components/CopyBlock",
        marketingPanel:"components/Hero",
        leftAndRightPanels:"components/LeftAndRightPanels",
        title:"components/Title",
        imageMetadata:"components/ImageMetadata",
        WidgetYouTubeResponsive:"components/Youtube"
      },
    }),
  ],
  adapter: netlify()
});