<script lang="ts">
	/**
	 * Discreet studio credit for private areas (never on a public page).
	 * DM Mono, uppercase, 12px: the NYNT label style. Needs nynt-ui/fonts.css (or DM Mono) loaded.
	 */
	let { href = 'https://nynt.ch', label = 'Powered by NYNT', class: cls = '' }: { href?: string; label?: string; class?: string } = $props();
</script>

<a class="powered {cls}" {href} target="_blank" rel="noopener">{label}</a>

<style>
	.powered {
		color: var(--ds-ink-4, #9aa1ae);
		font-family: 'DM Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		text-decoration: none;
	}
	.powered:hover {
		color: var(--ds-ink, #141821);
	}
</style>
