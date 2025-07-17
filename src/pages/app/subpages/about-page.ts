import {LitElement, html} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';
import tailwindCss from "../../../tailwind/tailwindCss.ts";
import image from '../../../assets/about_me_photo.jpg';
import '../../layouts/full-layout.ts'

@customElement('about-page')
export class AboutPage extends LitElement {
  @property({type: String}) foo = '';

  override render() {
    return html`
	    <div class="relative isolate overflow-hidden bg-linear-to-b from-indigo-100/20">
		    <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
			    <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
				    <h1 class="max-w-2xl text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">Das bin ich</h1>
				    <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
					    <div class="flex flex-col gap-10 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
						    <p>Mein Name ist Stefana Gyorgiev ich wurde am 14.06.1989 in Serbien geboren, seit meinem 2 Lebensjahr lebe ich mit meiner Familie in Österreich. Ich habe einen Sohn und lebe in einem Haus auf dem Land.</p>
						    <p>Seit meiner Kindheit habe ich stets Dinge hinterfragt wollte es noch genauer wissen, und genauso ging es mir mit dem Leben nach dem Tod. Ich war davon überzeugt das es nach dem Tod weiter geht und wir nie wirklich sterben können.  Da ich schon in meiner Kindheit offen für die Geistige Welt war, begann es eines Tages bei mir mit Wahrträumen und Vorahnungen, die immer mehr wurden. Ich bekam im Laufe der Zeit viele eindeutige Zeichen aus der Geistigen Welt, die ich nicht einfach ignorieren konnte. Somit war der Grundstein gelegt und ich ließ mich Medial zum Medium ausbilden, ich besuchte viele Kurse und ließ mich von der Geistigen Welt trainieren.</p>
						    <p>Heute gehe ich meinem Ruf als Medium mit großer Hingabe und Leidenschaft nach. Es bereitet mir große Freude Menschen, die jemanden verloren haben, die Möglichkeit zu geben wieder mit ihren Lieben in Kontakt treten zu können.  Unausgesprochenes, Ungeklärtes die Frage Warum Weshalb klären zu können liegt mir dabei besonders am Herzen.  Den Hinterbliebenen nahe zu bringen das es eine geistige Welt gibt und das ihre geliebten Menschen in einer anderen Form noch immer unter uns sind ist mir sehr wichtig.</p>
					    </div>
				    </div>
				    <img src=${image} alt="" class="mt-10 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36">
			    </div>
		    </div>
		    <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32"></div>
		    </div>
	    </div>
  `;
  }

  static override styles = [tailwindCss];
}

declare global {
    interface HTMLElementTagNameMap {
        'about-page': AboutPage;
    }
}