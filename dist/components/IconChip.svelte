<script lang="ts">
	import Icon, { type IconName } from './Icon.svelte';

	/** Round icon chip, the list marker of the system. */
	let {
		icon,
		size = 'md',
		tone = 'accent',
		label,
		class: cls = ''
	}: {
		icon: IconName;
		size?: 'sm' | 'md' | 'lg';
		tone?: 'accent' | 'solid' | 'neutral' | 'outline' | 'warn' | 'bad' | 'glass';
		label?: string;
		class?: string;
	} = $props();
	const px = { sm: 14, md: 17, lg: 20 };
</script>

<span class="chip {size} t-{tone} {cls}" role={label ? 'img' : undefined} aria-label={label}>
	<Icon name={icon} size={px[size]} />
</span>

<style>
	.chip {
		display: inline-grid;
		flex-shrink: 0;
		place-items: center;
		border-radius: var(--ds-radius-full);
		transition:
			background-color var(--ds-duration-fast) var(--ds-ease),
			color var(--ds-duration-fast) var(--ds-ease);
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
	.t-accent {
		background: var(--ds-accent-50);
		color: var(--ds-accent-700);
	}
	.t-solid {
		background: var(--ds-accent-600);
		color: var(--ds-on-accent);
	}
	.t-neutral {
		background: var(--ds-neutral-100);
		color: var(--ds-ink-2);
	}
	.t-outline {
		box-shadow: inset 0 0 0 var(--ds-stroke) var(--ds-neutral-200);
		color: var(--ds-ink);
	}
	.t-warn {
		background: color-mix(in srgb, var(--ds-warn) 14%, var(--ds-surface));
		color: var(--ds-warn-ink);
	}
	.t-bad {
		background: color-mix(in srgb, var(--ds-bad) 12%, var(--ds-surface));
		color: var(--ds-bad-ink);
	}
	.t-glass {
		background: color-mix(in srgb, var(--ds-on-accent) 16%, transparent);
		color: var(--ds-on-accent);
	}
</style>
