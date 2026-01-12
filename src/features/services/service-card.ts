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

	private goToContact() {
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
				<div class="
					group mx-auto max-w-7xl rounded-3xl px-8 py-8 shadow-sm transition-all duration-300 hover:shadow-lg
					${this.isIntroService ? 'bg-teal-50 ring-2 ring-teal-200' : 'bg-sky-50'}
">
					<!-- Header stays wide -->
					<div class="mx-auto max-w-4xl w-full">
						<h2 class="text-4xl font-semibold text-gray-900 sm:text-5xl">
							${this.title}
						</h2>
						<p class="mt-2 text-lg text-gray-600">
							${this.subtitle}
						</p>
					</div>

					<!-- Content constrained + aligned -->
					<div class="mx-auto max-w-4xl w-full">
						<article
							class="relative isolate mt-16 flex flex-col gap-8
						       lg:flex-row lg:items-stretch lg:min-h-[18rem]"
						>
							<!-- Media -->
							<div
								class="relative aspect-video lg:aspect-square
							       lg:w-64 lg:shrink-0 lg:self-stretch"
							>
								<img
									src=${this.image}
									alt=${this.title}
									class="
								    absolute inset-0 h-full w-full rounded-2xl object-cover
								    transition-transform duration-300
								    group-hover:scale-[1.03]
								  "
								/>
								<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
							</div>

							<!-- Content -->
							<div class="flex flex-1 flex-col max-w-2xl">
								<!-- Body -->
								<p class="mt-5 text-sm text-gray-600">
									${this.description}
								</p>

								<!-- Spacer -->
								<div class="flex-1"></div>

								<!-- Meta + Actions -->
								${(this.duration || this.price)
									? html`
										<div
											class="mt-10 border-t border-gray-200 pt-6
										       flex items-end justify-between gap-6"
										>
											<!-- Meta -->
											<div class="space-y-1 text-sm text-gray-700">
												${this.duration
													? html`
														<p>
															<span class="font-semibold text-gray-900">Dauer:</span>
															${this.duration}
														</p>
													`
													: null}
												${this.price
													? html`
														<p>
															<span class="font-semibold text-gray-900">Preis:</span>
															${this.price}
														</p>
													`
													: null}
											</div>

											<!-- Actions -->
											<div class="flex gap-3 shrink-0">
												${this.hasGallery ? html`<app-button variant="secondary" @click=${this.goToGallery}>Galerie</app-button>` : null}

												<app-button variant=${this.isIntroService ? 'secondary' : 'primary'} @click=${this.goToContact}>
													${this.isIntroService ? 'Kostenloses Gespräch buchen' : 'Termin anfragen'}
												</app-button>
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