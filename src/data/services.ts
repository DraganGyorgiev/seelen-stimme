import { msg } from '@lit/localize'
import JK from '../assets/Jenseits.webp'
import AR from '../assets/Aura-reading.webp'
import SW from '../assets/Seelenweg.webp'
import KB from '../assets/Krafttierbild.webp'
import OZ from '../assets/Online-Zirkel.webp'
import EC from '../assets/Einzelcoaching.webp'
import MB from '../assets/Mediale-Beratung.webp'

export type DurationOption = {
	value: string
	label: string
	price: string
}

export type Service = {
	id: string
	title: string
	subtitle: string
	image: string
	description: string
	duration?: string
	price?: string
	durationOptions?: DurationOption[]
	hasGallery?: boolean
	isFullyBooked?: boolean
}

export function getServices(): Service[] {
	return [
		{
			id: 'jk',
			title: msg('Jenseitskontakt'),
			subtitle: msg('Nehmen Sie Kontakt mit Ihren Lieben im Jenseits auf.'),
			image: JK,
			description: msg(
				'In einem geschützten und achtsamen Raum verbinde ich mich mit der Geistigen Welt, um Botschaften Ihrer Lieben aus dem Jenseits zu übermitteln. Diese Sitzung kann Trost, Klarheit und neue Perspektiven schenken.',
			),
			duration: msg('60 Minuten'),
			price: msg('150 EUR'),
			isFullyBooked: true,
		},
		{
			id: 'ar',
			title: msg('Aura-Reading'),
			subtitle: msg('Sich und seine Mitmenschen tiefer verstehen.'),
			image: AR,
			description: msg('Aura-Reading basiert auf der Wahrnehmung des energetischen Feldes eines Menschen.'),
			duration: msg('60 Minuten'),
			price: msg('150 EUR'),
		},
		{
			id: 'sw',
			title: msg('Seelenweg'),
			subtitle: msg(
				'Tiefe, einfühlsame Begleitung, die über das Alltägliche hinausgeht: In respektvoller Verbindung mit der Seele selbst entstehen Klarheit, Heilung und Ausrichtung – ein Gespräch, das nicht nur den Verstand, sondern das innerste Wesen berührt und erinnert.',
			),
			image: SW,
			description: msg(
				'In der Seelenweg-Begleitung findest du klare Antworten auf die tiefsten Fragen deiner Seele. Gemeinsam schauen wir auf deine aktuellen Lebensthemen, Seelenaufgaben und nächsten Entwicklungsschritte – einfühlsam, tiefgehend und immer lösungsorientiert.',
			),
			duration: msg('60 Minuten'),
			price: msg('250 EUR'),
		},
		{
			id: 'kb',
			title: msg('Krafttierbilder'),
			subtitle: msg('Dein spiritueller Begleiter in Bildform.'),
			image: KB,
			description: msg(
				'Krafttierbilder zeigen dein persönliches Krafttier und dessen Botschaft. Sie stärken deine Verbindung zu deiner inneren Kraft und unterstützen dich auf deinem Weg.',
			),
			price: msg('ab 50 EUR'),
			hasGallery: true,
		},
		{
			id: 'oz',
			title: msg('Medialer Übungszirkel'),
			subtitle: msg('Gemeinsam üben und wachsen.'),
			image: OZ,
			description: msg(
				'Der mediale Übungszirkel bietet Raum, um die eigene Wahrnehmung zu schulen, sich auszutauschen und gemeinsam spirituell zu wachsen. Dieser Zirkel ist sowohl für Einsteiger als auch für Fortgeschrittene geeignet.',
			),
			duration: msg('2 Stunden'),
			price: msg('20 EUR'),
		},
		{
			id: 'ec',
			title: msg('Einzelcoaching'),
			subtitle: msg('Individuelle Begleitung auf deinem Weg.'),
			image: EC,
			description: msg(
				'Im Einzelcoaching widmen wir uns gezielt deinen persönlichen Themen. Die Sitzung wird individuell auf dich und deine Bedürfnisse abgestimmt.',
			),
			duration: msg('60 – 90 Minuten'),
			price: msg('ab 100 EUR'),
			durationOptions: [
				{ value: '60 Minuten', label: msg('60 Minuten'), price: '100 EUR' },
				{ value: '90 Minuten', label: msg('90 Minuten'), price: '150 EUR' },
			],
		},
		{
			id: 'mb',
			title: msg('Mediale Beratung'),
			subtitle: msg('Klarheit und Impulse aus der Geistigen Welt.'),
			image: MB,
			description: msg(
				'Die mediale Beratung bietet dir Antworten, Impulse und Orientierung zu aktuellen Lebensfragen – empathisch, achtsam und lösungsorientiert.',
			),
			duration: msg('30 – 90 Minuten'),
			price: msg('ab 60 EUR'),
			durationOptions: [
				{ value: '30 Minuten', label: msg('30 Minuten'), price: '60 EUR' },
				{ value: '50 Minuten', label: msg('50 Minuten'), price: '95 EUR' },
				{ value: '90 Minuten', label: msg('90 Minuten'), price: '165 EUR' },
			],
		},
	]
}

export function getBookableServices() {
	return getServices().filter((service) => !service.isFullyBooked)
}

export function findService(id: string | null) {
	return getServices().find((service) => service.id === id)
}
