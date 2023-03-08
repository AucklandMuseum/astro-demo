import type { App } from 'vue';
import VueLazyload from 'vue-lazyload';


export default (app: App) => {
	app.use(VueLazyload, {
		lazyComponent: true, 
		lazyImage: true,
	  });
}