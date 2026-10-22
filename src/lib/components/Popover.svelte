<script lang="ts">
	import type { Snippet } from 'svelte';
	import { placeNear } from '../utils/place';

	/** Light dismiss popover opened by the element with popovertarget={id}; placed next to it. */
	let {
		id,
		label,
		width = 'md',
		mode = 'auto',
		ref = $bindable(),
		onopenchange,
		children,
		class: cls = '',
		...rest
	}: {
		id?: string;
		label: string;
		width?: 'sm' | 'md' | 'lg';
		mode?: 'auto' | 'manual';
		ref?: HTMLElement;
		onopenchange?: (open: boolean) => void;
		children: Snippet;
		class?: string;
		[key: string]: unknown;
	} = $props();

	function place(e: ToggleEvent) {
		if (e.type === 'toggle') onopenchange?.(e.newState === 'open');
		if (e.newState !== 'open' || !id) return;
		const anchor = document.querySelector(`[popovertarget="${id}"]`);
		if (anchor) placeNear(e.currentTarget as HTMLElement, anchor);
	}
</script>

<div bind:this={ref} {id} popover={mode} role="dialog" aria-label={label} class="pop {width} {cls}" onbeforetoggle={place} ontoggle={place} {...rest}>
	{@render children()}
</div>

<style>
	.pop {
		position: fixed;
		inset: auto;
		margin: 0;
		max-height: min(34rem, calc(100dvh - var(--ds-space-6)));
		overflow-y: auto;
		border: 0;
		border-radius: var(--ds-radius-xl);
		background: var(--ds-surface);
		padding: var(--ds-space-6);
		color: var(--ds-ink);
		font-family: var(--ds-font);
		font-size: var(--ds-text-sm);
		box-shadow: var(--ds-shadow-2);
		opacity: 0;
		transform: translateY(var(--ds-space-1)) scale(0.98);
		transition:
			opacity var(--ds-duration-fast) var(--ds-ease),
			transform var(--ds-duration-slow) var(--ds-ease),
			display var(--ds-duration-slow) allow-discrete,
			overlay var(--ds-duration-slow) allow-discrete;
	}
	.sm {
		width: min(var(--ds-measure-md), calc(100vw - var(--ds-space-6)));
	}
	.md {
		width: min(var(--ds-measure-lg), calc(100vw - var(--ds-space-6)));
	}
	.lg {
		width: min(var(--ds-measure-xl), calc(100vw - var(--ds-space-6)));
	}
	.pop:popover-open {
		opacity: 1;
		transform: none;
	}
	@starting-style {
		.pop:popover-open {
			opacity: 0;
			transform: translateY(var(--ds-space-1)) scale(0.98);
		}
	}
</style>
