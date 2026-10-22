<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Icon from './Icon.svelte';

	/** Pill search field with the glyph on the right, as in the reference. */
	let {
		value = $bindable(''),
		ref = $bindable(),
		label = 'Buscar',
		placeholder = 'Buscar',
		class: cls = '',
		...rest
	}: Omit<HTMLInputAttributes, 'value' | 'class'> & { value?: string; ref?: HTMLInputElement; label?: string; class?: string } = $props();
</script>

<label class="search {cls}">
	<span class="sr">{label}</span>
	<input bind:this={ref} bind:value type="search" {placeholder} autocomplete="off" spellcheck="false" {...rest} />
	<Icon name="search" size={15} class="glass" />
</label>

<style>
	.search {
		position: relative;
		display: flex;
		align-items: center;
		min-width: 0;
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	input {
		width: 100%;
		min-width: 0;
		height: var(--ds-control-height);
		border: 0;
		border-radius: var(--ds-radius-full);
		background: var(--ds-surface);
		padding: 0 var(--ds-space-10) 0 var(--ds-space-4);
		color: var(--ds-ink);
		font: inherit;
		font-size: var(--ds-text-xs);
		box-shadow: var(--ds-shadow-0);
		transition: box-shadow var(--ds-duration-fast) var(--ds-ease);
	}
	input::placeholder {
		color: var(--ds-ink-3);
	}
	input::-webkit-search-cancel-button {
		appearance: none;
	}
	input:focus {
		outline: none;
		box-shadow: var(--ds-shadow-focus);
	}
	.search :global(.glass) {
		position: absolute;
		right: var(--ds-space-4);
		color: var(--ds-ink-3);
		pointer-events: none;
	}
</style>
