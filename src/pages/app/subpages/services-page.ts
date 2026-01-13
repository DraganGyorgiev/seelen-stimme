import {LitElement, html, css} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import '../../layouts/full-layout.ts'
import '../../../features/services/service-section.ts'

@customElement('services-page')
export class ServicesPage extends LitElement {
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
    }
  `;
}

declare global {
    interface HTMLElementTagNameMap {
        'services-page': ServicesPage;
    }
}