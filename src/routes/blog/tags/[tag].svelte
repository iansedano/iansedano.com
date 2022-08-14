<script>
	export let posts;
</script>

<ul>
	{#each posts as post}
		<li>
			<h2>
				<a href="/blog/{post[1]}">
					{post[0]}
				</a>
			</h2>
		</li>
	{/each}
</ul>

<style>
	h2 {
		font-size: 1.5em;
		margin: 0.7em;
	}
</style>
