<script>
  import Header from '$components/Header.svelte'
  import '$lib/styles/style.css'
  import '$lib/styles/prism-xonokai.css'
</script>
  
<Header />

<main>
  <slot />
</main>

<footer>Hello, I'm the footer.</footer>