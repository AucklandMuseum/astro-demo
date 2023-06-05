<script setup>
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverPanel, PopoverButton } from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
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

const recentPosts = [
	{
		id: 2,
		title: 'Robin Morrison: Road Trip',
		href: '#',
		date: 'Mar 10, 2023',
		datetime: '2023-03-10',
		category: { title: 'Sales', href: '#' },
		imageUrl:
			'https://ajrctguoxo.cloudimg.io/v7/https%3A%2F%2Fwww.aucklandmuseum.com%2FCMSPages%2FGetFile.aspx%3Fguid%3D8bc1ea01-9ce7-4396-87c6-a0ec7a50ab42?w=280&h=160&org_if_sml=1&ci_url_encoded=1&force_format=webp%2Cjpeg&func=crop&gravity=face',
		description: 'Optio cum necessitatibus dolor voluptatum provident commodi et.',
	},
	{
		id: 1,
		title: 'Double trouble',
		href: '#',
		date: 'Mar 16, 2023',
		datetime: '2023-03-16',
		category: { title: 'Marketing', href: '#' },
		imageUrl:
			'https://ajrctguoxo.cloudimg.io/v7/https://www.aucklandmuseum.com/aucklandmuseum/files/ce/ceea8d84-bc4e-47d9-ab06-2042a898455c.jpg?w=280&h=160&org_if_sml=1&ci_url_encoded=1&force_format=webp%2Cjpeg&func=crop&gravity=face',
		description:
			'Et et dolore officia quis nostrud esse aute cillum irure do esse. Eiusmod ad deserunt cupidatat est magna Lorem.',
	}
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
	<header class="z-50 w-full border-b-4 border-white bg-black text-white shadow-md">
		<nav class="lg:text-lg container mx-auto flex flex-nowrap flex-row items-bottom mb-[-4px] pt-[40px]">
			<div class="lg:text-lg flex flex-shrink-0 w-[140px] ml-[20px] mr-[20px]">
				<a class="lg:text-lg" href="/"><img class="flex-shrink-0" src="/images/am-logo.svg"
						alt="Auckland War Memorial Museum" /></a>
			</div>
			<ul
				class="flex font-bold tracking-wide lg:mt-0 lg:flex lg:w-auto flex-initial space-x-[5px] lg:space-x-[4px] xl:space-x-[30px]">

				<li class="hover:border-b-4 hover:mb-[4px] md:px-2 lg:px-4 xl:px-5">
					<Popover class="z-50 shadow">
						<PopoverButton class="text-left whitespace-nowrap text-sm lg:text-lg outline-none" role="combobox"
							title="Show Visit subnavigation" aria-controls="header-nav-visit" aria-expanded="false"
							aria-label="Show Visit subnavigation"><span class="font-light block">Toro
								Mai</span> Visit</PopoverButton>
						<transition enter-active-class="transition ease-out duration-200"
							enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
							leave-active-class="transition ease-in duration-150"
							leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
							<PopoverPanel
								class="absolute inset-x-0 top-[158px] z-50 bg-white shadow-lg ring-1 ring-gray-900/5">
								<div
									class="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-2 lg:px-8">
									<div class="grid grid-cols-2 gap-x-6 sm:gap-x-8">

										<div class="flow-root">
											<div class="-my-2">
												<a v-for="item in engagement" :key="item.name" :href="item.href"
													class="flex gap-x-4 py-2 text-sm font-bold text-gray-900">
													{{ item.name }}
												</a>
											</div>
										</div>
									</div>
									<div class="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
										<h3 class="sr-only">Recent posts</h3>
										<article v-for="post in recentPosts" :key="post.id"
											class="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch">
											<div class="relative flex-none">
												<img class="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-[16/9] sm:h-32 lg:h-auto"
													:src="post.imageUrl" alt="" />
												<div
													class="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
											</div>
											<div>
												<div class="flex items-center gap-x-4">
													<time :datetime="post.datetime"
														class="text-sm leading-6 text-gray-600">{{ post.date }}</time>
													<a :href="post.category.href"
														class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">{{
															post.category.title }}</a>
												</div>
												<h4 class="mt-2 text-sm font-semibold leading-6 text-gray-900">
													<a :href="post.href">
														<span class="absolute inset-0" />
														{{ post.title }}
													</a>
												</h4>
												<p class="mt-2 text-sm leading-6 text-gray-600">{{ post.description }}</p>
											</div>
										</article>
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

</header></template>
  