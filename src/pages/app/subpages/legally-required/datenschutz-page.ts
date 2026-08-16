import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../../../tailwind/tailwindCss.ts'
import '../../../layouts/full-layout.ts'

@localized()
@customElement('datenschutz-page')
export class DatenschutzPage extends LitElement {
	override render() {
		return html`
			<full-layout>
				<section class="mx-auto max-w-3xl px-6 py-24">
					<h1 class="text-4xl font-semibold text-gray-900">${msg('Datenschutzerklärung')}</h1>

					<div class="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('1. Verantwortliche Stelle')}</h2>
							<p class="mt-2">
								Stefana Gyorgiev<br />
								${msg('Obere Hauptstrasse 109, 7537 Neuberg im Burgenland')}<br />
								+43 660 2562563<br />
								office.seelenstimme@gmail.com
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('2. Verarbeitung personenbezogener Daten')}</h2>
							<p class="mt-2">
								${msg(
									'Personenbezogene Daten werden nur erhoben, wenn Sie diese freiwillig über das Kontaktformular oder per E-Mail mitteilen.',
								)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('3. Zweck und Rechtsgrundlage')}</h2>
							<p class="mt-2">
								${msg(
									'Wenn Sie uns per Formular kontaktieren, werden Ihre Angaben zwecks Bearbeitung der Anfrage gespeichert. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie die Anbahnung eines Vertragsverhältnisses (Art. 6 Abs. 1 lit. b DSGVO). Sie können Ihre Einwilligung jederzeit per E-Mail widerrufen.',
								)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('4. Hosting und Kontaktformular')}</h2>
							<p class="mt-2">
								${msg(
									'Diese Website wird von Netlify (Netlify, Inc., 512 2nd Street, San Francisco, CA 94107, USA) gehostet. Beim Aufruf der Website werden dabei technisch notwendige Server-Logdaten einschließlich Ihrer IP-Adresse verarbeitet. Auch die über das Kontaktformular gesendeten Angaben werden von Netlify entgegengenommen, gespeichert und per E-Mail an uns weitergeleitet. Zur Abwehr von Spam wird die Nachricht dabei automatisiert geprüft. Eine Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln. Alternativ können Sie uns jederzeit direkt per E-Mail oder telefonisch erreichen.',
								)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('5. Weitergabe von Daten')}</h2>
							<p class="mt-2">
								${msg('Eine weitere Weitergabe an Dritte erfolgt nicht, außer wenn dies gesetzlich vorgeschrieben ist.')}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('6. Cookies und lokale Speicherung')}</h2>
							<p class="mt-2">
								${msg(
									'Diese Website setzt keine Cookies und legt keine Daten im Speicher Ihres Browsers ab. Details finden Sie in der Cookie-Richtlinie.',
								)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('7. Ihre Rechte')}</h2>
							<p class="mt-2">
								${msg(
									'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch sowie Datenübertragbarkeit.',
								)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('8. Beschwerderecht')}</h2>
							<p class="mt-2">
								${msg('Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde zu beschweren:')}<br />
								Barichgasse 40–42, 1030 Wien<br />
								<a class="underline" href="https://www.dsb.gv.at" target="_blank" rel="noopener">www.dsb.gv.at</a>
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('9. Maßgebliche Fassung')}</h2>
							<p class="mt-2">
								${msg(
									'Maßgeblich ist die deutschsprachige Fassung dieser Datenschutzerklärung; Übersetzungen dienen ausschließlich der Verständlichkeit.',
								)}
							</p>
						</section>
					</div>
				</section>
			</full-layout>
		`
	}

	static override styles = [
		tailwindCss,
		css`
			:host {
				display: block;
			}
		`,
	]
}

declare global {
	interface HTMLElementTagNameMap {
		'datenschutz-page': DatenschutzPage;
	}
}
