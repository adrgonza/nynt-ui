/**
 * React bindings for the NYNT design system. They render the framework agnostic
 * classes of nynt-ui/components.css, so import nynt-ui/css (or the single files) once,
 * then wrap the private UI in an element with class "ds".
 */
import { createElement as h, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { iconPaths, type IconName } from '../icons.js';

export type { IconName };

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export function Icon({ name, size = 16, stroke = 1.6, className }: { name: IconName; size?: number; stroke?: number; className?: string }) {
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

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-soft';
	size?: 'sm' | 'md' | 'lg';
	icon?: IconName;
	iconAfter?: IconName;
	/** Full width. */
	block?: boolean;
};

/** Pill button. Primary is the filled accent, secondary a quiet grey, ghost only text. */
export function Button({ variant = 'secondary', size = 'md', icon, iconAfter, block = false, type = 'button', className, children, ...rest }: ButtonProps) {
	const px = size === 'sm' ? 13 : 15;
	return h(
		'button',
		{ type, className: cx('ds-btn', variant, size, block && 'full', className), ...rest },
		icon && h(Icon, { name: icon, size: px }),
		children,
		iconAfter && h(Icon, { name: iconAfter, size: px })
	);
}

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon: IconName;
	/** Accessible name and tooltip. */
	label: string;
	size?: 'sm' | 'md';
	variant?: 'soft' | 'ghost';
};

/** Round button with one glyph. Always carries a label for screen readers and the tooltip. */
export function IconButton({ icon, label, size = 'md', variant = 'soft', type = 'button', className, ...rest }: IconButtonProps) {
	return h(
		'button',
		{ type, 'aria-label': label, title: label, className: cx('ds-ib', size, variant, className), ...rest },
		h(Icon, { name: icon, size: size === 'sm' ? 14 : 16 })
	);
}

export type CardProps = HTMLAttributes<HTMLElement> & {
	as?: 'div' | 'section' | 'article' | 'aside';
	variant?: 'surface' | 'tint' | 'sunken';
	pad?: 'sm' | 'md' | 'lg';
};

/** A quiet container: surface is a white card, tint the pale accent wash, sunken a soft grey well. */
export function Card({ as = 'div', variant = 'surface', pad = 'md', className, children, ...rest }: CardProps) {
	return h(as, { className: cx('ds-card', variant, `pad-${pad}`, className), ...rest }, children);
}

export type PillProps = HTMLAttributes<HTMLSpanElement> & {
	tone?: 'neutral' | 'accent' | 'solid';
	size?: 'sm' | 'md';
};

/** Small rounded label. */
export function Pill({ tone = 'neutral', size = 'md', className, children, ...rest }: PillProps) {
	return h('span', { className: cx('ds-pill', tone, size, className), ...rest }, children);
}

/** Round icon chip, the list marker of the system. */
export function IconChip({ icon, size = 'md', tone = 'accent', className }: { icon: IconName; size?: 'md' | 'lg'; tone?: 'accent' | 'neutral'; className?: string }) {
	return h('span', { className: cx('ds-chip', size, tone, className) }, h(Icon, { name: icon, size: size === 'lg' ? 20 : 17 }));
}

/** Label above a field; the field itself takes className "ds-field". */
export function Field({ label, aside, hint, className, children }: { label: ReactNode; aside?: ReactNode; hint?: ReactNode; className?: string; children: ReactNode }) {
	return h(
		'label',
		{ className: cx('ds-field-wrap', className) },
		h('span', { className: 'ds-field-label' }, h('span', null, label), aside ? h('span', null, aside) : null),
		children,
		hint ? h('span', { className: 'ds-hint' }, hint) : null
	);
}

/** Short status line with a dot. */
export function Message({ tone = 'ok', className, children, ...rest }: HTMLAttributes<HTMLParagraphElement> & { tone?: 'ok' | 'bad' }) {
	return h('p', { className: cx('ds-msg', tone === 'ok' ? 'ds-msg-ok' : 'ds-msg-bad', className), ...rest }, h('span', { className: 'ds-dot', 'aria-hidden': true }), children);
}

/** The NYNT wordmark in the label style (DM Mono, uppercase, 12px). */
export function Wordmark({ className }: { className?: string }) {
	return h('span', { className: cx('ds-wordmark', className) }, 'nynt');
}

/** Discreet studio credit for private areas (never on a public page): DM Mono, uppercase, 12px. */
export function PoweredBy({ href = 'https://nynt.ch', label = 'Powered by NYNT', className }: { href?: string; label?: string; className?: string }) {
	return h('a', { className: cx('ds-powered', className), href, target: '_blank', rel: 'noopener' }, label);
}
