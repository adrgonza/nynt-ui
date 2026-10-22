import { type IconName } from './Icon.svelte';
type $$ComponentProps = {
    icon: IconName;
    size?: 'sm' | 'md' | 'lg';
    tone?: 'accent' | 'solid' | 'neutral' | 'outline' | 'warn' | 'bad' | 'glass';
    label?: string;
    class?: string;
};
declare const IconChip: import("svelte").Component<$$ComponentProps, {}, "">;
type IconChip = ReturnType<typeof IconChip>;
export default IconChip;
