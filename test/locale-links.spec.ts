import { describe, expect, it } from 'vitest'
import { localizedPath, otherLocale, stripLocale } from '../src/i18n/locale.ts'

/**
 * The language switcher builds its href from the route it is currently on. These cover the mapping it
 * relies on, including the query string a deep-linked contact page carries.
 */
function switcherTarget(currentLocation: string, currentLocale: 'de' | 'en') {
	const queryStart = currentLocation.indexOf('?')
	const pathname = queryStart === -1 ? currentLocation : currentLocation.slice(0, queryStart)
	const search = queryStart === -1 ? '' : currentLocation.slice(queryStart)
	return localizedPath(stripLocale(pathname), otherLocale(currentLocale)) + search
}

describe('language switcher target', () => {
	it('stays on the same page when switching from German to English', () => {
		expect(switcherTarget('/services', 'de')).toBe('/en/services')
		expect(switcherTarget('/about', 'de')).toBe('/en/about')
		expect(switcherTarget('/impressum', 'de')).toBe('/en/impressum')
	})

	it('stays on the same page when switching from English to German', () => {
		expect(switcherTarget('/en/services', 'en')).toBe('/services')
		expect(switcherTarget('/en/about', 'en')).toBe('/about')
	})

	it('maps the home page both ways', () => {
		expect(switcherTarget('/', 'de')).toBe('/en')
		expect(switcherTarget('/en', 'en')).toBe('/')
	})

	it('keeps a query string, so a preselected service survives the switch', () => {
		expect(switcherTarget('/contact?service=mb', 'de')).toBe('/en/contact?service=mb')
		expect(switcherTarget('/en/contact?service=mb', 'en')).toBe('/contact?service=mb')
	})

	it('round-trips every route without drifting', () => {
		for(const path of ['/', '/about', '/services', '/gallery', '/contact', '/agb']) {
			const toEnglish = switcherTarget(path, 'de')
			expect(switcherTarget(toEnglish, 'en'), path).toBe(path)
		}
	})
})
