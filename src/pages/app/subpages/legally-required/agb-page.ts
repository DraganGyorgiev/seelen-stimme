import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../../layouts/full-layout';

@customElement('agb-page')
export class AgbPage extends LitElement {
	render() {
		return html`
      <full-layout>
        <section class="mx-auto max-w-3xl px-6 py-24">
          <h1 class="text-4xl font-semibold text-gray-900">Allgemeine Geschäftsbedingungen</h1>

          <div class="mt-10 space-y-8 text-gray-700 text-sm leading-relaxed">

            <section>
              <h2>
                1. Geltungsbereich
              </h2>
              <p>
	              Diese Allgemeinen Geschäftsbedingungen gelten für alle Dienstleistungen von <strong>Seelen-Stimme</strong>.
              </p>
            </section>

            <section>
              <h2>
                2. Leistungen
              </h2>
              <p>
	              <strong>Rechtlicher Hinweis:</strong>
	              Die angebotenen Leistungen dienen ausschließlich der spirituellen und persönlichen Weiterentwicklung. 
	              Sie stellen keine medizinische, psychologische oder therapeutische Beratung oder Behandlung dar und ersetzen nicht den Besuch bei Ärzt:innen, Psychotherapeut:innen oder anderen medizinischen Fachpersonen. 
	              Es werden keine Diagnosen gestellt und keine Heilversprechen abgegeben. Die Inanspruchnahme der Angebote erfolgt in eigener Verantwortung.
              </p>
            </section>

            <section>
              <h2>
                3. Terminvereinbarung, Terminverschiebungen & Stornierung
              </h2>
	            <p>
		            Termine gelten nach Buchung (telefonisch, online, schriftlich) als verbindlich vereinbart.
	            </p>
	            <p>
		            Sollte ein Termin nicht wahrgenommen werden können, muss dieser mindestens 48 Stunden vor dem vereinbarten Termin abgesagt werden. Die Stornierung hat per E-Mail zu erfolgen.
	            </p>
	            <p>
		            Bei Nichteinhalten dieser Frist oder bei Nichterscheinen zum Termin wird eine Ausfallgebühr in Höhe von 100% des vereinbarten Honorars fällig. 
		            Dem Kunden steht es frei, nachzuweisen, dass kein oder ein geringerer Schaden entstanden ist.
	            </p>
            </section>
	          
	          <section>
		          <h2>4. Zahlung</h2>
		          <p>Die Bezahlung erfolgt vor der Sitzung per vereinbarter Zahlungsmethode.</p>
	          </section>

            <section>
              <h2>5. Haftungsausschluss</h2>
              <p>Es wird keine Garantie für bestimmte Ergebnisse übernommen. Jede Person handelt eigenverantwortlich.</p>
            </section>
	          
	          <section>
		          <h2>6. Datenschutz</h2>
		          <p>Es gelten die Bestimmungen der Datenschutzerklärung.</p>
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
