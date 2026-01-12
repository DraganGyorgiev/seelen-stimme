import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import tailwindCss from '../../tailwind/tailwindCss';

@customElement('card-layout')
export class CardLayout extends LitElement {
	override render() {
		return html`
      <article
        class="
          relative isolate
          flex gap-8
          rounded-3xl
          bg-sky-50
          p-10
          items-stretch
        "
      >
        <div class="flex-shrink-0">
          <slot name="media"></slot>
        </div>

        <div class="flex flex-col flex-1">
          <slot name="content"></slot>
          <slot name="footer"></slot>
        </div>
      </article>
    `;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'card-layout': CardLayout;
	}
}