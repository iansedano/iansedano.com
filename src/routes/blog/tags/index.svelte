<script context="module">
	export const load = async ({ params, fetch }) => {
		const currentTag = params.tag;
		const response = await fetch('/api/posts.json');
		const posts = await response.json();

		const tags = [...posts.reduce((acc, post) => {
      post.meta.tags.forEach(tag => acc.add(tag))
      return acc
    }, new Set())];

		return {
			props: {
				tags: tags
			}
		};
	};
</script>

<script>
	export let tags;
</script>

<ul>
	{#each tags as tag}
		<li>
			<h2>
				<a href="/blog/tags/{tag}">
					{tag}
				</a>
			</h2>
		</li>
	{/each}
</ul>
