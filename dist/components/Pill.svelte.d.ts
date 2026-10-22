import type { Snippet } from 'svelte';
import { type IconName } from './Icon.svelte';
import type { Pressable } from './types';
type $$ComponentProps = Pressable & {
    tone?: 'neutral' | 'accent' | 'solid' | 'outline';
    size?: 'sm' | 'md';
    icon?: IconName;
    iconAfter?: IconName;
    pressed?: boolean;
    children: Snippet;
};
declare const Pill: import("svelte").Component<$$ComponentProps, {}, "">;
type Pill = ReturnType<typeof Pill>;
export default Pill;
