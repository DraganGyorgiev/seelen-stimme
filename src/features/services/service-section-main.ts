import { LitElement, html } from 'lit-element';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import tailwindCss from '../../tailwind/tailwindCss.ts';
import { services, Service } from '../../data/services';

@customElement('service-section-main')
export class ServiceSectionMain extends LitElement {

	private goToService(id: string) {
		Router.go(`/services#${id}`);
	}

	override render() {
		return html`
			<div class="bg-white py-32">
				<div class="mx-auto max-w-7xl px-6 text-center lg:px-8">
					<div class="mx-auto max-w-2xl">
						<h2
							class="text-34l font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl"
						>
							Meine Leistungen
						</h2>
						<p class="mt-6 text-lg/8 text-gray-600">
							Entdecke meine Angebote für deine spirituelle Entwicklung.
						</p>
					</div>

					<ul
						role="list"
						class="
						  mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16
						  sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
					>
						${services.map((service: Service) => html`
							<li
								tabindex="0"
								role="link"
								aria-label=${service.title}
								class="
							    group cursor-pointer
							    transform transition duration-300
							    hover:scale-110 hover:drop-shadow-lg
							    focus-visible:scale-105
							    focus-visible:outline-none
							    focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4
							  "
								@click=${() => this.goToService(service.id)}
								@keydown=${(e: KeyboardEvent) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										this.goToService(service.id);
									}
								}}
							>
								<img
									class="
								    mx-auto size-48 lg:size-44 rounded-full object-cover
								    transition-shadow duration-300
								    group-focus-visible:shadow-xl
								  "
									src=${service.image}
									alt=${service.title}
								/>
								<h3
									class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900"
								>
									${service.title}
								</h3>
							</li>
						`)}
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
