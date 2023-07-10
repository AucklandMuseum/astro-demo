<script setup lang="ts">
import { ref } from "vue";
import * as contentfulUtils from "lib/contentful.js";

let navItems = await contentfulUtils.getMenuGroupMenuItemsByName("top", contentfulUtils.DefaultLocale);
</script>


<template>
	<div class="flex flex-row flex-nowrap justify-center sm:justify-end text-sm">
		<ul class="font-bold tracking-wide mt-0 flex w-auto divide-x-2 divide-gray-300 
					[&>li]:self-center [&>li]:pl-4 [&>li]:pr-4 
					[&>li:first-child]:pl-0 [&>li:last-child]:pr-0">
			<li v-for="item in navItems" as="template">
				<a class="text-center uppercase whitespace-nowrap" :title="item['fields']?.title.toString()"
					:href="item['fields']?.url?.toString()">{{
						item['fields']?.secondaryTitle ? item['fields']?.secondaryTitle : item['fields']?.title }}</a>
			</li>
		</ul>
	</div>
</template>

