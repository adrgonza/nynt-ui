<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon, { type IconName } from './Icon.svelte';
	import type { Pressable } from './types';

	/** Pill button. Primary is the filled accent, secondary a quiet grey, ghost only text. */
	let {
		href,
		type = 'button',
		variant = 'secondary',
		size = 'md',
		icon,
		iconAfter,
		busy = false,
		children,
		class: cls = '',
		...rest
	}: Pressable & {
		variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
		size?: 'sm' | 'md';
		icon?: IconName;
		iconAfter?: IconName;
		busy?: boolean;
		children: Snippet;
	} = $props();
</script>

<svelte:element this={href ? 'a' : 'button'} {href} type={href ? undefined : type} aria-busy={busy || undefined} class="btn {variant} {size} {cls}" {...rest}>
	{#if icon}<Icon name={busy ? 'refresh' : icon} size={size === 'sm' ? 13 : 15} class={busy ? 'ds-spin' : ''} />{/if}
	{@render children()}
	{#if iconAfter}<Icon name={busy && !icon ? 'refresh' : iconAfter} size={size === 'sm' ? 13 : 15} class={busy && !icon ? 'ds-spin' : ''} />{/if}
</svelte:element>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--ds-space-2);
		border: 0;
		border-radius: var(--ds-radius-full);
		font: inherit;
		font-weight: var(--ds-weight-medium);
		white-space: nowrap;
		text-decoration: none;
		cursor: pointer;
		transition:
			background-color var(--ds-duration-fast) var(--ds-ease),
			color var(--ds-duration-fast) var(--ds-ease),
			transform var(--ds-duration-fast) var(--ds-ease);
	}
	.md {
		height: var(--ds-control-height);
		padding: 0 var(--ds-space-5);
		font-size: var(--ds-text-sm);
	}
	.sm {
		height: var(--ds-chip-sm);
		padding: 0 var(--ds-space-4);
		font-size: var(--ds-text-xs);
	}
	.primary {
		background: var(--ds-accent-600);
		color: var(--ds-on-accent);
		box-shadow: var(--ds-shadow-accent);
	}
	.secondary {
		background: var(--ds-neutral-100);
		color: var(--ds-ink);
	}
	.ghost {
		background: transparent;
		color: var(--ds-ink-3);
		padding-inline: var(--ds-space-2);
	}
	.danger {
		background: transparent;
		color: var(--ds-ink-3);
		padding-inline: var(--ds-space-2);
	}
	@media (hover: hover) {
		.primary:hover {
			background: var(--ds-accent-700);
		}
		.secondary:hover {
			background: var(--ds-accent-50);
			color: var(--ds-accent-700);
		}
		.ghost:hover {
			color: var(--ds-ink);
		}
		.danger:hover {
			color: var(--ds-bad-ink);
		}
	}
	.btn:active {
		transform: scale(0.97);
	}
	.btn:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
	.btn :global(.ds-spin) {
		animation: spin calc(var(--ds-duration-slow) * 2) linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
