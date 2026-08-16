import { configureLocalization } from '@lit/localize'
import { allLocales, sourceLocale, targetLocales } from '../generated/locale-codes.ts'

export type Locale = (typeof allLocales)[number]

export const localeLabels: Record<Locale, string> = {
	de: 'Deutsch',
	en: 'English',
}

const { getLocale, setLocale } = configureLocalization({
	sourceLocale,
	targetLocales,
	loadLocale: (locale) => import(`../generated/locales/${locale}.ts`),
})

export { getLocale }

export async function activateLocale(locale: Locale) {
	if(locale !== getLocale()) await setLocale(locale)

	document.documentElement.lang = locale
	window.dispatchEvent(new CustomEvent('seelenstimme-locale-changed'))
}

export function otherLocale(locale: Locale): Locale {
	return locale === 'de' ? 'en' : 'de'
}

/**
 * German is served from the bare paths and English from an `/en` prefix, so the URL alone decides the
 * language. Nothing is persisted: a link or bookmark already carries the locale.
 */
export function localeFromPath(pathname: string): Locale {
	const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
	return path === '/en' || path.startsWith('/en/') ? 'en' : sourceLocale
}

// Note: the trailing slash is not cosmetic — the host redirects /services to /services/, so every
// direct page load arrives with one and every path comparison here would otherwise miss.
export function stripLocale(pathname: string) {
	const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
	if(path === '/en' || path === '') return '/'
	return path.startsWith('/en/') ? path.slice(3) : path
}

export function localizedPath(path: string, locale: Locale) {
	if(locale === sourceLocale) return path
	return path === '/' ? '/en' : `/en${path}`
}
