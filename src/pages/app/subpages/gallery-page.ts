import { LitElement, html, css } from 'lit-element';
import { customElement, property, query } from 'lit/decorators.js';
import tailwindCss from "../../../tailwind/tailwindCss.ts";
import { choose } from 'lit/directives/choose.js';
import Bear from '/src/assets/gallery/spirit-animal/Bear.jpg';
import Elephant from '/src/assets/gallery/spirit-animal/Elephant.jpg';
import Dear from '/src/assets/gallery/spirit-animal/Dear.jpg';
import Cat from '/src/assets/gallery/spirit-animal/Cat.jpg';
import Wolf from '/src/assets/gallery/spirit-animal/Wolf.jpg';
import Fox from '/src/assets/gallery/spirit-animal/Fox.jpg';
import Parrot from '/src/assets/gallery/spirit-animal/Parrot.jpg';
import Birds from '/src/assets/gallery/spirit-animal/Birds.jpg';
import Fox_2 from '/src/assets/gallery/spirit-animal/Fox_2.jpg';
import Frog from '/src/assets/gallery/spirit-animal/Frog.jpeg';
import Seahorse from '/src/assets/gallery/spirit-animal/Seahorse.jpeg';
import Lizard from '/src/assets/gallery/spirit-animal/Lizard.jpeg';
import SB_2 from '/src/assets/gallery/spirit-way/SB_2.jpeg';
import SB_1 from '/src/assets/gallery/spirit-way/SB_1.jpeg';
import SB_3 from	'/src/assets/gallery/spirit-way/SB_3.jpeg';
import GP_1 from '/src/assets/gallery/spirit-guide/GP_1.jpeg';
import GP_2 from '/src/assets/gallery/spirit-guide/GP_2.jpeg';
import GP_3 from '/src/assets/gallery/spirit-guide/GP_3.jpeg';

const galleries = [
	{
		id: 'seelen',
		label: 'Seelenbilder',
		type: 'sb',
		images: [SB_1, SB_2, SB_3]
	},
	{
		id: 'tier',
		label: 'Krafttierbilder',
		type: 'kb',
		images: [Bear, Elephant, Dear, Cat, Wolf, Fox, Parrot, Birds, Fox_2, Frog, Seahorse, Lizard]
	},
	{
		id: 'geist',
		label: 'Geistführer-Portraits',
		type: 'gp',
		images: [GP_1, GP_2, GP_3]
	}
];

@customElement('gallery-page')
export class GalleryPage extends LitElement {
	@property({ type: String }) activeGalleryId = 'seelen';

	@query('#lightbox') lightbox!: HTMLDivElement;
	@query('#lightbox-image') lightboxImage!: HTMLImageElement;

	connectedCallback() {
		super.connectedCallback();

		const params = new URLSearchParams(window.location.search);
		const type = params.get('type');

		const found = galleries.find(g => g.type === type);
		if (found) this.activeGalleryId = found.id;
	}

	private handleGalleryChange(id: string) {
		this.activeGalleryId = id;

		const active = galleries.find(g => g.id === id);
		if (active) {
			history.replaceState({}, '', `/gallery?type=${active.type}`);
		}
	}

	private openLightbox(src: string) {
		this.lightboxImage.src = src;
		this.lightbox.style.display = 'flex';
	}

	private closeLightbox() {
		this.lightbox.style.display = 'none';
	}

	private renderGallery(images: string[]) {
		return html`
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${images.map(src => html`
          <img
            src=${src}
            class="gallery-image object-cover rounded-3xl w-full h-[280px] cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            @click=${() => this.openLightbox(src)}
            alt="Galeriebild"
          />
        `)}
      </div>
    `;
	}

	override render() {
		return html`
      <section class="py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	        
          <div class="grid gap-2.5 pb-5 text-center">
            <h2 class="text-gray-900 text-4xl font-bold leading-normal">
              Meine Galerie
            </h2>
            <p class="text-gray-600 text-lg leading-8">
	            Hier findest du eine Auswahl meiner medial empfangenen Bilder –
	            mit viel Liebe, Achtsamkeit und in Verbindung mit der Geistigen Welt gestaltet.
            </p>
          </div>

	        <div class="mb-8 text-center text-gray-600 space-y-2">
		        <p class="text-gray-600 text-lg leading-8">
			        Jedes Bild erhält ein Echtheitssiegel, das die Originalität und Einzigartigkeit
			        deines Kunstwerks bestätigt.
		        </p>

		        ${this.activeGalleryId === 'geist' ? html`
			        <p class="text-teal-700 font-semibold italic">
				        ✨ Inklusive einer persönlichen Botschaft deines Geistführers,
				        die speziell für dich übermittelt wird.
			        </p>
					  ` : null}
	        </div>
	        
          <div class="mb-10 sm:hidden">
            <select
              class="w-full rounded-md border border-gray-300 py-2 px-3"
              @change=${(e: any) => this.handleGalleryChange(e.target.value)}
            >
              ${galleries.map(g => html`
                <option value=${g.id} ?selected=${this.activeGalleryId === g.id}>
                  ${g.label}
                </option>
              `)}
            </select>
          </div>
	        
          <div class="hidden sm:block mb-16">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex justify-center">
                ${galleries.map(g => html`
                  <div
                    class="w-1/4 border-b-2 px-1 py-4 text-center text-lg font-medium cursor-pointer
                      ${this.activeGalleryId === g.id
												? 'border-teal-500 text-teal-600'
												: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
                    @click=${() => this.handleGalleryChange(g.id)}
                  >
                    ${g.label}
                  </div>
                `)}
              </nav>
            </div>
          </div>
	        
          ${choose(this.activeGalleryId, galleries.map(g => [g.id, () => this.renderGallery(g.images)]))}
	        <p class="mt-10 text-gray-600 text-m leading-8"><strong>Hinweis:</strong> Die Bilder entstehen auf medialem Weg und stellen keine fotografische oder objektive Darstellung dar, sondern eine künstlerisch-mediale Interpretation.</p>
        </div>
	      
        <div class="lightbox" id="lightbox" @click=${(e: any) => e.target === this.lightbox && this.closeLightbox()}>
          <span class="close" @click=${this.closeLightbox}>&times;</span>
          <img id="lightbox-image" class="lightbox-image" />
        </div>

      </section>
    `;
	}

	static override styles = [
		tailwindCss,
		css`
			.lightbox {
				display: none;
				position: fixed;
				inset: 0;
				z-index: 999;
				background: rgba(0,0,0,0.85);
				align-items: center;
				justify-content: center;
			}
			
			.lightbox-image {
				max-width: 90vw;
				max-height: 90vh;
				border-radius: 1rem;
			}
			
			.close {
				position: absolute;
				top: 20px;
				right: 30px;
				font-size: 3rem;
				color: white;
				cursor: pointer;
			}
		`
	];
}

declare global {
	interface HTMLElementTagNameMap {
		'gallery-page': GalleryPage;
	}
}