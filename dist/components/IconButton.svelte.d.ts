import { type IconName } from './Icon.svelte';
import type { Pressable } from './types';
type $$ComponentProps = Pressable & {
    icon: IconName;
    label: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'soft' | 'ghost' | 'solid' | 'surface';
    iconClass?: string;
};
declare const IconButton: import("svelte").Component<$$ComponentProps, {}, "">;
type IconButton = ReturnType<typeof IconButton>;
export default IconButton;
