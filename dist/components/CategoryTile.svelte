<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon, { type IconName } from './Icon.svelte';
	import type { Pressable } from './types';

	/** Rounded tile for one item of a set. The active tile fills with the deep accent. */
	let {
		label,
		value,
		unit,
		icon,
		image,
		active = false,
		href,
		type = 'button',
		badge,
		interactive = true,
		class: cls = '',
		...rest
	}: Pressable & {
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
	} = $props();
	const tag = $derived(href ? 'a' : interactive ? 'button' : 'div');
</script>

<svelte:element
	this={tag}
	{href}
	type={tag === 'button' ? type : undefined}
	class="tile {active ? 'active' : ''} {tag !== 'div' ? 'press' : ''} {cls}"
	aria-current={href && active ? 'true' : undefined}
	{...rest}
>
	<span class="top">
		{#if image}<img class="avatar" src={image} alt="" loading="lazy" />{:else if icon}<span class="mark"><Icon name={icon} size={18} /></span>{/if}
		{#if badge}<span class="badge">{@render badge()}</span>{/if}
	</span>
	<span class="name">{label}</span>
	{#if value !== undefined}
		<span class="value ds-num">{value}{#if unit}<span class="unit">{unit}</span>{/if}</span>
	{/if}
</svelte:element>

<style>
	.tile {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--ds-space-1);
		min-width: 0;
		overflow: hidden;
		border: 0;
		border-radius: var(--ds-radius-lg);
		background: var(--ds-accent-50);
		padding: var(--ds-space-4) var(--ds-space-4) var(--ds-space-5);
		color: var(--ds-ink);
		font: inherit;
		text-align: left;
		text-decoration: none;
		isolation: isolate;
		transition:
			background-color var(--ds-duration-slow) var(--ds-ease),
			color var(--ds-duration-slow) var(--ds-ease),
			box-shadow var(--ds-duration-slow) var(--ds-ease),
			transform var(--ds-duration-slow) var(--ds-ease);
	}
	.press {
		cursor: pointer;
	}
	@media (hover: hover) {
		.press:not(.active):hover {
			background: var(--ds-accent-100);
		}
	}
	.press:active {
		transform: scale(0.98);
	}
	.top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		min-height: var(--ds-space-6);
		margin-bottom: auto;
		padding-bottom: var(--ds-space-4);
	}
	.mark {
		color: var(--ds-accent-600);
	}
	.avatar {
		width: var(--ds-chip-sm);
		height: var(--ds-chip-sm);
		border-radius: var(--ds-radius-full);
		object-fit: cover;
		object-position: top;
		box-shadow: 0 0 0 var(--ds-space-0) var(--ds-surface);
	}
	.active .avatar {
		box-shadow: 0 0 0 var(--ds-space-0) color-mix(in srgb, var(--ds-on-accent) 35%, transparent);
	}
	.name {
		overflow: hidden;
		color: var(--ds-ink-2);
		font-size: var(--ds-text-xs);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.value {
		overflow: hidden;
		font-size: var(--ds-text-lg);
		font-weight: var(--ds-weight-regular);
		line-height: var(--ds-leading-tight);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.unit {
		margin-left: var(--ds-space-1);
		color: var(--ds-ink-3);
		font-size: var(--ds-text-2xs);
		letter-spacing: var(--ds-tracking-normal);
	}
	/* Active: the deep accent, with a faint scatter of lighter dots, like light through glass. */
	.active {
		background-color: var(--ds-accent-600);
		background-image:
			radial-gradient(circle at 78% 18%, color-mix(in srgb, var(--ds-accent-300) 55%, transparent) 0 var(--ds-space-0), transparent calc(var(--ds-space-0) + 0.5px)),
			radial-gradient(circle at 64% 42%, color-mix(in srgb, var(--ds-accent-300) 40%, transparent) 0 var(--ds-space-1), transparent calc(var(--ds-space-1) + 0.5px)),
			radial-gradient(circle at 88% 64%, color-mix(in srgb, var(--ds-accent-300) 35%, transparent) 0 var(--ds-space-0), transparent calc(var(--ds-space-0) + 0.5px)),
			radial-gradient(circle at 20% 90%, color-mix(in srgb, var(--ds-accent-300) 30%, transparent) 0 var(--ds-space-1), transparent calc(var(--ds-space-1) + 0.5px)),
			radial-gradient(120% 90% at 100% 0%, var(--ds-accent-500), transparent 70%);
		color: var(--ds-on-accent);
		box-shadow: var(--ds-shadow-accent);
	}
	.active .mark,
	.active .name,
	.active .unit {
		color: color-mix(in srgb, var(--ds-on-accent) 82%, transparent);
	}
</style>
