import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../tailwind/tailwindCss.ts'
import '../../components/links/app-link.ts'

@localized()
@customElement('page-not-found')
export class PageNotFound extends LitElement {
	override render() {
		return html`
			<div class="mx-auto max-w-2xl px-6 py-32 text-center sm:py-40 lg:px-8">
				<p class="text-base/8 font-semibold text-teal-700">404</p>
				<h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
					${msg('Seite nicht gefunden')}
				</h1>
				<p class="mt-6 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
					${msg('Diese Seite existiert nicht oder wurde verschoben.')}
				</p>
				<div class="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
					<app-link to="/"><span aria-hidden="true">&larr;</span> ${msg('Zur Startseite')}</app-link>
					<app-link to="/services">${msg('Leistungen ansehen')}</app-link>
					<app-link to="/contact">${msg('Kontakt aufnehmen')}</app-link>
				</div>
			</div>
		`
	}

	static override styles = [
		tailwindCss,
		css`
			:host {
				display: block;
			}
		`,
	]
}

declare global {
	interface HTMLElementTagNameMap {
		'page-not-found': PageNotFound;
	}
}
