<script>
export default {
	props: {
		Image: String,
		Title: String,
		Subtitle: String,
		BoldSubtitle: String,
		Content: String,
		ContentBehaviour: String,
	},
}

</script>

<template>
	<section class="">
		<div :class="'hero-' + ContentBehaviour + '-wrapper'">
			<div :class="'hero-' + ContentBehaviour + '-image'">
				<figure>
					<img class="w-full" :src="Image" />
				</figure>
			</div>
			<div :class="'hero-' + ContentBehaviour + '-text'">
				<div class="h-full flex flex-col justify-center ">
					<div class="text-white mb-10 font-bold uppercase" v-html=BoldSubtitle"></div>
					<h3 class="max-w-full font-thin text-gray-400" v-html="Subtitle"></h3>
					<div class="text-white">
						<h2 class="font-light" v-html="Title"></h2>
						<div class="" v-html=Content></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
h2 {
	@apply text-4xl md:text-4xl lg:text-[64px] lg:leading-[75px] mb-10 md:mb-12 lg:mb-20
}

h3 {
	@apply text-3xl md:text-[28px] lg:text-[40px] lg:leading-tight mb-2 md:mb-2 lg:mb-1
}

.hero-left-image{
	@apply w-full md:flex-grow order-2 z-0
}
.hero-left-text{
	@apply pt-10 pb-10 pl-[24px] pr-[24px] lg:pl-16 lg:pr-16 bg-gray-900 md:bg-opacity-50 md:w-6/12 md:-mr-[50%] order-1 z-10
}
.hero-left-wrapper{
	@apply bg-black md:flex md:flex-row
}
.hero-right-image{
	@apply w-full md:flex-grow md:-mr-[50%] z-0
}
.hero-right-text{
	@apply pt-10 pb-10 pl-[24px] pr-[24px] lg:pl-16 lg:pr-16 bg-gray-900 md:bg-opacity-50 md:w-6/12 z-10
}
.hero-right-wrapper{
	@apply bg-black md:flex md:flex-row
}
</style>