import {LitElement, html, css} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import '../../layouts/full-layout.ts'
import '../../../features/services/service-section.ts'
import './gallery-page.ts'

@customElement('services-page')
export class ServicesPage extends LitElement {
	override connectedCallback() {
		super.connectedCallback();
		this.handleHashScroll();
		window.addEventListener('hashchange', this.handleHashScroll);
	}

	override disconnectedCallback() {
		window.removeEventListener('hashchange', this.handleHashScroll);
		super.disconnectedCallback();
	}

	private handleHashScroll = () => {
		requestAnimationFrame(() => {
			const id = location.hash.replace('#', '');
			if (!id) {
				window.scrollTo({ top: 0, behavior: 'auto' });
				return;
			}

			const el = this.renderRoot.querySelector(`#${id}`) as HTMLElement
				|| document.getElementById(id);

			el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	};

	override render() {
		return html`
      <full-layout>
        <service-section></service-section>
      </full-layout>
    `;
	}

	static override styles = css`
		:host {
			display: block;
			height: 100%;
		}
	`;
}

declare global {
    interface HTMLElementTagNameMap {
        'services-page': ServicesPage;
    }
}