<script>
	import Twitter from '$components/TwitterLogo.svelte';
	import Stackoverflow from '$components/StackoverflowLogo.svelte';
	import Linkedin from '$components/LinkedinLogo.svelte';
	import Github from '$components/GithubLogo.svelte';
	import RealPythonLogo from '$components/RealPythonLogo.svelte';

	const size = 30;
</script>

<h1>Ian Currie Sedano</h1>
<p>
	Full stack engineer at <a href="https://codingnomads.co">CodingNomads</a>
</p>

<ul>
	<a href="https://stackoverflow.com/users/10445017/iansedano" target="_blank">
		<li class="logo" id="stackoverflow">
			<Stackoverflow {size} />
		</li>
	</a>
	<a href="https://github.com/iansedano" target="_blank">
		<li class="logo" id="github">
			<Github {size} />
		</li>
	</a>

	<a href="https://twitter.com/iansedano" target="_blank">
		<li class="logo" id="twitter">
			<Twitter {size} />
		</li>
	</a>
	<a href="https://www.linkedin.com/in/ian-currie-82448a58/" target="_blank">
		<li class="logo" id="linkedin">
			<Linkedin {size} />
		</li></a
	>
	<a href="https://realpython.com/team/icurrie/" target="_blank">
		<li class="logo" id="realpython">
			<RealPythonLogo size={80} />
		</li>
	</a>
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1em;
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

	p {
		margin-top: 0px;
		margin-bottom: 0px;
	}

	h1 {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	#stackoverflow {
		position: relative;
	}

	#linkedin {
		position: relative;
		bottom: 2px;
	}

	#twitter {
		position: relative;
	}

	#realpython {
	}

	.logo {
		color: black;
	}
</style>
