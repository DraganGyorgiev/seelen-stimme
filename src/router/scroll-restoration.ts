const scrollPositions = new Map<number, number>()

let currentEntryKey = 0
let nextEntryKey = 1
let isHistoryNavigation = false
let carriedPosition: number | undefined

// Vaadin Router renders the new page before this fires, but lazily-loaded chunks and images can still
// settle a frame later, so the restore is retried until the page is tall enough to hold the position.
const restoreAttempts = 10

export type ScrollTarget = { type: 'none' } | { type: 'top' } | { type: 'position'; y: number }

export type ScrollContext = {
	hasHash: boolean
	carriedPosition?: number
	savedPosition?: number
	isHistoryNavigation: boolean
}

export function decideScrollTarget(context: ScrollContext): ScrollTarget {
	if(context.hasHash) return { type: 'none' }
	if(context.carriedPosition !== undefined) return { type: 'position', y: context.carriedPosition }
	if(context.isHistoryNavigation && context.savedPosition !== undefined) {
		return { type: 'position', y: context.savedPosition }
	}
	return { type: 'top' }
}

export function startScrollRestoration() {
	history.scrollRestoration = 'manual'
	currentEntryKey = readEntryKey() ?? stampEntryKey()

	window.addEventListener('popstate', () => {
		isHistoryNavigation = true
	})

	// Recording on every scroll keeps the position current for both directions: a forward click and a
	// browser Back both leave the page without any event that reliably precedes the DOM swap.
	window.addEventListener('scroll', () => scrollPositions.set(currentEntryKey, window.scrollY), {
		passive: true,
	})
}

/**
 * Switching language navigates to a different URL for the page the visitor is already reading, so the
 * position is carried across instead of being treated as a fresh navigation.
 */
export function keepScrollOnNextNavigation() {
	carriedPosition = window.scrollY
}

export function restoreScrollPosition() {
	const context: ScrollContext = {
		hasHash: Boolean(location.hash),
		carriedPosition,
		savedPosition: undefined,
		isHistoryNavigation,
	}

	isHistoryNavigation = false
	carriedPosition = undefined
	currentEntryKey = readEntryKey() ?? stampEntryKey()
	context.savedPosition = scrollPositions.get(currentEntryKey)

	const target = decideScrollTarget(context)
	if(target.type === 'none') return
	if(target.type === 'top') {
		requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }))
		return
	}

	scrollPositions.set(currentEntryKey, target.y)
	scrollTowards(target.y, restoreAttempts)
}

function scrollTowards(target: number, attemptsLeft: number) {
	requestAnimationFrame(() => {
		window.scrollTo({ top: target, left: 0, behavior: 'auto' })

		const reachedTarget = Math.abs(window.scrollY - target) < 2
		if(reachedTarget || attemptsLeft === 0) return

		scrollTowards(target, attemptsLeft - 1)
	})
}

function readEntryKey(): number | undefined {
	const state = history.state as { scrollKey?: number } | null
	return typeof state?.scrollKey === 'number' ? state.scrollKey : undefined
}

function stampEntryKey() {
	const key = nextEntryKey++
	history.replaceState({ ...(history.state as object), scrollKey: key }, '')
	return key
}
