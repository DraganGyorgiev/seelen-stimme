import {LitElement, html} from 'lit-element';
import {customElement} from 'lit/decorators.js';

@customElement('main-page')
export class MainPage extends LitElement {

  override render() {
    return html`
      <nav-bar></nav-bar>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-page': MainPage;
  }
}