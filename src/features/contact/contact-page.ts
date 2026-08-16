import { LitElement, html, css, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { localized, msg, str } from '@lit/localize'
import tailwindCss from '../../tailwind/tailwindCss.ts'
import { findService, getBookableServices, getServices } from '../../data/services.ts'
import { getLocale } from '../../i18n/locale.ts'
import '../../components/ui/app-toast.ts'

const netlifyFormName = 'contact'

const whatsAppLink = 'https://wa.me/436602562563'

const toastDurationMs = 8000

const inputClasses =
	'block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600'

const showRequiredMessage = (event: Event, message: string) =>
	(event.currentTarget as HTMLInputElement).setCustomValidity(message)

const clearRequiredMessage = (event: Event) =>
	(event.currentTarget as HTMLInputElement).setCustomValidity('')

type TextField = {
	name: string
	label: string
	type: 'text' | 'email' | 'tel'
	autocomplete: AutoFill
	fullWidth: boolean
}

@localized()
@customElement('contact-page')
export class ContactPage extends LitElement {
	@state() private selectedServiceId = ''
	@state() private selectedDuration = ''
	@state() private isSubmitting = false
	@state() private toastOpen = false
	@state() private toastType: 'success' | 'error' = 'success'

	private toastTimer?: ReturnType<typeof setTimeout>

	override connectedCallback() {
		super.connectedCallback()

		const requested = findService(new URLSearchParams(window.location.search).get('service'))
		this.selectService(requested && !requested.isFullyBooked ? requested.id : getBookableServices()[0].id)
	}

	override disconnectedCallback() {
		clearTimeout(this.toastTimer)
		super.disconnectedCallback()
	}

	private get selectedService() {
		return findService(this.selectedServiceId) ?? getBookableServices()[0]
	}

	private selectService(id: string) {
		this.selectedServiceId = id
		this.selectedDuration = findService(id)?.durationOptions?.[0].value ?? ''
	}

	private async handleSubmit(event: Event) {
		event.preventDefault()
		const form = event.target as HTMLFormElement
		if(!form.reportValidity()) return

		this.isSubmitting = true
		const response = await fetch('/', {
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
		}).catch(() => null)
		this.isSubmitting = false

		if(!response?.ok) {
			this.showToast('error')
			return
		}

		this.showToast('success')
		form.reset()
		this.selectService(getBookableServices()[0].id)
	}

	private showToast(type: 'success' | 'error') {
		this.toastType = type
		this.toastOpen = true

		clearTimeout(this.toastTimer)
		this.toastTimer = setTimeout(() => (this.toastOpen = false), toastDurationMs)
	}

	override render() {
		const service = this.selectedService
		const durationOptions = service.durationOptions

		return html`
			<app-toast
				.open=${this.toastOpen}
				.type=${this.toastType}
				.heading=${this.toastType === 'success' ? msg('Nachricht gesendet') : msg('Sendefehler')}
				.message=${this.toastType === 'success'
					? msg('Vielen Dank! Ich habe deine Nachricht erhalten und melde mich in Kürze.')
					: msg(
							'Hoppla! Etwas ist schiefgelaufen. Bitte überprüfe deine Internetverbindung oder schreibe mir direkt per E-Mail.',
						)}
				@close=${() => (this.toastOpen = false)}
			></app-toast>

			<div class="relative isolate bg-white">
				<div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
					<div class="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
						<div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
							<div class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2" aria-hidden="true">
								<svg class="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
									<defs>
										<pattern id="contact-grid" width="200" height="200" x="100%" y="-1" patternUnits="userSpaceOnUse">
											<path d="M130 200V.5M.5 .5H200" fill="none" />
										</pattern>
									</defs>
									<rect width="100%" height="100%" stroke-width="0" fill="white" />
									<svg x="100%" y="-1" class="overflow-visible fill-gray-50">
										<path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
									</svg>
									<rect width="100%" height="100%" stroke-width="0" fill="url(#contact-grid)" />
								</svg>
							</div>

							<h1 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
								${msg('Sende mir einfach eine Nachricht')}
							</h1>

							<dl class="mt-10 space-y-4 text-base/7 text-gray-600">
								<div class="flex gap-x-4">
									<dt class="flex-none">
										<span class="sr-only">${msg('Adresse')}</span>
										<svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>
									</dt>
									<dd>Obere Hauptstrasse 109,<br />7537 Neuberg im Burgenland</dd>
								</div>
								<div class="flex gap-x-4">
									<dt class="flex-none">
										<span class="sr-only">${msg('Telefon')}</span>
										<svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
									</dt>
									<dd><a class="hover:text-gray-900" href="tel:+436602562563">+43 660 2562563</a></dd>
								</div>
								<div class="flex gap-x-4">
									<dt class="flex-none">
										<span class="sr-only">${msg('E-Mail')}</span>
										<svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
									</dt>
									<dd><a class="hover:text-gray-900" href="mailto:office.seelenstimme@gmail.com">office.seelenstimme@gmail.com</a></dd>
								</div>
							</dl>

							<a
								href=${whatsAppLink}
								target="_blank"
								rel="noopener"
								class="mt-8 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1da851] motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
							>
								<svg class="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path
										d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"
									/>
								</svg>
								${msg('Direkt über WhatsApp schreiben')}
							</a>
						</div>
					</div>

					<form
						name=${netlifyFormName}
						method="post"
						@submit=${this.handleSubmit}
						class="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
					>
						<div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
							<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
								${this.textFields().map((field) => this.renderTextField(field))}

								<div class="sm:col-span-2">
									<label for="service" class="required-field block text-sm/6 font-semibold text-gray-900">
										${msg('Leistung')}
									</label>
									<div class="mt-2.5">
										<select
											required
											id="service"
											class=${inputClasses}
											@invalid=${(event: Event) => showRequiredMessage(event, msg('Bitte wähle eine Leistung aus!'))}
											@input=${clearRequiredMessage}
											@change=${(event: Event) => this.selectService((event.target as HTMLSelectElement).value)}
										>
											${getServices().map(
												(option) => html`
													<option
														value=${option.id}
														?disabled=${option.isFullyBooked}
														.selected=${option.id === this.selectedServiceId}
													>
														${option.isFullyBooked
															? msg(str`${option.title} — zurzeit ausgebucht`)
															: option.title}
													</option>
												`,
											)}
										</select>
										<input type="hidden" name="service" .value=${service.title} />
									</div>
								</div>

								${durationOptions
									? html`
											<div class="sm:col-span-2">
												<label for="duration" class="required-field block text-sm/6 font-semibold text-gray-900">
													${msg('Dauer')}
												</label>
												<div class="mt-2.5">
													<select
														required
														id="duration"
														name="duration"
														class=${inputClasses}
														@invalid=${(event: Event) => showRequiredMessage(event, msg('Bitte wähle eine Dauer aus!'))}
														@input=${clearRequiredMessage}
														@change=${(event: Event) => (this.selectedDuration = (event.target as HTMLSelectElement).value)}
													>
														<option value="" disabled hidden>${msg('Bitte auswählen')}</option>
														${durationOptions.map(
															(option) => html`<option
																value=${option.value}
																.selected=${option.value === this.selectedDuration}
															>
																${option.label} – ${option.price}
															</option>`,
														)}
													</select>
												</div>
												<input
													type="hidden"
													name="preis"
													.value=${durationOptions.find((option) => option.value === this.selectedDuration)?.price ?? ''}
												/>
											</div>
										`
									: nothing}

								${service.id === 'oz'
									? html`
											<div class="sm:col-span-2">
												<label for="zirkel-level" class="block text-sm/6 font-semibold text-gray-900">
													${msg('Erfahrungsniveau')}
												</label>
												<div class="mt-2.5">
													<select id="zirkel-level" name="zirkel-level" class=${inputClasses}>
														<option value="Einsteiger">${msg('Einsteiger')}</option>
														<option value="Fortgeschritten">${msg('Fortgeschritten')}</option>
													</select>
												</div>
											</div>
										`
									: nothing}

								<div class="sm:col-span-2">
									<label for="message" class="block text-sm/6 font-semibold text-gray-900">${msg('Nachricht')}</label>
									<div class="mt-2.5">
										<textarea name="message" id="message" rows="4" class=${inputClasses}></textarea>
									</div>
								</div>

								<div class="sm:col-span-2 flex gap-x-3">
									<div class="flex h-6 items-center">
										<input
											required
											type="checkbox"
											id="privacy-consent"
											name="datenschutz-zustimmung"
											value="Zugestimmt"
											class="size-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
											@invalid=${(event: Event) =>
												showRequiredMessage(event, msg('Bitte stimme der Datenschutzerklärung zu!'))}
											@change=${clearRequiredMessage}
										/>
									</div>
									<label for="privacy-consent" class="text-sm/6 text-gray-600">
										${msg(html`Ich habe die
											<a href="/datenschutz" target="_blank" rel="noopener" class="font-semibold text-teal-700 underline"
												>Datenschutzerklärung</a
											>
											gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung dieser Anfrage zu.`)}
									</label>
								</div>
							</div>

							<div class="mt-8 flex justify-end">
								<button
									type="submit"
									?disabled=${this.isSubmitting}
									class="rounded-md bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500 inline-flex items-center justify-center px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] motion-safe:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
								>
									${this.isSubmitting ? msg('Wird gesendet …') : msg('Nachricht senden')}
								</button>
							</div>

							<div class="mt-8 rounded-md border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-gray-700">
								<p>
									${msg(html`<strong>Wichtiger Hinweis zur Terminabsage:</strong> Gebuchte Termine sind verbindlich.
										Sollten Sie einen vereinbarten Termin nicht wahrnehmen und nicht mindestens 24 Stunden vorher
										absagen, wird der volle Preis der gebuchten Leistung als Ausfallgebühr in Rechnung gestellt.`)}
								</p>
							</div>

							<div class="mt-8 text-gray-500 text-sm">
								<p>
									${msg(html`<strong>Hinweis</strong>: Meine Angebote dienen der spirituellen Begleitung und ersetzen
										keine medizinische, psychologische oder therapeutische Behandlung. Es werden keine Diagnosen
										gestellt und keine Heilversprechen gegeben.`)}
								</p>
							</div>
						</div>

						<input type="hidden" name="form-name" value=${netlifyFormName} />
						<input type="hidden" name="subject" .value=${msg(str`Neue Anfrage: ${service.title}`)} />
						<input type="hidden" name="sprache" .value=${getLocale()} />
						<input type="text" name="bot-field" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
					</form>
				</div>
			</div>
		`
	}

	private textFields(): TextField[] {
		return [
			{ name: 'first-name', label: msg('Vorname'), type: 'text', autocomplete: 'given-name', fullWidth: false },
			{ name: 'last-name', label: msg('Nachname'), type: 'text', autocomplete: 'family-name', fullWidth: false },
			{ name: 'email', label: msg('E-Mail'), type: 'email', autocomplete: 'email', fullWidth: true },
			{ name: 'phone-number', label: msg('Telefonnummer'), type: 'tel', autocomplete: 'tel', fullWidth: true },
			{ name: 'address', label: msg('Anschrift'), type: 'text', autocomplete: 'street-address', fullWidth: true },
		]
	}

	private renderTextField({ name, label, type, autocomplete, fullWidth }: TextField) {
		return html`
			<div class=${fullWidth ? 'sm:col-span-2' : ''}>
				<label for=${name} class="required-field block text-sm/6 font-semibold text-gray-900">${label}</label>
				<div class="mt-2.5">
					<input
						required
						type=${type}
						id=${name}
						name=${name}
						autocomplete=${autocomplete}
						class=${inputClasses}
						@invalid=${(event: Event) => showRequiredMessage(event, msg('Dieses Feld ist erforderlich!'))}
						@input=${clearRequiredMessage}
					/>
				</div>
			</div>
		`
	}

	static override styles = [
		tailwindCss,
		css`
			.required-field::after {
				content: ' *';
			}
		`,
	]
}

declare global {
	interface HTMLElementTagNameMap {
		'contact-page': ContactPage;
	}
}
