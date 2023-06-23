<script setup>
const navItems = [
{ label: 'Tickets', title: 'Buy Tickets', href: '/tickets' },
{ label: 'Membership', title: 'Become a member', href: '/membership' },
{ label: 'Donate', title: 'Donate', href: '/donate' },
]
</script>

<template>
	<div class="flex flex-row flex-nowrap justify-center sm:justify-end text-sm">
		<ul 
			class="font-bold tracking-wide mt-0 flex w-auto divide-x-2 divide-gray-300 
					[&>li]:self-center [&>li]:pl-4 [&>li]:pr-4 
					[&>li:first-child]:pl-0 [&>li:last-child]:pr-0"
		>
			<li v-for="item in navItems" as="template">
				<a class="text-center uppercase whitespace-nowrap" :title="item.title" :href=item.href>{{ item.label }}</a>
			</li>
		</ul>
	</div>
</template>