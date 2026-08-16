import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../../tailwind/tailwindCss.ts'
import '../../layouts/full-layout.ts'
import '../../../features/services/service-section.ts'

@localized()
@customElement('services-page')
export class ServicesPage extends LitElement {
	override render() {
		return html`
			<full-layout>
				<h1 class="sr-only">${msg('Leistungen')}</h1>
				<service-section></service-section>
			</full-layout>
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
		'services-page': ServicesPage;
	}
}
