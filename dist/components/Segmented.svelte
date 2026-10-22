<script lang="ts">
	export type Segment = { id: string; label: string; count?: number | null; href?: string };

	/** A row of quiet tabs. The current one is a pale accent pill; the rest are only text. */
	let {
		items,
		current,
		label,
		onselect,
		class: cls = ''
	}: { items: Segment[]; current: string; label: string; onselect?: (id: string) => void; class?: string } = $props();
</script>

<div class="seg ds-scroll {cls}" role="group" aria-label={label}>
	{#each items as s (s.id)}
		{#if s.href}
			<a href={s.href} data-sveltekit-noscroll aria-current={current === s.id ? 'page' : undefined} class:on={current === s.id}>
				{s.label}{#if s.count !== undefined && s.count !== null}<span class="count ds-num">{s.count}</span>{/if}
			</a>
		{:else}
			<button type="button" aria-pressed={current === s.id} class:on={current === s.id} onclick={() => onselect?.(s.id)}>
				{s.label}{#if s.count !== undefined && s.count !== null}<span class="count ds-num">{s.count}</span>{/if}
			</button>
		{/if}
	{/each}
</div>

<style>
	.seg {
		display: flex;
		gap: var(--ds-space-1);
		max-width: 100%;
		overflow-x: auto;
	}
	a,
	button {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		gap: var(--ds-space-2);
		height: var(--ds-chip-sm);
		border: 0;
		border-radius: var(--ds-radius-full);
		background: transparent;
		padding: 0 var(--ds-space-4);
		color: var(--ds-ink-3);
		font: inherit;
		font-size: var(--ds-text-sm);
		white-space: nowrap;
		text-decoration: none;
		cursor: pointer;
		transition:
			background-color var(--ds-duration-fast) var(--ds-ease),
			color var(--ds-duration-fast) var(--ds-ease);
	}
	@media (hover: hover) {
		a:hover,
		button:hover {
			color: var(--ds-ink);
		}
	}
	.on {
		background: var(--ds-accent-50);
		color: var(--ds-accent-700);
	}
	.count {
		color: var(--ds-ink-4);
		font-size: var(--ds-text-2xs);
	}
	.on .count {
		color: var(--ds-accent-600);
	}
</style>
