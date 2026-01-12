import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import tailwindCss from '../../tailwind/tailwindCss.ts';

@customElement('footer-social-link')
export class FooterSocialLink extends LitElement {
	@property({ type: String }) href = '';
	@property({ type: String }) label = '';

	override render() {
		return html`
			<a
				href=${this.href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label=${this.label}
				class="
          group relative inline-flex items-center justify-center
          text-gray-600 hover:text-gray-900
          transition-all duration-200 ease-out
          motion-safe:hover:-translate-y-1
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2
        "
			>
				<slot></slot>

				<!-- subtle underline -->
				<span
					class="
            pointer-events-none
            absolute -bottom-1 left-0 h-px w-full
            origin-left scale-x-0 bg-gray-800/70
            transition-transform duration-300
            group-hover:scale-x-100
          "
				></span>
			</a>
		`;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'footer-social-link': FooterSocialLink;
	}
}