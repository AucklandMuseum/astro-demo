<script>
export default {
	props: {
		Image: String,
		Title: String,
		Subtitle: String,
		BoldSubtitle: String,
		Content: String,
		ContentBehaviour: String,
	}
}
</script>

<template>
	<section class="">
		<div class="reverse md:flex md:flex-row">
			<div class="w-full md:flex-grow md:-mr-[50%]">
				<figure>
					<img class="w-full" :src="Image" />
				</figure>
			</div>
			<div class="pt-10 pb-10 pl-[24px] pr-[24px] lg:pl-16 lg:pr-16 bg-gray-900 md:bg-opacity-50 md:w-6/12 ">
				<div class="h-full flex flex-col justify-center ">
					<div slot="status" class="mb-10 font-bold uppercase" v-html="BoldSubtitle"></div>
					<h3 class="max-w-full font-thin text-gray-400" v-html="Subtitle"></h3>
					<div class="">
						<h2 class="font-light" v-html="Title"></h2>
						<div class="text-white" v-html=Content></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style>

</style>