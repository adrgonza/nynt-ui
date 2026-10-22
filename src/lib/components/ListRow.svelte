<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconChip from './IconChip.svelte';
	import type { IconName } from './Icon.svelte';
	import type { Pressable } from './types';

	/** A list line: round icon chip, a title with a faint second line, a figure on the right. */
	let {
		icon,
		chip = 'outline',
		lead,
		title,
		sub,
		value,
		valueTone = 'default',
		href,
		type = 'button',
		interactive,
		trailing,
		size = 'md',
		class: cls = '',
		...rest
	}: Pressable & {
		icon?: IconName;
		chip?: 'accent' | 'solid' | 'neutral' | 'outline' | 'warn' | 'bad';
		/** Replaces the icon chip, for a date or a checkbox. */
		lead?: Snippet;
		title: string;
		sub?: string;
		value?: string | number;
		valueTone?: 'default' | 'muted' | 'accent' | 'warn' | 'bad';
		interactive?: boolean;
		trailing?: Snippet;
		size?: 'sm' | 'md';
	} = $props();
	const tag = $derived(href ? 'a' : interactive ? 'button' : 'div');
</script>

<svelte:element this={tag} {href} type={tag === 'button' ? type : undefined} class="row {size} {tag !== 'div' ? 'press' : ''} {cls}" {...rest}>
	{#if lead}<span class="lead">{@render lead()}</span>{:else if icon}<IconChip {icon} tone={chip} size={size === 'sm' ? 'sm' : 'md'} />{/if}
	<span class="text">
		<span class="title">{title}</span>
		{#if sub}<span class="sub">{sub}</span>{/if}
	</span>
	{#if value !== undefined}<span class="value ds-num {valueTone}">{value}</span>{/if}
	{#if trailing}<span class="trail">{@render trailing()}</span>{/if}
</svelte:element>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: var(--ds-space-4);
		min-width: 0;
		border: 0;
		border-radius: var(--ds-radius-md);
		background: none;
		padding: var(--ds-space-2);
		margin-inline: calc(var(--ds-space-2) * -1);
		color: inherit;
		font: inherit;
		text-align: left;
		text-decoration: none;
	}
	.sm {
		gap: var(--ds-space-3);
		padding-block: var(--ds-space-1);
	}
	.press {
		cursor: pointer;
		transition: background-color var(--ds-duration-fast) var(--ds-ease);
	}
	@media (hover: hover) {
		.press:hover {
			background: var(--ds-accent-50);
		}
	}
	.lead {
		display: grid;
		flex-shrink: 0;
		place-items: center;
	}
	.text {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
	}
	.title {
		overflow: hidden;
		font-size: var(--ds-text-base);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.sm .title {
		font-size: var(--ds-text-sm);
	}
	.sub {
		overflow: hidden;
		color: var(--ds-ink-3);
		font-size: var(--ds-text-2xs);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.value {
		flex-shrink: 0;
		font-size: var(--ds-text-base);
		font-weight: var(--ds-weight-medium);
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
	.trail {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: var(--ds-space-2);
	}
</style>
