import {LitElement, html} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import tailwindCss from '../../tailwind/tailwindCss.ts';

@customElement('customer-review')
export class CustomerReview extends LitElement {
	override render() {
		return html`
			<div class="relative isolate bg-white pt-24 pb-32 sm:pt-32">
				<div class="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
					<div class="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#008080] to-[#4bc0f2] xl:mr-[calc(50%-12rem)] xl:ml-0" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
				</div>
				<div class="absolute inset-y-0 bottom-40 -z-10 translate-y-1/4 transform-gpu overflow-hidden opacity-30 blur-3xl" aria-hidden="true">
					<div 
						class="mr-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#008080] to-[#4bc0f2]" 
						style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
					</div>
				</div>
				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<div class="mx-auto max-w-2xl text-center">
						<p class="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Was sagen die Klienten</p>
					</div>
					<div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-rows-1 xl:grid-flow-col xl:grid-cols-4">
						<figure class="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
							<blockquote class="p-6 text-lg font-semibold tracking-tight text-gray-900 sm:p-12 sm:text-xl/8">
								<p>“1000 Dank nochmal... Ich habe sowas noch nie erlebt... Es hat alles gestimmt, sooo viele Informationen, das hättest du niemals von irgendjemand wissen können... 
									Alles hat zu 100 Prozent gepasst... Es war magisch!!! Ich danke dir von ganzem Herzen!!!!”</p>
							</blockquote>
							<figcaption class="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
								<div class="flex-auto">
									<div class="font-semibold">Iris Hoffner</div>
								</div>
							</figcaption>
						</figure>
						<div class="space-y-8 xl:contents xl:space-y-0">
							<div class="space-y-8 xl:row-span-2">
								<figure class="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
									<blockquote class="text-gray-900 p-6">
										<p>“Ein großes Dankeschön an Stefi für den wunderbaren Jenseits Kontakt zu meinem lieben Papa! Ich bin noch ganz geflasht und gerührt. Danke Stefi! Hvala! Ευχαριστώ μπαμπάκα !”</p>
									</blockquote>
									<figcaption class="mt-6 flex-wrap flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
										<div>
											<div class="font-semibold">Papadopoulos</div>
										</div>
									</figcaption>
								</figure>

								<figure class="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
									<blockquote class="text-gray-900 p-6">
										<p>“Ich hatte mit Stefana Gyorgiev einen ganz tollen Kontakt zu meinen Opa. Mir fehlen noch immer die Worte. So vieles, was gepasst hat, was kein Außenstehender Wissen kann. 
											Es ist einfach umwerfend gewesen, kann es gar nicht in Worte fassen. Zudem muss ich sagen, das Stefi einfach nur klasse ist, einfühlsam, lieb, entspannt. 
											Es macht einfach Riesenspaß sich mit ihr zu unterhalten und tut furchtbar gut. Ich kann sie nur weiterempfehlen. Vielen Dank meine liebe”</p>
									</blockquote>
									<figcaption class="mt-6 flex-wrap flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
										<div>
											<div class="font-semibold">Birgit Steiner</div>
										</div>
									</figcaption>
								</figure>

								<!-- More testimonials... -->
							</div>
							<div class="space-y-8 xl:row-start-1">
								<figure class="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
									<blockquote class="text-gray-900 p-6">
										<p>“Sie nahm Kontakt zu meinem Bruder auf und es war der Wahnsinn, sie hat seinen Charakter genau beschrieben, sie nannte mir Einzelheiten zur Todesursache und sie hat mir Botschaften übermittelt, die genau zu meiner aktuellen Lebenslage passen.
											Liebe Stefi, ich bin die unheimlich dankbar für diesen tollen und sehr emotionalen Kontakt. Vielen, vielen Dank!”</p>
									</blockquote>
									<figcaption class="mt-6 flex-wrap flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
										<div>
											<div class="font-semibold">Moni</div>
										</div>
									</figcaption>
								</figure>

								<!-- More testimonials... -->
							</div>
						</div>
						<div class="space-y-8 xl:contents xl:space-y-0">
							<div class="space-y-8 xl:row-start-1">
								<figure class="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
									<blockquote class="text-gray-900 p-6">
										<p>“Ich möchte mich bei Stefi von ganzem Herzen bedanken. Sie hatte Kontakt mit meinem Papa. Ich bin total überwältigt. 
											Es war zu 98% alles stimmig  Stefi du bist ein wundervoller, einfühlsamer Engel. Für mich war dies das 1. Mal und es hat meine Erwartungen zu 1000% übertroffen. 
											Du hast ihn so gut beschrieben, als hättest du ihn gekannt. Die Nachricht, die er mir zukommen ließ durch dich, hat mir sehr viel Trost und Mut gegeben. 
											Du bist ein wundervoller Mensch, der mit einer wundervollen Gabe gesegnet ist. Vielen lieben Dank für deine Zeit und deine Energie.”</p>
									</blockquote>
									<figcaption class="mt-6 flex-wrap flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
										<div>
											<div class="font-semibold">Traude</div>
										</div>
									</figcaption>
								</figure>

								<!-- More testimonials... -->
							</div>
							<div class="space-y-8 xl:row-span-2">
								<figure class="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
									<blockquote class="text-gray-900 p-6">
										<p>“Wir möchten uns ganz herzlich bei der lieben Stefi bedanken für den wundervollen Kontakt unseres Sohns Julian
											Alles war so stimmig und auch neue Erkenntnisse gebracht. Sie arbeitet sehr beweisführend. Das dürfte ich heute selbst erleben
											Ich danke dir von und kann die sehr gerne weiter empfehlen”</p>
									</blockquote><figcaption class="mt-6 flex-wrap flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
										<div>
											<div class="font-semibold">Leonard Krasner</div>
										</div>
									</figcaption>
								</figure>

								<figure class="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
									<blockquote class="text-gray-900 p-6">
										<p>“Ich möchte mich auch hier nochmals herzlich bedanken bei Stefi für den Kontakt gestern zu meiner verstorbenen Mama es war einfach magisch, berührend.
											Gänsehaut Moment sie wusste Dinge, die sie niemals wissen konnte, alles bis ins kleinste Detail beschrieben und den Nagel auf den Kopf getroffen 100%.
											Ich bin so dankbar, dass ich mit meiner Mama Kontakt haben durfte, jetzt weiß ich das sie gut da drüben angekommen ist und ihren Frieden gefunden hat”</p>
									</blockquote>
									<figcaption class="mt-6 flex-wrap flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
										<div>
											<div class="font-semibold">Manuela Eder</div>
										</div>
									</figcaption>
								</figure>

								<!-- More testimonials... -->
							</div>
						</div>
					</div>
				</div>
			</div>

		`;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'customer-review': CustomerReview;
	}
}