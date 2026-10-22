import type { Snippet } from 'svelte';
import { type IconName } from './Icon.svelte';
import type { Pressable } from './types';
type $$ComponentProps = Pressable & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md';
    icon?: IconName;
    iconAfter?: IconName;
    busy?: boolean;
    children: Snippet;
};
declare const Button: import("svelte").Component<$$ComponentProps, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
