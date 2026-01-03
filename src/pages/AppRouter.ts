import { Router } from '@vaadin/router';
import "./app/app-page.ts";
import "./app/subpages/main-page.ts";
import "./app/subpages/about-page.ts";
import "./app/subpages/additional-info-page.ts";
import "./app/subpages/contact-page.ts";
import "./app/subpages/services-page.ts";
import "./app/coming-soon-page.ts";

export default class AppRouter extends Router {
  constructor() {
    super();

    this.setRoutes([{
      path: '/',
      component: 'coming-soon-page'
      // children: [
	      // {
		    //   path: '/',
		    //   component: 'main-page'
	      // },
        // {
        //   path: '/about',
        //   component: 'about-page'
        // },
        // {
        //   path: '/about/:additional',
        //   component: 'additional-info-page'
        // },
        // {
        //   path: '/contact',
        //   component: 'contact-page'
        // },
        // {
        //   path: '/services',
        //   component: 'services-page'
        // },
	      // {
		    //   path: '/gallery',
		    //   component: 'gallery-page'
	      // },
      // ],
    },
    {
      path: '(.*)',
      component: 'page-not-found',
      action: () => import('./error/page-not-found.js') as Promise<any>
    },
    ]);
    }
}