import {LitElement, html, css} from 'lit-element';
import {customElement, property, query} from 'lit/decorators.js';
import tailwindCss from "../../../tailwind/tailwindCss.ts";
import { choose } from 'lit/directives/choose.js';

const galleryData = [
	{
		id: '1',
		label: 'Seelenbilder',
		active: true,
	},
	{
		id: '2',
		label: 'Krafttierbilder',
		active: false,
	}
]

@customElement('gallery-page')
export class GalleryPage extends LitElement {
	@property({type: String}) foo = '';
	@query('.gallery') gallery: any;
	@query('#lightbox') lightbox: any;
	@query('#lightbox-image') lightboxImage: any;
	@query('#close') closeBtn: any;

	galleryArray = galleryData;

	connectedCallback() {
		super.connectedCallback();

		const params = new URLSearchParams(window.location.search);
		const type = params.get('type');

		this.setActiveGallery(type);
	}

	private setActiveGallery(type: string | null) {
		this.galleryArray.forEach(item => (item.active = false));

		if (type === 'krafttierbilder') {
			this.galleryArray.find(i => i.label === 'Krafttierbilder')!.active = true;
		} else {
			// default
			this.galleryArray.find(i => i.label === 'Seelenbilder')!.active = true;
		}

		this.requestUpdate();
	}

	private handleClick(e: any) {
		if (e.target.classList.contains('gallery-image')) {
			const imageSrc = e.target.src;
			this.lightboxImage.src = imageSrc;
			this.lightbox.style.display = 'flex';
		}
	}

	private handleImagesChange(id: string) {
		this.galleryArray.map((item) => item.active = false);
		const activeItem = this.galleryArray.find((item) => item.id === id);
		activeItem!.active = true;

		const type =
			activeItem!.label === 'Krafttierbilder'
				? 'krafttierbilder'
				: 'seelenbilder';

		history.replaceState({}, '', `/gallery?type=${type}`);
		this.requestUpdate();
	}

	get displayedImages() {
		return this.galleryArray.find((item) => item.active)?.label;
	}

	override render() {
		return html`
			<section class="py-20">
				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
					<div class="grid gap-2.5 lg:pb-16 pb-10">
						<h2 class="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">Meine Galerie</h2>
						<div class="w-full text-center text-gray-600 text-lg font-normal leading-8">Betreten Sie ein Reich, in dem Kunst zum Leben erwacht.</div>
					</div>

					<div class="mb-16">
						<div class="grid grid-cols-1 sm:hidden">
							<select aria-label="Select a tab" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" @change=${(e: any) => this.handleImagesChange(e.target.value)}>
								${this.galleryArray.map(({id, label, active}) => html`
									<option value=${id} ${active ? 'selected = "selected"' : ''}>${label}</option>
								`)}
							</select>
							<svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
								<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="hidden sm:block">
							<div class="border-b border-gray-200">
								<nav class="-mb-px flex justify-center" aria-label="Tabs">
									${this.galleryArray.map(({id, label, active}) => html`
										<div
											id=${id}
											class="w-1/4 border-b-2 px-1 py-4 text-center text-lg font-medium ${active ? 'border-teal-500 text-teal-600 cursor-pointer' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer'}"
											@click=${() => this.handleImagesChange(id)}
										>${label}</div>
									`)}
								</nav>
							</div>
						</div>
					</div>
					
					<div class="gallery" @click=${this.handleClick}>
						<div class="flex flex-col mb-10">
							${choose(this.displayedImages, [
								['Seelenbilder', () => this.spiritWayImages],
								['Krafttierbilder', () => this.animalImages],
							])}
						</div>
					</div>
				</div>
				<div class="lightbox" id="lightbox" @click=${(e: any) => {if(e.target === this.lightbox) this.lightbox.style.display = 'none'}}>
					<span class="close" id="close" @click=${() => this.lightbox.style.display = 'none'}>&times;</span>
					<img src="" alt="" class="lightbox-image" id="lightbox-image">
				</div>
				</div>
			</section>
    `;
	}

	get animalImages() {
		return html`
			<div class="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
				<div class="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Bear.jpg" alt="Bear image" class="gallery-image object-cover rounded-3xl mx-auto lg:col-span-4 md:col-span-6 w-full h-full">
				</div>
				<div class="md:col-span-8 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Elephant.jpg" alt="Elephant image" class="gallery-image object-cover rounded-3xl mx-auto lg:col-span-8 md:col-span-6 w-full h-full">
				</div>
			</div>
			<div class="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
				<div class="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Dear.jpg" alt="Dear image" class="gallery-image object-cover rounded-3xl mx-auto w-full h-full">
				</div>
				<div class="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Cat.jpg" alt="Cat image" class="gallery-image object-cover rounded-3xl mx-auto w-full h-full">
				</div>
				<div class="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Wolf.jpg" alt="Wolf image" class="gallery-image object-cover rounded-3xl mx-auto w-full h-full">
				</div>
			</div>

			<div class="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
				<div class="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Fox.jpg" alt="Fox image" class="gallery-image object-cover rounded-3xl mx-auto lg:col-span-4 md:col-span-6 w-full h-full">
				</div>
				<div class="md:col-span-8 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Parrot.jpg" alt="Parrot image" class="gallery-image object-cover rounded-3xl mx-auto lg:col-span-8 md:col-span-6 w-full h-full">
				</div>
			</div>
			<div class="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
				<div class="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Birds.jpg" alt="Birds image" class="gallery-image object-cover rounded-3xl mx-auto w-full h-full">
				</div>
				<div class="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Fox_2.jpg" alt="Fox image" class="gallery-image object-cover rounded-3xl mx-auto w-full h-full">
				</div>
			</div>
		`
	}

	get spiritWayImages() {
		return html`
			<div class="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
				<div class="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Fox.jpg" alt="Fox image" class="gallery-image object-cover rounded-3xl mx-auto lg:col-span-4 md:col-span-6 w-full h-full">
				</div>
				<div class="md:col-span-8 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Parrot.jpg" alt="Parrot image" class="gallery-image object-cover rounded-3xl mx-auto lg:col-span-8 md:col-span-6 w-full h-full">
				</div>
			</div>
			<div class="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
				<div class="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Birds.jpg" alt="Birds image" class="gallery-image object-cover rounded-3xl mx-auto w-full h-full">
				</div>
				<div class="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
					<img src="/src/assets/gallery/Fox_2.jpg" alt="Fox image" class="gallery-image object-cover rounded-3xl mx-auto w-full h-full">
				</div>
			</div>
		`
	}

	static override styles = [tailwindCss, css`
		.lightbox {
			display: none;
			position: fixed;
			z-index: 999;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			overflow:hidden;
			background-color: rgba(0, 0, 0, 0.8);
		}
		
		.lightbox-image {
			display: block;
			margin: auto;
			max-width: 100%;
			max-height: 100%;
		}
		
		.close {
			color: #fff;
			font-size: 3em;
			position: absolute;
			top: 20px;
			right: 30px;
			cursor: pointer;
		}
		
		.gallery {
			width: 90vw;
			max-width: 1200px;
			margin: 0 auto;
			grid-template-rows: 1fr;
			grid-column-gap: 30px;
			grid-row-gap: 30px;
		}
		
		.gallery img {
			max-width: 100%;
			cursor: pointer;
		}
		
		.gallery img:hover {
			max-width: 100%;
			cursor: pointer;
		}
  `];
}

declare global {
	interface HTMLElementTagNameMap {
		'gallery-page': GalleryPage;
	}
}