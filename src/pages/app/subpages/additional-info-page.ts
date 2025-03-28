import {LitElement, html, css} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';

@customElement('additional-info-page')
export class AdditionalInfoPage extends LitElement {
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
        'additional-info-page': AdditionalInfoPage;
    }
}