import type { Snippet } from 'svelte';
import type { IconName } from './Icon.svelte';
import type { Pressable } from './types';
type $$ComponentProps = Pressable & {
    icon?: IconName;
    chip?: 'accent' | 'solid' | 'neutral' | 'outline' | 'warn' | 'bad';
    /** Replaces the icon chip, for a date or a checkbox. */
    lead?: Snippet;
    title: string;
    sub?: string;
    value?: string | number;
    valueTone?: 'default' | 'muted' | 'accent' | 'warn' | 'bad';
    interactive?: boolean;
    trailing?: Snippet;
    size?: 'sm' | 'md';
};
declare const ListRow: import("svelte").Component<$$ComponentProps, {}, "">;
type ListRow = ReturnType<typeof ListRow>;
export default ListRow;
