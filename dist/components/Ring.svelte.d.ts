import type { Snippet } from 'svelte';
type $$ComponentProps = {
    value: number | null;
    size?: number;
    stroke?: number;
    tone?: 'accent' | 'warn' | 'bad' | 'light';
    label?: string;
    children?: Snippet;
};
declare const Ring: import("svelte").Component<$$ComponentProps, {}, "">;
type Ring = ReturnType<typeof Ring>;
export default Ring;
