import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import AppRouter from "./pages/AppRouter.ts";
import {css} from "lit-element";

@customElement('seelenstimme-app')
export class SeelenstimmeApp extends LitElement {
  constructor() {
    super();

    new AppRouter().setOutlet(this);
  }

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `
  }
  
  static override styles = css`
    div {
      height: 100dvh;
      width: 100dvw;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'seelenstimme-app': SeelenstimmeApp;
  }
}
