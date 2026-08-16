import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const contactSource = readFileSync(
	new URL('../src/features/contact/contact-page.ts', import.meta.url),
	'utf8',
)

const staticForm = indexHtml.match(/<form name="contact"[\s\S]*?<\/form>/)?.[0] ?? ''
const declaredFields = new Set([...staticForm.matchAll(/name="([^"]+)"/g)].map(([, name]) => name))

const submittedFields = new Set([
	...[...contactSource.matchAll(/\bname="([a-z-]+)"/g)].map(([, name]) => name),
	...[...contactSource.matchAll(/\{ name: '([a-z-]+)'/g)].map(([, name]) => name),
])

describe('Netlify form detection', () => {
	it('declares a static form so Netlify can find it at build time', () => {
		expect(staticForm).not.toBe('')
		expect(staticForm).toContain('data-netlify="true"')
		expect(staticForm).toContain('netlify-honeypot="bot-field"')
		expect(staticForm).toContain('hidden')
	})

	it('names the static form the same as the rendered one', () => {
		expect(contactSource).toContain("const netlifyFormName = 'contact'")
		expect(staticForm).toContain('name="contact"')
	})

	it('declares every field the contact form submits, or Netlify drops the value', () => {
		expect(submittedFields.size).toBeGreaterThan(8)
		const undeclared = [...submittedFields].filter((field) => !declaredFields.has(field))
		expect(undeclared).toEqual([])
	})

	it('carries the honeypot the static form nominates', () => {
		expect(submittedFields.has('bot-field')).toBe(true)
	})

	it('posts the form-name Netlify needs to match the submission to the form', () => {
		expect(contactSource).toContain('name="form-name"')
	})

	it('no longer references the previous form provider', () => {
		expect(contactSource).not.toContain('formsubmit')
		expect(contactSource).not.toContain('_captcha')
		expect(contactSource).not.toContain('_honey')
	})
})
