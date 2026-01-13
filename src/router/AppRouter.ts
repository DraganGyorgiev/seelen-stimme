import { Router } from '@vaadin/router';

import "../pages/app/app-page.ts";
import "../pages/app/subpages/main-page.ts";
import "../pages/app/subpages/about-page.ts";
import "../pages/app/subpages/additional-info-page.ts";
import "../features/contact/contact-page.ts";
import "../pages/app/subpages/services-page.ts";
import "../pages/app/subpages/gallery-page.ts";
import "../pages/app/subpages/legally-required/impressum-page.ts";
import "../pages/app/subpages/legally-required/datenschutz-page.ts";
import "../pages/app/subpages/legally-required/agb-page.ts";
import "../pages/app/subpages/legally-required/cookies-page.ts";

export default class AppRouter extends Router {
	constructor(outlet: HTMLElement) {
		super(outlet);

		this.setRoutes([
			{
				path: '/',
				component: 'app-page',
				children: [
					{ path: '/', component: 'main-page' },
					{ path: '/about', component: 'about-page' },
					{ path: '/about/:additional', component: 'additional-info-page' },
					{ path: '/contact', component: 'contact-page' },
					{ path: '/services', component: 'services-page' },
					{ path: '/gallery', component: 'gallery-page' },
					{ path: '/impressum', component: 'impressum-page' },
					{ path: '/datenschutz', component: 'datenschutz-page' },
					{ path: '/agb', component: 'agb-page' },
					{ path: '/cookies', component: 'cookies-page' },
				],
			},
		]);

		window.addEventListener('vaadin-router-location-changed', () => {
			requestAnimationFrame(() => {
				if (!location.hash) {
					window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
				}
			});
		});

		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
	}
}
