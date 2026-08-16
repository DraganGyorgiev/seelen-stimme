import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { createServer } from 'vite'

const projectRoot = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const distDir = join(projectRoot, 'dist')
const siteOrigin = 'https://seelen-stimme.at'

const localeTags = { de: 'de_AT', en: 'en_GB' }

/**
 * Titles and descriptions are applied by the app at runtime, which crawlers that do not execute
 * JavaScript never see -- social scrapers in particular. This writes a real HTML file per route with
 * those tags already in place, so a shared link previews correctly. The SPA still boots and takes over.
 */
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' })

try {
	const { getPageMeta } = await vite.ssrLoadModule('/src/router/page-meta.ts')
	const { localizedPath } = await vite.ssrLoadModule('/src/i18n/locale.ts')

	const germanMeta = getPageMeta()
	const english = await loadEnglishTranslations()
	const template = await readFile(join(distDir, 'index.html'), 'utf8')

	const routes = []
	const untranslated = new Set()

	for(const [path, meta] of Object.entries(germanMeta)) {
		for(const locale of ['de', 'en']) {
			const title = translate(meta.title, locale, english, untranslated)
			const description = translate(meta.description, locale, english, untranslated)
			const routePath = localizedPath(path, locale)
			const url = `${siteOrigin}${routePath}`

			await writePage(routePath, render(template, { locale, title, description, url, path, localizedPath }))
			routes.push(routePath)
		}
	}

	await writeRedirects(routes)

	for(const source of untranslated) console.warn(`No English translation for: ${source.slice(0, 70)}`)
	console.log(`Prerendered ${routes.length} pages with per-route metadata.`)
} finally {
	await vite.close()
}

async function loadEnglishTranslations() {
	const xliff = await readFile(join(projectRoot, 'xliff', 'en.xlf'), 'utf8')
	const pairs = xliff.matchAll(/<source>([\s\S]*?)<\/source>\s*<target>([\s\S]*?)<\/target>/g)
	return new Map([...pairs].map(([, source, target]) => [decodeXml(source), decodeXml(target)]))
}

function translate(germanText, locale, english, untranslated) {
	if(locale === 'de') return germanText

	const translated = english.get(germanText)
	if(translated === undefined) untranslated.add(germanText)
	return translated ?? germanText
}

function render(template, { locale, title, description, url, path, localizedPath }) {
	const alternates = [
		`<link rel="alternate" hreflang="de" href="${siteOrigin}${path}" />`,
		`<link rel="alternate" hreflang="en" href="${siteOrigin}${localizedPath(path, 'en')}" />`,
		`<link rel="alternate" hreflang="x-default" href="${siteOrigin}${path}" />`,
	].join('\n    ')

	let html = template
		.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`)
		.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`)
		.replace(/(<link rel="canonical"[^>]*href=)"[^"]*"/, `$1"${url}"`)
		.replace('</head>', `  ${alternates}\n  </head>`)

	for(const [selector, value] of [
		['name="description"', description],
		['property="og:title"', title],
		['property="og:description"', description],
		['property="og:url"', url],
		['property="og:locale"', localeTags[locale]],
	]) {
		html = replaceMetaContent(html, selector, value)
	}

	return html
}

// Note: the tags span several lines, so this matches a whole <meta> element rather than assuming the
// attributes sit next to each other in a fixed order.
function replaceMetaContent(html, selector, value) {
	return html.replace(/<meta\b[^>]*>/g, (tag) =>
		tag.includes(selector) ? tag.replace(/content="[\s\S]*?"/, `content="${escapeAttribute(value)}"`) : tag,
	)
}

/**
 * Point each route at its prerendered file explicitly rather than relying on the host resolving
 * /services to /services/index.html. The SPA fallback stays last so unknown paths still reach the
 * client-side 404.
 */
async function writeRedirects(routes) {
	const rules = routes
		.filter((route) => route !== '/')
		.sort()
		.map((route) => `${route}    ${route}/index.html    200`)

	const content = [...rules, '/*    /index.html    200', ''].join('\n')
	await writeFile(join(distDir, '_redirects'), content)
}

async function writePage(routePath, html) {
	const target = routePath === '/' ? join(distDir, 'index.html') : join(distDir, routePath, 'index.html')
	await mkdir(dirname(target), { recursive: true })
	await writeFile(target, html)
}

function decodeXml(value) {
	return value
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, '&')
		.trim()
}

function escapeText(value) {
	return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeAttribute(value) {
	return escapeText(value).replace(/"/g, '&quot;')
}
