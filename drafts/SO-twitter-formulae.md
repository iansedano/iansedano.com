---
layout: post
title: Why You Can't Scrape Sites Like Twitter
date: 2021-04-12T00:00:00.000Z
tags:
  - javascript
  - web
description: >-
  An explanation and demonstration of why you might not be able to scrape certain sites like Twitter
---

### Twitter is dynamically generated

This means that the HTML that is loaded when you request the HTML does not contain any tweets. Once the basic HTML has loaded, then the tweets begin to get populated into the page via JavaScript.

Since this is the case, any HTML you recieve from `IMPORTXML` will not have any tweets. Twitter itself tries to limit any scraping that is not done via the API.

So unfortunately your best recourse is to either use the API (it has a free tier), or learn to use some web automation software such as Puppeteer, which can emulate a person who visits the site, waits for a second to let the content load, and _then_ scrape the data.

Disclaimer: It is possible that IMPORTXML will work using the css class as you have done, though this will be very unreliable. The CSS classes are also auto generated, so they will be changing very often.

### Demonstration

Using `curl` on the command line to fetch the raw HTML of https://twitter.com/Twitter/status/1380306486962782208 (before any JavaScript changes):

```curl
curl https://twitter.com/Twitter/status/1380306486962782208 >> twitter.html
```

Examining the resulting `twitter.html` file:

```html
<!DOCTYPE html>
<html dir="ltr" lang="en">
	<meta charset="utf-8" />
	<meta
		name="viewport"
		content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
	/>
	<link rel="preconnect" href="//abs.twimg.com" />
	<link rel="dns-prefetch" href="//abs.twimg.com" />
	<link rel="preconnect" href="//api.twitter.com" />
	<link rel="dns-prefetch" href="//api.twitter.com" />
	<link rel="preconnect" href="//pbs.twimg.com" />
	<link rel="dns-prefetch" href="//pbs.twimg.com" />
	<link rel="preconnect" href="//t.co" />
	<link rel="dns-prefetch" href="//t.co" />
	<link rel="preconnect" href="//video.twimg.com" />
	<link rel="dns-prefetch" href="//video.twimg.com" />
	<link
		rel="preload"
		as="script"
		crossorigin="anonymous"
		href="https://abs.twimg.com/responsive-web/client-web-legacy/polyfills.98da7185.js"
		nonce="MjE5MTk0YTItNjQxMy00NzhjLWE0ZWEtNTA0NzEwMzdkNmQy"
	/>
	<link
		rel="preload"
		as="script"
		crossorigin="anonymous"
		href="https://abs.twimg.com/responsive-web/client-web-legacy/vendors~main.6fa4fac5.js"
		nonce="MjE5MTk0YTItNjQxMy00NzhjLWE0ZWEtNTA0NzEwMzdkNmQy"
	/>
	<link
		rel="preload"
		as="script"
		crossorigin="anonymous"
		href="https://abs.twimg.com/responsive-web/client-web-legacy/i18n/en.2eb8dfe5.js"
		nonce="MjE5MTk0YTItNjQxMy00NzhjLWE0ZWEtNTA0NzEwMzdkNmQy"
	/>
	<link
		rel="preload"
		as="script"
		crossorigin="anonymous"
		href="https://abs.twimg.com/responsive-web/client-web-legacy/main.88d8e8e5.js"
		nonce="MjE5MTk0YTItNjQxMy00NzhjLWE0ZWEtNTA0NzEwMzdkNmQy"
	/>
	<meta property="fb:app_id" content="2231777543" />
	<meta property="og:site_name" content="Twitter" />
	<meta
		name="google-site-verification"
		content="acYOOcR5z6puMzLn6hLDZI1nNHXPxt57OIstz1vnCV0"
	/>
	<meta
		name="facebook-domain-verification"
		content="x6sdcc8b5ju3bh8nbm59eswogvg6t1"
	/>
	<link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
	<link
		rel="alternate"
		hreflang="x-default"
		href="https://twitter.com/twitter/status/1380306486962782208"
	/>
	<link
		rel="alternate"
		hreflang="en"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=en"
	/>
	<link
		rel="alternate"
		hreflang="ar"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ar"
	/>
	<link
		rel="alternate"
		hreflang="ar-x-fm"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ar-x-fm"
	/>
	<link
		rel="alternate"
		hreflang="bg"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=bg"
	/>
	<link
		rel="alternate"
		hreflang="bn"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=bn"
	/>
	<link
		rel="alternate"
		hreflang="ca"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ca"
	/>
	<link
		rel="alternate"
		hreflang="cs"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=cs"
	/>
	<link
		rel="alternate"
		hreflang="da"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=da"
	/>
	<link
		rel="alternate"
		hreflang="de"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=de"
	/>
	<link
		rel="alternate"
		hreflang="el"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=el"
	/>
	<link
		rel="alternate"
		hreflang="en-GB"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=en-GB"
	/>
	<link
		rel="alternate"
		hreflang="en-ss"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=en-ss"
	/>
	<link
		rel="alternate"
		hreflang="en-xx"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=en-xx"
	/>
	<link
		rel="alternate"
		hreflang="es"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=es"
	/>
	<link
		rel="alternate"
		hreflang="eu"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=eu"
	/>
	<link
		rel="alternate"
		hreflang="fa"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=fa"
	/>
	<link
		rel="alternate"
		hreflang="fi"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=fi"
	/>
	<link
		rel="alternate"
		hreflang="fil"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=fil"
	/>
	<link
		rel="alternate"
		hreflang="fr"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=fr"
	/>
	<link
		rel="alternate"
		hreflang="ga"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ga"
	/>
	<link
		rel="alternate"
		hreflang="gl"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=gl"
	/>
	<link
		rel="alternate"
		hreflang="gu"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=gu"
	/>
	<link
		rel="alternate"
		hreflang="he"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=he"
	/>
	<link
		rel="alternate"
		hreflang="hi"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=hi"
	/>
	<link
		rel="alternate"
		hreflang="hr"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=hr"
	/>
	<link
		rel="alternate"
		hreflang="hu"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=hu"
	/>
	<link
		rel="alternate"
		hreflang="id"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=id"
	/>
	<link
		rel="alternate"
		hreflang="it"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=it"
	/>
	<link
		rel="alternate"
		hreflang="ja"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ja"
	/>
	<link
		rel="alternate"
		hreflang="kn"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=kn"
	/>
	<link
		rel="alternate"
		hreflang="ko"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ko"
	/>
	<link
		rel="alternate"
		hreflang="mr"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=mr"
	/>
	<link
		rel="alternate"
		hreflang="ms"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ms"
	/>
	<link
		rel="alternate"
		hreflang="nb"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=nb"
	/>
	<link
		rel="alternate"
		hreflang="nl"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=nl"
	/>
	<link
		rel="alternate"
		hreflang="pl"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=pl"
	/>
	<link
		rel="alternate"
		hreflang="pt"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=pt"
	/>
	<link
		rel="alternate"
		hreflang="ro"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ro"
	/>
	<link
		rel="alternate"
		hreflang="ru"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ru"
	/>
	<link
		rel="alternate"
		hreflang="sk"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=sk"
	/>
	<link
		rel="alternate"
		hreflang="sr"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=sr"
	/>
	<link
		rel="alternate"
		hreflang="sv"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=sv"
	/>
	<link
		rel="alternate"
		hreflang="ta"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ta"
	/>
	<link
		rel="alternate"
		hreflang="th"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=th"
	/>
	<link
		rel="alternate"
		hreflang="tr"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=tr"
	/>
	<link
		rel="alternate"
		hreflang="uk"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=uk"
	/>
	<link
		rel="alternate"
		hreflang="ur"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=ur"
	/>
	<link
		rel="alternate"
		hreflang="vi"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=vi"
	/>
	<link
		rel="alternate"
		hreflang="zh"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=zh"
	/>
	<link
		rel="alternate"
		hreflang="zh-Hant"
		href="https://twitter.com/twitter/status/1380306486962782208?lang=zh-Hant"
	/>
	<link
		rel="canonical"
		href="https://twitter.com/twitter/status/1380306486962782208"
	/>
	<link
		rel="search"
		type="application/opensearchdescription+xml"
		href="/opensearch.xml"
		title="Twitter"
	/>
	<link
		rel="mask-icon"
		sizes="any"
		href="https://abs.twimg.com/responsive-web/client-web-legacy/icon-svg.168b89d5.svg"
		color="#1da1f2"
	/>
	<link
		rel="shortcut icon"
		href="//abs.twimg.com/favicons/twitter.ico"
		type="image/x-icon"
	/>
	<link
		rel="apple-touch-icon"
		sizes="192x192"
		href="https://abs.twimg.com/responsive-web/client-web-legacy/icon-ios.b1fc7275.png"
	/>
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-title" content="Twitter" />
	<meta name="apple-mobile-web-app-status-bar-style" content="white" />
	<meta name="theme-color" content="#ffffff" />
	<meta
		http-equiv="origin-trial"
		content="Apir4chqTX+4eFxKD+ErQlKRB/VtZ/dvnLfd9Y9Nenl5r1xJcf81alryTHYQiuUlz9Q49MqGXqyaiSmqWzHUqQwAAABneyJvcmlnaW4iOiJodHRwczovL3R3aXR0ZXIuY29tOjQ0MyIsImZlYXR1cmUiOiJDb250YWN0c01hbmFnZXIiLCJleHBpcnkiOjE1NzUwMzUyODMsImlzU3ViZG9tYWluIjp0cnVlfQ=="
	/>
	<style>
		html,
		body {
			height: 100%;
		}
	</style>
	<style id="react-native-stylesheet">
		[stylesheet-group='0'] {
		}
		html {
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		}
		body {
			margin: 0;
		}
		button::-moz-focus-inner,
		input::-moz-focus-inner {
			border: 0;
			padding: 0;
		}
		input::-webkit-inner-spin-button,
		input::-webkit-outer-spin-button,
		input::-webkit-search-cancel-button,
		input::-webkit-search-decoration,
		input::-webkit-search-results-button,
		input::-webkit-search-results-decoration {
			display: none;
		}
		[stylesheet-group='0.1'] {
		}
		:focus:not([data-focusvisible-polyfill]) {
			outline: none;
		}
		[stylesheet-group='1'] {
		}
		.css-1dbjc4n {
			-ms-flex-align: stretch;
			-ms-flex-direction: column;
			-ms-flex-negative: 0;
			-ms-flex-preferred-size: auto;
			-webkit-align-items: stretch;
			-webkit-box-align: stretch;
			-webkit-box-direction: normal;
			-webkit-box-orient: vertical;
			-webkit-flex-basis: auto;
			-webkit-flex-direction: column;
			-webkit-flex-shrink: 0;
			align-items: stretch;
			border: 0 solid black;
			box-sizing: border-box;
			display: -webkit-box;
			display: -moz-box;
			display: -ms-flexbox;
			display: -webkit-flex;
			display: flex;
			flex-basis: auto;
			flex-direction: column;
			flex-shrink: 0;
			margin-bottom: 0px;
			margin-left: 0px;
			margin-right: 0px;
			margin-top: 0px;
			min-height: 0px;
			min-width: 0px;
			padding-bottom: 0px;
			padding-left: 0px;
			padding-right: 0px;
			padding-top: 0px;
			position: relative;
			z-index: 0;
		}
		.css-901oao {
			border: 0 solid black;
			box-sizing: border-box;
			color: rgba(0, 0, 0, 1);
			display: inline;
			font: 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
				Arial, sans-serif;
			margin-bottom: 0px;
			margin-left: 0px;
			margin-right: 0px;
			margin-top: 0px;
			padding-bottom: 0px;
			padding-left: 0px;
			padding-right: 0px;
			padding-top: 0px;
			white-space: pre-wrap;
			word-wrap: break-word;
		}
		.css-16my406 {
			color: inherit;
			font: inherit;
			white-space: inherit;
		}
		[stylesheet-group='2'] {
		}
		.r-13awgt0 {
			-ms-flex: 1 1 0%;
			-webkit-flex: 1;
			flex: 1;
		}
		.r-4qtqp9 {
			display: inline-block;
		}
		.r-ywje51 {
			margin-bottom: auto;
			margin-left: auto;
			margin-right: auto;
			margin-top: auto;
		}
		.r-hvic4v {
			display: none;
		}
		.r-1adg3ll {
			display: block;
		}
		[stylesheet-group='2.2'] {
		}
		.r-12vffkv > * {
			pointer-events: auto;
		}
		.r-12vffkv {
			pointer-events: none !important;
		}
		.r-14lw9ot {
			background-color: rgba(255, 255, 255, 1);
		}
		.r-1p0dtai {
			bottom: 0px;
		}
		.r-1d2f490 {
			left: 0px;
		}
		.r-1xcajam {
			position: fixed;
		}
		.r-zchlnj {
			right: 0px;
		}
		.r-ipm5af {
			top: 0px;
		}
		.r-yyyyoo {
			fill: currentcolor;
		}
		.r-1xvli5t {
			height: 1.25em;
		}
		.r-dnmrzs {
			max-width: 100%;
		}
		.r-bnwqim {
			position: relative;
		}
		.r-1plcrui {
			vertical-align: text-bottom;
		}
		.r-lrvibr {
			-moz-user-select: none;
			-ms-user-select: none;
			-webkit-user-select: none;
			user-select: none;
		}
		.r-13gxpu9 {
			color: rgba(29, 161, 242, 1);
		}
		.r-wy61xf {
			height: 72px;
		}
		.r-u8s1d {
			position: absolute;
		}
		.r-1blnp2b {
			width: 72px;
		}
		.r-1ykxob0 {
			top: 60%;
		}
		.r-1b2b6em {
			line-height: 2em;
		}
		.r-q4m81j {
			text-align: center;
		}
	</style>
	<body style="background-color: #FFFFFF;">
		<noscript>
			<style>
				body {
					-ms-overflow-style: scrollbar;
					overflow-y: scroll;
					overscroll-behavior-y: none;
				}
				.errorContainer {
					background-color: #fff;
					color: #0f1419;
					max-width: 600px;
					margin: 0 auto;
					padding: 10%;
					font-family: Helvetica, sans-serif;
					font-size: 16px;
				}
				.errorButton {
					margin: 3em 0;
				}
				.errorButton a {
					background: #1da1f2;
					border-radius: 2.5em;
					color: white;
					padding: 1em 2em;
					text-decoration: none;
				}
				.errorButton a:hover,
				.errorButton a:focus {
					background: rgb(26, 145, 218);
				}
				.errorFooter {
					color: #657786;
					font-size: 80%;
					line-height: 1.5;
					padding: 1em 0;
				}
				.errorFooter a,
				.errorFooter a:visited {
					color: #657786;
					text-decoration: none;
					padding-right: 1em;
				}
				.errorFooter a:hover,
				.errorFooter a:active {
					text-decoration: underline;
				}
				#placeholder,
				#react-root {
					display: none !important;
				}
				body {
					background-color: #fff !important;
				}
			</style>
			<div class="errorContainer">
				<img
					width="46"
					height="38"
					srcset="
						https://abs.twimg.com/errors/logo46x38.png    1x,
						https://abs.twimg.com/errors/logo46x38@2x.png 2x
					"
					src="https://abs.twimg.com/errors/logo46x38.png"
					alt="Twitter"
				/>
				<h1>JavaScript is not available.</h1>
				<p>
					We’ve detected that JavaScript is disabled in this browser. Please
					enable JavaScript or switch to a supported browser to continue using
					twitter.com. You can see a list of supported browsers in our Help
					Center.
				</p>
				<p class="errorButton">
					<a
						href="https://help.twitter.com/using-twitter/twitter-supported-browsers"
						>Help Center</a
					>
				</p>
				<p class="errorFooter">
					<a href="https://twitter.com/tos">Terms of Service</a>
					<a href="https://twitter.com/privacy">Privacy Policy</a>
					<a href="https://support.twitter.com/articles/20170514"
						>Cookie Policy</a
					>
					<a href="https://legal.twitter.com/imprint">Imprint</a>
					<a
						href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html"
						>Ads info</a
					>
					© 2021 Twitter, Inc.
				</p>
			</div>
		</noscript>
		<div id="react-root" style="height:100%;display:flex;">
			<div class="css-1dbjc4n r-13awgt0 r-12vffkv">
				<div class="css-1dbjc4n r-13awgt0 r-12vffkv">
					<style>
						@media (prefers-color-scheme: dark) {
							#placeholder {
								background-color: #000000;
							}
						}
					</style>
					<div
						aria-label="Loading…"
						class="css-1dbjc4n r-14lw9ot r-1p0dtai r-1d2f490 r-1xcajam r-zchlnj r-ipm5af"
						id="placeholder"
					>
						<svg
							viewBox="0 0 24 24"
							class="r-1p0dtai r-13gxpu9 r-4qtqp9 r-yyyyoo r-wy61xf r-1d2f490 r-ywje51 r-dnmrzs r-u8s1d r-zchlnj r-1plcrui r-ipm5af r-lrvibr r-1blnp2b"
						>
							<g>
								<path
									d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
								></path>
							</g>
						</svg>
					</div>
					<div
						class="css-1dbjc4n r-hvic4v r-1d2f490 r-1xcajam r-zchlnj r-1ykxob0"
						id="ScriptLoadFailure"
					>
						<form action="" method="GET">
							<div dir="auto" class="css-901oao r-1adg3ll r-1b2b6em r-q4m81j">
								<span class="css-901oao css-16my406"
									>Something went wrong, but don’t fret — let’s give it another
									shot.</span
								><br /><input
									type="hidden"
									name="failedScript"
									value=""
								/><input type="submit" value="Try again" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		... its too long to paste the whole thing on Stack Overflow...
	</body>
</html>
```

The tweet at this page is:

[![enter image description here][1]][1]

[1]: https://i.stack.imgur.com/Sm4S4.png

But in the whole HTML, this text is nowhere to be found.

redirect: https://stackoverflow.com/questions/67028989/can-i-directly-extract-contents-of-a-tweet-using-google-sheet-formulas/67056410#67056410
