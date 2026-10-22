<script lang="ts">
	/*
	 * The corner wordmark. Hovering the home link makes the two n's lean in
	 * toward the y, like two people turning to listen. Plain text for
	 * assistive tech: the spans carry no semantics.
	 */
</script>

<span class="wm"><span class="n1">n</span>y<span class="n2">n</span>t</span>

<style>
	.wm span {
		display: inline-block;
		transform-origin: 50% 90%;
	}
	@media (prefers-reduced-motion: no-preference) {
		.wm span {
			transition: transform 600ms var(--ease-soft, cubic-bezier(0.22, 1, 0.36, 1));
		}
		:global(a:hover) > .wm .n1 {
			transform: rotate(5deg);
		}
		:global(a:hover) > .wm .n2 {
			transform: rotate(-5deg);
		}
	}
</style>
