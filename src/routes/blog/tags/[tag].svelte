<script>
	export let posts;
  console.log(posts)
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
