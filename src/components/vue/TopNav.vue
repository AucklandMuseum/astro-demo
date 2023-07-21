<script setup lang="ts">
import * as contentfulUtils from "lib/contentful.js";
import { DefaultLocale } from 'lib/store';
import { useStore } from '@nanostores/vue';

const $DefaultLocale = useStore(DefaultLocale);

let navItems = await contentfulUtils.getMenuGroupMenuItemsByName("top", $DefaultLocale.value);
</script>


<template>
	<div class="flex flex-row flex-nowrap justify-center md:justify-end text-xs sm:text-sm">
		<ul class="font-bold tracking-wide mt-0 flex w-auto divide-x-2 divide-gray-300 
					[&>li]:self-center [&>li]:pl-2 [&>li]:pr-2  xs:[&>li]:pl-4 sm:[&>li]:pr-4 
					[&>li:first-child]:pl-0 [&>li:last-child]:pr-0">
			<li v-for="item in navItems" as="template">
				<a class="text-center uppercase whitespace-nowrap" :title="item['fields']?.title.toString()"
					:href="item['fields']?.url?.toString()">{{
						item['fields']?.secondaryTitle ? item['fields']?.secondaryTitle : item['fields']?.title }}</a>
			</li>
		</ul>
	</div>
</template>

