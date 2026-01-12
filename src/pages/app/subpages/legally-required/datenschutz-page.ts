import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../../layouts/full-layout';

@customElement('datenschutz-page')
export class DatenschutzPage extends LitElement {
	render() {
		return html`
      <full-layout>
        <section class="mx-auto max-w-3xl px-6 py-24">
          <h1 class="text-4xl font-semibold text-gray-900">
            Datenschutzerklärung
          </h1>

          <div class="mt-10 space-y-8 text-gray-700 text-sm leading-relaxed">

            <section>
              <h2 class="text-lg font-semibold text-gray-900">1. Verantwortliche Stelle</h2>
              <p>
                Stefana Gyorgiev<br />
                Obere Hauptstrasse 109, 7537 Neuberg im Burgenland<br />
	              +436602562563<br />
	              office.seelenstimme@gmail.com
              </p>
            </section>

            <section>
              <h2 class="text-lg font-semibold text-gray-900">2. Verarbeitung personenbezogener Daten</h2>
              <p>
	              Personenbezogene Daten werden nur erhoben, wenn Sie diese freiwillig über das Kontaktformular oder per E-Mail mitteilen.
              </p>
            </section>

            <section>
              <h2 class="text-lg font-semibold text-gray-900">3. Zweck der Datenverarbeitung</h2>
              <p>
                Wenn Sie uns per Formular kontaktieren, werden Ihre Angaben zwecks Bearbeitung der Anfrage gespeichert.
              </p>
            </section>

	          <section>
		          <h2 class="text-lg font-semibold text-gray-900">4. Weitergabe von Daten</h2>
		          <p>
			          Eine Weitergabe an Dritte erfolgt nicht, außer wenn dies gesetzlich vorgeschrieben ist.
		          </p>
	          </section>

	          <section>
		          <h2 class="text-lg font-semibold text-gray-900">5. Cookies</h2>
		          <p>
			          Diese Website verwendet technisch notwendige Cookies. Weitere Cookies werden nur mit Ihrer Zustimmung gesetzt.
		          </p>
	          </section>

            <section>
              <h2 class="text-lg font-semibold text-gray-900">6. Ihre Rechte</h2>
              <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Datenübertragbarkeit.</p>
            </section>

	          <section>
		          <h2 class="text-lg font-semibold text-gray-900">7. Beschwerderecht</h2>
		          <p>
			          Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde zu beschweren:<br>
			          Barichgasse 40–42, 1030 Wien<br>
			          www.dsb.gv.at
		          </p>
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