const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
		'./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}',
		'node_modules/preline/dist/*.js',
	],
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/container-queries'),
		require("daisyui"),
		require("preline/plugin.js"),
        plugin(function childrenPlugin({ addVariant }) {
            // apply a style to all direct children
            // example usage: "children:border-l children:border-blue-500"
            addVariant('children', '& > *')
        })
    ],
	  // daisyUI config (optional)
	  daisyui: {
		styled: true,
		themes: ["lofi"],
		base: true,
		utils: true,
		logs: false,
		rtl: false,
		prefix: "",
		darkTheme: "dark",
	  },
}