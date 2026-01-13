import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import tailwindCss from '../../tailwind/tailwindCss.ts';
import { services } from '../../data/services.ts';
import { Router } from '@vaadin/router';
import './service-card.ts';

@customElement('service-section')
export class ServiceSection extends LitElement {

	override render() {
		return html`
      <div
	      @reroute=${(e: CustomEvent<string>) => {
					e.stopPropagation();
					Router.go(e.detail);
				}}
      >
        ${services.map(service => html`
          <section id=${service.id} class="scroll-mt-32">
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
          </section>
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
