<script setup>
import Img, { CloudImageProvider } from 'vue-cloudimage-responsive-plain';

const cloudimageConfig = {
	token: 'ajrctguoxo',
	lazyLoading: true,
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