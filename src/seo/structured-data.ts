import { getServices } from '../data/services.ts'
import { getFaqTopics } from '../data/faqs.ts'
import { stripLocale } from '../i18n/locale.ts'

const siteOrigin = 'https://seelen-stimme.at'
const scriptId = 'structured-data'

const business = {
	'@type': 'LocalBusiness',
	'@id': `${siteOrigin}/#business`,
	name: 'Seelen-Stimme',
	description: 'Jenseitsmedium und spirituelle Begleitung',
	founder: { '@type': 'Person', name: 'Stefana Gyorgiev' },
	url: siteOrigin,
	telephone: '+436602562563',
	email: 'office.seelenstimme@gmail.com',
	image: `${siteOrigin}/og-image.png`,
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'Obere Hauptstrasse 109',
		postalCode: '7537',
		addressLocality: 'Neuberg im Burgenland',
		addressCountry: 'AT',
	},
	areaServed: [{ '@type': 'Country', name: 'Österreich' }, { '@type': 'Country', name: 'Deutschland' }],
	sameAs: ['https://www.facebook.com/profile.php?id=61571720355115'],
}

// Note: keep in step with the quotes rendered by customer-review; Google requires every review shown as
// a rich result to be visible on the page it is claimed from.
const reviews = [
	{ author: 'Iris Hoffner', body: 'Es hat alles gestimmt, sooo viele Informationen. Es war magisch!' },
	{ author: 'Birgit Steiner', body: 'So vieles, was gepasst hat, was kein Außenstehender wissen kann. Ich kann sie nur weiterempfehlen.' },
	{ author: 'Moni', body: 'Sie hat seinen Charakter genau beschrieben und mir Botschaften übermittelt, die genau passen.' },
	{ author: 'Traude', body: 'Es hat meine Erwartungen zu 1000% übertroffen. Die Nachricht hat mir sehr viel Trost gegeben.' },
	{ author: 'Manuela Eder', body: 'Sie wusste Dinge, die sie niemals wissen konnte, alles bis ins kleinste Detail beschrieben.' },
	{ author: 'Leonard Krasner', body: 'Alles war so stimmig und hat auch neue Erkenntnisse gebracht. Sie arbeitet sehr beweisführend.' },
]

export function applyStructuredData(pathname = window.location.pathname) {
	const offers = getServices().map((service) => ({
		'@type': 'Service',
		name: service.title,
		description: service.subtitle,
		serviceType: service.title,
		provider: { '@id': `${siteOrigin}/#business` },
		url: `${siteOrigin}/services#${service.id}`,
	}))

	const graph = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				...business,
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: '5',
					reviewCount: String(reviews.length),
					bestRating: '5',
				},
				review: reviews.map((review) => ({
					'@type': 'Review',
					author: { '@type': 'Person', name: review.author },
					reviewBody: review.body,
					reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
				})),
			},
			...offers,
			...faqPageFor(pathname),
		],
	}

	const existing = document.getElementById(scriptId)
	const script = existing ?? document.createElement('script')
	script.id = scriptId
	script.setAttribute('type', 'application/ld+json')
	script.textContent = JSON.stringify(graph)
	if(!existing) document.head.append(script)
}

// Note: Google only accepts FAQPage markup on a page where the answers are actually visible, so this
// is emitted on the FAQ route alone rather than site-wide.
function faqPageFor(pathname: string) {
	if(stripLocale(pathname) !== '/faq') return []

	return [
		{
			'@type': 'FAQPage',
			'@id': `${siteOrigin}/faq#faq`,
			mainEntity: getFaqTopics().flatMap((topic) =>
				topic.entries.map((entry) => ({
					'@type': 'Question',
					name: entry.question,
					acceptedAnswer: { '@type': 'Answer', text: entry.answer },
				})),
			),
		},
	]
}
