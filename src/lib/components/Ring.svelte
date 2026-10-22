<script lang="ts">
	import type { Snippet } from 'svelte';

	/** Progress ring in the accent. A hot ring turns coral. */
	let {
		value,
		size = 72,
		stroke = 6,
		tone = 'accent',
		label,
		children
	}: { value: number | null; size?: number; stroke?: number; tone?: 'accent' | 'warn' | 'bad' | 'light'; label?: string; children?: Snippet } = $props();

	const r = $derived((size - stroke) / 2);
	const length = $derived(2 * Math.PI * r);
	const filled = $derived(value === null ? 0 : Math.max(0, Math.min(1, value)));
</script>

<span class="orbit {tone}" style:width="{size}px" style:height="{size}px" role={label ? 'img' : undefined} aria-label={label}>
	<svg width={size} height={size} viewBox="0 0 {size} {size}" aria-hidden="true">
		<circle class="track" cx={size / 2} cy={size / 2} {r} fill="none" stroke-width={stroke} />
		{#if filled > 0}
			<circle class="arc" cx={size / 2} cy={size / 2} {r} fill="none" stroke-width={stroke} stroke-linecap="round" stroke-dasharray="{filled * length} {length}" />
		{/if}
	</svg>
	{#if children}<span class="inner">{@render children()}</span>{/if}
</span>

<style>
	.orbit {
		position: relative;
		display: inline-grid;
		flex-shrink: 0;
		place-items: center;
	}
	svg {
		position: absolute;
		inset: 0;
		transform: rotate(-90deg);
		overflow: visible;
	}
	.track {
		stroke: var(--ds-accent-50);
	}
	.arc {
		stroke: var(--ds-accent-500);
		transition: stroke-dasharray var(--ds-duration-slow) var(--ds-ease);
	}
	.warn .arc {
		stroke: var(--ds-warn);
	}
	.bad .arc {
		stroke: var(--ds-bad);
	}
	.light .track {
		stroke: color-mix(in srgb, var(--ds-on-accent) 20%, transparent);
	}
	.light .arc {
		stroke: var(--ds-on-accent);
	}
	.inner {
		position: relative;
		display: grid;
		place-items: center;
		text-align: center;
	}
</style>
