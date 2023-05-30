const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}',
		'node_modules/preline/dist/*.js',
	],

	theme: {
		fontFamily: {
			sans: ['"Gotham Narrow"', 'sans-serif']
		  },		
		extend: {
			typography: {

				DEFAULT: {
					// Custom CSS here ↓
					css: {
						img:{
							width: '100%',
						},
						p: {
							fontStyle: 'normal',
							fontWeight: 400,
							fontLeading: 'normal',
							lineHeight: '1.5em',
						},
						hr: {
							borderColor: 'var(--tw-prose-text)',
							borderTopWidth: 1,
						},
						'blockquote p:first-of-type::before': {
							content: '""',
						  },
						  'blockquote p:last-of-type::after': {
							content: '""',
						  }
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/container-queries'),
		//require("daisyui"),
		//require("preline/plugin.js"),
	],
	// daisyUI config (optional)
	/* 	  daisyui: {
			styled: true,
			themes: ["lofi"],
			base: true,
			utils: true,
			logs: false,
			rtl: false,
			prefix: "",
			darkTheme: "dark",
		  }, */
}