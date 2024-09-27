<script>
	export let title;
	export let date;
	export let layout;
	export let description;

	function formatDate(dateString) {
		return new Intl.DateTimeFormat('en-UK').format(new Date(dateString));
	}
</script>

<svelte:head>
	<title>{title} - Ian Currie</title>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>

<article class="article">
	<h1 class="title">{title}</h1>

	<p><i>{formatDate(date)}</i></p>

	<slot />
</article>

<style>
	.article {
		border: 0px solid transparent;
		padding: 0px;
	}

	.article h1 {
		font-size: 2rem;
		font-weight: 500;
		margin-bottom: 0.2rem;
	}

	.article h2 {
		font-size: 1.5rem;
		font-weight: 500;
		margin-bottom: 0.2rem;
	}

	.article h3 {
		font-size: 1rem !important;
		font-weight: 500;
		margin-bottom: 0.2rem;
	}

	.title {
		text-wrap: balance;
	}
</style>
