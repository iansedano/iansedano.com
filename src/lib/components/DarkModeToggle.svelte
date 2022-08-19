<script>
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	// gsap.defaults({ ease: 'slow(0.9, 0.7, false)', duration: 0.3 });

	const defaultEmoji = '🌙';

	onMount(() => {
		let theme = 'dark'; //default to dark

		//local storage is used to override OS theme settings
		if (
			localStorage.getItem('theme') &&
			localStorage.getItem('theme') == 'dark'
		) {
			theme = 'dark';
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			//OS theme setting detected as dark
			theme = 'dark';
		}

		//dark theme preferred, set document with a `data-theme` attribute
		if (theme == 'dark') {
			document.documentElement.setAttribute('data-theme', 'dark');
		}
	});

	function handleClick(e) {
		const checked = document.getElementById('toggle').checked;
		const emoji = checked ? '🌙' : '🌞';
		const theme = checked ? '' : 'light-theme';
		gsap
			.timeline()
			.to(e.target, { y: -2 })
			.to(e.target, { opacity: 0 })
			.set(e.target, { attr: { content: emoji } })
			.set(document.body, { className: theme })
			.to(e.target, { opacity: 1 })
			.to(e.target, { y: 0 })
			.to(e.target, { y: 0 });
	}
</script>

<input type="checkbox" class="toggle-input" id="toggle" />
<label
	for="toggle"
	class="toggle-label"
	content={defaultEmoji}
	on:click={handleClick}
/>

<style lang="scss">
	input[type='checkbox'] {
		opacity: 0;
		position: absolute;

		+ .toggle-label {
			cursor: pointer;
			position: relative;
			width: 1.5em;
			top: -0.2em;
			margin: auto;

			&:before {
				content: attr(content);
			}
		}

		&:checked {
			+ .toggle-label {
				&:before {
					content: attr(content);
				}
			}
		}
	}
</style>
