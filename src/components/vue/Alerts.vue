<script setup>
import { ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon, XCircleIcon  } from '@heroicons/vue/20/solid'

</script>

<template>
	<div class="bg-blue-50 ">
		<div class="container max-w-7xl mx-auto flex p-4 ">
			<div class="flex-shrink-0">
				<InformationCircleIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
			</div>
			<div class="ml-3">
				<h3 class="text-lg font-black text-blue-900">Info</h3>
				<div class="mt-2 text-lg text-blue-900">
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo
						totam eius aperiam dolorum.</p>
				</div>
			</div>
			<div class="ml-auto pl-3">
				<div class="-mx-1.5 -my-1.5">
					<button type="button"
						class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2">
						<span class="sr-only">Dismiss</span>
						<XMarkIcon class="h-5 w-5" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="bg-yellow-50 ">
		<div class="container max-w-7xl mx-auto flex p-4 ">
			<div class="flex-shrink-0">
				<ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
			</div>
			<div class="ml-3">
				<h3 class="text-lg font-black text-yellow-900">Warning</h3>
				<div class="mt-2 text-lg text-yellow-900">
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo
						totam eius aperiam dolorum.</p>
				</div>
			</div>
			<div class="ml-auto pl-3">
				<div class="-mx-1.5 -my-1.5">
					<button type="button"
						class="inline-flex rounded-md  p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2">
						<span class="sr-only">Dismiss</span>
						<XMarkIcon class="h-5 w-5" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="bg-red-50 mb-2 shadow-md ">
		<div class="container max-w-7xl mx-auto flex p-4 ">
			<div class="flex-shrink-0">
				<ExclamationTriangleIcon  class="h-5 w-5 text-red-400" aria-hidden="true" />
			</div>
			<div class="ml-3">
				<h3 class="text-lg font-black text-red-900">Alert</h3>
				<div class="mt-2 text-lg text-red-900">
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo
						totam eius aperiam dolorum.</p>
				</div>
			</div>
			<div class="ml-auto pl-3">
				<div class="-mx-1.5 -my-1.5">
					<button type="button"
						class="inline-flex rounded-md  p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2">
						<span class="sr-only">Dismiss</span>
						<XMarkIcon class="h-5 w-5" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
