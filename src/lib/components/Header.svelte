<script>
	import DarkModeToggle from '$components/DarkModeToggle.svelte';

	import gsap from 'gsap';
	import { onMount } from 'svelte';

	// gsap.defaults({ ease: 'slow(0.9, 0.7, false)', duration: 5 });

	onMount(() => {
		const headerDiv = document.querySelector('header');
		const headerHeight = headerDiv.clientHeight;

		let prevScrollPos = window.pageYOffset;

		window.onscroll = function () {
			const currentScrollPos = window.pageYOffset;
			const down = currentScrollPos > prevScrollPos;

			if (down && window.pageYOffset > headerHeight) {
				gsap.to(headerDiv, { top: -headerHeight });
			} else if (!down) {
				gsap.to(headerDiv, { top: 0 });
			}

			prevScrollPos = currentScrollPos;
		};
	});
</script>

<header>
	<nav>
		<div class="left">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/blog">Blog</a></li>
			</ul>
		</div>
		<div class="middle" />
		<div class="right" />
	</nav>
</header>

<style lang="scss">
	header {
		position: sticky;
		top: 0px;
		font-size: 1.3rem;
		z-index: 999;
	}

	nav {
		width: 100%;
		height: 2em;
		background-color: var(--bg);
		border-bottom: solid 1px var(--border);
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		transition: 1s;

		div {
			margin-top: 0.5em;
		}
	}

	a {
		text-decoration: none;
		border: none;
		padding: 0;
	}

	ul {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.left,
	.right,
	.middle {
		flex-grow: 1;
	}

	.left {
		margin-left: 0;
	}
</style>
