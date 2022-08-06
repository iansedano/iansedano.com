<script context="module">
  export const load = ({ url }) => {
    const currentRoute = url.pathname
  
    return {
      props: {
        currentRoute
      }
    }
  }
  </script>

<script>
  import Header from '$components/Header.svelte'
  import '$lib/styles/style.css'
  import '$lib/styles/prism-xonokai.css'
  import { fade } from 'svelte/transition'

  export let currentRoute;
</script>
  
<Header />

{#key currentRoute}
<main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
  <slot />
</main>
{/key}

<footer>Hello, I'm the footer.</footer>