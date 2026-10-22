export type Point = {
    label: string;
    value: number;
    title?: string;
};
type $$ComponentProps = {
    data: Point[];
    active?: number;
    label: string;
    /** Small word under the active value, e.g. "cambios". */
    caption?: string;
    format?: (v: number) => string;
    ticks?: number;
    class?: string;
};
declare const LineChart: import("svelte").Component<$$ComponentProps, {}, "active">;
type LineChart = ReturnType<typeof LineChart>;
export default LineChart;
