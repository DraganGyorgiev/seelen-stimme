import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../../../tailwind/tailwindCss.ts'
import '../../../layouts/full-layout.ts'

@localized()
@customElement('cookies-page')
export class CookiesPage extends LitElement {
	override render() {
		return html`
			<full-layout>
				<section class="mx-auto max-w-3xl px-6 py-24">
					<h1 class="text-4xl font-semibold text-gray-900">${msg('Cookie-Richtlinie')}</h1>

					<div class="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('1. Diese Website setzt keine Cookies')}</h2>
							<p class="mt-2">
								${msg(
									'Es werden keine Cookies gesetzt – weder für Analyse noch für Marketing oder Tracking. Aus diesem Grund gibt es auch keinen Cookie-Hinweis, dem Sie zustimmen müssten.',
								)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('2. Keine Speicherung auf Ihrem Gerät')}</h2>
							<p class="mt-2">
								${msg(
									'Es werden auch keine sonstigen Daten auf Ihrem Gerät abgelegt. Die gewählte Sprache ergibt sich ausschließlich aus der aufgerufenen Adresse und muss daher nicht gespeichert werden.',
								)}
							</p>
						</section>

						<section>
							<h2 class="text-lg font-semibold text-gray-900">${msg('3. Kontaktformular')}</h2>
							<p class="mt-2">
								${msg(
									'Beim Absenden des Kontaktformulars werden Ihre Angaben an unseren Hosting-Anbieter Netlify übermittelt, der die Nachricht zur Spam-Abwehr prüft und an uns weiterleitet. Details finden Sie in der Datenschutzerklärung.',
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
		'cookies-page': CookiesPage;
	}
}
