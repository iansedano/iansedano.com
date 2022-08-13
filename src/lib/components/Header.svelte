<script>
	import DarkModeToggle from '$components/DarkModeToggle.svelte';
</script>

<header>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/projects">Projects</a></li>
			<li>
				<DarkModeToggle />
			</li>
		</ul>
	</nav>
</header>

<style>
	input[type='checkbox'] {
		appearance: none;
		margin: 0;
		font: inherit;
		color: currentColor;
		width: 1.15em;
		height: 1.15em;
		border: 0.15em solid currentColor;
		border-radius: 0.2em;
		transform: translateY(-0.075em);
	}

	.moon {
		fill: var(--accent);
	}
</style>
