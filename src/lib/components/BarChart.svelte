<script lang="ts">
	export type Bar = { label: string; a: number; b?: number; title?: string };

	/** Rounded columns. "a" is the deep accent, "b" (optional, stacked on top) the pale tint. Empty days show a dot. */
	let {
		data,
		label,
		showValues = false,
		labelEvery = 1,
		class: cls = ''
	}: { data: Bar[]; label: string; showValues?: boolean; labelEvery?: number; class?: string } = $props();
	const max = $derived(Math.max(1, ...data.map((d) => d.a + (d.b ?? 0))));
</script>

<figure class="bars {cls}" aria-label={label}>
	<span class="cols">
		{#each data as d, i (i)}
			{@const total = d.a + (d.b ?? 0)}
			<span class="col" title={d.title ?? `${d.label}: ${total}`}>
				{#if showValues}<span class="v ds-num">{total}</span>{/if}
				<span class="stack">
					{#if total === 0}
						<span class="empty"></span>
					{:else}
						{#if d.b}<span class="b" style:height="{(d.b / max) * 100}%"></span>{/if}
						{#if d.a}<span class="a" style:height="{(d.a / max) * 100}%"></span>{/if}
					{/if}
				</span>
				<span class="l">{i % labelEvery === 0 ? d.label : ''}</span>
			</span>
		{/each}
	</span>
	<figcaption class="sr">{label}: {data.map((d) => `${d.title ?? d.label} ${d.a + (d.b ?? 0)}`).join(', ')}</figcaption>
</figure>

<style>
	.bars {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: var(--ds-space-16);
		margin: 0;
	}
	.cols {
		display: flex;
		align-items: stretch;
		gap: var(--ds-space-2);
		height: 100%;
	}
	.col {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		gap: var(--ds-space-2);
		min-width: 0;
	}
	.stack {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: flex-end;
		gap: var(--ds-space-0);
		width: 100%;
	}
	.a,
	.b {
		display: block;
		width: 100%;
		min-height: var(--ds-space-1);
		border-radius: var(--ds-radius-xs);
		transition: height var(--ds-duration-slow) var(--ds-ease);
	}
	.a {
		background: var(--ds-accent-500);
	}
	.b {
		background: var(--ds-accent-200);
	}
	.empty {
		align-self: center;
		width: var(--ds-space-1);
		height: var(--ds-space-1);
		border-radius: var(--ds-radius-full);
		background: var(--ds-neutral-200);
	}
	.v,
	.l {
		color: var(--ds-ink-3);
		font-size: var(--ds-text-2xs);
		line-height: 1;
		white-space: nowrap;
	}
	.l {
		min-height: 1em;
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
