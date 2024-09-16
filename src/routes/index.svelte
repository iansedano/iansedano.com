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
	<li id="stackoverflow">
		<a
			href="https://stackoverflow.com/users/10445017/iansedano"
			target="_blank"
		>
			<Stackoverflow {size} />
		</a>
	</li>
	<li id="github">
		<a href="https://github.com/iansedano" target="_blank">
			<Github {size} />
		</a>
	</li>
	<li id="twitter">
		<a href="https://twitter.com/iansedano" target="_blank">
			<Twitter {size} />
		</a>
	</li>
	<li id="linkedin">
		<a href="https://www.linkedin.com/in/ian-currie-82448a58/" target="_blank">
			<Linkedin {size} />
		</a>
	</li>
	<li id="realpython">
		<a href="https://realpython.com/team/icurrie/" target="_blank">
			<RealPythonLogo size={80} />
		</a>
	</li>
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		align-items: left;
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
		left: -8px;
	}

	#twitter {
		position: relative;
		left: -8px;
	}

	#realpython {
		padding-top: 10px;
	}
</style>
