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
	<CloudImageProvider :cloudImageConfig="cloudimageConfig">
		<Img :src=src :params=params alt="" />
	</CloudImageProvider>
</template>

<script>
export default {
 props: {
   src: String,
   params: String
 }
}
</script>