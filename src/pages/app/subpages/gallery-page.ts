import { LitElement, html, css, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { localized, msg, str } from '@lit/localize'
import tailwindCss from '../../../tailwind/tailwindCss.ts'
import Bear from '../../../assets/gallery/spirit-animal/Bear.webp'
import BearThumb from '../../../assets/gallery/spirit-animal/Bear-thumb.webp'
import Elephant from '../../../assets/gallery/spirit-animal/Elephant.webp'
import ElephantThumb from '../../../assets/gallery/spirit-animal/Elephant-thumb.webp'
import Dear from '../../../assets/gallery/spirit-animal/Dear.webp'
import DearThumb from '../../../assets/gallery/spirit-animal/Dear-thumb.webp'
import Cat from '../../../assets/gallery/spirit-animal/Cat.webp'
import CatThumb from '../../../assets/gallery/spirit-animal/Cat-thumb.webp'
import Wolf from '../../../assets/gallery/spirit-animal/Wolf.webp'
import WolfThumb from '../../../assets/gallery/spirit-animal/Wolf-thumb.webp'
import Fox from '../../../assets/gallery/spirit-animal/Fox.webp'
import FoxThumb from '../../../assets/gallery/spirit-animal/Fox-thumb.webp'
import Parrot from '../../../assets/gallery/spirit-animal/Parrot.webp'
import ParrotThumb from '../../../assets/gallery/spirit-animal/Parrot-thumb.webp'
import Birds from '../../../assets/gallery/spirit-animal/Birds.webp'
import BirdsThumb from '../../../assets/gallery/spirit-animal/Birds-thumb.webp'
import Fox_2 from '../../../assets/gallery/spirit-animal/Fox_2.webp'
import Fox_2Thumb from '../../../assets/gallery/spirit-animal/Fox_2-thumb.webp'
import Frog from '../../../assets/gallery/spirit-animal/Frog.webp'
import FrogThumb from '../../../assets/gallery/spirit-animal/Frog-thumb.webp'
import Seahorse from '../../../assets/gallery/spirit-animal/Seahorse.webp'
import SeahorseThumb from '../../../assets/gallery/spirit-animal/Seahorse-thumb.webp'
import Lizard from '../../../assets/gallery/spirit-animal/Lizard.webp'
import LizardThumb from '../../../assets/gallery/spirit-animal/Lizard-thumb.webp'

type GalleryImage = {
	full: string
	thumb: string
}

const images: GalleryImage[] = [
	{ full: Bear, thumb: BearThumb },
	{ full: Elephant, thumb: ElephantThumb },
	{ full: Dear, thumb: DearThumb },
	{ full: Cat, thumb: CatThumb },
	{ full: Wolf, thumb: WolfThumb },
	{ full: Fox, thumb: FoxThumb },
	{ full: Parrot, thumb: ParrotThumb },
	{ full: Birds, thumb: BirdsThumb },
	{ full: Fox_2, thumb: Fox_2Thumb },
	{ full: Frog, thumb: FrogThumb },
	{ full: Seahorse, thumb: SeahorseThumb },
	{ full: Lizard, thumb: LizardThumb },
]

@localized()
@customElement('gallery-page')
export class GalleryPage extends LitElement {
	@state() private lightboxIndex: number | null = null

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if(this.lightboxIndex === null) return

		if(event.key === 'Escape') this.closeLightbox()
		if(event.key === 'ArrowRight') this.stepLightbox(1)
		if(event.key === 'ArrowLeft') this.stepLightbox(-1)
	}

	override connectedCallback() {
		super.connectedCallback()
		window.addEventListener('keydown', this.onKeyDown)
	}

	override disconnectedCallback() {
		window.removeEventListener('keydown', this.onKeyDown)
		document.body.style.removeProperty('overflow')
		super.disconnectedCallback()
	}

	private openLightbox(index: number) {
		this.lightboxIndex = index
		document.body.style.setProperty('overflow', 'hidden')
	}

	private closeLightbox() {
		this.lightboxIndex = null
		document.body.style.removeProperty('overflow')
	}

	private stepLightbox(offset: number) {
		this.lightboxIndex = ((this.lightboxIndex ?? 0) + offset + images.length) % images.length
	}

	override render() {
		return html`
			<section class="py-20">
				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div class="grid gap-2.5 pb-5 text-center">
						<h1 class="text-4xl font-bold leading-normal text-gray-900">${msg('Meine Galerie')}</h1>
						<p class="text-lg leading-8 text-gray-600">
							${msg(
								'Hier findest du eine Auswahl meiner medial empfangenen Krafttierbilder – mit viel Liebe, Achtsamkeit und in Verbindung mit der Geistigen Welt gestaltet.',
							)}
						</p>
					</div>

					<div class="mb-12 text-center">
						<p class="text-lg leading-8 text-gray-600">
							${msg(
								'Jedes Bild erhält ein Echtheitssiegel, das die Originalität und Einzigartigkeit deines Kunstwerks bestätigt.',
							)}
						</p>
					</div>

					<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						${images.map(
							(image, index) => html`
								<button
									type="button"
									class="h-[280px] w-full overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
									@click=${() => this.openLightbox(index)}
								>
									<img
										src=${image.thumb}
										loading="lazy"
										decoding="async"
										alt=${msg(str`Krafttierbild ${index + 1} vergrößern`)}
										class="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
									/>
								</button>
							`,
						)}
					</div>

					<p class="mt-10 text-sm leading-8 text-gray-600">
						${msg(html`<strong>Hinweis:</strong> Die Bilder entstehen auf medialem Weg und stellen keine fotografische
							oder objektive Darstellung dar, sondern eine künstlerisch-mediale Interpretation.`)}
					</p>
				</div>

				${this.lightboxIndex === null ? nothing : this.renderLightbox(this.lightboxIndex)}
			</section>
		`
	}

	private renderLightbox(index: number) {
		return html`
			<div
				class="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 p-4"
				role="dialog"
				aria-modal="true"
				aria-label=${msg(str`Krafttierbild ${index + 1} von ${images.length}`)}
				@click=${(event: Event) => event.target === event.currentTarget && this.closeLightbox()}
			>
				<button
					type="button"
					class="absolute top-4 right-6 text-5xl leading-none text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
					@click=${this.closeLightbox}
				>
					<span class="sr-only">${msg('Schließen')}</span>
					<span aria-hidden="true">&times;</span>
				</button>

				<button
					type="button"
					class="absolute left-4 text-5xl leading-none text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
					@click=${() => this.stepLightbox(-1)}
				>
					<span class="sr-only">${msg('Vorheriges Bild')}</span>
					<span aria-hidden="true">&lsaquo;</span>
				</button>
				<button
					type="button"
					class="absolute right-4 text-5xl leading-none text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
					@click=${() => this.stepLightbox(1)}
				>
					<span class="sr-only">${msg('Nächstes Bild')}</span>
					<span aria-hidden="true">&rsaquo;</span>
				</button>

				<img
					src=${images[index].full}
					alt=${msg(str`Krafttierbild ${index + 1}`)}
					class="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
				/>
			</div>
		`
	}

	static override styles = [
		tailwindCss,
		css`
			:host {
				display: block;
			}
		`,
	]
}

declare global {
	interface HTMLElementTagNameMap {
		'gallery-page': GalleryPage;
	}
}
