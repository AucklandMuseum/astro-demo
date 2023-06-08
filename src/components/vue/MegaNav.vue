<script setup>
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverPanel, PopoverButton } from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import CloudImage from "./CloudImage.vue";
import {
	BookOpenIcon,
	BriefcaseIcon,
	GlobeAltIcon,
	InformationCircleIcon,
	NewspaperIcon,
	ShieldCheckIcon,
	UserGroupIcon,
	UsersIcon,
	VideoCameraIcon,
} from '@heroicons/vue/24/outline'

const engagement = [
	{ name: 'What\'s On', href: '#', icon: InformationCircleIcon },
	{ name: 'Plan your visit', href: '#', icon: UsersIcon },
	{ name: 'Tourist Information', href: '#', icon: NewspaperIcon },
	{ name: 'Guided tours', href: '#', icon: BriefcaseIcon },
	{ name: 'Exhibitions', href: '#', icon: ShieldCheckIcon },
	{ name: 'Galleries', href: '#', icon: ShieldCheckIcon },
	{ name: 'Museum Store', href: '#', icon: ShieldCheckIcon },
	{ name: 'Kids and family', href: '#', icon: ShieldCheckIcon },
	{ name: 'Venues', href: '#', icon: ShieldCheckIcon },
]
</script>

<template>
	<header class="z-50 w-full bg-white text-black">
		<div class="container mx-auto flex flex-row justify-between py-[16px] text-xs sm:text-sm sm:font-bold">
			<div class="flex self-start flex-shrink flex-row flex-wrap align-middle">
				<div class="flex ml-[8px]">
					Open 10AM - 5PM Mon - Fri, 9AM - 5PM Sat, Sun, Public Holidays.
				</div>
				<div class="flex ml-[8px]">
					Open late every Tuesday evening until 8.30PM.
				</div>
			</div>
			<div class="flex flex-row flex-nowrap align-middle">
				<ul class="font-bold tracking-wide mt-0 flex w-auto divide-x-2 divide-gray-300 ">
					<li class="pr-[16px] self-center ">
						<a class="text-center uppercase whitespace-nowrap " title="Buy Tickets" href="/tickets">Tickets</a>
					</li>
					<li class="px-[16px] self-center ">
						<a class="text-center uppercase whitespace-nowrap " title="Become a member"
							href="/membership">Membership</a>
					</li>
					<li class="pl-[16px] mr-[8px] self-center ">
						<a class="text-center uppercase whitespace-nowrap " title="Donate" href="/donate">Donate</a>
					</li>
				</ul>
			</div>
		</div>
	</header>
	<header class="z-50 w-full border-b-[6px] border-white bg-black text-white shadow-md">
		<nav class="lg:text-lg container mx-auto flex flex-nowrap flex-row items-bottom mb-[-6px] pt-[40px]">
			<div class="lg:text-lg flex flex-shrink-0 w-[140px] ml-[20px] mr-[20px]">
				<a class="lg:text-lg" href="/"><img class="flex-shrink-0" src="/images/am-logo.svg"
						alt="Auckland War Memorial Museum" /></a>
			</div>
			<ul
				class="flex font-bold tracking-wide lg:mt-0 lg:flex lg:w-auto flex-initial space-x-[5px] lg:space-x-[4px] xl:space-x-[30px]">

				<li class="hover:border-b-4 hover:mb-[6px] md:px-2 lg:px-4 xl:px-5">
					<Popover class="z-50 shadow">
						<PopoverButton class="text-left whitespace-nowrap text-sm lg:text-lg outline-none" role="combobox"
							title="Show Visit subnavigation" aria-controls="header-nav-visit" aria-expanded="false"
							aria-label="Show Visit subnavigation"><span class="font-light block">Toro
								Mai</span> Visit</PopoverButton>
						<transition enter-active-class="transition ease-out duration-100"
							enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
							leave-active-class="transition ease-in duration-100"
							leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
							<PopoverPanel
								class="absolute inset-x-0 sm:top-[197px] md:top-[177px] xl:top-[157px] z-50 bg-zinc-800 shadow-lg ring-1 ring-gray-900/5 font-light sm:text-sm lg:text-base">
								<div class="mx-auto flex w-full">

									<div class="min-w-fit">
										<div class="py-10 px-20">
											<a v-for="item in engagement" :key="item.name" :href="item.href"
												class="flex py-3 text-gray-100">
												{{ item.name }}
											</a>
										</div>
									</div>
									<div class="w-full min-h-full bg-black p-10 grid grid-cols-2 grid-rows-2 gap-1">
										<h3 class="sr-only">Recent posts</h3>

											<a class=" text-white bg-black col-span-2 xl:row-span-2 xl:col-auto group" href="#">
												<figure class="flex relative overflow-hidden h-full " >
													<CloudImage class="block object-cover h-auto min-h-full min-w-full absolute w-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
													src="https://www.aucklandmuseum.com/CMSPages/GetFile.aspx?guid=ceea8d84-bc4e-47d9-ab06-2042a898455c" />
													<figcaption class=" transition-[height] z-[55] h-full w-full bg-black bg-opacity-50 flex self-end p-5 group-hover:h-16 duration-300 ">
														<p class="flex items-end">Double trouble</p>
													</figcaption>
												</figure>
											</a>

										<a class="text-white bg-blue-300 row-start-2 xl:row-auto">
											</a>


										<a class="text-white bg-red-300 row-start-2 xl:col-start-2 xl:row-auto ">
3
										</a>
									</div>
								</div>
							</PopoverPanel>
						</transition>
					</Popover>
				</li>
				<li class="hover:border-b-4 hover:mb-[4px] md:px-2 lg:px-4 xl:px-5">
					<button type="button" class="text-left whitespace-nowrap text-sm lg:text-lg" role="combobox"
						title="Show Discover subnavigation" aria-controls="header-nav-visit" aria-expanded="false"
						aria-label="Show Discover subnavigation"><span class="font-light block">Tuhuratia</span>
						Discover</button>
				</li>
				<li class="hover:border-b-4 hover:mb-[4px] md:px-2 lg:px-4 xl:px-5">
					<button type="button" class="text-left whitespace-nowrap text-sm lg:text-lg" role="combobox"
						title="Show Learn subnavigation" aria-controls="header-nav-visit" aria-expanded="false"
						aria-label="Show Learn subnavigation"><span class="font-light block">Ako</span>
						Learn</button>
				</li>
				<li class="hover:border-b-4 hover:mb-[4px] md:px-2 lg:px-4 xl:px-5">
					<button type="button" class="text-left whitespace-nowrap text-sm lg:text-lg" role="combobox"
						title="Show War Memorial subnavigation" aria-controls="header-nav-visit" aria-expanded="false"
						aria-label="Show War Memorial subnavigation"><span class="font-light block">Paenga Hira</span>
						War Memorial</button>
				</li>
				<li class="hover:border-b-4 hover:mb-[4px] md:px-2 lg:px-4 xl:px-5">
					<button type="button" class="text-left whitespace-nowrap text-sm lg:text-lg" role="combobox"
						title="Show Your Museum subnavigation" aria-controls="header-nav-visit" aria-expanded="false"
						aria-label="Show Your Museum subnavigation"><span class="font-light block">Tō Whare
							Taonga</span> Your Museum</button>
				</li>
				<li class="hover:border-b-4 hover:mb-[4px] md:px-2 lg:px-4 xl:px-5">
					<button type="button" class="text-left whitespace-nowrap text-sm lg:text-lg" role="combobox"
						title="Show Store subnavigation" aria-controls="header-nav-store" aria-expanded="false"
						aria-label="Show Store subnavigation"><span class="font-light block">Hokohoko</span>
						Store</button>
				</li>
			</ul>
			<div class="lg:text-lg flex flex-grow justify-end mr-[8px]">
				<MagnifyingGlassIcon class="h-8 w-8 lg:h-10 lg:w-10 text-white" aria-hidden="true" />
			</div>
		</nav>

	</header>
</template>
  