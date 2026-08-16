type LinkClick = Pick<MouseEvent, 'button' | 'metaKey' | 'ctrlKey' | 'shiftKey' | 'altKey'>

export function opensInNewBrowsingContext(event: LinkClick) {
	return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}
