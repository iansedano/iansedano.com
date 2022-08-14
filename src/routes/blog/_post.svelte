<script>
	export let title;
	export let date;
	export let tags;

	function formatDate(dateString) {
		return new Intl.DateTimeFormat('en-UK').format(new Date(dateString));
	}
</script>

<svelte:head>
	<title>My blog - {title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<h1>{title}</h1>

<p><i>Published: {formatDate(date)}</i></p>

{#if tags.length}
	<aside>
		<ul>
			{#each tags as tag}
				<li>
					<a href="/blog/tags/{tag}">
						🏷️ {tag}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
{/if}

<slot />

<style>
	aside a {
		text-decoration: none;
	}

	aside li {
		list-style-type: none;
	}

	aside ul {
		padding: 0;
	}
</style>
