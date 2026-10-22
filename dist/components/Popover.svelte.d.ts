import type { Snippet } from 'svelte';
type $$ComponentProps = {
    id?: string;
    label: string;
    width?: 'sm' | 'md' | 'lg';
    mode?: 'auto' | 'manual';
    ref?: HTMLElement;
    onopenchange?: (open: boolean) => void;
    children: Snippet;
    class?: string;
    [key: string]: unknown;
};
declare const Popover: import("svelte").Component<$$ComponentProps, {}, "ref">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
