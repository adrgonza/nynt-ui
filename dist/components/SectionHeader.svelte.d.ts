import type { Snippet } from 'svelte';
type $$ComponentProps = {
    title: string;
    muted?: string;
    meta?: string;
    level?: 1 | 2 | 3;
    size?: 'sm' | 'md' | 'lg';
    actions?: Snippet;
    class?: string;
};
declare const SectionHeader: import("svelte").Component<$$ComponentProps, {}, "">;
type SectionHeader = ReturnType<typeof SectionHeader>;
export default SectionHeader;
