import { describe, expect, it } from 'vitest'
import { opensInNewBrowsingContext } from '../src/router/link-click.ts'

const plainLeftClick = { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false }

describe('opensInNewBrowsingContext', () => {
	it('lets a plain left click be handled by the router', () => {
		expect(opensInNewBrowsingContext(plainLeftClick)).toBe(false)
	})

	it('leaves middle click to the browser so links open in a new tab', () => {
		expect(opensInNewBrowsingContext({ ...plainLeftClick, button: 1 })).toBe(true)
	})

	it.each(['metaKey', 'ctrlKey', 'shiftKey', 'altKey'] as const)(
		'leaves %s clicks to the browser',
		(modifier) => {
			expect(opensInNewBrowsingContext({ ...plainLeftClick, [modifier]: true })).toBe(true)
		},
	)
})
