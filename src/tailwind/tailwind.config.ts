import type { Config } from 'tailwindcss';

const config = {
	content: [
		'./index.html',
		'./src/**/*.{ts,js}',
	],

	theme: {
		extend: {
			colors: {
				primary: {
					50: 'var(--color-cyan-50)',
					100: 'var(--color-cyan-100)',
					200: 'var(--color-cyan-200)',
					300: 'var(--color-cyan-300)',
					400: 'var(--color-cyan-400)',
					500: 'var(--color-cyan-500)',
					600: 'var(--color-cyan-600)',
					700: 'var(--color-cyan-700)',
					800: 'var(--color-cyan-800)',
					900: 'var(--color-cyan-900)',
					950: 'var(--color-cyan-950)',
				},
				neutral: {
					50: 'var(--color-stone-50)',
					100: 'var(--color-stone-100)',
					200: 'var(--color-stone-200)',
					300: 'var(--color-stone-300)',
					400: 'var(--color-stone-400)',
					500: 'var(--color-stone-500)',
					600: 'var(--color-stone-600)',
					700: 'var(--color-stone-700)',
					800: 'var(--color-stone-800)',
					900: 'var(--color-stone-900)',
					950: 'var(--color-stone-950)',
				},
			},
			keyframes: {
				fadeInRight: {
					'0%': {
						opacity: '0',
						transform: 'translate3d(100%, 0, 0)',
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)',
					},
				},
			},
		},
	},
} satisfies Config;

export default config;
