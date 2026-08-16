import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { getPageMeta, resolvePageMeta } from '../src/router/page-meta.ts'
import { localeFromPath, localizedPath, stripLocale } from '../src/i18n/locale.ts'

const pageMeta = getPageMeta()
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/seelen-stimme\.at(.*?)<\/loc>/g)].map(
	([, path]) => path || '/',
)

describe('page metadata', () => {
	it('gives every route a distinct title and description', () => {
		const titles = Object.values(pageMeta).map((meta) => meta.title)
		const descriptions = Object.values(pageMeta).map((meta) => meta.description)

		expect(new Set(titles).size).toBe(titles.length)
		expect(new Set(descriptions).size).toBe(descriptions.length)
	})

	it('keeps descriptions within the length search engines display', () => {
		for(const [path, meta] of Object.entries(pageMeta)) {
			expect(meta.description.length, path).toBeGreaterThan(50)
			expect(meta.description.length, path).toBeLessThanOrEqual(200)
		}
	})

	it('covers every url listed in the sitemap, in both languages', () => {
		expect(sitemapPaths.length).toBeGreaterThan(0)
		for(const path of sitemapPaths) {
			expect(Object.keys(pageMeta), path).toContain(stripLocale(path))
		}
	})

	it('lists an English url for every German page in the sitemap', () => {
		for(const path of Object.keys(pageMeta)) {
			if(!sitemapPaths.includes(path)) continue
			expect(sitemapPaths, path).toContain(localizedPath(path, 'en'))
		}
	})

	it('falls back to the not-found metadata for unknown paths', () => {
		expect(resolvePageMeta('/gibt-es-nicht').title).toContain('nicht gefunden')
		expect(resolvePageMeta('/en/does-not-exist').title).toContain('nicht gefunden')
	})

	it('resolves metadata for a page through its English url', () => {
		expect(resolvePageMeta('/en/about')).toEqual(resolvePageMeta('/about'))
	})
})

describe('locale routing', () => {
	it('reads the locale from the url', () => {
		expect(localeFromPath('/')).toBe('de')
		expect(localeFromPath('/about')).toBe('de')
		expect(localeFromPath('/en')).toBe('en')
		expect(localeFromPath('/en/about')).toBe('en')
	})

	it('does not mistake a German path that merely starts with "en"', () => {
		expect(localeFromPath('/entwicklung')).toBe('de')
	})

	it('round-trips between the two url shapes', () => {
		for(const path of Object.keys(pageMeta)) {
			expect(stripLocale(localizedPath(path, 'en')), path).toBe(path)
			expect(localizedPath(path, 'de'), path).toBe(path)
		}
	})

	it('keeps the home page prefix free of a trailing slash', () => {
		expect(localizedPath('/', 'en')).toBe('/en')
		expect(stripLocale('/en')).toBe('/')
	})
})
