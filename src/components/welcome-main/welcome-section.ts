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
							<h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Herzlich willkommen
								<br>
								auf meiner Seite !
							</h2>
							<p class="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">Mein Name ist Stefana Gyorgiev und bin ein Jenseitsmedium.</p>
							<p class="max-w-lg my-4 text-xl leading-relaxed text-gray-600 md:mt-8">
								Ich stelle Verbindung zu deinen Lieben aus der Geistigen Welt her. 
								Es ist immer sehr tröstend und berührend, den Hinterbliebenen ihre Lieben näher bringen zu können und sie in der Trauer zu unterstützen. 
								Botschaften, unausgesprochenes sowie die Erkenntnis das deine Liebsten nicht fort sind liegen mir sehr am Herzen, denn das trägt besonders zur Trauerbewältigung bei. 
								Ein Jenseitskontakt kann sehr heilsam und unterstützend sein.
							</p>
						</div>

						<img class="size-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom rounded-3xl object-cover" src=${imgMain} alt=""/>
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