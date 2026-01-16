import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";

@customElement('app-toast')
export class AppToast extends LitElement {
	@property({ type: Boolean }) open = false;
	@property({ type: String }) type: 'success' | 'error' = 'success';
	@property({ type: String }) title = '';
	@property({ type: String }) message = '';

	private close() {
		this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
	}

	override render() {
		if (!this.open) return null;

		const isSuccess = this.type === 'success';

		return html`
      <div class="fixed top-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4 md:px-0">
        <div 
          class="
            relative overflow-hidden rounded-xl bg-white p-4 shadow-2xl ring-1 ring-gray-200
            transform transition-all duration-300 ease-out animate-slide-down
            ${isSuccess ? 'border-l-4 border-teal-500' : 'border-l-4 border-red-500'}
          "
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              ${isSuccess ? html`
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
                    <svg class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>` 
	              : html`
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                    <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>`
							}
            </div>

            <div class="flex-1 pt-0.5">
              <h3 class="text-sm font-bold text-gray-900">
                ${this.title || (isSuccess ? 'Erfolg!' : 'Fehler!')}
              </h3>
              <p class="mt-1 text-sm text-gray-600 leading-relaxed">
                ${this.message}
              </p>
            </div>

            <button 
              @click=${this.close}
              class="flex-shrink-0 ml-4 inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <span class="sr-only">Schließen</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
	}

	static override styles = [tailwindCss, css`
		:host {
			z-index: 1000;
		}
		
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-1rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-slide-down {
      animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `];
}

declare global {
	interface HTMLElementTagNameMap {
		'app-toast': AppToast;
	}
}