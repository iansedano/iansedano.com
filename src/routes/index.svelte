<script>
	import Twitter from '$components/TwitterLogo.svelte';
	import Stackoverflow from '$components/StackoverflowLogo.svelte';
	import Linkedin from '$components/LinkedinLogo.svelte';
	import Github from '$components/GithubLogo.svelte';

	const size = 30;
</script>

<h1>Ian Currie Sedano</h1>
<p>Software Engineer</p>

<br />

<ul>
	<li>
		<a href="https://stackoverflow.com/users/10445017/iansedano">
			<Stackoverflow {size} />
		</a>
	</li>
	<li>
		<a href="https://github.com/iansedano">
			<Github {size} />
		</a>
	</li>
	<li>
		<a href="https://twitter.com/iansedano">
			<Twitter {size} />
		</a>
	</li>
	<li>
		<a href="https://www.linkedin.com/in/ian-currie-82448a58/">
			<Linkedin {size} />
		</a>
	</li>
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		left: 0;
		width: 3em;
		padding-left: 0px;
	}

	li {
		list-style-type: none;

		&:not(:last-child) {
			margin-bottom: 10px;
		}

		a {
			color: black;
			text-decoration: none;
		}
	}
</style>
