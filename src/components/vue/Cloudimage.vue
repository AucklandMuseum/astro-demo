  <script>
  import Img, { CloudImageProvider } from "vue-cloudimage-responsive";
  
  const cloudimageConfig = {
	token: "demo",
	baseURL: "https://jolipage.airstore.io/",
	placeholderBackground: "#e1e1e1",
	lowQualityPreview: {
	  minImgWidth: 150,
	},
  };
  
  export default {
	name: "Cloudimage",
	components: {
	  Img,
	  CloudImageProvider,
	},
	data() {
	  return {
		cloudimageConfig,
	  };
	},
  };
  </script>
  <template>
	<div id="app">
	  <CloudImageProvider v-bind:cloudImageConfig="cloudimageConfig">
		<h1>Simple demo of vue-cloudimage-responsive</h1>
		<Img src="img.jpg" alt="Demo image" />
	  </CloudImageProvider>
	</div>
  </template>
  