import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import tailwindCss from '../../tailwind/tailwindCss.ts';

@customElement('cookie-consent-banner')
export class CookieConsentBanner extends LitElement {
	@state() private visible = false;

	connectedCallback() {
		super.connectedCallback();
		const consent = localStorage.getItem('cookie-consent');
		this.visible = !consent;
	}

	private acceptAll() {
		localStorage.setItem('cookie-consent', 'all');
		this.visible = false;
	}

	private rejectNonEssential() {
		localStorage.setItem('cookie-consent', 'essential');
		this.visible = false;
	}

	override render() {
		if (!this.visible) return null;

		return html`
      <div
        class="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-gray-900/10 shadow-lg"
      >
        <div class="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm text-gray-700 max-w-3xl">
            Diese Website verwendet Cookies, um grundlegende Funktionen sicherzustellen und Ihr Nutzungserlebnis zu verbessern. Sie können
            selbst entscheiden, ob Sie alle Cookies zulassen oder nur die technisch notwendigen akzeptieren.
          </p>

          <div class="flex gap-3 shrink-0">
            <app-button variant="secondary" @click=${this.rejectNonEssential}>Nur notwendige</app-button>
            <app-button variant="primary" @click=${this.acceptAll}>Alle akzeptieren</app-button>
          </div>
        </div>
      </div>
    `;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'cookie-consent-banner': CookieConsentBanner;
	}
}