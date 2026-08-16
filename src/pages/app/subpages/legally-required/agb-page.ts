import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../../../tailwind/tailwindCss.ts'
import '../../../layouts/full-layout.ts'

@localized()
@customElement('agb-page')
export class AgbPage extends LitElement {
	override render() {
		return html`
			<full-layout>
				<section class="mx-auto max-w-3xl px-6 py-24">
					<h1 class="text-4xl font-semibold text-gray-900">${msg('Allgemeine Geschäftsbedingungen')}</h1>

					<div class="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('1. Geltungsbereich')}</h2>
							<p class="mt-2">
								${msg(html`Diese Allgemeinen Geschäftsbedingungen gelten für alle Dienstleistungen von
									<strong>Seelenstimme</strong>.`)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('2. Leistungen')}</h2>
							<p class="mt-2">
								${msg(html`<strong>Rechtlicher Hinweis:</strong> Die angebotenen Leistungen dienen ausschließlich der
									spirituellen und persönlichen Weiterentwicklung. Sie stellen keine medizinische, psychologische oder
									therapeutische Beratung oder Behandlung dar und ersetzen nicht den Besuch bei Ärzt:innen,
									Psychotherapeut:innen oder anderen medizinischen Fachpersonen. Es werden keine Diagnosen gestellt und
									keine Heilversprechen abgegeben. Die Inanspruchnahme der Angebote erfolgt in eigener
									Verantwortung.`)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">
								${msg('3. Terminvereinbarung, Terminverschiebungen und Stornierung')}
							</h2>
							<p class="mt-2">
								${msg('Termine gelten nach Buchung (telefonisch, online, schriftlich) als verbindlich vereinbart.')}
							</p>
							<p class="mt-2">
								${msg(html`<strong>Wichtiger Hinweis zur Terminabsage:</strong> Gebuchte Termine sind verbindlich.
									Sollten Sie einen vereinbarten Termin nicht wahrnehmen und nicht mindestens 24 Stunden vorher
									absagen, wird der volle Preis der gebuchten Leistung als Ausfallgebühr in Rechnung gestellt.`)}
							</p>
							<p class="mt-2">${msg('Die Stornierung hat per E-Mail zu erfolgen.')}</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('4. Zahlung')}</h2>
							<p class="mt-2">${msg('Die Bezahlung erfolgt vor der Sitzung per vereinbarter Zahlungsmethode.')}</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('5. Haftungsausschluss')}</h2>
							<p class="mt-2">
								${msg(
									'Es wird keine Garantie für bestimmte Ergebnisse übernommen. Jede Person handelt eigenverantwortlich.',
								)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('6. Datenschutz')}</h2>
							<p class="mt-2">${msg('Es gelten die Bestimmungen der Datenschutzerklärung.')}</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('7. Anzuwendendes Recht')}</h2>
							<p class="mt-2">
								${msg(
									'Es gilt österreichisches Recht. Maßgeblich ist die deutschsprachige Fassung dieser Bedingungen; Übersetzungen dienen ausschließlich der Verständlichkeit.',
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
		'agb-page': AgbPage;
	}
}
