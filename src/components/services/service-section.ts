import {LitElement, html} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";
import JK from '../../assets/Jenseits.jpg'
import AR from '../../assets/Aura-reading.jpg'
import SW from '../../assets/Seelenweg.jpg'
import SB from '../../assets/Seelenbild.png'
import KB from '../../assets/Krafttierbild.jpeg'
import GP from '../../assets/Geistführer-Portrait.jpg'

@customElement('service-section')
export class ServiceSection extends LitElement {
	@property({type: String}) header?: string;
	@property({type: String}) content?: string;

	override render() {
		return html`
			<div class="pt-20">
				<div class="mx-auto max-w-7xl px-8 py-8 shadow-sm rounded-3xl bg-sky-50">
					<div class="mx-auto max-w-2xl lg:max-w-4xl">
						<h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Jenseitskontakt</h2>
						<p class="mt-2 text-lg/8 text-gray-600">Nehmen Sie Kontakt mit Ihren Lieben im Jenseits auf.</p>
						<div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
							<article class="relative isolate flex flex-col gap-8 lg:flex-row">
								<div class="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
									<img src=${JK} alt="Jenseitskontakt" class="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover">
									<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
								</div>
								<div>
									<div class="group relative max-w-xl">
										<h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
											Vertraue der geistigen Welt
										</h3>
										<p class="mt-5 text-sm/6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.</p>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>

			<div class="pt-20">
				<div class="mx-auto max-w-7xl px-8 py-8 shadow-sm rounded-3xl bg-sky-50">
					<div class="mx-auto max-w-2xl lg:max-w-4xl">
						<h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Aura-reading</h2>
						<p class="mt-2 text-lg/8 text-gray-600">Sich und seine Mitmenschen tiefer verstehen</p>
						<div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
							<article class="relative isolate flex flex-col gap-8 lg:flex-row">
								<div class="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
									<img src=${AR} alt="Jenseitskontakt" class="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover">
									<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
								</div>
								<div>
									<div class="group relative max-w-xl">
										<h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
											Vertraue der geistigen Welt
										</h3>
										<p class="mt-5 text-sm/6 text-gray-600">
											Aura-Reading ist ein Konzept, das auf der Annahme basiert, dass jeder Mensch von einem energiegeladenen Feld umgeben ist, 
											das als Aura bekannt ist. Diese Aura wird durch Farben und Formen dargestellt, die angeblich Informationen über die Persönlichkeit, 
											den emotionalen Zustand und das spirituelle Wesen einer Person vermitteln.</p>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>

			<div class="pt-20">
				<div class="mx-auto max-w-7xl px-8 py-8 shadow-sm rounded-3xl bg-sky-50">
					<div class="mx-auto max-w-2xl lg:max-w-4xl">
						<h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Seelenweg</h2>
						<p class="mt-2 text-lg/8 text-gray-600">Lausche dem Klang deiner Seele und tauche in deine Seelenfrequenz ein.</p>
						<div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
							<article class="relative isolate flex flex-col gap-8 lg:flex-row">
								<div class="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
									<img src=${SW} alt="Jenseitskontakt" class="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover">
									<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
								</div>
								<div>
									<div class="group relative max-w-xl">
										<h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
											In Meiner Seelenwegarbeit erwartet dich:
										</h3>
										<p class="mt-5 text-sm/6 text-gray-600">
											Antworten auf Was möchte meine Seele lernen? Was sind meine Aufgaben? Was ist aktuell wichtig für mich und mein Leben. Worauf soll ich in Zukunft achten? 
											Ich beleuchte jeden Aspekt in deinem Leben und gehe tiefgründig auf unterschiedliche Themen ein und biete dir gemeinsam mit der Geistigen Welt konstruktive Lösungsvorschläge an. 
											Neue Erkenntnisse erwarten dich. Gerne gehe ich auf zusätzliche Fragen im Vorfeld aber auch direkt in der Sitzung ein.
										</p>
										<h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
											Wie läuft die Arbeit ab?
										</h3>
										<p class="mt-5 text-sm/6 text-gray-600">
											Nach der erfolgreichen Buchung kannst du mir gerne deine Fragen zukommen lassen oder diese erst in unserer Sitzung stellen. 
											Ich verbinde mich einige Tage davor, mit der Geistigen Welt und Protokoliere alle wichtigen Informationen, in schriftlicher Form. 
											Dabei ist es unterschiedlich wie viele Seiten daraus entstehen. Gerne erkläre ich dir bei Interesse den gesamten Ablauf in einem Vorgespräch oder per E-Mail.
										</p>
										<p class="mt-5 text-sm/6 text-gray-600">
											Am Ende erhältst du eine vollständige Zoom Aufnahme unserer Sitzung und zusätzlich den gesamten schriftlichen Bericht dazu. Gerne kann auch ein Seelenbild inklusive einer Seelenweg-sitzung dazu gebucht werden. Ich freue mich mit Dir gemeinsam deinen Weg zu beleuchten.
										</p>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>

			<div class="pt-20">
				<div class="mx-auto max-w-7xl px-8 py-8 shadow-sm rounded-3xl bg-sky-50">
					<div class="mx-auto max-w-2xl lg:max-w-4xl">
						<h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Seelenbilder</h2>
						<p class="mt-2 text-lg/8 text-gray-600">Nehmen Sie Kontakt mit Ihren Lieben im Jenseits auf.</p>
						<div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
							<article class="relative isolate flex flex-col gap-8 lg:flex-row">
								<div class="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
									<img src=${SB} alt="Jenseitskontakt" class="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover">
									<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
								</div>
								<div>
									<div class="group relative max-w-xl">
										<h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
											Vertraue der geistigen Welt
										</h3>
										<p class="mt-5 text-sm/6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.</p>
									</div>
									<div class="mt-6 flex pt-6">
										<button class="rounded-md bg-teal-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-teal-700 focus:shadow-none active:bg-teal-700 hover:bg-teal-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer" @click=${() => this.dispatchEvent(new CustomEvent('reroute', {detail: '/gallery?type=seelenbilder', bubbles: true, composed: true}))}>
											Gallery
										</button>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>

			<div class="pt-20">
				<div class="mx-auto max-w-7xl px-8 py-8 shadow-sm rounded-3xl bg-sky-50">
					<div class="mx-auto max-w-2xl lg:max-w-4xl">
						<h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Krafttierbilder</h2>
						<p class="mt-2 text-lg/8 text-gray-600">Nehmen Sie Kontakt mit Ihren Lieben im Jenseits auf.</p>
						<div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
							<article class="relative isolate flex flex-col gap-8 lg:flex-row">
								<div class="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
									<img src=${KB} alt="Jenseitskontakt" class="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover">
									<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
								</div>
								<div>
									<div class="group relative max-w-xl">
										<h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
											Vertraue der geistigen Welt
										</h3>
										<p class="mt-5 text-sm/6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.</p>
									</div>
									<div class="mt-6 flex pt-6">
										<button class="rounded-md bg-teal-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-teal-700 focus:shadow-none active:bg-teal-700 hover:bg-teal-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer" @click=${() => this.dispatchEvent(new CustomEvent('reroute', {detail: '/gallery?type=krafttierbilder', bubbles: true, composed: true}))}>
											Gallery
										</button>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>

			<div class="pt-20 pb-20">
				<div class="mx-auto max-w-7xl px-8 py-8 shadow-sm rounded-3xl bg-sky-50">
					<div class="mx-auto max-w-2xl lg:max-w-4xl">
						<h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Geistführer-Portraits</h2>
						<p class="mt-2 text-lg/8 text-gray-600">Nehmen Sie Kontakt mit Ihren Lieben im Jenseits auf.</p>
						<div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
							<article class="relative isolate flex flex-col gap-8 lg:flex-row">
								<div class="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
									<img src=${GP} alt="Jenseitskontakt" class="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover">
									<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
								</div>
								<div>
									<div class="group relative max-w-xl">
										<h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
											Vertraue der geistigen Welt
										</h3>
										<p class="mt-5 text-sm/6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.</p>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'service-section': ServiceSection;
	}
}