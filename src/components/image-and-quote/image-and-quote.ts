import {LitElement, html} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";
import tree from "../../assets/life_tree.jpg"

@customElement('image-and-quote')
export class ImageAndQuote extends LitElement {
	override render() {
		return html`
			<div class="relative lg:h-[1150px] md:h-[750px]">
				<img src=${tree} alt="absolute App screenshot" class="size-full object-cover">
				<div class="absolute lg:inset-3 md:bottom-10 md:right-10 bottom-2 right-2 lg:mx-auto md:mx-auto lg:mr-10 max-w-2xl hover:animate-fadeInRight">
					<figure class="hover:animate-fadeInRight">
						<blockquote class="mt-6 lg:text-4xl md:text-2xl text-sm font-semibold text-white italic hover:animate-fadeInRight">
							<p>„Was man tief in seinem Herzen besitzt,
								<br>
								kann man nicht durch den Tod verlieren.“
							</p>
						</blockquote>
						<figcaption class="lg:mt-6 mt-3 lg:text-4xl md:text-2xl text-sm text-white italic">
							<div class="font-semibold">Johann Wolfgang von Goethe</div>
						</figcaption>
					</figure>
				</div>
			</div>
    `;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'image-and-quote': ImageAndQuote;
	}
}