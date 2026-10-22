/**
 * React bindings for the NYNT design system. They render the framework agnostic
 * classes of nynt-ui/components.css, so import nynt-ui/css (or the single files) once,
 * then wrap the private UI in an element with class "ds".
 */
import { createElement as h } from 'react';
import { iconPaths } from '../icons.js';
const cx = (...parts) => parts.filter(Boolean).join(' ');
export function Icon({ name, size = 16, stroke = 1.6, className }) {
    return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: stroke,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        className,
        style: { flexShrink: 0 },
        'aria-hidden': true,
        dangerouslySetInnerHTML: { __html: iconPaths[name] }
    });
}
/** Pill button. Primary is the filled accent, secondary a quiet grey, ghost only text. */
export function Button({ variant = 'secondary', size = 'md', icon, iconAfter, block = false, type = 'button', className, children, ...rest }) {
    const px = size === 'sm' ? 13 : 15;
    return h('button', { type, className: cx('ds-btn', variant, size, block && 'full', className), ...rest }, icon && h(Icon, { name: icon, size: px }), children, iconAfter && h(Icon, { name: iconAfter, size: px }));
}
/** Round button with one glyph. Always carries a label for screen readers and the tooltip. */
export function IconButton({ icon, label, size = 'md', variant = 'soft', type = 'button', className, ...rest }) {
    return h('button', { type, 'aria-label': label, title: label, className: cx('ds-ib', size, variant, className), ...rest }, h(Icon, { name: icon, size: size === 'sm' ? 14 : 16 }));
}
/** A quiet container: surface is a white card, tint the pale accent wash, sunken a soft grey well. */
export function Card({ as = 'div', variant = 'surface', pad = 'md', className, children, ...rest }) {
    return h(as, { className: cx('ds-card', variant, `pad-${pad}`, className), ...rest }, children);
}
/** Small rounded label. */
export function Pill({ tone = 'neutral', size = 'md', className, children, ...rest }) {
    return h('span', { className: cx('ds-pill', tone, size, className), ...rest }, children);
}
/** Round icon chip, the list marker of the system. */
export function IconChip({ icon, size = 'md', tone = 'accent', className }) {
    return h('span', { className: cx('ds-chip', size, tone, className) }, h(Icon, { name: icon, size: size === 'lg' ? 20 : 17 }));
}
/** Label above a field; the field itself takes className "ds-field". */
export function Field({ label, aside, hint, className, children }) {
    return h('label', { className: cx('ds-field-wrap', className) }, h('span', { className: 'ds-field-label' }, h('span', null, label), aside ? h('span', null, aside) : null), children, hint ? h('span', { className: 'ds-hint' }, hint) : null);
}
/** Short status line with a dot. */
export function Message({ tone = 'ok', className, children, ...rest }) {
    return h('p', { className: cx('ds-msg', tone === 'ok' ? 'ds-msg-ok' : 'ds-msg-bad', className), ...rest }, h('span', { className: 'ds-dot', 'aria-hidden': true }), children);
}
/** The NYNT wordmark in the label style (DM Mono, uppercase, 12px). */
export function Wordmark({ className }) {
    return h('span', { className: cx('ds-wordmark', className) }, 'nynt');
}
/** Discreet studio credit for private areas (never on a public page): DM Mono, uppercase, 12px. */
export function PoweredBy({ href = 'https://nynt.ch', label = 'Powered by NYNT', className }) {
    return h('a', { className: cx('ds-powered', className), href, target: '_blank', rel: 'noopener' }, label);
}
