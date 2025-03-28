import {LitElement, html, css} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';

@customElement('app-page')
export class AppPage extends LitElement {
  @property({type: String}) foo = '';

  override render() {
    return html`
      <main-page></main-page>
    `;
  }

  static override styles = css`
    :host {
        width: 100%;
        height: 100%;
    }
  `;
}

declare global {
    interface HTMLElementTagNameMap {
        'app-page': AppPage;
    }
}