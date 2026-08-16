import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../tailwind/tailwindCss.ts'
import { getServices } from '../../data/services.ts'
import { navigateFromLinkClick } from '../../router/navigate.ts'

@localized()
@customElement('service-section-main')
export class ServiceSectionMain extends LitElement {
	override render() {
		return html`
			<div class="bg-white py-32">
				<div class="mx-auto max-w-7xl px-6 text-center lg:px-8">
					<div class="mx-auto max-w-2xl">
						<h2 class="text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
							${msg('Meine Leistungen')}
						</h2>
						<p class="mt-6 text-lg/8 text-gray-600">
							${msg('Entdecke meine Angebote für deine spirituelle Entwicklung.')}
						</p>
					</div>

					<ul
						role="list"
						class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
					>
						${getServices().map(
							(service) => html`
								<li>
									<a
										href=${`/services#${service.id}`}
										@click=${(event: MouseEvent) => navigateFromLinkClick(event, `/services#${service.id}`)}
										class="
											group block cursor-pointer rounded-2xl
											transform transition duration-300
											hover:scale-105 hover:drop-shadow-lg
											focus-visible:scale-105 focus-visible:outline-none
											focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4
										"
									>
										<img
											class="mx-auto size-48 rounded-full object-cover transition-shadow duration-300 group-focus-visible:shadow-xl lg:size-44"
											src=${service.image}
											alt=${service.title}
											loading="lazy"
											decoding="async"
										/>
										<h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">${service.title}</h3>
									</a>
								</li>
							`,
						)}
					</ul>
				</div>
			</div>
		`
	}

	static override styles = tailwindCss
}

declare global {
	interface HTMLElementTagNameMap {
		'service-section-main': ServiceSectionMain;
	}
}
