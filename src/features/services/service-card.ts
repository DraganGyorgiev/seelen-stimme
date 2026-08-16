import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import { navigateTo } from '../../router/navigate.ts'
import tailwindCss from '../../tailwind/tailwindCss.ts'
import '../../components/ui/app-button.ts'

@localized()
@customElement('service-card')
export class ServiceCard extends LitElement {
	@property({ type: String }) serviceId = ''
	@property({ type: String }) serviceTitle = ''
	@property({ type: String }) subtitle = ''
	@property({ type: String }) image = ''
	@property({ type: String }) description = ''
	@property({ type: String }) duration?: string
	@property({ type: String }) price?: string
	@property({ type: Boolean }) hasGallery = false
	@property({ type: Boolean }) isFullyBooked = false

	override render() {
		const surfaceClasses = this.isFullyBooked
			? 'bg-gray-50 ring-1 ring-gray-200 opacity-75'
			: 'bg-sky-50 hover:shadow-lg'

		return html`
			<div class="group mx-auto max-w-7xl rounded-3xl px-6 py-8 shadow-sm transition-all duration-300 sm:px-8 ${surfaceClasses}">
				<div class="mx-auto w-full max-w-4xl">
					<div class="flex flex-wrap items-center gap-4">
						<h2 class="hyphens-auto text-3xl font-semibold text-gray-900 sm:text-4xl md:text-5xl">${this.serviceTitle}</h2>

						${this.isFullyBooked
							? html`<span class="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
									${msg('Zurzeit ausgebucht')}
								</span>`
							: nothing}
					</div>

					<p class="mt-4 text-base text-gray-600 md:text-lg">${this.subtitle}</p>
				</div>

				<div class="mx-auto w-full max-w-4xl">
					<article class="relative isolate mt-16 flex flex-col gap-8 lg:min-h-[18rem] lg:flex-row lg:items-stretch">
						<div class="relative aspect-video lg:aspect-square lg:w-64 lg:shrink-0 lg:self-stretch">
							<img
								src=${this.image}
								alt=${this.serviceTitle}
								loading="lazy"
								decoding="async"
								class="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-300 ${this
									.isFullyBooked
									? ''
									: 'group-hover:scale-[1.03]'}"
							/>
							<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
						</div>

						<div class="flex max-w-4xl flex-1 flex-col">
							<p class="mt-5 text-sm text-gray-600">${this.description}</p>

							<div class="flex-1"></div>

							<div class="mt-10 flex flex-col gap-6 border-t border-gray-200 pt-6 sm:flex-row sm:items-end sm:justify-between">
								<div class="flex justify-between gap-6 space-y-1 text-sm text-gray-700 sm:block">
									${this.duration
										? html`<p><span class="font-semibold text-gray-900">${msg('Dauer')}: </span>${this.duration}</p>`
										: nothing}
									${this.price
										? html`<p><span class="font-semibold text-gray-900">${msg('Preis')}: </span>${this.price}</p>`
										: nothing}
								</div>

								<div class="flex shrink-0 justify-center gap-3">
									${this.hasGallery
										? html`<app-button variant="secondary" @click=${this.goToGallery}>${msg('Galerie')}</app-button>`
										: nothing}

									${this.isFullyBooked
										? html`<app-button variant="secondary" disabled>${msg('Zurzeit ausgebucht')}</app-button>`
										: html`<app-button variant="primary" @click=${this.goToContact}>
												${msg('Termin anfragen')}
											</app-button>`}
								</div>
							</div>
						</div>
					</article>
				</div>
			</div>
		`
	}

	private goToContact() {
		navigateTo(`/contact?service=${this.serviceId}`)
	}

	private goToGallery() {
		navigateTo('/gallery')
	}

	static override styles = tailwindCss
}

declare global {
	interface HTMLElementTagNameMap {
		'service-card': ServiceCard;
	}
}
