import { iconNames, type IconName } from '../icons';
export type { IconName };
export { iconNames };
type $$ComponentProps = {
    name: IconName;
    size?: number;
    stroke?: number;
    class?: string;
};
declare const Icon: import("svelte").Component<$$ComponentProps, {}, "">;
type Icon = ReturnType<typeof Icon>;
export default Icon;
