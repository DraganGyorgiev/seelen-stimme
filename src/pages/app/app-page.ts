import {LitElement, html, css} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import '../../components/layout/site-header.ts'
import '../../components/layout/site-footer.ts'
import '../../components/cookie-consent/cookie-consent-banner.ts'

@customElement('app-page')
export class AppPage extends LitElement {
	override render() {
		return html`
			<div class="app">
				<site-header></site-header>

				<main>
					<slot></slot>
				</main>

				<site-footer></site-footer>
			</div>
		`;
	}

	static override styles = css`
		:host {
			display: block;
			min-height: 100vh;
		}
		
		.app {
			min-height: 100vh;
			display: flex;
			flex-direction: column;
		}
		
		main {
			flex: 1;
			overflow: hidden;
		}
	`;
}


declare global {
    interface HTMLElementTagNameMap {
        'app-page': AppPage;
    }
}