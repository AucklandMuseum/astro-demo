<script setup lang="ts">
import * as contentful from "contentful";
import * as contentfulUtils from "lib/contentful.js";
import { DefaultLocale } from 'lib/store';
import { useStore } from '@nanostores/vue';
import { onMounted, reactive, ref } from "vue";
import { defineComponent } from "vue";


let $DefaultLocale = useStore(DefaultLocale);
let contentItems = reactive(await fetch("/api/nav/openinghours.json?locale=" + $DefaultLocale).then((response) => response.json()))
 
</script>


<template>
	{{ $DefaultLocale }}
	<div :key="$DefaultLocale"
		class="flex justify-center text-center md:text-left pb-4 md:pb-0 md:justify-start md:self-start md:mr-10 flex-shrink flex-row flex-wrap [&>p]:flex [&>p]:pr-1">
		<p v-for="item in contentItems">
			{{ item.fields.translatedText }}
		</p>
	</div>
</template>