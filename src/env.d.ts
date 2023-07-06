/// <reference types="astro/client" />
interface ImportMetaEnv {
	readonly CONTENTFUL_SPACE_ID: string;
	readonly CONTENTFUL_DELIVERY_TOKEN: string;
	readonly CONTENTFUL_PREVIEW_TOKEN: string;
	readonly CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN: string;
	readonly CLOUDIMAGE_TOKEN: string;
  }

  interface ImportMeta {
	readonly env: ImportMetaEnv;
  }