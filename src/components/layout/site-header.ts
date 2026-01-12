import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import tailwindCss from '../../tailwind/tailwindCss.ts';
import Logo from '../../assets/Logo-cropped.png';

type Page = {
	label: string;
	route: string;
};

@customElement('site-header')
export class SiteHeader extends LitElement {
	@state() isOpen = false;
	@state() currentPath = window.location.pathname;

	pages: Page[] = [
		{ label: 'Home', route: '/' },
		{ label: 'Über mich', route: '/about' },
		{ label: 'Leistungen', route: '/services' },
		{ label: 'Kontakt', route: '/contact' },
		{ label: 'Galerie', route: '/gallery' },
	];

	override connectedCallback() {
		super.connectedCallback();

		window.addEventListener('vaadin-router-location-changed', (e: any) => {
			this.currentPath = e.detail.location.pathname;
		});
	}

	override render() {
		return html`
      <header class="shadow-sm sticky inset-x-0 top-0 z-50 bg-white">
        <nav class="flex items-center justify-between p-5 lg:px-5 lg:py-5" aria-label="Global">
          <!-- Logo -->
          <div class="flex flex-1">
            <app-link to="/" variant="logo">
              <span class="sr-only">Seelenstimme</span>
              <img class="xl:h-25 h-18 w-auto" src=${Logo} alt="Seelenstimme Logo" />
            </app-link>
          </div>

          <!-- Mobile menu button -->
          <div class="flex lg:hidden">
            <button
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              @click=${() => (this.isOpen = true)}
            >
              <span class="sr-only">Open main menu</span>
              <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          <!-- Desktop navigation -->
          <div class="hidden lg:flex gap-x-6">
            ${this.pages.map((p) => html`
              <app-link
                to=${p.route}
                .active=${this.currentPath === p.route}
                class="py-2 text-xl px-1 pt-1 box-border font-medium"
              >${p.label}</app-link>
            `)}
          </div>
        </nav>

        <!-- Mobile menu -->
        <div class=${this.isOpen ? '' : 'hidden'} role="dialog" aria-modal="true" class="lg:hidden">
          <div class="fixed inset-0 z-10 bg-black/20" @click=${() => (this.isOpen = false)}></div>

          <div
            class="fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 ring-1 ring-gray-900/10"
          >
            <div class="flex items-center justify-between">
              <app-link to="/" @click=${() => (this.isOpen = false)}>
                <span class="sr-only">Seelenstimme</span>
                <img class="h-20 w-auto" src=${Logo} alt="Seelenstimme Logo" />
              </app-link>

              <button
                type="button"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
                @click=${() => (this.isOpen = false)}
              >
                <span class="sr-only">Close menu</span>
                <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="mt-6 space-y-4">
              ${this.pages.map((p) => html`
                <app-link
                  to=${p.route}
                  .active=${this.currentPath === p.route}
                  class="block text-lg py-2"
                  @click=${() => (this.isOpen = false)}
                >
                  ${p.label}
                </app-link>
              `)}
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
		'site-header': SiteHeader;
	}
}