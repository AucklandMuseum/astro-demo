
<script setup lang="ts">
import Toggle from '@vueform/toggle'
import { toggleLang, DefaultLocale, EnglishLocale, MaoriLocale } from 'lib/store';
import { SwitchGroup, SwitchLabel, Switch } from '@headlessui/vue'
import { useStore } from '@nanostores/vue';
import { ref } from 'vue';

const defaultLocale = useStore(DefaultLocale);
let enabled = ref(defaultLocale.value === EnglishLocale.get())
</script>

<template>
	<Toggle @change="toggleLang" v-model="enabled" :on-label="EnglishLocale.get()" :off-label="MaoriLocale.get()" :classes="{
		container: 'inline-block rounded-full outline-none focus:none w-20 h-6',
		toggle: 'flex w-20 h-5 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
		toggleOn: 'bg-gray-500 border-gray-500 justify-start text-white',
		toggleOff: 'bg-gray-200 border-gray-200 justify-end text-gray-700',
		toggleOnDisabled: 'bg-gray-300 border-gray-300 justify-start text-gray-400 cursor-not-allowed',
		toggleOffDisabled: 'bg-gray-200 border-gray-200 justify-end text-gray-400 cursor-not-allowed',
		handle: 'inline-block bg-white w-5 h-5 top-0 rounded-full absolute transition-all',
		handleOn: 'left-full transform -translate-x-full',
		handleOff: 'left-0',
		handleOnDisabled: 'bg-gray-100 left-full transform -translate-x-full',
		handleOffDisabled: 'bg-gray-100 left-0',
		label: 'mx-2 border-box whitespace-nowrap select-none',
	}" />
</template>
