import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { localized, msg, str } from '@lit/localize'
import { Router } from '@vaadin/router'
import tailwindCss from '../../tailwind/tailwindCss.ts'
import { getLocale, localeLabels, localizedPath, otherLocale, stripLocale, type Locale } from '../../i18n/locale.ts'
import { opensInNewBrowsingContext } from '../../router/link-click.ts'
import { keepScrollOnNextNavigation } from '../../router/scroll-restoration.ts'

@localized()
@customElement('language-switcher')
export class LanguageSwitcher extends LitElement {
	// Note: the target depends on the current route, which changes without this component re-rendering.
	@state() private currentLocation = window.location.pathname + window.location.search

	private readonly onLocationChanged = () => {
		this.currentLocation = window.location.pathname + window.location.search
	}

	override connectedCallback() {
		super.connectedCallback()
		window.addEventListener('vaadin-router-location-changed', this.onLocationChanged)
	}

	override disconnectedCallback() {
		window.removeEventListener('vaadin-router-location-changed', this.onLocationChanged)
		super.disconnectedCallback()
	}

	override render() {
		const next = otherLocale(getLocale() as Locale)
		const [pathname, search] = splitLocation(this.currentLocation)
		const target = localizedPath(stripLocale(pathname), next) + search

		return html`
			<a
				href=${target}
				hreflang=${next}
				lang=${next}
				title=${msg(str`Sprache wechseln zu ${localeLabels[next]}`)}
				aria-label=${msg(str`Sprache wechseln zu ${localeLabels[next]}`)}
				class="
					inline-flex items-center gap-1.5 rounded-md px-2.5 py-2.5
					text-sm font-semibold tracking-wide text-gray-600
					transition-colors hover:bg-gray-100 hover:text-gray-900
					focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
				"
				@click=${(event: MouseEvent) => this.switchLanguage(event, target)}
			>
				<svg class="size-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c-1.657 0-3-4.03-3-9s1.343-9 3-9m0 18c1.657 0 3-4.03 3-9s-1.343-9-3-9M3.6 9h16.8M3.6 15h16.8"
					/>
				</svg>
				<span aria-hidden="true">${next.toUpperCase()}</span>
			</a>
		`
	}

	private switchLanguage(event: MouseEvent, target: string) {
		if(opensInNewBrowsingContext(event)) return

		event.preventDefault()
		keepScrollOnNextNavigation()
		Router.go(target)
	}

	static override styles = tailwindCss
}

function splitLocation(location: string): [string, string] {
	const queryStart = location.indexOf('?')
	if(queryStart === -1) return [location, '']
	return [location.slice(0, queryStart), location.slice(queryStart)]
}

declare global {
	interface HTMLElementTagNameMap {
		'language-switcher': LanguageSwitcher;
	}
}
