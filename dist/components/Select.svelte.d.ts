import type { HTMLSelectAttributes } from 'svelte/elements';
export type Option = {
    value: string;
    label: string;
};
type $$ComponentProps = Omit<HTMLSelectAttributes, 'value' | 'size' | 'class'> & {
    value?: string;
    options: Option[];
    label: string;
    size?: 'sm' | 'md';
    /** pill: compact control in a header. field: full width in a form. */
    variant?: 'pill' | 'field';
    class?: string;
};
declare const Select: import("svelte").Component<$$ComponentProps, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
