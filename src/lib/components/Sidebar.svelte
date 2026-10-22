<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon, { type IconName } from './Icon.svelte';

	export type NavItem = { href: string; icon: IconName; label: string; active?: boolean };

	/**
	 * Slim icon rail. The brand on top, a few destinations, one action at the foot. On phones it lies flat as a top bar.
	 * The brand is a snippet so the panel can show the real public wordmark; brandClass styles its link.
	 */
	let {
		brand,
		brandLabel = 'Inicio',
		brandClass = '',
		brandHref = '/panel',
		items,
		footer,
		label = 'Panel',
		class: cls = ''
	}: { brand: Snippet; brandLabel?: string; brandClass?: string; brandHref?: string; items: NavItem[]; footer?: Snippet; label?: string; class?: string } = $props();
</script>

<nav class="rail {cls}" aria-label={label}>
	<a class="brand {brandClass}" href={brandHref} title={brandLabel}>{@render brand()}</a>
	<ul class="items">
		{#each items as it (it.href)}
			<li>
				<a href={it.href} class="item" class:on={it.active} aria-current={it.active ? 'page' : undefined} title={it.label}>
					<Icon name={it.icon} size={19} />
					<span class="sr">{it.label}</span>
				</a>
			</li>
		{/each}
	</ul>
	{#if footer}<div class="foot">{@render footer()}</div>{/if}
</nav>

<style>
	.rail {
		display: flex;
		align-items: center;
		gap: var(--ds-space-3);
		padding: var(--ds-space-3) var(--ds-space-4);
	}
	.brand {
		margin-right: auto;
		text-decoration: none;
		transition: opacity var(--ds-duration-fast) var(--ds-ease);
	}
	@media (hover: hover) {
		.brand:hover {
			opacity: 0.6;
		}
	}
	.items {
		display: flex;
		gap: var(--ds-space-1);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.item {
		display: grid;
		place-items: center;
		width: var(--ds-chip-md);
		height: var(--ds-chip-md);
		border-radius: var(--ds-radius-md);
		color: var(--ds-ink-4);
		transition:
			background-color var(--ds-duration-fast) var(--ds-ease),
			color var(--ds-duration-fast) var(--ds-ease);
	}
	@media (hover: hover) {
		.item:hover {
			color: var(--ds-accent-700);
		}
	}
	.item.on {
		background: var(--ds-accent-50);
		color: var(--ds-accent-700);
	}
	.foot {
		display: flex;
		align-items: center;
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	@media (min-width: 768px) {
		.rail {
			flex-direction: column;
			gap: var(--ds-space-10);
			height: 100%;
			padding: 0 0 var(--ds-space-6);
		}
		.brand {
			display: flex;
			align-items: center;
			justify-content: center;
			height: var(--ds-topbar-height);
			margin: 0;
		}
		.items {
			flex-direction: column;
			gap: var(--ds-space-3);
		}
		.item {
			width: var(--ds-chip-lg);
			height: var(--ds-chip-lg);
		}
		.foot {
			margin-top: auto;
		}
	}
</style>
