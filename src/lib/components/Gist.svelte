<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		const json = await fetch(
			'https://api.github.com/gists/e0b259ab9c63ebddd22658f697026c19'
		).then((resp) => resp.json());

		const pre = document.createElement('pre');
		const code = document.createElement('code');

		code.innerText = json.files['get_token.sh'].content;
		pre.appendChild(code);
		code.style.fontSize = '0.5em';
		document.querySelector('main').appendChild(pre);
	});
</script>

<style>
	code {
		font-size: 0.5em;
	}
</style>
