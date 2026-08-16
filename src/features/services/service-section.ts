import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized } from '@lit/localize'
import tailwindCss from '../../tailwind/tailwindCss.ts'
import { getServices } from '../../data/services.ts'
import './service-card.ts'

@localized()
@customElement('service-section')
export class ServiceSection extends LitElement {
	private readonly onHashChange = () => this.scrollToHashedService()

	override connectedCallback() {
		super.connectedCallback()
		window.addEventListener('hashchange', this.onHashChange)
	}

	override disconnectedCallback() {
		window.removeEventListener('hashchange', this.onHashChange)
		super.disconnectedCallback()
	}

	override firstUpdated() {
		this.scrollToHashedService()
	}

	override render() {
		return html`
			<div class="space-y-20 py-20">
				${getServices().map(
					(service) => html`
						<section id=${service.id} class="scroll-mt-40 xl:scroll-mt-52">
							<service-card
								.serviceId=${service.id}
								.serviceTitle=${service.title}
								.subtitle=${service.subtitle}
								.description=${service.description}
								.image=${service.image}
								.duration=${service.duration}
								.price=${service.price}
								.hasGallery=${service.hasGallery ?? false}
								.isFullyBooked=${service.isFullyBooked ?? false}
							></service-card>
						</section>
					`,
				)}
			</div>
		`
	}

	private scrollToHashedService() {
		const serviceId = decodeURIComponent(location.hash.slice(1))
		if(!serviceId) return

		const section = this.renderRoot.querySelector(`section[id="${CSS.escape(serviceId)}"]`)
		requestAnimationFrame(() => section?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
	}

	static override styles = tailwindCss
}

declare global {
	interface HTMLElementTagNameMap {
		'service-section': ServiceSection;
	}
}
