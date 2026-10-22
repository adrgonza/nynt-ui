<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: cls = '' }: { children: Snippet; class?: string } = $props();
</script>

<kbd class={cls}>{@render children()}</kbd>

<style>
	kbd {
		display: inline-grid;
		place-items: center;
		min-width: var(--ds-space-6);
		height: var(--ds-space-6);
		border-radius: var(--ds-radius-xs);
		background: var(--ds-neutral-100);
		padding: 0 var(--ds-space-2);
		color: var(--ds-ink-2);
		font-family: inherit;
		font-size: var(--ds-text-2xs);
	}
</style>
