import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized } from '@lit/localize'
import tailwindCss from '../../../tailwind/tailwindCss.ts'
import '../../layouts/full-layout.ts'
import '../../../components/faqs/faqs-component.ts'

@localized()
@customElement('faq-page')
export class FaqPage extends LitElement {
	override render() {
		return html`
			<full-layout>
				<faqs-component></faqs-component>
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
		'faq-page': FaqPage;
	}
}
