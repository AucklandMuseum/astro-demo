<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Popover, PopoverPanel, PopoverButton, PopoverGroup } from '@headlessui/vue'
import CloudImage from "./CloudImage.vue";
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { DefaultLocale } from 'lib/store';
import { useStore } from '@nanostores/vue';

const defaultLocale = useStore(DefaultLocale);
let content = ref({
	data: null,
});

async function  getData(locale:string){
	const response = await fetch("/api/nav/menu.json?locale=" + locale)
	content.value.data = await response.json();
}

onMounted(() => {getData(defaultLocale.value)});
watch(defaultLocale ,() => {getData(defaultLocale.value)} )

</script>


<template>
<PopoverGroup as="ul" class="flex flex-row font-bold tracking-wide lg:mt-0 space-x-0
			whitespace-nowrap text-sm md:text-base lg:text-lg place-self-end ">
		<Popover as="li" class="flex-auto group z-50 shadow" v-for="(item, index) in content.data?.default">
			<PopoverButton
				class="text-left hover:border-b-4 hover:-mb-3 hover:pb-2.5 hover:outline-none my-5 lg:mx-1 px-3 lg:px-4 xl:px-5"
				role="combobox" :title="item['fields']['title']" aria-controls="header-nav-visit" aria-expanded="false"
				aria-label="Show Visit subnavigation">
				<span class="font-light block">{{ content.data?.alt[index]['fields']['title'] }}</span> {{
					item['fields']['title'] }}
			</PopoverButton>
			<transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-1"
				enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-100"
				leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
				<PopoverPanel v-slot="{ close }"
					class="absolute inset-x-0 md:top-[90px] lg:top-[110px] z-50 bg-zinc-800 shadow-lg ring-1 ring-gray-900/5 font-light sm:text-sm lg:text-base">
					<div class="mx-auto flex w-full">

						<div class="min-w-fit flex flex-col">
							<div class="py-10 px-10">

								<a v-for="menu in item['fields']['menuItems']" href="#"
									class="flex px-2 py-2 lg:py-3 text-gray-100">
									{{ menu['fields']['title'] }}

								</a>
							</div>
							<a href="#"
								class=" -outline-offset-4 py-2 px-2 flex justify-self-end place-items-center cursor-pointer"
								@click="close">
								<XMarkIcon class="m-3 mr-2 w-5 h-5 lg:w-5 lg:h-5" aria-label="Close" />
								Close
							</a>
						</div>
						<div class="w-full min-h-full bg-black p-10 grid grid-cols-2 grid-rows-2 gap-1">
							<h3 class="sr-only">Featured</h3>

							<a class=" text-white bg-black col-span-2 xl:row-span-2 xl:col-auto group/1" href="#">
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

							<a href="#" class="text-white bg-black row-start-2 xl:row-auto group/2">

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


							<a href="#" class="text-white bg-black row-start-2 xl:col-start-2 xl:row-auto group/3">
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
	</PopoverGroup>
</template>
