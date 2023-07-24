import type { App } from 'vue';
import VueLazyload from 'vue-lazyload';
import { ContentfulLivePreview } from '@contentful/live-preview';

export default (app: App) => {
	
	ContentfulLivePreview.init({ locale: "en-NZ", enableInspectorMode:true  });

	app.use(VueLazyload, {
		lazyComponent: true, 
		lazyImage: true,
	  });
}