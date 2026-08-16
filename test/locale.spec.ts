import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { allLocales, sourceLocale, targetLocales } from '../src/generated/locale-codes.ts'
import { localeLabels, otherLocale } from '../src/i18n/locale.ts'
import { templates } from '../src/generated/locales/en.ts'

const xliff = readFileSync(new URL('../xliff/en.xlf', import.meta.url), 'utf8')
const sourceIds = [...xliff.matchAll(/<trans-unit id="([^"]+)">/g)].map(([, id]) => id)
const translatedIds = [...xliff.matchAll(/<target>/g)].length
const stringTemplates = Object.entries(templates).filter(
	([, template]) => typeof template === 'string',
) as [string, string][]

describe('locale configuration', () => {
	it('offers a label for every locale the switcher can reach', () => {
		for(const locale of allLocales) {
			expect(localeLabels[locale], locale).toBeTruthy()
		}
	})

	it('toggles between the two locales', () => {
		expect(otherLocale('de')).toBe('en')
		expect(otherLocale('en')).toBe('de')
	})

	it('treats German as the source locale and English as the only target', () => {
		expect(sourceLocale).toBe('de')
		expect(targetLocales).toEqual(['en'])
	})
})

describe('English translations', () => {
	it('translates every extracted message exactly once', () => {
		expect(sourceIds.length).toBeGreaterThan(0)
		expect(translatedIds).toBe(sourceIds.length)
	})

	it('ships a generated template for every extracted message', () => {
		expect(new Set(Object.keys(templates))).toEqual(new Set(sourceIds))
	})

	it('leaves no message untranslated in German', () => {
		const stillGerman = stringTemplates.filter(([, template]) =>
			/\b(und|oder|nicht|deine|Ihre|werden|wird)\b/.test(template),
		)
		expect(stillGerman.map(([id]) => id)).toEqual([])
	})

	it('carries no undecoded XML entities, which lit-localize passes through verbatim', () => {
		const escaped = stringTemplates.filter(([, template]) => /&(amp|lt|gt|quot|#\d+);/.test(template))
		expect(escaped.map(([id]) => id)).toEqual([])
	})
})
