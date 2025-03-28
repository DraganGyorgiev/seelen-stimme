import {LitElement, html, css} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';

@customElement('services-page')
export class ServicesPage extends LitElement {
    @property({type: String}) foo = '';

    override render() {
        return html`
      <div></div>
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