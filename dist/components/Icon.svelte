<script lang="ts" module>
	import { iconPaths, iconNames, type IconName } from '../icons';
	const paths = iconPaths;
	export type { IconName };
	export { iconNames };
</script>

<script lang="ts">
	let { name, size = 16, stroke = 1.6, class: cls = '' }: { name: IconName; size?: number; stroke?: number; class?: string } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={stroke}
	stroke-linecap="round"
	stroke-linejoin="round"
	class="icon {cls}"
	aria-hidden="true"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static icon markup above -->
	{@html paths[name]}
</svg>

<style>
	.icon {
		flex-shrink: 0;
	}
</style>
