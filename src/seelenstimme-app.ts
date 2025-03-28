import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import AppRouter from "./pages/AppRouter.ts";

@customElement('seelenstimme-app')
export class SeelenstimmeApp extends LitElement {

  constructor() {
    super();
    new AppRouter().setOutlet(this);
  }

  render() {
    return html`
      <app-page></app-page>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'seelenstimme-app': SeelenstimmeApp
  }
}
