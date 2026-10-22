/** Places a fixed popover next to its anchor, kept inside the viewport. */
export function placeNear(pop, anchor, side = 'below', gap = 10) {
    const a = anchor.getBoundingClientRect();
    const w = pop.offsetWidth;
    const h = pop.offsetHeight;
    const m = 12;
    let left = a.left;
    let top = a.bottom + gap;
    if (side === 'beside') {
        left = a.right + gap;
        top = a.top;
        if (left + w > innerWidth - m)
            left = a.left - gap - w;
    }
    else if (top + h > innerHeight - m && a.top - gap - h >= m) {
        top = a.top - gap - h;
    }
    pop.style.left = `${Math.round(Math.max(m, Math.min(left, innerWidth - w - m)))}px`;
    pop.style.top = `${Math.round(Math.max(m, Math.min(top, innerHeight - h - m)))}px`;
}
