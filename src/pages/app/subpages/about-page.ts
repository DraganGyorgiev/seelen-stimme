import {LitElement, html, css} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';

@customElement('about-page')
export class AboutPage extends LitElement {
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
        'about-page': AboutPage;
    }
}