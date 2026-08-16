import { describe, expect, it } from 'vitest'
import { findService, getBookableServices, getServices } from '../src/data/services.ts'

const services = getServices()

describe('services catalogue', () => {
	it('exposes a unique id per service', () => {
		const ids = services.map((service) => service.id)
		expect(new Set(ids).size).toBe(ids.length)
	})

	it('gives every service the content the cards render', () => {
		for(const service of services) {
			expect(service.title, service.id).not.toBe('')
			expect(service.subtitle, service.id).not.toBe('')
			expect(service.description, service.id).not.toBe('')
			expect(service.image, service.id).not.toBe('')
		}
	})

	it('keeps titles free of soft hyphens so submitted form values stay clean', () => {
		for(const service of services) {
			expect(service.title, service.id).not.toContain('­')
		}
	})

	it('excludes fully booked services from the bookable list', () => {
		expect(services.some((service) => service.isFullyBooked)).toBe(true)
		expect(getBookableServices().every((service) => !service.isFullyBooked)).toBe(true)
	})

	it('offers a bookable default for the contact form', () => {
		expect(getBookableServices()[0]).toBeDefined()
		expect(getBookableServices()[0].isFullyBooked).toBeFalsy()
	})

	it('prices every duration option, because the form submits the matching price', () => {
		for(const service of services.filter((candidate) => candidate.durationOptions)) {
			for(const option of service.durationOptions ?? []) {
				expect(option.label, service.id).not.toBe('')
				expect(option.price, service.id).toMatch(/EUR/)
			}
		}
	})

	it('keeps duration option values untranslated so the inbox stays consistent', () => {
		for(const service of services.filter((candidate) => candidate.durationOptions)) {
			for(const option of service.durationOptions ?? []) {
				expect(option.value, service.id).toMatch(/^\d+ Minuten$/)
			}
		}
	})

	it('finds services by id and reports unknown ids as missing', () => {
		expect(findService('sw')?.title).toBe('Seelenweg')
		expect(findService('does-not-exist')).toBeUndefined()
		expect(findService(null)).toBeUndefined()
	})
})
