<script lang="ts">
	import Icon, { type IconName } from './Icon.svelte';
	import type { Pressable } from './types';

	/** Round button with one glyph. Always carries a label for screen readers and the tooltip. */
	let {
		icon,
		label,
		href,
		type = 'button',
		size = 'md',
		variant = 'soft',
		iconClass = '',
		class: cls = '',
		...rest
	}: Pressable & {
		icon: IconName;
		label: string;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'soft' | 'ghost' | 'solid' | 'surface';
		iconClass?: string;
	} = $props();
	const px = { sm: 14, md: 16, lg: 18 };
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	type={href ? undefined : type}
	aria-label={label}
	title={label}
	class="ib {size} {variant} {cls}"
	{...rest}
>
	<Icon name={icon} size={px[size]} class={iconClass} />
</svelte:element>

<style>
	.ib {
		display: inline-grid;
		flex-shrink: 0;
		place-items: center;
		border: 0;
		border-radius: var(--ds-radius-full);
		color: var(--ds-ink);
		cursor: pointer;
		transition:
			background-color var(--ds-duration-fast) var(--ds-ease),
			color var(--ds-duration-fast) var(--ds-ease),
			transform var(--ds-duration-fast) var(--ds-ease),
			box-shadow var(--ds-duration-fast) var(--ds-ease);
	}
	.sm {
		width: var(--ds-chip-sm);
		height: var(--ds-chip-sm);
	}
	.md {
		width: var(--ds-chip-md);
		height: var(--ds-chip-md);
	}
	.lg {
		width: var(--ds-chip-lg);
		height: var(--ds-chip-lg);
	}
	.soft {
		background: var(--ds-neutral-100);
	}
	.ghost {
		background: transparent;
		color: var(--ds-ink-2);
	}
	.surface {
		background: var(--ds-surface);
		box-shadow: var(--ds-shadow-0);
	}
	.solid {
		background: var(--ds-accent-600);
		color: var(--ds-on-accent);
		box-shadow: var(--ds-shadow-accent);
	}
	@media (hover: hover) {
		.soft:hover,
		.ghost:hover,
		.surface:hover {
			background: var(--ds-accent-50);
			color: var(--ds-accent-700);
		}
		.solid:hover {
			background: var(--ds-accent-700);
		}
	}
	.ib:active {
		transform: scale(0.94);
	}
	.ib:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
