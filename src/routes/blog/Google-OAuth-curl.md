---
layout: post
title: curl Script to Get Google OAuth Tokens
date: 2021-08-18T00:00:00.000Z
tags:
  - google-apis
  - curl
  - oauth
description: >-
  If you just need a token to do some experimenting, or perhaps you don't want
  to download the whole client library just to get your hands on a token, here
  is a minimal cURL script.
---

While the Google client libraries that wrap the OAuth functinality are great, sometimes you want something a bit more basic.

(This snippet is fetched from a [GitHub Gist](https://gist.github.com/iansedano/e0b259ab9c63ebddd22658f697026c19))

<script>
	
	import { onMount } from "svelte"
	
	onMount(async () => {
		const json = await fetch(
				"https://api.github.com/gists/e0b259ab9c63ebddd22658f697026c19"
			)
			.then(resp => resp.json())
			
		const pre = document.createElement("pre")
		const code = document.createElement("code")
		
		
		code.innerText = json.files["get_token.sh"].content
		pre.appendChild(code)
		
		
		document.querySelector("main").appendChild(pre)
	})
	
	
</script>

<style>
	code {
		font-size: 0.5em;
	}
</style>
