<script lang="ts">
	import type { Snippet } from 'svelte';

	/** Section title in the 4fin manner: one medium word, an optional faint second word, actions on the right. */
	let {
		title,
		muted,
		meta,
		level = 2,
		size = 'md',
		actions,
		class: cls = ''
	}: {
		title: string;
		muted?: string;
		meta?: string;
		level?: 1 | 2 | 3;
		size?: 'sm' | 'md' | 'lg';
		actions?: Snippet;
		class?: string;
	} = $props();
</script>

<div class="head {size} {cls}">
	<svelte:element this={`h${level}`} class="title">
		{title}{#if muted}<span class="muted">{muted}</span>{/if}
	</svelte:element>
	{#if meta}<span class="meta">{meta}</span>{/if}
	{#if actions}<span class="actions">{@render actions()}</span>{/if}
</div>

<style>
	.head {
		display: flex;
		align-items: center;
		gap: var(--ds-space-3);
		min-width: 0;
	}
	.title {
		display: flex;
		align-items: baseline;
		gap: var(--ds-space-3);
		min-width: 0;
		margin: 0;
		font-weight: var(--ds-weight-medium);
		letter-spacing: var(--ds-tracking-tight);
		line-height: var(--ds-leading-tight);
		white-space: nowrap;
	}
	.sm .title {
		font-size: var(--ds-text-base);
	}
	.md .title {
		font-size: var(--ds-text-lg);
	}
	.lg .title {
		font-size: var(--ds-text-2xl);
		font-weight: var(--ds-weight-regular);
	}
	.muted {
		color: var(--ds-ink-4);
		font-weight: var(--ds-weight-regular);
	}
	.meta {
		overflow: hidden;
		color: var(--ds-ink-3);
		font-size: var(--ds-text-xs);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.actions {
		display: flex;
		align-items: center;
		gap: var(--ds-space-2);
		margin-left: auto;
	}
</style>
