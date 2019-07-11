import autoprefixer from 'autoprefixer';

export default {
	mode: 'spa',
	server: {
		port: 9000
	},
	srcDir: 'src/',
	head: {
		title: `Weather widget | Koala challenge`,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
		],
		link: [
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito:300,600' }
		]
	},
	css: [
		'@/assets/styles/reset.css'
	],
	build: {
		extractCSS: true,
		postcss: {
			preset: {
				autoprefixer
			}
		}
	}
};
