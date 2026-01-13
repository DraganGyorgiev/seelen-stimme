let isHistoryNavigation = false;

const scrollPositions = new Map<string, number>();

export function markHistoryNavigation() {
	isHistoryNavigation = true;
}

export function resetHistoryNavigationFlag() {
	isHistoryNavigation = false;
}

export function saveScroll(path: string) {
	scrollPositions.set(path, window.scrollY);
}

export function restoreScroll(path: string): boolean {
	const pos = scrollPositions.get(path);
	if (pos !== undefined) {
		requestAnimationFrame(() => window.scrollTo(0, pos));
		return true;
	}
	return false;
}

export function scrollToHashOrTop() {
	requestAnimationFrame(() => {
		if (location.hash) {
			const el = document.getElementById(location.hash.slice(1));
			if (el) {
				el.scrollIntoView({ behavior: 'auto', block: 'start' });
				return;
			}
		}
		window.scrollTo(0, 0);
	});
}

export function isHistoryNav() {
	return isHistoryNavigation;
}
