import { msg } from '@lit/localize'
import { getLocale, localizedPath, stripLocale, type Locale } from '../i18n/locale.ts'

const siteOrigin = 'https://seelen-stimme.at'

type PageMeta = { title: string; description: string }

export function getPageMeta(): Record<string, PageMeta> {
	return {
		'/': {
			title: msg('Seelenstimme – Spirituelle Begleitung & Jenseitskontakte'),
			description: msg(
				'Stefana Gyorgiev begleitet dich medial und einfühlsam: Jenseitskontakte, Aura-Reading, Seelenweg, Krafttierbilder und mediale Beratung im Burgenland und online.',
			),
		},
		'/about': {
			title: msg('Über mich – Seelenstimme'),
			description: msg(
				'Wie ich zur medialen Arbeit gekommen bin: mein Weg als Jenseitsmedium und spirituelle Begleiterin.',
			),
		},
		'/services': {
			title: msg('Leistungen – Seelenstimme'),
			description: msg(
				'Jenseitskontakt, Aura-Reading, Seelenweg, Krafttierbilder, medialer Übungszirkel, Einzelcoaching und mediale Beratung – mit Dauer und Preisen.',
			),
		},
		'/gallery': {
			title: msg('Galerie – Krafttierbilder'),
			description: msg(
				'Eine Auswahl medial empfangener Krafttierbilder – jedes Bild individuell gestaltet und mit Echtheitssiegel.',
			),
		},
		'/contact': {
			title: msg('Kontakt & Terminanfrage – Seelenstimme'),
			description: msg(
				'Sende eine unverbindliche Terminanfrage für Jenseitskontakt, Aura-Reading, Seelenweg oder mediale Beratung – ich melde mich in Kürze bei dir.',
			),
		},
		'/impressum': {
			title: msg('Impressum – Seelenstimme'),
			description: msg(
				'Anbieterkennzeichnung gemäß § 5 ECG: Name, Adresse und Kontaktdaten der Betreiberin von seelen-stimme.at.',
			),
		},
		'/datenschutz': {
			title: msg('Datenschutzerklärung – Seelenstimme'),
			description: msg(
				'Welche personenbezogenen Daten seelen-stimme.at verarbeitet, zu welchem Zweck, auf welcher Rechtsgrundlage und welche Rechte dir dabei zustehen.',
			),
		},
		'/agb': {
			title: msg('AGB – Seelenstimme'),
			description: msg(
				'Allgemeine Geschäftsbedingungen für Sitzungen und Bilder: Leistungsumfang, Terminvereinbarung, Stornofristen, Zahlung und Haftung.',
			),
		},
		'/cookies': {
			title: msg('Cookie-Richtlinie – Seelenstimme'),
			description: msg(
				'Diese Website setzt keine Cookies. Was das für dich bedeutet und welche Dienste beim Absenden des Formulars beteiligt sind.',
			),
		},
	}
}

function getNotFoundMeta(): PageMeta {
	return {
		title: msg('Seite nicht gefunden – Seelenstimme'),
		description: msg('Diese Seite existiert nicht oder wurde verschoben.'),
	}
}

export function resolvePageMeta(pathname: string) {
	return getPageMeta()[stripLocale(pathname)] ?? getNotFoundMeta()
}

export function applyPageMeta(pathname: string) {
	const meta = resolvePageMeta(pathname)
	const locale = getLocale() as Locale
	const canonicalPath = stripLocale(pathname)
	const canonicalUrl = `${siteOrigin}${localizedPath(canonicalPath, locale)}`

	document.title = meta.title
	document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)

	const contentBySelector: Record<string, string> = {
		'meta[name="description"]': meta.description,
		'meta[property="og:title"]': meta.title,
		'meta[property="og:description"]': meta.description,
		'meta[property="og:url"]': canonicalUrl,
		'meta[property="og:locale"]': locale === 'en' ? 'en_GB' : 'de_AT',
	}

	for(const [selector, content] of Object.entries(contentBySelector)) {
		document.head.querySelector(selector)?.setAttribute('content', content)
	}

	applyAlternateLinks(canonicalPath, getPageMeta()[canonicalPath] !== undefined)
}

function applyAlternateLinks(canonicalPath: string, isKnownPage: boolean) {
	for(const link of document.head.querySelectorAll('link[rel="alternate"]')) link.remove()
	if(!isKnownPage) return

	const alternates: [string, string][] = [
		['de', `${siteOrigin}${canonicalPath}`],
		['en', `${siteOrigin}${localizedPath(canonicalPath, 'en')}`],
		['x-default', `${siteOrigin}${canonicalPath}`],
	]

	for(const [hreflang, href] of alternates) {
		const link = document.createElement('link')
		link.rel = 'alternate'
		link.hreflang = hreflang
		link.href = href
		document.head.append(link)
	}
}
