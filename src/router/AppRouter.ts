import { Router } from '@vaadin/router';
import {
	saveScroll,
	restoreScroll,
	scrollToHashOrTop,
	markHistoryNavigation,
	resetHistoryFlag
} from './scroll-manager';

import "../pages/app/app-page.ts";
import "../pages/app/subpages/main-page.ts";
import "../pages/app/subpages/about-page.ts";
import "../pages/app/subpages/additional-info-page.ts";
import "../features/contact/contact-page.ts";
import "../pages/app/subpages/services-page.ts";
import "../pages/app/coming-soon-page.ts";
import "../pages/app/subpages/legally-required/impressum-page.ts";
import "../pages/app/subpages/legally-required/datenschutz-page.ts";
import "../pages/app/subpages/legally-required/agb-page.ts";
import "../pages/app/subpages/legally-required/cookies-page.ts";

export default class AppRouter extends Router {
	constructor() {
		super();

		this.setRoutes([
			{
				path: '/',
				component: 'app-page',
				action: () => {
					// runs BEFORE navigation
					saveScroll();
					return true;
				},
				children: [
					{
						path: '/',
						component: 'main-page',
						onAfterEnter: () => this.handleScroll()
					},
					{
						path: '/about',
						component: 'about-page',
						onAfterEnter: () => this.handleScroll()
					},
					{
						path: '/about/:additional',
						component: 'additional-info-page',
						onAfterEnter: () => this.handleScroll()
					},
					{
						path: '/contact',
						component: 'contact-page',
						onAfterEnter: () => this.handleScroll()
					},
					{
						path: '/services',
						component: 'services-page',
						onAfterEnter: () => this.handleScroll()
					},
					{
						path: '/gallery',
						component: 'gallery-page',
						onAfterEnter: () => this.handleScroll()
					},
					{
						path: '/impressum',
						component: 'impressum-page',
						onAfterEnter: () => this.handleScroll()
					},
					{
						path: '/datenschutz',
						component: 'datenschutz-page',
						onAfterEnter: () => this.handleScroll()
					},
					{
						path: '/agb',
						component: 'agb-page',
						onAfterEnter: () => this.handleScroll()
					},
					{
						path: '/cookies',
						component: 'cookies-page',
						onAfterEnter: () => this.handleScroll()
					},
				],
			},
			{
				path: '(.*)',
				component: 'page-not-found',
				action: () => import('../pages/error/page-not-found.ts') as Promise<any>
			},
		]);

		// Disable browser auto handling
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
	}

	private handleScroll() {
		// Detect browser back/forward
		if (performance.getEntriesByType('navigation')[0]?.type === 'back_forward') {
			markHistoryNavigation();
		}

		const restored = restoreScroll();

		if (!restored) {
			// wait one frame so layout & images exist
			requestAnimationFrame(() => {
				scrollToHashOrTop();
			});
		}

		resetHistoryFlag();
	}
}