import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../tailwind/tailwindCss.ts'
import tree from '../../assets/life_tree.webp'

@localized()
@customElement('image-and-quote')
export class ImageAndQuote extends LitElement {
	override render() {
		return html`
			<div class="relative md:h-[750px] lg:h-[1150px]">
				<img
					src=${tree}
					alt=${msg('Lebensbaum im Abendlicht')}
					fetchpriority="high"
					decoding="async"
					class="size-full object-cover"
				/>

				<div
					class="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent"
					aria-hidden="true"
				></div>

				<div
					class="absolute right-2 bottom-2 max-w-2xl [text-shadow:0_2px_10px_rgb(0_0_0/0.65)] md:right-10 md:bottom-10 lg:inset-3 lg:mr-10 lg:mx-auto"
				>
					<figure>
						<blockquote class="mt-6 text-sm font-semibold text-white italic md:text-2xl lg:text-4xl">
							<p>
								${msg(html`„Was man tief in seinem Herzen besitzt,<br />kann man nicht durch den Tod verlieren.“`)}
							</p>
						</blockquote>
						<figcaption class="mt-3 text-sm text-white italic md:text-2xl lg:mt-6 lg:text-4xl">
							<div class="font-semibold">Johann Wolfgang von Goethe</div>
						</figcaption>
					</figure>
				</div>
			</div>
		`
	}

	static override styles = tailwindCss
}

declare global {
	interface HTMLElementTagNameMap {
		'image-and-quote': ImageAndQuote;
	}
}
