import type { Snippet } from 'svelte';
import type { Pressable } from './types';
type $$ComponentProps = Pressable & {
    as?: 'div' | 'section' | 'article' | 'aside' | 'li' | 'button' | 'a' | 'form';
    variant?: 'plain' | 'surface' | 'tint' | 'sunken';
    pad?: 'none' | 'sm' | 'md' | 'lg';
    interactive?: boolean;
    children: Snippet;
    [key: string]: unknown;
};
declare const Card: import("svelte").Component<$$ComponentProps, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
