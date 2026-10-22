<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Pressable } from './types';

	/**
	 * A quiet container. "plain" is just spacing (most of the panel), "surface" a white card,
	 * "tint" the pale accent wash, "sunken" a soft grey well.
	 */
	let {
		as = 'div',
		variant = 'plain',
		pad = 'md',
		interactive = false,
		href,
		type,
		children,
		class: cls = '',
		...rest
	}: Pressable & {
		as?: 'div' | 'section' | 'article' | 'aside' | 'li' | 'button' | 'a' | 'form';
		variant?: 'plain' | 'surface' | 'tint' | 'sunken';
		pad?: 'none' | 'sm' | 'md' | 'lg';
		interactive?: boolean;
		children: Snippet;
		[key: string]: unknown;
	} = $props();
	const tag = $derived(href ? 'a' : as);
</script>

<svelte:element this={tag} {href} type={tag === 'button' ? (type ?? 'button') : undefined} class="card {variant} pad-{pad} {interactive || href || tag === 'button' ? 'interactive' : ''} {cls}" {...rest}>
	{@render children()}
</svelte:element>

<style>
	.card {
		position: relative;
		display: block;
		min-width: 0;
		border: 0;
		border-radius: var(--ds-radius-xl);
		color: inherit;
		font: inherit;
		text-align: left;
		text-decoration: none;
	}
	.pad-none {
		padding: 0;
	}
	.pad-sm {
		padding: var(--ds-space-4);
	}
	.pad-md {
		padding: var(--ds-space-6);
	}
	.pad-lg {
		padding: var(--ds-space-8);
	}
	.plain.pad-md,
	.plain.pad-sm,
	.plain.pad-lg {
		padding-inline: 0;
	}
	.surface {
		background: var(--ds-surface);
		box-shadow: var(--ds-shadow-1);
	}
	.tint {
		background: var(--ds-accent-50);
	}
	.sunken {
		background: var(--ds-neutral-50);
	}
	.interactive {
		cursor: pointer;
		transition:
			background-color var(--ds-duration-fast) var(--ds-ease),
			box-shadow var(--ds-duration-slow) var(--ds-ease),
			transform var(--ds-duration-slow) var(--ds-ease);
	}
	@media (hover: hover) {
		.interactive.surface:hover {
			box-shadow: var(--ds-shadow-2);
			transform: translateY(calc(var(--ds-space-0) * -1));
		}
		.interactive.tint:hover,
		.interactive.sunken:hover {
			background: var(--ds-accent-100);
		}
	}
</style>
