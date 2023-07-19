<script setup lang="ts">
import * as contentfulUtils from "lib/contentful.js";
import { DefaultLocale } from "lib/contentful.js";

let contentItems = await contentfulUtils.getContentCollectionBySlug("opening-hours", DefaultLocale);
</script>


<template>
	<div
		class="flex justify-center text-center md:text-left pb-4 md:pb-0 md:justify-start md:self-start md:mr-10 flex-shrink flex-row flex-wrap [&>p]:flex [&>p]:pr-1">
		<p v-for="item in contentItems">
			{{ item.fields.translatedText }}
		</p>
	</div>
</template>