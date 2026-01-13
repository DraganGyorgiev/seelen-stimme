import {LitElement, html} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";

@customElement('full-layout')
export class FullLayout extends LitElement {
  @property({type: String}) foo = '';
  
  override render() {
    return html`
      <div class="mx-auto max-w-7xl p-6 sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    `;
  }
  
  static override styles = tailwindCss;
}

declare global {
  interface HTMLElementTagNameMap {
    'full-layout': FullLayout;
  }
}