import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../../tailwind/tailwindCss.ts'
import image from '../../../assets/about_me_photo.webp'

@localized()
@customElement('about-page')
export class AboutPage extends LitElement {
	override render() {
		return html`
			<div class="relative isolate overflow-hidden bg-linear-to-b from-indigo-100/20">
				<div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
					<div
						class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8"
					>
						<h1
							class="max-w-2xl text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto"
						>
							${msg('Das bin ich')}
						</h1>
						<div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
							<div class="flex flex-col gap-10 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
								<p>
									${msg(
										'Mein Name ist Stefana Gyorgiev. Ich wurde 1989 in Serbien geboren und lebe seit meinem zweiten Lebensjahr mit meiner Familie in Österreich. Ich habe einen Sohn und lebe in einem Haus auf dem Land.',
									)}
								</p>
								<p>
									${msg(
										'Schon seit meiner Kindheit habe ich vieles hinterfragt und wollte die Dinge tiefer verstehen – besonders die Frage nach dem Leben nach dem Tod. Für mich war früh spürbar, dass mit dem Tod nicht einfach alles endet und wir auf einer anderen Ebene weiterbestehen.',
									)}
								</p>
								<p>
									${msg(
										'Da ich von klein auf offen für die Geistige Welt war, zeigten sich bei mir im Laufe der Zeit Wahrträume, Vorahnungen und innere Bilder, die immer deutlicher wurden. Ich erhielt viele klare Zeichen und Impulse, die ich nicht mehr als Zufall abtun konnte. Diese Erfahrungen haben mich schließlich dazu geführt, meine mediale Wahrnehmung bewusst zu entwickeln.',
									)}
								</p>
								<p>
									${msg(
										'Ich ließ mich medial ausbilden, besuchte zahlreiche Kurse und vertiefte meine Fähigkeiten in enger Verbindung mit der Geistigen Welt. Dieser Weg war für mich nicht nur eine Ausbildung, sondern ein innerer Entwicklungsprozess, der mich bis heute begleitet.',
									)}
								</p>
								<p>
									${msg(
										'Heute folge ich diesem Ruf mit großer Hingabe und Dankbarkeit. Es ist mir eine Herzensangelegenheit, Menschen, die einen geliebten Menschen verloren haben, Trost zu schenken und ihnen die Möglichkeit zu geben, wieder in Kontakt zu treten. Besonders wichtig ist mir dabei, Unausgesprochenes, offene Fragen und innere Unruhe in liebevoller Weise aufzulösen.',
									)}
								</p>
								<p>
									${msg(
										'Den Hinterbliebenen zu zeigen, dass ihre Liebsten weiterhin auf seelischer Ebene bei ihnen sind und sie begleiten, empfinde ich als eine sehr erfüllende und sinnstiftende Aufgabe.',
									)}
								</p>
							</div>
						</div>
						<img
							src=${image}
							alt=${msg('Stefana Gyorgiev – Spirituelle Begleiterin')}
							loading="lazy"
							decoding="async"
							class="mt-10 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2"
						/>
					</div>
				</div>
				<div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32"></div>
			</div>
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
		'about-page': AboutPage;
	}
}
