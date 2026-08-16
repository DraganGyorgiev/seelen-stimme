import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import tailwindCss from '../../tailwind/tailwindCss.ts'

type FaqTopic = {
	id: string
	label: string
	entries: { question: string; answer: string }[]
}

function getTopics(): FaqTopic[] {
	return [
		{
			id: 'jk',
			label: msg('Jenseitskontakt'),
			entries: [
				{
					question: msg('Wie gehe ich bei einem Jenseitskontakt vor?'),
					answer: msg(
						'Als beweisführendes Medium möchte ich keinerlei Vorinformationen von dir oder deinen Lieben erhalten – so stelle ich sicher, dass ich alle Informationen ausschließlich von deinem Lieben erhalte.\n\nZuallererst beschreibe ich dir deinen Lieben, damit du sicher sein kannst, dass es sich um die richtige Seele handelt. Danach erhältst du eine persönliche Botschaft oder auch mehrere Botschaften.\n\nIm Anschluss kannst du gerne 2–3 Fragen an deine liebe Seele stellen – oder auch an mich, falls noch Unklarheiten bestehen.',
					),
				},
				{
					question: msg('Wo findet die Jenseitssitzung statt?'),
					answer: msg(
						'Die Jenseitssitzung findet ausschließlich über Zoom oder WhatsApp statt. Bitte beachte, dass nur über Zoom eine Aufzeichnung der Sitzung möglich ist.',
					),
				},
			],
		},
		{
			id: 'sw',
			label: msg('Seelenweg'),
			entries: [
				{
					question: msg('Was ist ein Seelenweg?'),
					answer: msg(
						'Erkenne und finde wieder deinen Weg.\n\nEntfalte dein persönliches Potenzial.\n\nErlange Selbsterkenntnis und finde deinen inneren Frieden.\n\nFinde deine Berufung und Bestimmung heraus.\n\nDurchbrich wiederkehrende Muster in deinem Leben.',
					),
				},
				{
					question: msg('Ist der Seelenweg die richtige Auswahl für mich?'),
					answer: msg(
						'Du befindest dich in einer für dich aussichtslosen Situation und weißt im Moment nicht ein und aus. Du bist daran interessiert, was zu deinen Seelenaufgaben zählt. Du möchtest deinen Weg wiederfinden und verschiedene Themen in deinem Leben genauer unter die Lupe nehmen.',
					),
				},
				{
					question: msg('Findet ein Vorgespräch statt?'),
					answer: msg(
						'Ein Vorgespräch ist nicht unbedingt erforderlich. Du kannst mir deine Fragen, die du bereits im Vorfeld hast, aber gerne mitteilen – so lasse ich diese in mein Channeling einfließen.',
					),
				},
				{
					question: msg('Was bekomme ich in der Sitzung?'),
					answer: msg(
						'Am Ende unserer Sitzung erhältst du die gesamte Sitzung als Video und den Bericht der Sitzung in schriftlicher Form per E-Mail zugeschickt.',
					),
				},
			],
		},
	]
}

@localized()
@customElement('faqs-component')
export class FaqsComponent extends LitElement {
	@state() private activeTopicId = getTopics()[0].id

	private get activeTopic() {
		const topics = getTopics()
		return topics.find((topic) => topic.id === this.activeTopicId) ?? topics[0]
	}

	override render() {
		const topic = this.activeTopic
		const topics = getTopics()

		return html`
			<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
				<div class="mx-auto max-w-4xl">
					<h2 class="mb-20 text-center text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
						${msg('Häufig gestellte Fragen')}
					</h2>

					<div class="mb-16 sm:hidden">
						<label for="faq-topic" class="sr-only">${msg('Thema auswählen')}</label>
						<select
							id="faq-topic"
							class="w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900"
							@change=${(event: Event) => (this.activeTopicId = (event.target as HTMLSelectElement).value)}
						>
							${topics.map(
								(option) => html`<option value=${option.id} .selected=${option.id === this.activeTopicId}>
									${option.label}
								</option>`,
							)}
						</select>
					</div>

					<div class="mb-16 hidden sm:block">
						<div role="tablist" aria-label=${msg('FAQ-Themen')} class="-mb-px flex justify-center border-b border-gray-200">
							${topics.map(
								(option) => html`
									<button
										type="button"
										role="tab"
										id=${`faq-tab-${option.id}`}
										aria-selected=${option.id === this.activeTopicId}
										aria-controls="faq-panel"
										class="cursor-pointer border-b-2 px-6 py-4 text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${option.id ===
										this.activeTopicId
											? 'border-teal-500 text-teal-600'
											: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
										@click=${() => (this.activeTopicId = option.id)}
									>
										${option.label}
									</button>
								`,
							)}
						</div>
					</div>

					<div id="faq-panel" role="tabpanel" aria-labelledby=${`faq-tab-${topic.id}`}>
						${topic.entries.map(
							(entry) => html`
								<details class="group border-b border-slate-200">
									<summary
										class="flex cursor-pointer items-center justify-between py-5 text-gray-900 marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
									>
										<span>${entry.question}</span>
										<svg
											class="size-4 shrink-0 transition-transform duration-300 group-open:rotate-180"
											viewBox="0 0 16 16"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
												clip-rule="evenodd"
											/>
										</svg>
									</summary>
									<p class="pb-5 text-sm whitespace-pre-line text-gray-600">${entry.answer}</p>
								</details>
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
		'faqs-component': FaqsComponent;
	}
}
