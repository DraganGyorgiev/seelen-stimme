import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../tailwind/tailwindCss.ts'
import imgMain from '../../assets/about_me_main.webp'

@localized()
@customElement('welcome-section')
export class WelcomeSection extends LitElement {
	override render() {
		return html`
			<section class="overflow-hidden rounded-3xl bg-white pt-10 sm:pt-16 md:pt-0 2xl:pt-16">
				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div class="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
						<div>
							<h1 class="text-3xl leading-tight font-bold text-black sm:text-4xl lg:text-5xl">
								${msg(html`Herzlich willkommen,<br />schön, dass du hier bist.`)}
							</h1>
							<p class="mt-3 max-w-lg text-xl leading-relaxed text-gray-600 md:mt-8">
								${msg(html`Mein Name ist <strong>Stefana Gyorgiev</strong> und ich begleite Menschen auf ihrem
									spirituellen Weg – mit medialer Wahrnehmung, Einfühlungsvermögen und viel Respekt für deine
									persönliche Situation.`)}
							</p>
							<p class="my-4 max-w-lg text-xl leading-relaxed text-gray-600">
								${msg(
									'In einem geschützten und achtsamen Rahmen stelle ich eine Verbindung zur Geistigen Welt her, um Botschaften, Zeichen und liebevolle Impulse deiner Verstorbenen weiterzugeben. Für viele Menschen kann dies Trost, Klarheit und neue Zuversicht in Zeiten der Trauer bringen.',
								)}
							</p>
							<p class="my-4 max-w-lg text-xl leading-relaxed text-gray-600">
								${msg(
									'Darüber hinaus biete ich verschiedene spirituelle Begleitungen an, die dich dabei unterstützen können, dich selbst besser zu verstehen, neue Perspektiven zu gewinnen und deinen eigenen Weg mit mehr Vertrauen zu gehen.',
								)}
							</p>
							<p class="my-4 max-w-lg text-xl leading-relaxed text-gray-600">
								${msg(
									'Jede Sitzung ist so individuell wie der Mensch selbst. Mir ist es wichtig, dir auf Augenhöhe zu begegnen und einen Raum zu schaffen, in dem du dich sicher und angenommen fühlen darfst.',
								)}
							</p>
						</div>

						<img
							class="h-auto w-full rounded-3xl object-cover xl:mx-auto xl:max-w-lg"
							src=${imgMain}
							alt=${msg('Stefana Gyorgiev – Spirituelle Begleiterin')}
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>
			</section>
		`
	}

	static override styles = tailwindCss
}

declare global {
	interface HTMLElementTagNameMap {
		'welcome-section': WelcomeSection;
	}
}
