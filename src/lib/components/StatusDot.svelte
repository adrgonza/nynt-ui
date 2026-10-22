<script lang="ts">
	import type { Level } from './types';

	const text: Record<Level, string> = { ok: 'bien', warn: 'atención', bad: 'problema', none: 'sin datos' };
	/** A small status dot. Problems breathe; everything else stays still. */
	let { level, label = text[level], class: cls = '' }: { level: Level; label?: string; class?: string } = $props();
</script>

<span class="dot {level} {cls}" role="img" aria-label={label} title={label}></span>

<style>
	.dot {
		position: relative;
		display: inline-block;
		flex-shrink: 0;
		width: var(--ds-space-2);
		height: var(--ds-space-2);
		border-radius: var(--ds-radius-full);
		vertical-align: middle;
	}
	.ok {
		background: var(--ds-ok);
	}
	.warn {
		background: var(--ds-warn);
	}
	.bad {
		background: var(--ds-bad);
	}
	.bad::after {
		content: '';
		position: absolute;
		inset: calc(var(--ds-space-1) * -1);
		border-radius: inherit;
		background: color-mix(in srgb, var(--ds-bad) 28%, transparent);
		animation: breathe 2.4s var(--ds-ease) infinite;
	}
	.none {
		box-shadow: inset 0 0 0 var(--ds-stroke) var(--ds-neutral-300);
	}
	@keyframes breathe {
		from {
			opacity: 1;
			transform: scale(0.5);
		}
		to {
			opacity: 0;
			transform: scale(1.5);
		}
	}
</style>
