import type { Snippet } from 'svelte';
import { type IconName } from './Icon.svelte';
export type NavItem = {
    href: string;
    icon: IconName;
    label: string;
    active?: boolean;
};
type $$ComponentProps = {
    brand: Snippet;
    brandLabel?: string;
    brandClass?: string;
    brandHref?: string;
    items: NavItem[];
    footer?: Snippet;
    label?: string;
    class?: string;
};
declare const Sidebar: import("svelte").Component<$$ComponentProps, {}, "">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
