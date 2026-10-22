<script lang="ts">
	import type { Level } from './types';

	/** Thin countdown bar: what is left of a span. Null draws an empty track. */
	let { value, level = 'ok', label, class: cls = '' }: { value: number | null; level?: Level; label?: string; class?: string } = $props();
	const pct = $derived(value === null ? 0 : Math.max(0.04, Math.min(1, value)) * 100);
</script>

<span class="meter {cls}" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'}>
	{#if value !== null}<span class="fill {level}" style:width="{pct}%"></span>{/if}
</span>

<style>
	.meter {
		display: block;
		height: var(--ds-space-1);
		overflow: hidden;
		border-radius: var(--ds-radius-full);
		background: var(--ds-track);
	}
	.fill {
		display: block;
		height: 100%;
		border-radius: inherit;
		background: var(--ds-accent-500);
		transition: width var(--ds-duration-slow) var(--ds-ease);
	}
	.warn {
		background: var(--ds-warn);
	}
	.bad {
		background: var(--ds-bad);
	}
	.none {
		background: var(--ds-neutral-300);
	}
</style>
