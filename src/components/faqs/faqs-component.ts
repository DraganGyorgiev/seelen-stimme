import {LitElement, html} from 'lit-element';
import {customElement, state} from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";

type FAQ = {id: string, label: string, data: {question: string, answer: string}[], active: boolean};

const sampleData: FAQ[] = [
	{
		id: '1',
		label: 'Jenseitskontakt',
		data: [
			{
				question: 'Wie gehe ich bei einem Jenseitskontakt vor?',
				answer: 'Als Beweisführendes Medium, möchte ich keinerlei Vorinformationen von dir oder deinen/er Lieben erhalten, somit stelle ich sicher, dass ich alle Informationen ausschließlich von deinem/er Lieben erhalte. ' +
					'Zuallererst beschriebe ich dir deinen Lieben. Damit du dir sicher sei kannst, dass es sich um die richtige Seele handelt. Danach erhältst du von deinem/er Lieben, eine persönliche Botschaft oder auch mehrere Botschaften. ' +
					'Im Anschluss kannst du gerne 2-3 Fragen deiner Lieben Seele stellen. Gerne auch mir falls noch Unklarheiten bestehen sollten.'
			},
			{
				question: 'Wo findet die Jenseitssitzung statt?',
				answer: 'Die Jenseitssizung findet ausschließlich über Zoom oder WhatsApp, statt.  Bitte beachte hier, dass nur über Zoom eine Aufzeichnung der Sitzung möglich ist.  \n' +
					'\n' +
					'Sitzungsdauer: ca. 1 Stunde. \n' +
					'\n' +
					'Kosten: 150,00 inkl. MwSt . '
			}
		],
		active: true
	},
	{
		id: '2',
		label: 'Aura-Reading',
		data: [
			{
				question: 'Sho kaza Meemet?',
				answer: 'Meemet kaza, za 24 saata, jok da bides od tuka.'
			}
		],
		active: false
	},
	{
		id: '3',
		label: 'Seelenweg',
		data: [
			{
				question: 'Was ist ein Seelenweg?',
				answer: 'Erkenne und finde wieder deinen Weg.  \n' +
					'\n' +
					'Entfalte dein persönliches Potenzial. \n' +
					'\n' +
					'Erlange Selbsterkenntnis und finde deinen inneren Frieden. \n' +
					'\n' +
					'Finde deine Berufung und Bestimmung heraus. \n' +
					'\n' +
					'Durchbrich wiederkehrende Muster in deinem Leben.'
			},
			{
				question: 'Ist der Seelenweg die richtige Auswahl für mich?',
				answer: 'Du befindest dich in einer für dich aussichtslosen Situation, weißt im Moment nicht ein und aus. ' +
					'Du bist daran interessiert was zu deinen Seelenaufgaben zählt. Du möchtest deinen Weg wieder finden und verschiede Themen in deinen Leben genauer unter die Lupe nehmen.'
			},
			{
				question: 'Findet ein Vorgespräch statt?',
				answer: 'Ein Vorgespräch ist nicht unbedingt erforderlich, jedoch kannst du mir deine Fragen, die du bereits im Vorfeld hast, gerne mitteilen. ' +
					'Somit lasse ich diese in mein Channeling mit einfließen.'
			},
			{
				question: 'Was bekomme ich in der Sitzung?',
				answer: 'Am Ende unserer Sitzung erhältst du die gesamte Sitzung als Video und den Bericht der Sitzung in schriftlicher Form per E-Mail zugeschickt.'
			},
			{
				question: 'Wie lange dauert eine Sitzung und was kostet sie?',
				answer: 'Die Dauer einer Seelenwegsitzung beträgt in etwa 1 Stunde bis 1Stunde 30 Minuten. Die Kosten einer Sitzung beträgt 250€ + MwSt.'
			},
		],
		active: false
	}
];

@customElement('faqs-component')
export class FaqsComponent extends LitElement {
	@state() isActive!: boolean;

	faqsArray = sampleData;

	private toggleAccordion(index: number) {
		const content: any = this.shadowRoot?.querySelector(`#content-${index}`);
		const icon: any = this.shadowRoot?.querySelector(`#icon-${index}`);

		const downSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    `;

		const upSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path fill-rule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
      </svg>
    `;

		if (content.style.maxHeight && content.style.maxHeight !== '0px') {
			content.style.maxHeight = '0';
			icon.innerHTML = downSVG;
		} else {
			content.style.maxHeight = content.scrollHeight + 'px';
			icon.innerHTML = upSVG;
		}
	}

	private closeAndChange(id: string) {
		this.shadowRoot?.querySelectorAll('.content').forEach((element: any) => element.style.maxHeight > '0px' && this.toggleAccordion((element.id).replace(/^\D+/g, '')));
		setTimeout(() => {
			this.handleQuestionsChange(id);
		}, 300);
	}

	private handleQuestionsChange(id: string) {
		this.faqsArray.map((item) => item.active = false);
		const activeItem = this.faqsArray.find((item) => item.id === id);
		activeItem!.active = true;
		this.requestUpdate('faqsArray');
	}

	get displayedQuestions() {
		return this.faqsArray.find((item) => item.active === true)?.data;
	}

	override render() {
		return html`
			<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
				<div class="mx-auto max-w-4xl">
					<h2 class="mb-20 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl">Häufig gestellte Fragen</h2>
					<div class="mb-16">
						<div class="grid grid-cols-1 sm:hidden">
							<select aria-label="Select a tab" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" @change=${(e: any) => this.closeAndChange(e.target.value)}>
								${this.faqsArray.map(({id, label, active}) => html`
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
									${this.faqsArray.map(({id, label, active}) => html`
										<div
											id=${id}
											class="w-1/4 border-b-2 px-1 py-4 text-center text-lg font-medium ${active ? 'border-teal-500 text-teal-600 cursor-pointer' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer'}"
											@click=${() => this.closeAndChange(id)}
										>${label}</div>
									`)}
								</nav>
							</div>
						</div>
					</div>

					${this.displayedQuestions?.map(({question, answer}, i) => html`
						<div class="border-b border-slate-200">
							<button @click=${() => this.toggleAccordion(i+1)} class="faq w-full flex justify-between items-center py-5 text-gray-900 cursor-pointer">
								<span>${question}</span>
								<span id=${'icon-' + (i+1)} class="text-gray-900 transition-transform duration-300">
					      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
					        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					      </svg>
					    </span>
							</button>
							<div id=${'content-' + (i+1)} class="content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
								<div class="pb-5 text-sm text-gray-600">${answer}</div>
							</div>
						</div>
					`)}
				</div>
			</div>
    `;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'faqs-component': FaqsComponent;
	}
}