import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';
/**
 * Text field on a soft grey well, no border. Multiline renders a self sizing textarea.
 * Spread props and attachments go to the field itself.
 */
type Common = {
    label?: string;
    hint?: string;
    multiline?: boolean;
    size?: 'sm' | 'md' | 'lg';
    class?: string;
    fieldClass?: string;
};
type $$ComponentProps = Common & Omit<HTMLInputAttributes & HTMLTextareaAttributes, 'class' | 'size'>;
declare const Input: import("svelte").Component<$$ComponentProps, {}, "">;
type Input = ReturnType<typeof Input>;
export default Input;
