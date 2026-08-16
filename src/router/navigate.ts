import { Router } from '@vaadin/router'
import { opensInNewBrowsingContext } from './link-click.ts'
import { getLocale, localizedPath, type Locale } from '../i18n/locale.ts'

/**
 * Call sites use the German path as the canonical name of a page; the locale prefix is applied here so
 * no component has to know about the URL layout.
 */
export function currentLocalePath(path: string) {
	const [pathname, query] = path.split('?')
	const localized = localizedPath(pathname, getLocale() as Locale)
	return query ? `${localized}?${query}` : localized
}

export function navigateTo(path: string) {
	Router.go(currentLocalePath(path))
}

export function navigateFromLinkClick(event: MouseEvent, to: string) {
	if(opensInNewBrowsingContext(event)) return

	event.preventDefault()
	navigateTo(to)
}
