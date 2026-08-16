import { describe, expect, it } from 'vitest'
import { decideScrollTarget, type ScrollContext } from '../src/router/scroll-restoration.ts'

const freshNavigation: ScrollContext = {
	hasHash: false,
	carriedPosition: undefined,
	savedPosition: undefined,
	isHistoryNavigation: false,
}

describe('decideScrollTarget', () => {
	it('sends a fresh navigation to the top of the page', () => {
		expect(decideScrollTarget(freshNavigation)).toEqual({ type: 'top' })
	})

	it('keeps the position when the language switcher carried one over', () => {
		expect(decideScrollTarget({ ...freshNavigation, carriedPosition: 1840 })).toEqual({
			type: 'position',
			y: 1840,
		})
	})

	it('keeps the top of the page when the language is switched while already at the top', () => {
		expect(decideScrollTarget({ ...freshNavigation, carriedPosition: 0 })).toEqual({
			type: 'position',
			y: 0,
		})
	})

	it('restores the remembered position when going back', () => {
		expect(
			decideScrollTarget({ ...freshNavigation, isHistoryNavigation: true, savedPosition: 2500 }),
		).toEqual({ type: 'position', y: 2500 })
	})

	it('goes to the top when going back to a page that was never scrolled', () => {
		expect(decideScrollTarget({ ...freshNavigation, isHistoryNavigation: true })).toEqual({
			type: 'top',
		})
	})

	it('ignores a remembered position on a forward navigation, so a revisit starts at the top', () => {
		expect(decideScrollTarget({ ...freshNavigation, savedPosition: 2500 })).toEqual({ type: 'top' })
	})

	it('leaves scrolling alone when the url targets an anchor', () => {
		expect(decideScrollTarget({ ...freshNavigation, hasHash: true })).toEqual({ type: 'none' })
		expect(decideScrollTarget({ ...freshNavigation, hasHash: true, carriedPosition: 900 })).toEqual({
			type: 'none',
		})
	})

	it('prefers the carried position over a remembered one', () => {
		expect(
			decideScrollTarget({
				...freshNavigation,
				carriedPosition: 300,
				savedPosition: 2500,
				isHistoryNavigation: true,
			}),
		).toEqual({ type: 'position', y: 300 })
	})
})
