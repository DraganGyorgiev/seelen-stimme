import {LitElement, html, css} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";
import CS_BG from "../../assets/coming-soon.jpg"

@customElement('coming-soon-page')
export class ComingSoonPage extends LitElement {
	@property({type: String}) foo = '';

	override render() {
		return html`
			<main class="relative isolate min-h-full">
				<img
					src=${CS_BG}
					alt="" class="absolute inset-0 -z-10 size-full object-cover object-top">
				<div class="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
					<h1 class="text-5xl md:text-7xl text-white font-bold mb-8 z-10">Coming Soon</h1>
					<p class="text-white text-3xl md:text-4xl pt-20">
						Wir arbeiten mit Hochdruck daran, Ihnen etwas Großartiges zu präsentieren. Seien Sie gespannt!
					</p>
				</div>
			</main>
    `;
	}

	static override styles = [tailwindCss, css`
    :host {
      height: 100%;
    }
  `];
}

declare global {
	interface HTMLElementTagNameMap {
		'coming-soon-page': ComingSoonPage;
	}
}