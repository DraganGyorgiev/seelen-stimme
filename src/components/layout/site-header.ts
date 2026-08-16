import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../tailwind/tailwindCss.ts'
import Logo from '../../assets/Logo-cropped.webp'
import { stripLocale } from '../../i18n/locale.ts'
import '../links/app-link.ts'
import './language-switcher.ts'

@localized()
@customElement('site-header')
export class SiteHeader extends LitElement {
	@state() private isMenuOpen = false
	@state() private currentPath = stripLocale(window.location.pathname)

	private readonly onLocationChanged = () => {
		this.currentPath = stripLocale(window.location.pathname)
		this.isMenuOpen = false
	}

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if(event.key === 'Escape') this.isMenuOpen = false
	}

	override connectedCallback() {
		super.connectedCallback()
		window.addEventListener('vaadin-router-location-changed', this.onLocationChanged)
		window.addEventListener('keydown', this.onKeyDown)
	}

	override disconnectedCallback() {
		window.removeEventListener('vaadin-router-location-changed', this.onLocationChanged)
		window.removeEventListener('keydown', this.onKeyDown)
		super.disconnectedCallback()
	}

	override render() {
		const pages = [
			{ label: msg('Home'), route: '/' },
			{ label: msg('Über mich'), route: '/about' },
			{ label: msg('Leistungen'), route: '/services' },
			{ label: msg('FAQ'), route: '/faq' },
			{ label: msg('Kontakt'), route: '/contact' },
			{ label: msg('Galerie'), route: '/gallery' },
		]

		return html`
			<header class="shadow-sm sticky inset-x-0 top-0 z-50 bg-white">
				<nav class="flex items-center justify-between p-5 lg:px-5 lg:py-5" aria-label=${msg('Hauptnavigation')}>
					<div class="flex flex-1">
						<app-link to="/" variant="logo">
							<span class="sr-only">${msg('Seelen-Stimme – zur Startseite')}</span>
							<img
								class="xl:h-25 h-18 w-auto pr-3"
								src=${Logo}
								alt="Seelen-Stimme"
								width="240"
								height="100"
							/>
						</app-link>
					</div>

					<div class="flex lg:hidden">
						<button
							type="button"
							aria-expanded=${this.isMenuOpen}
							aria-controls="mobile-menu"
							class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
							@click=${() => (this.isMenuOpen = true)}
						>
							<span class="sr-only">${msg('Menü öffnen')}</span>
							<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							</svg>
						</button>
					</div>

					<div class="hidden items-center gap-x-6 lg:flex">
						${pages.map(
							(page) => html`
								<app-link
									to=${page.route}
									.active=${this.currentPath === page.route}
									class="py-2 text-xl px-1 pt-1 box-border font-medium"
									>${page.label}</app-link
								>
							`,
						)}

						<language-switcher></language-switcher>
					</div>
				</nav>

				<div id="mobile-menu" class="lg:hidden ${this.isMenuOpen ? '' : 'hidden'}" role="dialog" aria-modal="true" aria-label=${msg('Menü')}>
					<div class="fixed inset-0 z-10 bg-black/20" @click=${() => (this.isMenuOpen = false)}></div>

					<div class="fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 ring-1 ring-gray-900/10">
						<div class="flex items-center justify-between">
							<app-link to="/" variant="logo" @click=${() => (this.isMenuOpen = false)}>
								<span class="sr-only">${msg('Seelen-Stimme – zur Startseite')}</span>
								<img class="h-20 w-auto pr-2.5" src=${Logo} alt="Seelen-Stimme" width="240" height="100" />
							</app-link>

							<button
								type="button"
								class="-m-2.5 rounded-md p-2.5 text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
								@click=${() => (this.isMenuOpen = false)}
							>
								<span class="sr-only">${msg('Menü schließen')}</span>
								<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

						<div class="mt-6 space-y-4">
							${pages.map(
								(page) => html`
									<app-link
										to=${page.route}
										.active=${this.currentPath === page.route}
										class="block text-lg py-2"
										@click=${() => (this.isMenuOpen = false)}
									>
										${page.label}
									</app-link>
								`,
							)}
						</div>

						<div class="mt-6 border-t border-gray-900/10 pt-6">
							<language-switcher></language-switcher>
						</div>
					</div>
				</div>
			</header>
		`
	}

	static override styles = [
		tailwindCss,
		css`
			:host {
				display: block;
				position: sticky;
				top: 0;
				z-index: 50;
			}
		`,
	]
}

declare global {
	interface HTMLElementTagNameMap {
		'site-header': SiteHeader;
	}
}
