import {LitElement, html, css} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';

@customElement('page-not-found')
export class PageNotFound extends LitElement {
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
        'page-not-found': PageNotFound;
    }
}