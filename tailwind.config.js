/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				'main-image': "url('/background.jpg')"
			}
		}
	},
	plugins: []
};
