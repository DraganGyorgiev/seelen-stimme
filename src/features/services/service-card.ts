import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import tailwindCss from '../../tailwind/tailwindCss.ts';
import '../../components/ui/app-button.js';

@customElement('service-card')
export class ServiceCard extends LitElement {
	@property({ type: String }) id!: string;
	@property({ type: String }) title!: string;
	@property({ type: String }) subtitle!: string;
	@property({ type: String }) image!: string;
	@property({ type: String }) description!: string;
	@property({ type: String }) duration?: string;
	@property({ type: String }) price?: string;
	@property({ type: Boolean }) hasGallery = false;
	@property({ type: Boolean }) isFullyBooked = false;

	firstUpdated() {
		this.scrollToHash();
	}

	private scrollToHash() {
		const id = location.hash.replace('#', '');
		if (!id) return;
		requestAnimationFrame(() => {
			const el = this.renderRoot.querySelector(`#${id}`);
			el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	}

	private goToContact() {
		// Prevent navigation if booked
		if (this.isFullyBooked) return;

		this.dispatchEvent(
			new CustomEvent('reroute', {
				detail: `/contact?service=${this.id}`,
				bubbles: true,
				composed: true,
			})
		);
	}

	private goToGallery() {
		this.dispatchEvent(
			new CustomEvent('reroute', {
				detail: `/gallery?type=${this.id}`,
				bubbles: true,
				composed: true,
			})
		);
	}

	private get isIntroService() {
		return this.id === 'kg';
	}

	override render() {
		return html`
			<div id=${this.id} class="pt-20 scroll-mt-28">
				<div class="group mx-auto max-w-7xl rounded-3xl px-8 py-8 shadow-sm transition-all duration-300 
          ${this.isFullyBooked
					? 'bg-gray-50 ring-1 ring-gray-200 opacity-75 grayscale-[0.2]'
					: `${this.isIntroService ? 'bg-teal-50 ring-2 ring-teal-200 hover:shadow-lg' : 'bg-sky-50 hover:shadow-lg'}`
				}">

					<div class="mx-auto max-w-4xl w-full">
						<div class="flex flex-wrap items-center gap-4">
							<h2 class="break-words text-3xl font-semibold text-gray-900 sm:text-4xl md:text-5xl md:text-left text-center">
								${this.title}
							</h2>

							${this.isFullyBooked ? html`
                <span class="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  Zurzeit ausgebucht
                </span>
              ` : null}
						</div>

						<p class="mt-4 md:text-lg sm:text-m text-gray-600">${this.subtitle}</p>
					</div>

					<div class="mx-auto max-w-4xl w-full">
						<article class="relative isolate mt-16 flex flex-col gap-8 lg:flex-row lg:items-stretch lg:min-h-[18rem]">
							<div class="relative aspect-video lg:aspect-square lg:w-64 lg:shrink-0 lg:self-stretch">
								<img
									src=${this.image}
									alt=${this.title}
									class="
                    absolute inset-0 h-full w-full rounded-2xl object-cover
                    transition-transform duration-300
                    ${this.isFullyBooked ? '' : 'group-hover:scale-[1.03]'}"
								/>
								<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
							</div>

							<div class="flex flex-1 flex-col max-w-4xl">
								<p class="mt-5 text-sm text-gray-600">${this.description}</p>

								<div class="flex-1"></div>

								${(this.duration || this.price)
									? html`
										<div class="mt-10 border-t border-gray-200 pt-6 md:flex sm:flex-row items-end justify-between gap-6">
											<div class="space-y-1 text-sm text-gray-700 md:block flex justify-between md:pb-0 pb-4">
												${this.duration ? html`<p><span class="font-semibold text-gray-900">Dauer: </span>${this.duration}</p>` : null}
												${this.price ? html`<p><span class="font-semibold text-gray-900">Preis: </span>${this.price}</p>` : null}
											</div>

											<div class="flex gap-3 shrink-0 justify-center">
												${this.hasGallery ? html`<app-button variant="secondary" @click=${this.goToGallery}>Galerie</app-button>` : null}

												${this.isFullyBooked
													? html`
                              <button disabled class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 cursor-not-allowed">
                                Zurzeit ausgebucht
                              </button>`
													: html`
                              <app-button variant=${this.isIntroService ? 'secondary' : 'primary'} @click=${this.goToContact}>
                                ${this.isIntroService ? 'Kostenloses Gespräch buchen' : 'Termin anfragen'}
                              </app-button>`
												}
											</div>
										</div>
									`
									: null}
							</div>
						</article>
					</div>
				</div>
			</div>
		`;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'service-card': ServiceCard;
	}
}