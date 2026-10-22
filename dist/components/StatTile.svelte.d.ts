import type { Snippet } from 'svelte';
import type { Pressable } from './types';
type $$ComponentProps = Pressable & {
    label: string;
    value: string | number;
    unit?: string;
    sub?: string;
    tone?: 'default' | 'muted' | 'accent' | 'warn' | 'bad';
    size?: 'sm' | 'md' | 'lg';
    /** Ring, dot or meter drawn beside the number. */
    visual?: Snippet;
    /** Renders as a button (for popovers) when true and no href is given. */
    interactive?: boolean;
};
declare const StatTile: import("svelte").Component<$$ComponentProps, {}, "">;
type StatTile = ReturnType<typeof StatTile>;
export default StatTile;
