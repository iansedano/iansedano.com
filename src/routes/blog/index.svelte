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

<a href="/blog/tags">Browse tags</a>

<ul>
	{#each posts as post}
		<li>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			<div class="details">
				<div class="date">{formatDate(post.meta.date)}</div>
				<ul class="tag-list">
					{#if post.meta.tags}
						{#each post.meta.tags as tag}
							<li class="tag">
								{tag}
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		padding-left: 0;
		li {
			list-style-type: none;
			h2 {
				font-size: 1.5rem;
				a {
					text-decoration: none;
				}
			}
		}
	}

	.tag-list,
	.details {
		display: flex;
		flex-direction: row;
	}

	.tag {
		&:before {
			content: '🏷️';
		}
	}
</style>
