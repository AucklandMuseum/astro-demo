<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { DefaultLocale } from 'lib/store';
import { useStore } from '@nanostores/vue';

const defaultLocale = useStore(DefaultLocale);
let content = ref({
	data: null,
});

async function  getData(locale:string){
	const response = await fetch("/api/nav/openinghours.json?locale=" + locale)
	content.value.data = await response.json();
}

onMounted(() => {getData(defaultLocale.value)});
watch(defaultLocale ,() => {getData(defaultLocale.value)} )
</script>


<template>
	<div class="flex justify-center text-center md:text-left pb-4 md:pb-0 md:justify-start md:self-start md:mr-10 flex-shrink flex-row flex-wrap [&>p]:flex [&>p]:pr-1">
		<p v-for="item in content?.data">
			{{ item.fields.translatedText }}
		</p>
	</div>
</template>