import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import AppRouter from "./router/AppRouter.ts";

@customElement('seelenstimme-app')
export class SeelenstimmeApp extends LitElement {
  constructor() {
    super();

    new AppRouter(this);
  }

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'seelenstimme-app': SeelenstimmeApp;
  }
}
