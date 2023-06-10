export type HotkeysOptions = (Pick<KeyboardEvent, 'key'> &
	Partial<Pick<KeyboardEvent, 'ctrlKey' | 'metaKey' | 'altKey'>> & {
		fn: () => void;
	})[];

import { page } from '$app/stores';

export function hotkeys(node: HTMLElement, options: HotkeysOptions) {
	let currentOptions: HotkeysOptions = [];
	const global = node.dataset['hotkeysGlobal'] != null;
	let editing = false;
	let unsubscribe = () => {
		/* noop */
	};

	function handleKeydown(ev: KeyboardEvent) {
		if (editing) return;
		const handlers = currentOptions.filter((option) => {
			if (
				ev.key === option.key &&
				ev.ctrlKey === Boolean(option.ctrlKey) &&
				ev.metaKey === Boolean(option.metaKey) &&
				ev.altKey === Boolean(option.altKey)
			) {
				return true;
			}
			return false;
		});
		for (const handler of handlers) {
			handler.fn();
		}
	}

	function setupHotkeys() {
		document.addEventListener('keydown', handleKeydown);
	}

	function clearHotkeys() {
		document.removeEventListener('keydown', handleKeydown);
	}

	function configure(handlers: HotkeysOptions) {
		currentOptions = handlers;

		unsubscribe = page.subscribe((page) => {
			editing = Boolean(page?.data?.editing);
		});

		if (global) {
			setupHotkeys();
		} else {
			node.addEventListener('mouseenter', setupHotkeys);
			node.addEventListener('mouseleave', clearHotkeys);
		}
	}
	configure(options);
	return {
		update(options: HotkeysOptions) {
			configure(options);
		},
		destroy() {
			unsubscribe();
			if (!global) {
				node.removeEventListener('mouseenter', setupHotkeys);
				node.removeEventListener('mouseleave', clearHotkeys);
			}
			clearHotkeys();
			unsubscribe();
		},
	};
}
