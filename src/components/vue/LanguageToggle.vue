
<script lang="ts">
import { toggleLang, DefaultLocale } from 'lib/store';
import { useStore } from '@nanostores/vue';

export default {
	data() {
		const $DefaultLocale = useStore(DefaultLocale);
		return {
			$DefaultLocale,
			toggleLang,
		};
	},
};
</script>

<template>
	<button @click="toggleLang">{{ $DefaultLocale }}</button>
</template>
  