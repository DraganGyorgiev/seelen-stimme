import JK from '../assets/Jenseits.jpg';
import AR from '../assets/Aura-reading.jpg';
import SW from '../assets/Seelenweg.jpg';
import SB from '../assets/Seelenbild.png';
import KB from '../assets/Krafttierbild.jpeg';
import GP from '../assets/Geistführer-Portrait.jpg';
import OZ from '../assets/Online-Zirkel.jpg';
import EC from '../assets/Einzelcoaching.jpeg';
import MB from '../assets/Mediale-Beratung.jpg';
import KG from '../assets/Kostenloses-Kennenlerngespräch.jpeg';

export type Service = {
	id: string;
	title: string;
	subtitle: string;
	image: string;
	description: string;
	duration?: string;
	price?: string;
	hasGallery?: boolean;
};

export const services: Service[] = [
	{
		id: 'jk',
		title: 'Jenseitskontakt',
		subtitle: 'Nehmen Sie Kontakt mit Ihren Lieben im Jenseits auf.',
		image: JK,
		description:
			'In einem geschützten und achtsamen Raum verbinde ich mich mit der Geistigen Welt, um Botschaften Ihrer Lieben aus dem Jenseits zu übermitteln. Diese Sitzung kann Trost, Klarheit und neue Perspektiven schenken.',
		duration: '60 Minuten',
		price: '150 EUR + MwSt'
	},
	{
		id: 'ar',
		title: 'Aura-Reading',
		subtitle: 'Sich und seine Mitmenschen tiefer verstehen.',
		image: AR,
		description:
			'Aura-Reading basiert auf der Wahrnehmung des energetischen Feldes eines Menschen.',
		duration: '60 Minuten',
		price: '150 EUR + MwSt'
	},
	{
		id: 'sw',
		title: 'Seelenweg',
		subtitle: 'Tiefe, einfühlsame Begleitung, die über das Alltägliche hinausgeht: In respektvoller Verbindung mit der Seele selbst entstehen Klarheit, Heilung und Ausrichtung – ein Gespräch, das nicht nur den Verstand, sondern das innerste Wesen berührt und erinnert.',
		image: SW,
		description:
			'In der Seelenweg-Begleitung findest du klare Antworten auf die tiefsten Fragen deiner Seele.\n' +
			'Gemeinsam schauen wir auf deine aktuellen Lebensthemen, Seelenaufgaben und nächsten Entwicklungsschritte – einfühlsam, tiefgehend und immer lösungsorientiert.',
		duration: '60 Minuten',
		price: '250 EUR + MwSt'
	},
	{
		id: 'sb',
		title: 'Seelenbilder',
		subtitle: 'Ein energetisches Bild deiner Seele.',
		image: SB,
		description:
			'Seelenbilder entstehen aus der Verbindung mit der Geistigen Welt und zeigen energetische Themen, Seelenanteile und innere Prozesse in bildlicher Form.',
		price: 'ab 150 EUR + MwSt',
		hasGallery: true
	},
	{
		id: 'kb',
		title: 'Krafttierbilder',
		subtitle: 'Dein spiritueller Begleiter in Bildform.',
		image: KB,
		description:
			'Krafttierbilder zeigen dein persönliches Krafttier und dessen Botschaft. Sie stärken deine Verbindung zu deiner inneren Kraft und unterstützen dich auf deinem Weg.',
		price: 'ab 50 EUR + MwSt',
		hasGallery: true
	},
	{
		id: 'gp',
		title: 'Geistführer-Portraits',
		subtitle: 'Ein Blick auf deinen geistigen Begleiter.',
		image: GP,
		description:
			'Geistführer-Portraits entstehen aus medialer Wahrnehmung und zeigen deinen geistigen Begleiter in einer individuellen Darstellung.',
		price: '60 EUR + MwSt',
		hasGallery: true
	},
	{
		id: 'oz',
		title: 'Medialer Übungszirkel',
		subtitle: 'Gemeinsam üben und wachsen.',
		image: OZ,
		description:
			'Der mediale Übungszirkel bietet Raum, um die eigene Wahrnehmung zu schulen, sich auszutauschen und gemeinsam spirituell zu wachsen. Dieser Zirkel ist sowohl für Einsteiger als auch für Fortgeschrittene geeignet.',
		duration: '2 Stunden',
		price: '20 EUR + MwSt'
	},
	{
		id: 'ec',
		title: 'Einzelcoaching',
		subtitle: 'Individuelle Begleitung auf deinem Weg.',
		image: EC,
		description:
			'Im Einzelcoaching widmen wir uns gezielt deinen persönlichen Themen. Die Sitzung wird individuell auf dich und deine Bedürfnisse abgestimmt.',
		duration: '60 - 90 Minuten',
		price: 'ab 100 EUR + MwSt'
	},
	{
		id: 'mb',
		title: 'Mediale Beratung',
		subtitle: 'Klarheit und Impulse aus der Geistigen Welt.',
		image: MB,
		description:
			'Die mediale Beratung bietet dir Antworten, Impulse und Orientierung zu aktuellen Lebensfragen – empathisch, achtsam und lösungsorientiert.',
		duration: '30–60 Minuten',
		price: 'ab 50 EUR + MwSt'
	},
	{
		id: 'kg',
		title: 'Kostenloses Kennenlerngespräch',
		subtitle: 'Unverbindlich kennenlernen und deine Fragen klären.',
		image: KG,
		description:
			'In einem kurzen, unverbindlichen Gespräch lernen wir uns kennen und besprechen dein Anliegen. Du kannst herausfinden, welches Angebot für dich passend ist und ob die Zusammenarbeit für dich stimmig ist.',
		duration: '30 Minuten',
		price: 'Kostenlos'
	},
];
