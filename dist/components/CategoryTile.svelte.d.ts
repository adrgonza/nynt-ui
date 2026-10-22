import type { Snippet } from 'svelte';
import { type IconName } from './Icon.svelte';
import type { Pressable } from './types';
type $$ComponentProps = Pressable & {
    label: string;
    value?: string | number;
    unit?: string;
    icon?: IconName;
    /** A small round picture instead of the glyph, e.g. a site thumbnail. */
    image?: string;
    active?: boolean;
    /** A status dot or count in the top right corner. */
    badge?: Snippet;
    interactive?: boolean;
};
declare const CategoryTile: import("svelte").Component<$$ComponentProps, {}, "">;
type CategoryTile = ReturnType<typeof CategoryTile>;
export default CategoryTile;
