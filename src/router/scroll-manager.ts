const positions = new Map<string, number>();
let isHistoryNavigation = false;

function key() {
	return location.pathname + location.hash;
}

export function markHistoryNavigation() {
	isHistoryNavigation = true;
}

export function resetHistoryNavigationFlag() {
	isHistoryNavigation = false;
}

export function saveScroll() {
	positions.set(key(), window.scrollY);
}

export function restoreScroll(): boolean {
	if (!isHistoryNavigation) return false;

	const y = positions.get(key());
	if (typeof y === 'number') {
		window.scrollTo({ top: y, behavior: 'auto' });
		return true;
	}
	return false;
}

export function scrollToHashOrTop() {
	const id = location.hash.replace('#', '');
	requestAnimationFrame(() => {
		if (id) {
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
				return;
			}
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}
