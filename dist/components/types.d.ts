import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
/** Health of a check. Matches the Level used by the nynt panel. */
export type Level = 'ok' | 'warn' | 'bad' | 'none';
/** Colour role of a component. Accent is the single brand colour; status tones are for small marks only. */
export type Tone = 'neutral' | 'accent' | 'solid' | 'ok' | 'warn' | 'bad' | 'muted';
/** Attributes shared by components that render as a link (href) or a button. */
export type Pressable = Omit<HTMLButtonAttributes & HTMLAnchorAttributes, 'class' | 'children' | 'type'> & {
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
};
export declare const toneOfLevel: (level: Level) => Tone;
