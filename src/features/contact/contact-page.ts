import { LitElement, html, css } from 'lit-element';
import { customElement, state } from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";
import { repeat } from "lit/directives/repeat.js";
import "../../components/ui/app-button.ts";
import "../../components/ui/app-toast.ts"; // Ensure this path is correct

const options: { id: string, value: string, duration?: { label: string; price: string }[]; }[] = [
	{ id: 'jk', value: 'Jenseitskontakt' },
	{ id: 'ar', value: 'Aura-reading' },
	{ id: 'sw', value: 'Seelenweg' },
	{ id: 'sb', value: 'Seelenbilder' },
	{ id: 'kb', value: 'Krafttierbilder' },
	{ id: 'gp', value: 'Geistführer-Portraits' },
	{ id: 'oz', value: 'Medialer Übungszirkel' },
	{
		id: 'ec',
		value: 'Einzelcoaching',
		duration: [
			{ label: '60 Minuten', price: '100 EUR' },
			{ label: '90 Minuten', price: '150 EUR' }
		]
	},
	{
		id: 'mb',
		value: 'Mediale Beratung',
		duration: [
			{ label: '30 Minuten', price: '50 EUR' },
			{ label: '60 Minuten', price: '100 EUR' }
		]
	},
	{  id: 'kg',  value: 'Kostenloses Kennenlerngespräch'  }
]

@customElement('contact-page')
export class ContactPage extends LitElement {
	@state() selectedOption = options[0].id;
	@state() selectedServiceLabel = options[0].value;
	@state() selectedDuration = '';
	@state() zirkelLevel = '';

	// Feedback states
	@state() isSubmitting = false;
	@state() toastOpen = false;
	@state() toastType: 'success' | 'error' = 'success';
	@state() toastTitle = '';
	@state() toastMessage = '';

	protected firstUpdated() {
		const params = new URLSearchParams(window.location.search);
		const service = params.get('service');

		if (service && options.some(o => o.id === service)) {
			this.selectedOption = service;
			const match = options.find(o => o.id === service);
			this.selectedServiceLabel = match?.value ?? '';
		}
	}

	private async handleSubmit(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		if (!form.reportValidity()) return;

		this.isSubmitting = true;
		const formData = new FormData(form);

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json'
				}
			});

			if (response.ok) {
				this.triggerToast('success', 'Nachricht gesendet', 'Vielen Dank! Ich habe deine Nachricht erhalten und melde mich in Kürze.');
				form.reset();
				this.selectedOption = options[0].id;
				this.selectedServiceLabel = options[0].value;
				this.selectedDuration = '';
			} else {
				throw new Error('Server returned error');
			}
		} catch (error) {
			console.error(error);
			this.triggerToast('error', 'Sendefehler', 'Hoppla! Etwas ist schiefgelaufen. Bitte überprüfe deine Internetverbindung oder schreibe mir direkt per E-Mail.');
		} finally {
			this.isSubmitting = false;
		}
	}

	private triggerToast(type: 'success' | 'error', title: string, message: string) {
		this.toastType = type;
		this.toastTitle = title;
		this.toastMessage = message;
		this.toastOpen = true;
		setTimeout(() => { this.toastOpen = false; }, 6000);
	}

	// ... (Keep existing selection handlers onServiceChange etc.)
	private onServiceChange(e: Event) {
		const id = (e.target as HTMLSelectElement).value;
		this.selectedOption = id;
		const match = options.find(o => o.id === id);
		this.selectedServiceLabel = match?.value ?? '';
		this.selectedDuration = '';
		if (match?.duration && match.duration.length !== 0) {
			this.selectedDuration = match.duration[0].label;
		}
	}

	private onDurationChange(e: Event) {
		this.selectedDuration = (e.target as HTMLSelectElement).value;
	}

	private get selectedService() {
		return options.find(o => o.id === this.selectedOption);
	}

	private get hasDuration() {
		return !!this.selectedService?.duration?.length;
	}

	override render() {
		const service = this.selectedService;
		const showDuration = this.hasDuration && service?.duration;

		return html`
			<full-layout>

				<div class="relative z-[60]">
					<app-toast
						.open=${this.toastOpen}
						.type=${this.toastType}
						.title=${this.toastTitle}
						.message=${this.toastMessage}
						@close=${() => this.toastOpen = false}
					></app-toast>
				</div>

				<div class="relative isolate bg-white">
					<div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
						<div class="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
							<div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
								<div class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
									<svg class="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
										<defs>
											<pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="100%" y="-1" patternUnits="userSpaceOnUse">
												<path d="M130 200V.5M.5 .5H200" fill="none" />
											</pattern>
										</defs>
										<rect width="100%" height="100%" stroke-width="0" fill="white" />
										<svg x="100%" y="-1" class="overflow-visible fill-gray-50">
											<path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
										</svg>
										<rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
									</svg>
								</div>
								<h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Sende mir einfach eine Nachricht</h2>
								<dl class="mt-10 space-y-4 text-base/7 text-gray-600">
									<div class="flex gap-x-4">
										<dt class="flex-none"><span class="sr-only">Address</span>
											<svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>
										</dt>
										<dd>Obere Hauptstrasse 109,<br>7537 Neuberg im Burgenland</dd>
									</div>
									<div class="flex gap-x-4">
										<dt class="flex-none"><span class="sr-only">Telephone</span>
											<svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
										</dt>
										<dd><a class="hover:text-gray-900" href="tel:+436602562563">+436602562563</a></dd>
									</div>
									<div class="flex gap-x-4">
										<dt class="flex-none"><span class="sr-only">Email</span>
											<svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
										</dt>
										<dd><a class="hover:text-gray-900" href="mailto:office.seelenstimme@gmail.com">office.seelenstimme@gmail.com</a></dd>
									</div>
								</dl>
							</div>
						</div>

						<form
							action="https://formsubmit.co/office.seelenstimme@gmail.com"
							method="POST"
							@submit="${this.handleSubmit}"
							class="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
						>
							<div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
								<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
									<div>
										<label for="first-name" class="input-field block text-sm/6 font-semibold text-gray-900">Vorname</label>
										<div class="mt-2.5">
											<input required @invalid=${(e: any) => e.currentTarget.setCustomValidity('Dieses Feld ist erforderlich!')} @input=${(e: any) => e.currentTarget.setCustomValidity('')} type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600">
										</div>
									</div>
									<div>
										<label for="last-name" class="input-field block text-sm/6 font-semibold text-gray-900">Nachname</label>
										<div class="mt-2.5">
											<input required @invalid=${(e: any) => e.currentTarget.setCustomValidity('Dieses Feld ist erforderlich!')} @input=${(e: any) => e.currentTarget.setCustomValidity('')} type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600">
										</div>
									</div>
									<div class="sm:col-span-2">
										<label for="email" class="input-field block text-sm/6 font-semibold text-gray-900">E-Mail</label>
										<div class="mt-2.5">
											<input required @invalid=${(e: any) => e.currentTarget.setCustomValidity('Dieses Feld ist erforderlich!')} @input=${(e: any) => e.currentTarget.setCustomValidity('')} type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600">
										</div>
									</div>
									<div class="sm:col-span-2">
										<label for="phone-number" class="input-field block text-sm/6 font-semibold text-gray-900">Telefonnummer</label>
										<div class="mt-2.5">
											<input required @invalid=${(e: any) => e.currentTarget.setCustomValidity('Dieses Feld ist erforderlich!')} @input=${(e: any) => e.currentTarget.setCustomValidity('')} type="tel" name="phone-number" id="phone-number" autocomplete="tel" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600">
										</div>
									</div>
									<div class="sm:col-span-2">
										<label for="address" class="input-field block text-sm/6 font-semibold text-gray-900">Anschrift</label>
										<div class="mt-2.5">
											<input required @invalid=${(e: any) => e.currentTarget.setCustomValidity('Dieses Feld ist erforderlich!')} @input=${(e: any) => e.currentTarget.setCustomValidity('')} type="text" name="address" id="address" autocomplete="address" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600">
										</div>
									</div>
									<div class="sm:col-span-2">
										<label for="service" class="input-field block text-sm/6 font-semibold text-gray-900">Leistung</label>
										<div class="mt-2.5">
											<select required @invalid=${(e: any) => e.currentTarget.setCustomValidity('Dieses Feld ist erforderlich!')} @change=${this.onServiceChange} name="service_id" id="service" .value=${this.selectedOption} class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600">
												${repeat(options, (option) => option.id, ({id, value}) => html`<option value=${id}>${value}</option>`)}
											</select>
											<input type="hidden" name="service" .value=${this.selectedServiceLabel} />
										</div>
									</div>
									${showDuration ? html`
										<div class="sm:col-span-2">
											<label for="duration" class="input-field block text-sm/6 font-semibold text-gray-900">Dauer</label>
											<div class="mt-2.5">
												<select required @invalid=${(e: any) => e.currentTarget.setCustomValidity('Bitte wähle eine Dauer aus!')} @input=${(e: any) => e.currentTarget.setCustomValidity('')} @change=${this.onDurationChange} name="duration" id="duration" .value=${this.selectedDuration} class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600">
													<option value="" disabled hidden>Bitte auswählen</option>
													${service.duration!.map((dur) => html`<option value=${dur.label}>${dur.label} – ${dur.price}</option>`)}
												</select>
											</div>
											<input type="hidden" name="duration_price" .value=${service.duration!.find(d => d.label === this.selectedDuration)?.price || ''} />
										</div>
									` : ''}
									${service!.id === 'oz' ? html`
										<label for="zirkel-level" class="block text-sm font-medium text-gray-700">Erfahrungsniveau</label>
										<select id="zirkel-level" name="zirkel-level" class="mt-1 block w-full rounded-md rounded-md bg-white text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600" @change=${(e: any) => this.zirkelLevel = e.target.value}>
											<option value="beginner">Einsteiger</option>
											<option value="advanced">Fortgeschritten</option>
										</select>
									` : null}
									<div class="sm:col-span-2">
										<label for="message" class="block text-sm/6 font-semibold text-gray-900">Nachricht</label>
										<div class="mt-2.5">
											<textarea name="message" id="message" rows="4" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600"></textarea>
										</div>
									</div>
								</div>
								<div class="mt-8 flex justify-end">
									<button type="submit" .disabled=${this.isSubmitting} class="rounded-md bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500 inline-flex items-center justify-center px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] motion-safe:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed">
										${this.isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
									</button>
								</div>
								<div class="mt-8 text-gray-500 text-sm letter-spacing">
									<p><strong>Hinweis</strong>: Meine Angebote dienen der spirituellen Begleitung und ersetzen keine medizinische, psychologische oder therapeutische Behandlung. Es werden keine Diagnosen gestellt und keine Heilversprechen gegeben.</p>
								</div>
							</div>

							<input type="hidden" name="_subject" value="Neue Anfrage für ${service?.value}">
							<input type="hidden" name="_captcha" value="false">
							<input type="hidden" name="bot-field">
						</form>
					</div>
				</div>
			</full-layout>
		`;
	}

	static override styles = [tailwindCss, css`
		.input-field::after {
			content: " *";
		}
	`];
}

declare global {
	interface HTMLElementTagNameMap {
		'contact-page': ContactPage;
	}
}