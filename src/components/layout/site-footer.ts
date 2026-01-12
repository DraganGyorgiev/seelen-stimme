import {LitElement, html} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";
import '../links/app-link.ts'
import '../ui/footer-social-link.ts'

@customElement('site-footer')
export class SiteFooter extends LitElement {
  
  override render() {
    return html`
	    <footer class="bg-white border-t border-gray-900/10 hover:bg-gray-50/40 transition-colors duration-300">
		    <div class="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
			    <nav class="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6" aria-label="Footer">
				    <app-link to="/impressum">Impressum</app-link>
				    <app-link to="/agb">AGB</app-link>
				    <app-link to="/datenschutz">Datenschutz</app-link>
				    <app-link to="/cookies">Cookies</app-link>
<!--				    <app-link to="/faq">FAQs</app-link>-->
				    <app-link to="/contact">Kontakt</app-link>
			    </nav>
			    <div class="mt-16 flex justify-center gap-x-10">
				    <footer-social-link 
					    href="https://www.facebook.com/profile.php?id=61571720355115"
				      external
				    >
					    <span class="sr-only">Facebook</span>
					    <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
					    </svg>
				    </footer-social-link>
			    </div>
			    <p class="mt-10 text-center text-sm/6 text-gray-600">&copy; ${new Date().getFullYear()} Seelenstimme. All rights reserved.</p>
		    </div>
	    </footer>
    `;
  }

  static override styles = tailwindCss;
}

declare global {
  interface HTMLElementTagNameMap {
    'site-footer': SiteFooter;
  }
}