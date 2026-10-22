import type { HTMLInputAttributes } from 'svelte/elements';
type $$ComponentProps = Omit<HTMLInputAttributes, 'value' | 'class'> & {
    value?: string;
    ref?: HTMLInputElement;
    label?: string;
    class?: string;
};
declare const SearchInput: import("svelte").Component<$$ComponentProps, {}, "value" | "ref">;
type SearchInput = ReturnType<typeof SearchInput>;
export default SearchInput;
