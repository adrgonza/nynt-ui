<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Pressable } from './types';

	/** One number with a small label. No box; it sits on the surface it is given. */
	let {
		label,
		value,
		unit,
		sub,
		tone = 'default',
		size = 'md',
		href,
		type = 'button',
		visual,
		interactive,
		class: cls = '',
		...rest
	}: Pressable & {
		label: string;
		value: string | number;
		unit?: string;
		sub?: string;
		tone?: 'default' | 'muted' | 'accent' | 'warn' | 'bad';
		size?: 'sm' | 'md' | 'lg';
		/** Ring, dot or meter drawn beside the number. */
		visual?: Snippet;
		/** Renders as a button (for popovers) when true and no href is given. */
		interactive?: boolean;
	} = $props();
	const tag = $derived(href ? 'a' : interactive ? 'button' : 'div');
</script>

<svelte:element this={tag} {href} type={tag === 'button' ? type : undefined} class="stat {size} {tag !== 'div' ? 'press' : ''} {cls}" {...rest}>
	{#if visual}<span class="visual">{@render visual()}</span>{/if}
	<span class="body">
		<span class="kicker">{label}</span>
		<span class="value ds-num {tone}">{value}{#if unit}<span class="unit">{unit}</span>{/if}</span>
		{#if sub}<span class="sub">{sub}</span>{/if}
	</span>
</svelte:element>

<style>
	.stat {
		display: flex;
		align-items: center;
		gap: var(--ds-space-4);
		min-width: 0;
		border: 0;
		border-radius: var(--ds-radius-lg);
		background: none;
		padding: 0;
		color: inherit;
		font: inherit;
		text-align: left;
		text-decoration: none;
	}
	.press {
		margin: calc(var(--ds-space-2) * -1);
		padding: var(--ds-space-2);
		cursor: pointer;
		transition: background-color var(--ds-duration-fast) var(--ds-ease);
	}
	@media (hover: hover) {
		.press:hover {
			background: var(--ds-accent-50);
		}
	}
	.visual {
		display: grid;
		flex-shrink: 0;
		place-items: center;
	}
	.body {
		display: flex;
		flex-direction: column;
		gap: var(--ds-space-1);
		min-width: 0;
	}
	.kicker,
	.sub {
		overflow: hidden;
		color: var(--ds-ink-3);
		font-size: var(--ds-text-xs);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.value {
		overflow: hidden;
		font-weight: var(--ds-weight-light);
		line-height: var(--ds-leading-tight);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.sm .value {
		font-size: var(--ds-text-lg);
		font-weight: var(--ds-weight-regular);
	}
	.md .value {
		font-size: var(--ds-text-2xl);
	}
	.lg .value {
		font-size: var(--ds-text-3xl);
	}
	.unit {
		margin-left: var(--ds-space-1);
		color: var(--ds-ink-3);
		font-size: var(--ds-text-sm);
		font-weight: var(--ds-weight-regular);
		letter-spacing: var(--ds-tracking-normal);
	}
	.muted {
		color: var(--ds-ink-4);
	}
	.accent {
		color: var(--ds-accent-700);
	}
	.warn {
		color: var(--ds-warn-ink);
	}
	.bad {
		color: var(--ds-bad-ink);
	}
</style>
