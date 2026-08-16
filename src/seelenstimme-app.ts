import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import AppRouter from './router/AppRouter.ts'
import { activateLocale, localeFromPath } from './i18n/locale.ts'

@customElement('seelenstimme-app')
export class SeelenstimmeApp extends LitElement {
	constructor() {
		super()

		activateLocale(localeFromPath(window.location.pathname))
		new AppRouter(this)
	}

	override render() {
		return html`<slot></slot>`
	}

	static override styles = css`
		:host {
			display: block;
		}
	`
}

declare global {
	interface HTMLElementTagNameMap {
		'seelenstimme-app': SeelenstimmeApp;
	}
}
