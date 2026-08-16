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
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : sourceLocale
}

export function stripLocale(pathname: string) {
	if(pathname === '/en') return '/'
	return pathname.startsWith('/en/') ? pathname.slice(3) : pathname
}

export function localizedPath(path: string, locale: Locale) {
	if(locale === sourceLocale) return path
	return path === '/' ? '/en' : `/en${path}`
}
