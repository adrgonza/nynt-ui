<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import Icon from './Icon.svelte';

	export type Option = { value: string; label: string };

	/** Native select dressed as a pill ("Mes ⌄" in the reference). Keyboard and mobile pickers stay native. */
	let {
		value = $bindable(),
		options,
		label,
		size = 'md',
		variant = 'pill',
		class: cls = '',
		...rest
	}: Omit<HTMLSelectAttributes, 'value' | 'size' | 'class'> & {
		value?: string;
		options: Option[];
		label: string;
		size?: 'sm' | 'md';
		/** pill: compact control in a header. field: full width in a form. */
		variant?: 'pill' | 'field';
		class?: string;
	} = $props();
</script>

<span class="select {size} {variant} {cls}">
	<select bind:value aria-label={label} {...rest}>
		{#each options as o (o.value)}<option value={o.value}>{o.label}</option>{/each}
	</select>
	<Icon name="down" size={13} class="chev" />
</span>

<style>
	.select {
		position: relative;
		display: inline-flex;
		align-items: center;
		min-width: 0;
	}
	.field {
		display: flex;
		width: 100%;
	}
	select {
		width: 100%;
		min-width: 0;
		appearance: none;
		border: 0;
		border-radius: var(--ds-radius-full);
		background: var(--ds-neutral-100);
		padding: 0 calc(var(--ds-space-8) + var(--ds-space-1)) 0 var(--ds-space-4);
		color: var(--ds-ink);
		font: inherit;
		cursor: pointer;
		transition: background-color var(--ds-duration-fast) var(--ds-ease);
	}
	.md select {
		height: var(--ds-chip-sm);
		font-size: var(--ds-text-xs);
	}
	.sm select {
		height: var(--ds-space-6);
		font-size: var(--ds-text-2xs);
	}
	.field select {
		height: var(--ds-control-height);
		border-radius: var(--ds-radius-sm);
		background: var(--ds-neutral-50);
		font-size: var(--ds-text-sm);
	}
	@media (hover: hover) {
		select:hover {
			background: var(--ds-accent-50);
		}
	}
	.select :global(.chev) {
		position: absolute;
		right: var(--ds-space-3);
		color: var(--ds-ink-3);
		pointer-events: none;
	}
</style>
