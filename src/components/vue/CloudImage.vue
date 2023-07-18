<script setup lang="ts">
import Img, { CloudImageProvider } from 'vue-cloudimage-responsive-plain';

interface Props {
	src: String,
	params: String
}

const props = defineProps<Props>()

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
	<CloudImageProvider :cloudImageConfig=cloudimageConfig>
		<Img :src=props.src :params=props.params alt="" />
	</CloudImageProvider>
</template>
