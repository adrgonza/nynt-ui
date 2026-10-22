<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * The frame of every private page: a pale canvas, one large white rounded container,
	 * the icon rail on its left and a quiet top bar. On desktop the frame is exactly one
	 * screen tall and only the content area scrolls, if it ever has to.
	 */
	let { sidebar, header, children, class: cls = '' }: { sidebar: Snippet; header?: Snippet; children: Snippet; class?: string } = $props();
</script>

<div class="shell {cls}">
	<div class="frame">
		<div class="side">{@render sidebar()}</div>
		<div class="main">
			{#if header}<header class="top">{@render header()}</header>{/if}
			<main class="content ds-scroll">{@render children()}</main>
		</div>
	</div>
</div>

<style>
	.shell {
		min-height: 100dvh;
		background: var(--ds-canvas);
	}
	.frame {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		background: var(--ds-surface);
	}
	.main {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
		min-height: 0;
	}
	.top {
		display: flex;
		align-items: center;
		gap: var(--ds-space-3);
		min-height: var(--ds-topbar-height);
		padding: 0 var(--ds-space-4);
	}
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		padding: 0 var(--ds-space-4) var(--ds-space-10);
	}
	@media (min-width: 768px) {
		.shell {
			padding: var(--ds-space-4);
		}
		.frame {
			flex-direction: row;
			min-height: calc(100dvh - var(--ds-space-4) * 2);
			border-radius: var(--ds-radius-2xl);
			box-shadow: var(--ds-shadow-1);
		}
		.side {
			flex: 0 0 var(--ds-sidebar-width);
		}
		.top {
			padding: 0 var(--ds-space-8) 0 var(--ds-space-4);
		}
		.content {
			padding: 0 var(--ds-space-8) var(--ds-space-8) var(--ds-space-4);
		}
	}
	@media (min-width: 1024px) {
		.frame {
			height: calc(100dvh - var(--ds-space-4) * 2);
		}
		.side {
			position: sticky;
			top: 0;
		}
		.content {
			overflow-y: auto;
		}
	}
	@media (min-width: 1280px) {
		.top {
			padding-right: var(--ds-space-10);
		}
		.content {
			padding-right: var(--ds-space-10);
			padding-bottom: var(--ds-space-10);
		}
	}
</style>
