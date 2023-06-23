<script setup>
const contentItems = [
{ label: 'Open 10AM - 5PM Mon - Fri,' },
{ label: '9AM - 5PM Sat, Sun, Public Holidays.' },
{ label: 'Open late every Tuesday evening until 8.30PM.' },
]
</script>

<template>
	<div
		class="flex justify-center pb-4 sm:pb-0 sm:justify-start sm:self-start sm:mr-10  flex-shrink flex-row flex-wrap [&>p]:flex [&>p]:pr-1">
		<p v-for="item in contentItems">
			{{ item.label }}
		</p>
	</div>
</template>