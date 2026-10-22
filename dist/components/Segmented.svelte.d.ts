export type Segment = {
    id: string;
    label: string;
    count?: number | null;
    href?: string;
};
type $$ComponentProps = {
    items: Segment[];
    current: string;
    label: string;
    onselect?: (id: string) => void;
    class?: string;
};
declare const Segmented: import("svelte").Component<$$ComponentProps, {}, "">;
type Segmented = ReturnType<typeof Segmented>;
export default Segmented;
