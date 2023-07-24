<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { DefaultLocale } from 'lib/store';
import { useStore } from '@nanostores/vue';

const defaultLocale = useStore(DefaultLocale);
let content = ref({
	data: null,
});

async function  getData(locale:string){
	const response = await fetch("/api/nav/topnav.json?locale=" + locale)
	content.value.data = await response.json();
}

onMounted(() => {getData(defaultLocale.value)});
watch(defaultLocale ,() => {getData(defaultLocale.value)} )
</script>


<template>
	<div class="flex flex-row flex-nowrap justify-center md:justify-end text-xs sm:text-sm">
		<ul class="font-bold tracking-wide mt-0 flex w-auto divide-x-2 divide-gray-300 
					[&>li]:self-center [&>li]:pl-2 [&>li]:pr-2  xs:[&>li]:pl-4 xs:[&>li]:pr-4 
					[&>li:first-child]:pl-0 [&>li:last-child]:pr-0">
			<li v-for="item in content?.data" as="template">
				<a class="text-center uppercase whitespace-nowrap" :title="item['fields']?.title.toString()"
					:href="item['fields']?.url?.toString()">{{
						item['fields']?.secondaryTitle ? item['fields']?.secondaryTitle : item['fields']?.title }}</a>
			</li>
		</ul>
	</div>
</template>

