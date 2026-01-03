import {LitElement, html} from 'lit-element';
import {customElement, state} from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";
import {Router} from "@vaadin/router";
import Logo from '../../assets/Logo.png'

type Page = {
  id: string;
  label: string;
  route: string;
  active: boolean;
}

@customElement('nav-bar')
export class NavBar extends LitElement {
	@state() isOpen = false;

  pages: Page[] = [
	  {id: '1', label: 'Home', route: '/', active: false},
	  {id: '2', label: 'Über mich', route: '/about', active: false},
	  {id: '3', label: 'Leistungen', route: '/services', active: false},
	  {id: '4', label: 'Kontakt', route: '/contact', active: false},
	  {id: '5', label: 'Galerie', route: '/gallery', active: false}
  ];

  override connectedCallback() {
    super.connectedCallback();

		const activeHeader = this.pages.find((page) => page.route === window.location.pathname);
		activeHeader!.active = true;

	  window.addEventListener('reroute', ({ detail }: any) => {
		  const url = new URL(detail, window.location.origin);
		  const pathname = url.pathname;

		  const page = this.pages.find(p => p.route === pathname);
		  if (!page) return;

		  this.redirect(page.id, detail);
	  });
  }
  
  redirect(id: string, route: string) {
		this.isOpen = false;
		this.pages.map((page) => page.active = false);

		const activePage = this.pages.find((page) => page.id === id);
		activePage!.active = true;

		this.requestUpdate('pages');

		const appPage = document.querySelector('seelenstimme-app')?.shadowRoot?.querySelector('slot')?.assignedElements();
	  appPage && appPage[0].shadowRoot?.querySelector('.content')?.scrollTo(0,0);

    Router.go(route);
  }

  override render() {
    return html`
	    <header class="shadow-sm sticky absolute inset-x-0 top-0 z-50">
			  <nav class="flex items-center justify-between p-5 lg:px-5 lg:py-5" aria-label="Global">
			    <div class="flex flex-3">
			      <a href="#" @click=${() => this.redirect('1', '/')}>
			        <span class="sr-only">Seelenstimme</span>
			        <img class="xl:h-25 h-18 w-auto" src=${Logo} alt="">
			      </a>
			    </div>
			    <div class="flex lg:hidden">
			      <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 cursor-pointer" @click=${() => this.isOpen = !this.isOpen}>
			        <span class="sr-only">Open main menu</span>
			        <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
			          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			        </svg>
			      </button>
			    </div>
			    <div class="hidden xl:flex xl:gap-x-12 lg:flex lg:gap-x-6">
				    ${this.pages.map(({id, label, route, active}) => html`
                <a href=${route} class="border-b-2 py-2 text-xl px-1 pt-1 box-border font-medium ${active ? 'border-teal-500 text-gray-900 ' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}" @click=${() => this.redirect(id, route)}>${label}</a>
            `)}
			    </div>
			    <div class="hidden lg:flex lg:flex-1 lg:justify-end"></div>
			  </nav>
			  <div class="${!this.isOpen && 'hidden'} lg:hidden" role="dialog" aria-modal="true">
			    <div class="fixed inset-0 z-10"></div>
			    <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
			      <div class="flex items-center justify-between">
			        <a href="#" class="-m-1.5 p-1.5">
			          <span class="sr-only">Your Company</span>
			          <img class="h-20 w-auto" src=${Logo} alt="">
			        </a>
			        <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700 cursor-pointer" @click=${() => this.isOpen = !this.isOpen}>
			          <span class="sr-only">Close menu</span>
			          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
			            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
			          </svg>
			        </button>
			      </div>
			      <div class="mt-6 flow-root">
			        <div class="-my-6 divide-y divide-gray-500/10">
			          <div class="space-y-2 py-6">
				          ${this.pages.map(({id, label, route, active}) => html`
		                <a href=${route} class="block py-2 w-fit border-b-2 text-m font-medium ${active ? 'border-teal-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}" @click=${() => this.redirect(id, route)}>${label}</a>
			            `)}
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</header>
    `;
  }

  static styles = tailwindCss;
}

declare global {
  interface HTMLElementTagNameMap {
    'nav-bar': NavBar;
  }
}
