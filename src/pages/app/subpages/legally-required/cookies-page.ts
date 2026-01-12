import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../../layouts/full-layout';

@customElement('cookies-page')
export class CookiesPage extends LitElement {
	render() {
		return html`
      <full-layout>
        <section class="mx-auto max-w-3xl px-6 py-24">
          <h1 class="text-4xl font-semibold text-gray-900">Cookie-Richtlinie</h1>

          <div class="mt-10 space-y-8 text-gray-700 text-sm leading-relaxed">
            <section>
              <p>Diese Website verwendet Cookies, um grundlegende Funktionen bereitzustellen und die Nutzung zu verbessern.</p>
            </section>

            <section>
              <h2>1. Was sind Cookies?</h2>
              <p>
                Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden.
              </p>
            </section>

            <section>
	            <h2>2. Welche Cookies verwenden wir?</h2>
	            <p>Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind.</p>
            </section>
	          
	          <section>
		          <h2>3. Analyse- und Marketing-Cookies</h2>
		          <p>Es werden keine Analyse- oder Marketing-Cookies eingesetzt.</p>
	          </section>
	          
	          <section>
		          <h2>4. Cookie-Einstellungen</h2>
		          <p>Sie können Cookies in Ihrem Browser jederzeit löschen oder deaktivieren.</p>
	          </section>

          </div>
        </section>
      </full-layout>
    `;
	}

	static styles = css`
    :host { display: block; }
  `;
}
