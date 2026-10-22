<script lang="ts">
	export type Point = { label: string; value: number; title?: string };

	/**
	 * One smooth line, no grid. The active point gets a ring, its value above it and a trail of
	 * dots down to its axis label, which fills with the deep accent. Hover or focus moves it.
	 */
	let {
		data,
		active = $bindable(data.length - 1),
		label,
		caption,
		format = (v: number) => String(v),
		ticks = 2,
		class: cls = ''
	}: {
		data: Point[];
		active?: number;
		label: string;
		/** Small word under the active value, e.g. "cambios". */
		caption?: string;
		format?: (v: number) => string;
		ticks?: number;
		class?: string;
	} = $props();

	const id = $props.id();
	let w = $state(0);
	let h = $state(0);
	const GUTTER_L = 28;
	const GUTTER_B = 44;
	const GUTTER_T = 52;
	const PAD_X = 18;

	const max = $derived(Math.max(1, ...data.map((d) => d.value)));
	const top = $derived(niceCeil(max));
	const plotW = $derived(Math.max(0, w - GUTTER_L - PAD_X * 2));
	const plotH = $derived(Math.max(0, h - GUTTER_T - GUTTER_B));
	const x = (i: number) => GUTTER_L + PAD_X + (data.length > 1 ? (i / (data.length - 1)) * plotW : plotW / 2);
	const y = (v: number) => GUTTER_T + plotH - (v / top) * plotH;
	const pts = $derived(data.map((d, i) => [x(i), y(d.value)] as const));
	const line = $derived(monotone(pts));
	const area = $derived(pts.length ? `${line} L${pts.at(-1)![0]} ${GUTTER_T + plotH} L${pts[0][0]} ${GUTTER_T + plotH} Z` : '');
	const tickValues = $derived(Array.from({ length: ticks }, (_, i) => Math.round((top / ticks) * (i + 1))));
	const idx = $derived(Math.max(0, Math.min(data.length - 1, active)));
	const at = $derived(pts[idx]);
	// On narrow charts every other label is shown, plus the active one.
	const every = $derived(data.length > 1 && plotW / (data.length - 1) < 52 ? 2 : 1);
	const trail = $derived(at ? Array.from({ length: 5 }, (_, i) => at[1] + ((GUTTER_T + plotH - at[1]) * (i + 1)) / 6) : []);

	function niceCeil(v: number) {
		const step = Math.pow(10, Math.floor(Math.log10(v)));
		const n = v / step;
		return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * step;
	}
	/** Monotone cubic (Fritsch and Carlson): smooth, never overshoots below zero or above a peak. */
	function monotone(p: readonly (readonly [number, number])[]) {
		if (p.length < 2) return p.length ? `M${p[0][0]} ${p[0][1]}` : '';
		const n = p.length;
		const d = p.slice(1).map((q, i) => (q[1] - p[i][1]) / (q[0] - p[i][0]));
		const m = p.map((_, i) => (i === 0 ? d[0] : i === n - 1 ? d[n - 2] : d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2));
		for (let i = 0; i < n - 1; i++) {
			if (d[i] === 0) {
				m[i] = 0;
				m[i + 1] = 0;
				continue;
			}
			const a = m[i] / d[i];
			const b = m[i + 1] / d[i];
			const s = a * a + b * b;
			if (s > 9) {
				const t = 3 / Math.sqrt(s);
				m[i] = t * a * d[i];
				m[i + 1] = t * b * d[i];
			}
		}
		let out = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
		for (let i = 0; i < n - 1; i++) {
			const dx = (p[i + 1][0] - p[i][0]) / 3;
			out += ` C${(p[i][0] + dx).toFixed(1)} ${(p[i][1] + m[i] * dx).toFixed(1)} ${(p[i + 1][0] - dx).toFixed(1)} ${(p[i + 1][1] - m[i + 1] * dx).toFixed(1)} ${p[i + 1][0].toFixed(1)} ${p[i + 1][1].toFixed(1)}`;
		}
		return out;
	}
	function nearest(e: PointerEvent) {
		const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
		const px = e.clientX - rect.left;
		let best = 0;
		for (let i = 1; i < pts.length; i++) if (Math.abs(pts[i][0] - px) < Math.abs(pts[best][0] - px)) best = i;
		active = best;
	}
</script>

<figure class="chart {cls}" bind:clientWidth={w} bind:clientHeight={h} aria-label={label}>
	{#if w && h && data.length}
		<svg width={w} height={h} viewBox="0 0 {w} {h}" onpointermove={nearest} role="presentation">
			<defs>
				<linearGradient id="area-{id}" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" class="area-a" />
					<stop offset="1" class="area-b" />
				</linearGradient>
			</defs>
			{#each tickValues as t (t)}
				<text class="tick" x={GUTTER_L - 6} y={y(t)} text-anchor="end" dominant-baseline="middle">{format(t)}</text>
			{/each}
			<path d={area} fill="url(#area-{id})" />
			<path d={line} class="line" fill="none" />
			{#if at}
				{#each trail as ty, i (i)}
					<circle cx={at[0] + (i % 2 ? 2.5 : -2)} cy={ty} r={3.4 - i * 0.55} class="trail" style:opacity={0.85 - i * 0.14} />
				{/each}
				<circle cx={at[0]} cy={at[1]} r="6.5" class="point" />
			{/if}
		</svg>
		{#if at}
			<span class="value" style:left="{at[0]}px" style:top="{at[1] - 14}px">
				<span class="figure ds-num">{format(data[idx].value)}</span>
				{#if caption}<span class="caption">{caption}</span>{/if}
			</span>
		{/if}
		<span class="axis" style:top="{GUTTER_T + plotH + 8}px">
			{#each data as d, i (i)}
				<button type="button" class="tick-x {i === idx ? 'on' : ''}" style:left="{pts[i][0]}px" title={d.title ?? d.label} aria-pressed={i === idx} onmouseenter={() => (active = i)} onfocus={() => (active = i)} onclick={() => (active = i)}>{i === idx || (data.length - 1 - i) % every === 0 ? d.label : ''}</button>
			{/each}
		</span>
	{/if}
	<figcaption class="sr">{label}: {data.map((d) => `${d.title ?? d.label} ${format(d.value)}`).join(', ')}</figcaption>
</figure>

<style>
	.chart {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 12rem;
		margin: 0;
	}
	svg {
		position: absolute;
		inset: 0;
		overflow: visible;
	}
	.tick {
		fill: var(--ds-ink-4);
		font-size: var(--ds-text-2xs);
	}
	.area-a {
		stop-color: var(--ds-accent-100);
		stop-opacity: 0.9;
	}
	.area-b {
		stop-color: var(--ds-accent-50);
		stop-opacity: 0;
	}
	.line {
		stroke: var(--ds-accent-500);
		stroke-width: var(--ds-stroke-bold);
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: d var(--ds-duration-slow) var(--ds-ease);
	}
	.point {
		fill: var(--ds-surface);
		stroke: var(--ds-accent-600);
		stroke-width: 3;
		transition:
			cx var(--ds-duration-slow) var(--ds-ease),
			cy var(--ds-duration-slow) var(--ds-ease);
	}
	.trail {
		fill: var(--ds-accent-400);
		transition:
			cx var(--ds-duration-slow) var(--ds-ease),
			cy var(--ds-duration-slow) var(--ds-ease);
	}
	.value {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translate(-50%, -100%);
		pointer-events: none;
		transition:
			left var(--ds-duration-slow) var(--ds-ease),
			top var(--ds-duration-slow) var(--ds-ease);
	}
	.figure {
		font-size: var(--ds-text-md);
		font-weight: var(--ds-weight-medium);
		line-height: var(--ds-leading-tight);
	}
	.caption {
		color: var(--ds-ink-3);
		font-size: var(--ds-text-2xs);
	}
	.axis {
		position: absolute;
		inset-inline: 0;
		height: var(--ds-chip-sm);
	}
	.tick-x {
		position: absolute;
		top: 0;
		display: grid;
		place-items: center;
		min-width: var(--ds-chip-sm);
		height: var(--ds-chip-sm);
		transform: translateX(-50%);
		border: 0;
		border-radius: var(--ds-radius-full);
		background: transparent;
		padding: 0 var(--ds-space-2);
		color: var(--ds-ink-3);
		font: inherit;
		font-size: var(--ds-text-2xs);
		white-space: nowrap;
		cursor: pointer;
		transition:
			background-color var(--ds-duration-fast) var(--ds-ease),
			color var(--ds-duration-fast) var(--ds-ease);
	}
	.tick-x.on {
		background: var(--ds-accent-600);
		color: var(--ds-on-accent);
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
