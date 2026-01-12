import {LitElement, html} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";
import imgMain from '../../assets/about_me_main.jpeg'

@customElement('welcome-section')
export class WelcomeSection extends LitElement {
	override render() {
		return html`
			<section class="pt-10 overflow-hidden bg-white md:pt-0 sm:pt-16 2xl:pt-16 rounded-3xl">
				<div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
					<div class="grid items-center grid-cols-1 md:grid-cols-2">
						<div>
							<h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Herzlich willkommen,
								<br>
								schön, dass du hier bist.
							</h2>
							<p class="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">Mein Name ist <strong>Stefana Gyorgiev</strong>
								und ich begleite Menschen auf ihrem spirituellen Weg – mit medialer Wahrnehmung, Einfühlungsvermögen und viel Respekt für deine persönliche Situation.</p>
							<p class="max-w-lg my-4 text-xl leading-relaxed text-gray-600 md:mt-8">
								In einem geschützten und achtsamen Rahmen stelle ich eine Verbindung zur Geistigen Welt her, um Botschaften, Zeichen und liebevolle Impulse deiner Verstorbenen weiterzugeben. 
								Für viele Menschen kann dies Trost, Klarheit und neue Zuversicht in Zeiten der Trauer bringen.
							</p>
							<p class="max-w-lg my-4 text-xl leading-relaxed text-gray-600 md:mt-8">
								Darüber hinaus biete ich verschiedene spirituelle Begleitungen an, die dich dabei unterstützen können, dich selbst besser zu verstehen, neue Perspektiven zu gewinnen und deinen eigenen Weg mit mehr Vertrauen zu gehen.
							</p>
							<p class="max-w-lg my-4 text-xl leading-relaxed text-gray-600 md:mt-8">
								Jede Sitzung ist so individuell wie der Mensch selbst. Mir ist es wichtig, dir auf Augenhöhe zu begegnen und einen Raum zu schaffen, in dem du dich sicher und angenommen fühlen darfst.
							</p>
						</div>

						<img class="size-fit xl:max-w-lg xl:mx-auto 2xl:origin-bottom rounded-3xl object-top" src=${imgMain} alt="Stefana Gyorgiev – Spirituelle Begleiterin"/>
					</div>
				</div>
			</section>
		`;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'welcome-section': WelcomeSection;
	}
}