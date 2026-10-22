<script lang="ts">
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';

	/**
	 * Text field on a soft grey well, no border. Multiline renders a self sizing textarea.
	 * Spread props and attachments go to the field itself.
	 */
	type Common = { label?: string; hint?: string; multiline?: boolean; size?: 'sm' | 'md' | 'lg'; class?: string; fieldClass?: string };
	let {
		label,
		hint,
		multiline = false,
		size = 'md',
		class: cls = '',
		fieldClass = '',
		...rest
	}: Common & Omit<HTMLInputAttributes & HTMLTextareaAttributes, 'class' | 'size'> = $props();
</script>

{#if label}
	<label class="wrap {cls}">
		<span class="field-label">{label}</span>
		{#if multiline}<textarea class="field {size} {fieldClass}" {...rest as HTMLTextareaAttributes}></textarea>{:else}<input class="field {size} {fieldClass}" {...rest as HTMLInputAttributes} />{/if}
		{#if hint}<span class="hint">{hint}</span>{/if}
	</label>
{:else if multiline}
	<textarea class="field {size} {cls} {fieldClass}" {...rest as HTMLTextareaAttributes}></textarea>
{:else}
	<input class="field {size} {cls} {fieldClass}" {...rest as HTMLInputAttributes} />
{/if}

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		gap: var(--ds-space-2);
		min-width: 0;
	}
	.field-label,
	.hint {
		color: var(--ds-ink-3);
		font-size: var(--ds-text-2xs);
	}
	.field {
		width: 100%;
		min-width: 0;
		border: 0;
		border-radius: var(--ds-radius-sm);
		background: var(--ds-neutral-50);
		padding: var(--ds-space-2) var(--ds-space-3);
		color: var(--ds-ink);
		font: inherit;
		font-size: var(--ds-text-sm);
		transition:
			background-color var(--ds-duration-fast) var(--ds-ease),
			box-shadow var(--ds-duration-fast) var(--ds-ease);
	}
	input.field {
		height: var(--ds-control-height);
	}
	input.field.sm {
		height: var(--ds-chip-sm);
		padding-block: var(--ds-space-1);
	}
	input.field.lg {
		height: var(--ds-chip-lg);
		border-radius: var(--ds-radius-full);
		padding-inline: var(--ds-space-5);
		font-size: var(--ds-text-md);
	}
	textarea.field {
		resize: none;
		field-sizing: content;
		min-height: calc(var(--ds-control-height) * 1.6);
		line-height: var(--ds-leading-normal);
	}
	.field::placeholder {
		color: var(--ds-ink-3);
	}
	.field:focus {
		outline: none;
		background: var(--ds-surface);
		box-shadow: var(--ds-shadow-focus);
	}
</style>
