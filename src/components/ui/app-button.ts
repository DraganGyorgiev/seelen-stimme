import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import tailwindCss from '../../tailwind/tailwindCss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

@customElement('app-button')
export class AppButton extends LitElement {
	@property({ type: String }) variant: ButtonVariant = 'primary';
	@property({ type: Boolean, reflect: true }) disabled = false;
	@property({ type: String }) type: 'button' | 'submit' = 'button';

	private get variantClasses() {
		switch (this.variant) {
			case 'secondary':
				return `
          bg-gray-200 text-gray-800
          hover:bg-gray-300
          focus-visible:ring-gray-400
        `;
			case 'ghost':
				return `
          bg-transparent text-gray-700
          hover:bg-gray-100
          focus-visible:ring-gray-400
        `;
			case 'primary':
			default:
				return `
          bg-teal-600 text-white
          hover:bg-teal-700
          focus-visible:ring-teal-500
        `;
		}
	}

	override render() {
		return html`
			<button
				type=${this.type}
				?disabled=${this.disabled}
				class="
          inline-flex items-center justify-center
          rounded-md px-4 py-2 text-sm font-medium
          shadow-sm

          transition-all duration-200
          motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02]
          motion-safe:active:translate-y-0

          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-offset-2

          disabled:opacity-50 disabled:pointer-events-none

          ${this.variantClasses}
        "
			>
				<slot></slot>
			</button>
		`;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'app-button': AppButton;
	}
}