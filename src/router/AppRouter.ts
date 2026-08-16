import { Router, type Route } from '@vaadin/router'
import { applyPageMeta } from './page-meta.ts'
import { applyStructuredData } from '../seo/structured-data.ts'
import { restoreScrollPosition, startScrollRestoration } from './scroll-restoration.ts'
import { activateLocale, localeFromPath, localizedPath } from '../i18n/locale.ts'

import '../pages/app/app-page.ts'

type Page = {
	path: string
	component: string
	load: () => Promise<unknown>
}

const pages: Page[] = [
	{ path: '/', component: 'main-page', load: () => import('../pages/app/subpages/main-page.ts') },
	{ path: '/about', component: 'about-page', load: () => import('../pages/app/subpages/about-page.ts') },
	{ path: '/services', component: 'services-page', load: () => import('../pages/app/subpages/services-page.ts') },
	{ path: '/faq', component: 'faq-page', load: () => import('../pages/app/subpages/faq-page.ts') },
	{ path: '/gallery', component: 'gallery-page', load: () => import('../pages/app/subpages/gallery-page.ts') },
	{ path: '/contact', component: 'contact-page', load: () => import('../features/contact/contact-page.ts') },
	{
		path: '/impressum',
		component: 'impressum-page',
		load: () => import('../pages/app/subpages/legally-required/impressum-page.ts'),
	},
	{
		path: '/datenschutz',
		component: 'datenschutz-page',
		load: () => import('../pages/app/subpages/legally-required/datenschutz-page.ts'),
	},
	{
		path: '/agb',
		component: 'agb-page',
		load: () => import('../pages/app/subpages/legally-required/agb-page.ts'),
	},
	{
		path: '/cookies',
		component: 'cookies-page',
		load: () => import('../pages/app/subpages/legally-required/cookies-page.ts'),
	},
]

export const routablePaths = pages.map((page) => page.path)

export default class AppRouter extends Router {
	constructor(outlet: HTMLElement) {
		super(outlet)

		const toRoute = (page: Page, path: string): Route => ({
			path,
			component: page.component,
			action: async () => void (await page.load()),
		})

		this.setRoutes([
			{
				path: '/',
				component: 'app-page',
				children: [
					...pages.map((page) => toRoute(page, page.path)),
					...pages.map((page) => toRoute(page, localizedPath(page.path, 'en'))),
					{
						path: '(.*)',
						component: 'page-not-found',
						action: async () => void (await import('../pages/error/page-not-found.ts')),
					},
				],
			},
		])

		startScrollRestoration()

		window.addEventListener('vaadin-router-location-changed', async () => {
			await activateLocale(localeFromPath(window.location.pathname))
			applyPageMeta(window.location.pathname)
			applyStructuredData()
			restoreScrollPosition()
		})
	}
}
