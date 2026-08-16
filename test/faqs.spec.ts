import { describe, expect, it } from 'vitest'
import { getFaqTopics } from '../src/data/faqs.ts'

const topics = getFaqTopics()
const entries = topics.flatMap((topic) => topic.entries)

describe('FAQ content', () => {
	it('has topics, each with entries', () => {
		expect(topics.length).toBeGreaterThan(0)
		for(const topic of topics) {
			expect(topic.label, topic.id).not.toBe('')
			expect(topic.entries.length, topic.id).toBeGreaterThan(0)
		}
	})

	it('gives every topic a unique id', () => {
		const ids = topics.map((topic) => topic.id)
		expect(new Set(ids).size).toBe(ids.length)
	})

	it('phrases every question as a question', () => {
		for(const entry of entries) {
			expect(entry.question, entry.question).toMatch(/\?$/)
		}
	})

	it('answers every question with something substantial', () => {
		for(const entry of entries) {
			expect(entry.answer.length, entry.question).toBeGreaterThan(60)
		}
	})

	it('asks nothing twice', () => {
		const questions = entries.map((entry) => entry.question)
		expect(new Set(questions).size).toBe(questions.length)
	})

	// The FAQ shipped with placeholder text once already; this is cheap insurance against a repeat.
	it('carries no leftover placeholder text', () => {
		const placeholder = /lorem|ipsum|todo|tbd|xxx|test test|blah|asdf|Meemet/i
		for(const entry of entries) {
			expect(placeholder.test(entry.question), entry.question).toBe(false)
			expect(placeholder.test(entry.answer), entry.question).toBe(false)
		}
	})

	// Prices live in the service catalogue. Repeating them here is how the two drifted apart before.
	it('quotes no prices, so the catalogue stays the single source', () => {
		for(const entry of entries) {
			expect(entry.answer, entry.question).not.toMatch(/\bEUR\b|€/)
		}
	})
})
