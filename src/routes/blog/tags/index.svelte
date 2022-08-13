<script context="module">
	export const load = async ({ params, fetch }) => {
		const response = await fetch('/api/posts.json');
		const posts = await response.json();

		// Create count of unique tags
		const tags = posts.reduce((acc, post) => {
			if ('tags' in post.meta) {
				post.meta.tags.forEach((tag) => {
					if (tag in acc) {
						acc[tag] += 1;
					} else {
						acc[tag] = 1;
					}
				});
			}
			return acc;
		}, {});
		return {
			props: {
				tags: tags
			}
		};
	};
</script>

<script lang="ts">
	export let tags: Object;
</script>

<ul>
	{#each Object.entries(tags).sort((a, b) => b[1] - a[1]) as [tag, count]}
		<li>
			<h2>
				<a href="/blog/tags/{tag}">
					{tag}
				</a>
				{count}
			</h2>
		</li>
	{/each}
</ul>
