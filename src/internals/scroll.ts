const lockers = new Set();

/**
 * documentElement.clientWidth provide the width without scrollbar
 * while window.innerWidth includes the scrollbar.
 * @returns the width of the scrollbar
 */
function calculateWindowScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

/**
 * Locks the scrolling on body. Also allows for multiple lockers by keeping track of
 * the elements that request body to be locked.
 */
export function lockBodyScroll(locker: HTMLElement) {
  lockers.add(locker);

  if (!document.body.classList.contains('ds-scroll-lock')) {
    const scrollbarWidth = calculateWindowScrollbarWidth();
    document.body.classList.add('ds-scroll-lock');
    document.body.style.setProperty(
      '--ds-scrollbar-width',
      scrollbarWidth + 'px'
    );
  }
}

/**
 * Unlocks body scroll only when all lockers request to enable body scroll.
 */
export function unlockBodyScroll(locker: HTMLElement) {
  lockers.delete(locker);

  if (lockers.size === 0) {
    document.body.classList.remove('ds-scroll-lock');
    document.body.style.removeProperty('--ds-scrollbar-width');
  }
}
