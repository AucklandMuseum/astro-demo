import contentful from "contentful";
import type { Document } from "@contentful/rich-text-types";

export interface marketingPanel {
  name: string;
  title: string;
  content: string;
  subtitle: string;
  boldsubtitle: string;
  image: string;
}

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN,
  host: "preview.contentful.com" 
});