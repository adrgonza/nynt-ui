<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon, { type IconName } from './Icon.svelte';
	import type { Pressable } from './types';

	/** Small rounded label. With pressed or href it becomes a toggle or a link. */
	let {
		tone = 'neutral',
		size = 'md',
		icon,
		iconAfter,
		pressed,
		href,
		type = 'button',
		children,
		class: cls = '',
		...rest
	}: Pressable & {
		tone?: 'neutral' | 'accent' | 'solid' | 'outline';
		size?: 'sm' | 'md';
		icon?: IconName;
		iconAfter?: IconName;
		pressed?: boolean;
		children: Snippet;
	} = $props();
	const tag = $derived(href ? 'a' : pressed !== undefined || rest.onclick || rest.popovertarget ? 'button' : 'span');
</script>

<svelte:element
	this={tag}
	{href}
	type={tag === 'button' ? type : undefined}
	aria-pressed={tag === 'button' && pressed !== undefined ? pressed : undefined}
	class="pill t-{tone} {size} {pressed ? 'on' : ''} {tag !== 'span' ? 'press' : ''} {cls}"
	{...rest}
>
	{#if icon}<Icon name={icon} size={size === 'sm' ? 12 : 14} />{/if}
	{@render children()}
	{#if iconAfter}<Icon name={iconAfter} size={size === 'sm' ? 12 : 14} />{/if}
</svelte:element>

<style>
	.pill {
		display: inline-flex;
		align-items: center;
		gap: var(--ds-space-1);
		border: 0;
		border-radius: var(--ds-radius-full);
		font: inherit;
		white-space: nowrap;
		text-decoration: none;
		transition:
			background-color var(--ds-duration-fast) var(--ds-ease),
			color var(--ds-duration-fast) var(--ds-ease);
	}
	.md {
		height: var(--ds-chip-sm);
		padding: 0 var(--ds-space-4);
		font-size: var(--ds-text-xs);
	}
	.sm {
		height: var(--ds-space-6);
		padding: 0 var(--ds-space-3);
		font-size: var(--ds-text-2xs);
	}
	.t-neutral {
		background: var(--ds-neutral-100);
		color: var(--ds-ink-2);
	}
	.t-accent {
		background: var(--ds-accent-50);
		color: var(--ds-accent-700);
	}
	.t-solid,
	.on {
		background: var(--ds-accent-600);
		color: var(--ds-on-accent);
	}
	.t-outline {
		background: transparent;
		color: var(--ds-ink-2);
		box-shadow: inset 0 0 0 var(--ds-stroke) var(--ds-neutral-200);
	}
	.press {
		cursor: pointer;
	}
	@media (hover: hover) {
		.press:not(.on):not(.t-solid):hover {
			background: var(--ds-accent-50);
			color: var(--ds-accent-700);
		}
	}
</style>
