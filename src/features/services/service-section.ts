import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import tailwindCss from '../../tailwind/tailwindCss.ts';
import { services } from '../../data/services.ts';
import { Router } from '@vaadin/router';
import './service-card.ts';

@customElement('service-section')
export class ServiceSection extends LitElement {
	private hasScrolled = false;

	override async updated() {
		if (this.hasScrolled) return;

		const hash = window.location.hash.replace('#', '');
		if (!hash) return;

		await Promise.all(
			Array.from(this.renderRoot.querySelectorAll('img'))
			.filter(img => !img.complete)
			.map(img => new Promise(res => img.onload = img.onerror = res))
		);

		const target = this.renderRoot.querySelector<HTMLElement>(
			`#${CSS.escape(hash)}`
		);

		if (!target) return;

		target.scrollIntoView({ behavior: 'smooth', block: 'start' });

		this.hasScrolled = true;

		history.replaceState(null, '', window.location.pathname);
	}

	override render() {
		return html`
			<div
				@reroute=${(e: CustomEvent<string>) => {
					console.log(e.detail)
					e.stopPropagation();
					Router.go(e.detail);
				}}
			>
				${services.map(service => html`
					<div id=${service.id}>
						<service-card
							.id=${service.id}
							.title=${service.title}
							.subtitle=${service.subtitle}
							.description=${service.description}
							.image=${service.image}
							.duration=${service.duration}
							.price=${service.price}
							.hasGallery=${service.hasGallery ?? false}
						></service-card>
					</div>
				`)}
			</div>
    `;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'service-section': ServiceSection;
	}
}
