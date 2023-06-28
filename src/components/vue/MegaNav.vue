<script setup>
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/vue'
import CloudImage from "./CloudImage.vue";
import Alerts from "./Alerts.vue"
import TopNav from "./TopNav.vue"
import OpeningHours from "./OpeningHours.vue"
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'



const menuVisit = [
	{ name: 'What\'s On', href: '#' },
	{ name: 'Plan your visit', href: '#' },
	{ name: 'Tourist Information', href: '#' },
	{ name: 'Guided tours', href: '#' },
	{ name: 'Exhibitions', href: '#' },
	{ name: 'Galleries', href: '#' },
	{ name: 'Museum Store', href: '#' },
	{ name: 'Kids and family', href: '#' },
	{ name: 'Venues', href: '#' },
]

const mainNav = [
	{ en: 'Visit', mi: 'Toro Mai', menu: menuVisit },
	{ en: 'Discover', mi: 'Tuhuratia' },
	{ en: 'Learn', mi: 'Ako' },
	{ en: 'War Memorial', mi: 'Paenga Hira' },
	{ en: 'Your Museum', mi: 'Tō Whare Taonga' },
	{ en: 'Store', mi: 'Hokohoko' },

]
</script>

<template>
	<!-- <Alerts /> -->
	<header class="z-50 w-full shadow-md  bg-white text-black">
		<div class="mx-auto px-5 max-w-7xl">
			<div
				class="w-full flex flex-col sm:flex-row justify-around sm:justify-between py-[16px] text-xs md:text-sm font-bold">
				<OpeningHours />
				<TopNav />
			</div>
		</div>
	</header>
	<header class="hidden md:block relative z-50 w-full border-b-[6px] border-white bg-black text-white shadow-md">
		<div class="mx-auto px-5 max-w-7xl ">
			<nav class="lg:text-lg w-full  flex flex-nowrap flex-row items-bottom -mb-1.5 pt-10">
				<div class="w-[169px] ml-0 mr-5 xs:mx-5 md:ml-0 -pb-5 align-bottom self-end">
					<a class="" href="/"><img class="" src="/images/am-logo.svg" alt="Auckland War Memorial Museum" /></a>
				</div>
				<ul class="flex flex-row justify-evenly font-bold tracking-wide lg:mt-0 w-full pb-4 
			whitespace-nowrap text-sm md:text-base lg:text-lg ">


					<li class="flex-auto group hover:border-b-4 hover:-mb-2.5 hover:-pb-1 mb-0 lg:px-4 xl:px-5"
						v-for="nav in mainNav">
						<Popover class="z-50 shadow">
							<PopoverButton class="text-left focus:outline-none" role="combobox" :title=nav.en
								aria-controls="header-nav-visit" aria-expanded="false"
								aria-label="Show Visit subnavigation">
								<span class="font-light block">{{ nav.mi }}</span> {{ nav.en }}
							</PopoverButton>
							<transition enter-active-class="transition ease-out duration-200"
								enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
								leave-active-class="transition ease-in duration-100"
								leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
								<PopoverPanel v-slot="{ close }"
									class="absolute inset-x-0  top-[104px] lg:top-[112px] z-50 bg-zinc-800 shadow-lg ring-1 ring-gray-900/5 font-light sm:text-sm lg:text-base">
									<div class="mx-auto flex w-full">

										<div class="min-w-fit flex flex-col">
											<div class="py-10 px-20">
												<a v-for="item in nav.menu" :key="item.name" :href="item.href"
													class="flex py-2 lg:py-3 text-gray-100">
													{{ item.name }}
												</a>
											</div>
											<div class="flex justify-self-end place-items-center cursor-pointer"
												@click="close">
												<XMarkIcon class="m-5 mr-1 w-5 h-5 lg:w-10 lg:h-10" aria-label="Close" />
												Close
											</div>
										</div>
										<div class="w-full min-h-full bg-black p-10 grid grid-cols-2 grid-rows-2 gap-1">
											<h3 class="sr-only">Featured</h3>

											<a class=" text-white bg-black col-span-2 xl:row-span-2 xl:col-auto group/1"
												href="#">
												<figure class="flex relative overflow-hidden h-full ">
													<CloudImage
														class="block object-cover h-auto min-h-full min-w-full absolute w-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
														src="https://www.aucklandmuseum.com/CMSPages/GetFile.aspx?guid=ceea8d84-bc4e-47d9-ab06-2042a898455c"
														params="org_if_sml=0&force_format=webp,jpeg&func=crop&gravity=face" />
													<figcaption
														class="relative h-full w-full transition-[height] z-[55] bg-black bg-opacity-50 flex self-end group-hover/1:h-0 duration-300 ">
														<p
															class="absolute bottom-0 left-0 w-full p-5 whitespace-normal leading-tight bg-black bg-opacity-50">
															Double
															trouble</p>
													</figcaption>
												</figure>
											</a>

											<a class="text-white bg-black row-start-2 xl:row-auto group/2">

												<figure class="flex relative overflow-hidden h-full ">
													<CloudImage
														class="block object-cover h-auto min-h-full min-w-full absolute w-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
														src="https://www.aucklandmuseum.com/aucklandmuseum/files/f2/f2953c70-9c56-4f30-8b60-3aab26776b07.jpg"
														params="org_if_sml=0&force_format=webp,jpeg&func=crop&gravity=face" />
													<figcaption
														class="relative h-full w-full transition-[height] z-[55] bg-black bg-opacity-50 flex self-end group-hover/2:h-0 duration-300 ">
														<p
															class="absolute bottom-0 left-0 w-full p-5 whitespace-normal leading-tight bg-black bg-opacity-50">
															Get more
															from your Museum with Membership</p>
													</figcaption>
												</figure>
											</a>


											<a class="text-white bg-black row-start-2 xl:col-start-2 xl:row-auto group/3">
												<figure class="flex relative overflow-hidden h-full ">
													<CloudImage
														class="block object-cover h-auto min-h-full min-w-full absolute w-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
														src="https://www.aucklandmuseum.com/CMSPages/GetFile.aspx?guid=32c8dede-78c4-4198-98a6-3c4e189835e9"
														params="org_if_sml=0&force_format=webp,jpeg&func=crop&gravity=face" />
													<figcaption
														class="relative h-full w-full transition-[height] z-[55] bg-black bg-opacity-50 flex self-end group-hover/3:h-0 duration-300 ">
														<p
															class="absolute bottom-0 left-0 w-full p-5 whitespace-normal leading-tight bg-black bg-opacity-50">
															Honour and
															remember New Zealand's servicemen
															and women</p>
													</figcaption>
												</figure>
											</a>
										</div>
									</div>
								</PopoverPanel>
							</transition>
						</Popover>
					</li>
				</ul>
			<div class="lg:text-lg flex flex-grow justify-end ml-2 items-end mb-7">
				<MagnifyingGlassIcon class="h-8 w-8 lg:h-10 lg:w-10 text-white" aria-hidden="true" />
			</div>
		</nav>
	</div>
</header></template>
  