import { LitElement, html } from 'lit-element';
import { customElement } from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";
import JK from '../../assets/Jenseits.jpg'
import AR from '../../assets/Aura-reading.jpg'
import SW from '../../assets/Seelenweg.jpg'
import OZ from '../../assets/Online-Zirkel.jpg'
import EC from '../../assets/Einzelcoaching.jpeg'

@customElement('service-section-main')
export class ServiceSectionMain extends LitElement {

	override render() {
		return html`
			<div class="bg-white py-32">
				<div class="mx-auto max-w-7xl px-6 text-center lg:px-8">
					<div class="mx-auto max-w-2xl">
						<h2 class="text-34l font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Meine Leistungen</h2>
						<p class="mt-6 text-lg/8 text-gray-600">We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.</p>
					</div>
					<ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						<li class="transform transition duration-500 hover:scale-110">
							<img class="mx-auto size-56 rounded-full" src=${JK} alt="">
							<h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">Jenseitskontakt</h3>
						</li>

						<li class="transform transition duration-500 hover:scale-110">
							<img class="mx-auto size-56 rounded-full" src=${AR} alt="">
							<h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">Aura-Reading</h3>
						</li>

						<li class="transform transition duration-500 hover:scale-110">
							<img class="mx-auto size-56 rounded-full" src=${SW} alt="">
							<h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">Seelenweg</h3>
						</li>

						<li class="transform transition duration-500 hover:scale-110">
							<img class="mx-auto size-56 rounded-full" src=${OZ} alt="">
							<h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">Online Zirkel</h3>
						</li>

						<li class="transform transition duration-500 hover:scale-110">
							<img class="mx-auto size-56 rounded-full" src=${EC} alt="">
							<h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">Einzelcoaching</h3>
						</li>
						<!-- More people... -->
					</ul>
				</div>
			</div>
		`;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'service-section-main': ServiceSectionMain;
	}
}