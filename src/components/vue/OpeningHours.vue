<script lang="ts">
import { ChainModifiers, Entry, LocaleCode } from 'contentful';
import { TypeLocalisedString, TypeLocalisedStringSkeleton } from 'types/contentful';
import { defineComponent } from 'vue';


export default defineComponent({
	props: {
		contentItems: Array<Entry<TypeLocalisedStringSkeleton, undefined, string>>
	},
})
</script>


<template>
	<div
		class="flex justify-center pb-4 sm:pb-0 sm:justify-start sm:self-start sm:mr-10  flex-shrink flex-row flex-wrap [&>p]:flex [&>p]:pr-1">
		<p v-for="item in contentItems">
			{{ item.fields.label }}
		</p>
	</div>
</template>