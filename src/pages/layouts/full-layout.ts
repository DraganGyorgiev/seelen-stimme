import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import tailwindCss from '../../tailwind/tailwindCss.ts'

@customElement('full-layout')
export class FullLayout extends LitElement {
	override render() {
		return html`
			<div class="mx-auto max-w-7xl p-6 sm:px-6 lg:px-8">
				<slot></slot>
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
		'full-layout': FullLayout;
	}
}
