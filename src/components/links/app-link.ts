import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import tailwindCss from '../../tailwind/tailwindCss';

type LinkVariant = 'nav' | 'logo';

@customElement('app-link')
export class AppLink extends LitElement {
	@property({ type: String }) to = '/';
	@property({ type: Boolean, reflect: true }) active = false;
	@property({ type: String }) variant: LinkVariant = 'nav';

	private onClick(e: Event) {
		e.preventDefault();
		Router.go(this.to);
	}

	override render() {
		const isNav = this.variant === 'nav';

		return html`
			<a
				href=${this.to}
				@click=${this.onClick}
				class="
          ${isNav ? 'group transition-all duration-200 motion-safe:hover:-translate-y-0.5' : ''}
          relative inline-block
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-sm
          ${isNav
					? this.active
						? 'text-gray-900'
						: 'text-gray-600 hover:text-gray-900'
					: ''}
        ">
					<slot></slot>

					${isNav ? html`
	          <span
	            class="
	              pointer-events-none
	              absolute -bottom-1 left-0 h-px w-full
	              origin-left bg-gray-900/70
	              transition-transform duration-300
	              ${this.active ? 'scale-x-100 bg-teal-500' : 'scale-x-0 group-hover:scale-x-100'}">
	          </span>` : null}
			</a>
		`;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'app-link': AppLink;
	}
}
