<script setup>
import Img, { CloudImageProvider } from 'vue-cloudimage-responsive-plain';

const cloudimageConfig = {
  token: 'ajrctguoxo',
  lazyLoading: true,
  devicePixelRatioList: [1,2],
  presets: {
    xs: '(max-width: 639px)', 
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)', 
    lg: '(min-width: 1024px)', 
    xl: '(min-width: 1280px)' 
}
};
</script>

<template>
	<CloudImageProvider v-bind:cloudImageConfig="cloudimageConfig">
		<Img v-bind:src=src params="org_if_sml=0&force_format=webp,jpeg&gravity=face" />
	</CloudImageProvider>
</template>

<script>
export default {
 props: {
   src: String
 }
}
</script>