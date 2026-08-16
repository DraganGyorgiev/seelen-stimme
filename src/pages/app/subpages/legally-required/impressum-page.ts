import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../../../tailwind/tailwindCss.ts'
import '../../../layouts/full-layout.ts'

@localized()
@customElement('impressum-page')
export class ImpressumPage extends LitElement {
	override render() {
		return html`
			<full-layout>
				<section class="mx-auto max-w-3xl px-6 py-24">
					<h1 class="text-4xl font-semibold text-gray-900">${msg('Impressum')}</h1>

					<div class="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('1. Angaben gemäß § 5 ECG')}</h2>
							<p class="mt-2">
								<strong>${msg('Name')}:</strong> Stefana Gyorgiev<br />
								<strong>${msg('Unternehmensbezeichnung')}:</strong>
								${msg('Jenseitsmedium und spirituelle Begleitung')}<br />
								<strong>${msg('Adresse')}:</strong>
								${msg('Obere Hauptstrasse 109, 7537 Neuberg im Burgenland, Österreich')}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('2. Kontakt')}</h2>
							<p class="mt-2">
								<strong>${msg('Telefon')}:</strong>
								<a class="underline" href="tel:+436602562563">+43 660 2562563</a><br />
								<strong>${msg('E-Mail')}:</strong>
								<a class="underline" href="mailto:office.seelenstimme@gmail.com">office.seelenstimme@gmail.com</a>
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('3. Unternehmensgegenstand')}</h2>
							<p class="mt-2">
								${msg('Energetische und spirituell begleitende Leistungen im nicht-heilkundlichen Bereich.')}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('4. Haftung für Inhalte')}</h2>
							<p class="mt-2">
								${msg(
									'Alle Inhalte wurden sorgfältig erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.',
								)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('5. Urheberrecht')}</h2>
							<p class="mt-2">
								${msg(
									'Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf dieser Website unterliegen dem österreichischen Urheberrecht.',
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
		'impressum-page': ImpressumPage;
	}
}
