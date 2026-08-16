import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../tailwind/tailwindCss.ts'

type Testimonial = {
	author: string
	quote: string
}

function getFeaturedTestimonial(): Testimonial {
	return {
		author: 'Iris Hoffner',
		quote: msg(
			'1000 Dank nochmal… Ich habe sowas noch nie erlebt… Es hat alles gestimmt, sooo viele Informationen, das hättest du niemals von irgendjemand wissen können… Alles hat zu 100 Prozent gepasst… Es war magisch!!! Ich danke dir von ganzem Herzen!!!!',
		),
	}
}

function getTestimonials(): Testimonial[] {
	return [
		{
			author: 'Papadopoulos',
			quote: msg(
				'Ein großes Dankeschön an Stefi für den wunderbaren Jenseits Kontakt zu meinem lieben Papa! Ich bin noch ganz geflasht und gerührt. Danke Stefi! Hvala! Ευχαριστώ μπαμπάκα!',
			),
		},
		{
			author: 'Moni',
			quote: msg(
				'Sie nahm Kontakt zu meinem Bruder auf und es war der Wahnsinn, sie hat seinen Charakter genau beschrieben, sie nannte mir Einzelheiten zur Todesursache und sie hat mir Botschaften übermittelt, die genau zu meiner aktuellen Lebenslage passen. Liebe Stefi, ich bin dir unheimlich dankbar für diesen tollen und sehr emotionalen Kontakt. Vielen, vielen Dank!',
			),
		},
		{
			author: 'Birgit Steiner',
			quote: msg(
				'Ich hatte mit Stefana Gyorgiev einen ganz tollen Kontakt zu meinem Opa. Mir fehlen noch immer die Worte. So vieles, was gepasst hat, was kein Außenstehender wissen kann. Es ist einfach umwerfend gewesen, kann es gar nicht in Worte fassen. Zudem muss ich sagen, dass Stefi einfach nur klasse ist, einfühlsam, lieb, entspannt. Es macht einfach Riesenspaß sich mit ihr zu unterhalten und tut furchtbar gut. Ich kann sie nur weiterempfehlen. Vielen Dank meine liebe',
			),
		},
		{
			author: 'Traude',
			quote: msg(
				'Ich möchte mich bei Stefi von ganzem Herzen bedanken. Sie hatte Kontakt mit meinem Papa. Ich bin total überwältigt. Es war zu 98% alles stimmig. Stefi, du bist ein wundervoller, einfühlsamer Engel. Für mich war dies das 1. Mal und es hat meine Erwartungen zu 1000% übertroffen. Du hast ihn so gut beschrieben, als hättest du ihn gekannt. Die Nachricht, die er mir zukommen ließ durch dich, hat mir sehr viel Trost und Mut gegeben. Du bist ein wundervoller Mensch, der mit einer wundervollen Gabe gesegnet ist. Vielen lieben Dank für deine Zeit und deine Energie.',
			),
		},
		{
			author: 'Leonard Krasner',
			quote: msg(
				'Wir möchten uns ganz herzlich bei der lieben Stefi bedanken für den wundervollen Kontakt unseres Sohns Julian. Alles war so stimmig und hat auch neue Erkenntnisse gebracht. Sie arbeitet sehr beweisführend. Das durfte ich heute selbst erleben. Ich danke dir und kann dich sehr gerne weiterempfehlen.',
			),
		},
		{
			author: 'Manuela Eder',
			quote: msg(
				'Ich möchte mich auch hier nochmals herzlich bedanken bei Stefi für den Kontakt gestern zu meiner verstorbenen Mama. Es war einfach magisch, berührend. Gänsehaut-Moment: sie wusste Dinge, die sie niemals wissen konnte, alles bis ins kleinste Detail beschrieben und den Nagel auf den Kopf getroffen, 100%. Ich bin so dankbar, dass ich mit meiner Mama Kontakt haben durfte, jetzt weiß ich, dass sie gut da drüben angekommen ist und ihren Frieden gefunden hat.',
			),
		},
	]
}

const backdropClipPath =
	'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'

@localized()
@customElement('customer-review')
export class CustomerReview extends LitElement {
	override render() {
		const featuredTestimonial = getFeaturedTestimonial()

		return html`
			<div class="relative isolate bg-white pt-24 pb-32 sm:pt-32">
				<div
					class="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
					aria-hidden="true"
				>
					<div
						class="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#008080] to-[#4bc0f2] xl:mr-[calc(50%-12rem)] xl:ml-0"
						style="clip-path: ${backdropClipPath}"
					></div>
				</div>
				<div
					class="absolute inset-y-0 bottom-40 -z-10 translate-y-1/4 transform-gpu overflow-hidden opacity-30 blur-3xl"
					aria-hidden="true"
				>
					<div
						class="mr-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#008080] to-[#4bc0f2]"
						style="clip-path: ${backdropClipPath}"
					></div>
				</div>

				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<div class="mx-auto max-w-2xl text-center">
						<h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
							${msg('Was sagen die Klienten')}
						</h2>
					</div>

					<figure
						class="mx-auto mt-16 max-w-2xl rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:mt-20 xl:max-w-3xl"
					>
						<blockquote class="p-6 text-lg font-semibold tracking-tight text-gray-900 sm:p-12 sm:text-xl/8">
							<p>“${featuredTestimonial.quote}”</p>
						</blockquote>
						<figcaption class="border-t border-gray-900/10 px-6 py-4 font-semibold text-gray-900">
							${featuredTestimonial.author}
						</figcaption>
					</figure>

					<div class="mx-auto mt-8 max-w-2xl columns-1 gap-8 text-sm/6 text-gray-900 sm:columns-2 xl:max-w-none xl:columns-3">
						${getTestimonials().map(
							(testimonial) => html`
								<figure class="mb-8 break-inside-avoid rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
									<blockquote class="p-6 text-gray-900"><p>“${testimonial.quote}”</p></blockquote>
									<figcaption class="border-t border-gray-900/10 px-6 py-4 font-semibold text-gray-900">
										${testimonial.author}
									</figcaption>
								</figure>
							`,
						)}
					</div>
				</div>
			</div>
		`
	}

	static override styles = tailwindCss
}

declare global {
	interface HTMLElementTagNameMap {
		'customer-review': CustomerReview;
	}
}
