import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../../layouts/full-layout';

@customElement('impressum-page')
export class ImpressumPage extends LitElement {
	render() {
		return html`
      <full-layout>
        <section class="mx-auto max-w-3xl px-6 py-24">
          <h1 class="text-4xl font-semibold text-gray-900">Impressum</h1>
          <div class="mt-10 space-y-6 text-gray-700 text-sm leading-relaxed">
            <h2 class="font-medium text-gray-900">1. Angaben gemäß § 5 ECG</h2>
	          
            <p>
	            <strong>Name:</strong> Stefana Gyorgiev<br>
	            <strong>Unternehmensbezeichnung:</strong> Jenseitsmedium und spirituelle Begleitung<br>
	            <strong>Adresse:</strong> Obere Hauptstrasse 109, 7537 Neuberg im Burgenland, Österreich<br>
            </p>
						
	          <h2>2. Kontakt</h2>
            <p>
	            <strong>Telefon:</strong> +43 0660/2562563<br>
	            <strong>E-Mail:</strong> office.seelenstimme@gmail.com
            </p>
	          
	          <h2>3. Unternehmensgegenstand</h2>
            <p>
              Energetische und spirituelle Begleitende Leistungen im nicht-heilkundlichen Bereich.
            </p>
	          
	          <h2>4. Haftung für Inhalte</h2>
	          <p>
		          Alle Inhalte wurden sorgfältig erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.
            </p>

	          <h2>5. Urheberrecht</h2>
	          <p>
		          Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf dieser Website unterliegen dem österreichischen Urheberrecht.
	          </p>

          </div>
        </section>
      </full-layout>
    `;
	}

	static styles = css`
    :host { display: block; }
  `;
}