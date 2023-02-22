import contentful from "contentful";
import type { Document } from "@contentful/rich-text-types";

export interface menuGroup {
  name: string;
  title: string;
  secondaryTitle: string;
}

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN,
  host: "preview.contentful.com" 
});