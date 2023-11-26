<script context="module">
	export const load = async ({ fetch }) => {
		const posts = await fetch('/api/posts.json');
		const allPosts = await posts.json();

		return {
			props: {
				posts: allPosts
			}
		};
	};
</script>

<script>
	export let posts;

	function formatDate(dateString) {
		return new Intl.DateTimeFormat('en-UK').format(new Date(dateString));
	}
</script>

<ul>
	{#each posts as post}
		<li>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			<p>{formatDate(post.meta.date)}</p>
			<p>{post.meta.description}</p>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		padding-left: 0;
		li {
			list-style-type: none;
			margin-bottom: 1rem;
			h2 {
				font-size: 1.5rem;
				font-weight: 500;
				margin-bottom: 0.2rem;
				a {
					color: black;
					text-decoration: none;
				}
			}
			p {
				font-size: 1rem;
				margin-top: 0.2rem;
				margin-bottom: 0.2rem;
			}
		}
	}
</style>
