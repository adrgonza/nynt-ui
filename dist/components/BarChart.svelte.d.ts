export type Bar = {
    label: string;
    a: number;
    b?: number;
    title?: string;
};
type $$ComponentProps = {
    data: Bar[];
    label: string;
    showValues?: boolean;
    labelEvery?: number;
    class?: string;
};
declare const BarChart: import("svelte").Component<$$ComponentProps, {}, "">;
type BarChart = ReturnType<typeof BarChart>;
export default BarChart;
