import type { App } from 'vue';
import VueLazyload from 'vue-lazyload';
import { ContentfulLivePreview } from '@contentful/live-preview';

export default (app: App) => {
	
	ContentfulLivePreview.init({ locale: "en-NZ", enableInspectorMode:true  });

	app.use(VueLazyload, {
		lazyComponent: true, 
		lazyImage: true,
	  });
	  app.provide("EnglishLocale","en-NZ")
	  app.provide("MaoriLocale","mi-NZ")
	  app.provide("DefaultLocale","en-NZ")
}