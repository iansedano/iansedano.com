---
layout: post
date: 2021-02-02T00:00:00.000Z
title: Export and Import Google Maps Stars Between Accounts
description: >-
  Google lets you export your "stars", your marked places on Google maps, as
  JSON, but doesn't let you import them. Here is a way to automate entering them
  with Puppeteer.
---

If you are reading this, then you probably know that Google Maps has a great feature that allows you to pin locations using "stars".

Google provides a way to export your "stars" as a JSON file, but there is no corresponding import function. Read the "Google Takeout" section, for instructions on how to simply export them.

If you have several hundred "stars", read on, because importing them manually would probably take at least a whole day, and some stars would inevitably fall through the cracks.

### Google Takeout

Go to Google takeout and select "maps" and export them, you should end up with a JSON file with your stars. In my case it was called "Saved Places.json" and its form was like this:

```json
{
  "type" : "FeatureCollection",
  "features" : [ ... ]
}
```

Within the "features" array were all my stars in this format:

```json
{
	"geometry": {
		"coordinates": [2.185092, 41.391717],
		"type": "Point"
	},
	"properties": {
		"Google Maps URL": "http://maps.google.com/?cid=15138001108724662971",
		"Location": {
			"Address": "Carrer de Buenaventura Muñoz, 24, 08018 Barcelona, Spain",
			"Business Name": "Clínica Veterinària Ciutadella",
			"Geo Coordinates": {
				"Latitude": "41.3917170",
				"Longitude": "2.1850920"
			}
		},
		"Published": "2019-10-21T09:26:01Z",
		"Title": "Clinica Veterinaria Ciutadella",
		"Updated": "2019-10-21T09:26:01Z"
	},
	"type": "Feature"
}
```

This particular entry describes the location of a vet in Barcelona.

Once you have this JSON file, you can move onto the Puppeteer section of this process in the safe knowledge that your stars are backed up, and if all else fails, you can go through them manually.

### Automated Import Overview

If you are following along, these are the steps that you'll need to follow.

1. Install required software.
1. Set up browser log in.
1. Test the script (because Google is prone to change its HTML and CSS structure).
1. Run script.

Thaks to [Jared Potter](https://medium.com/@jaredpotter1/connecting-puppeteer-to-existing-chrome-window-8a10828149e0), for how to work around Google's requirement to log in manually with an automated session. Also thanks to [Benji Bee](https://gist.github.com/benjibee/37e0031a8aa7a25e9814a01bdb03217c) for the puppeteer script.

### Install Required Software

Many of these steps are system specific, what follows are instructions for Windows 10 with powershell.

Make sure you've installed [node](<[https://nodejs.org/en/](https://nodejs.org/en/)>).

Go into or create the folder where this project is going to run from. It can be any folder, you will be making a new one there:

```bash
mkdir moveStars
cd moveStars
npm init --y
npm install puppeteer
npm install fs
```

Make sure its working by testing out some examples from the [quickstart](https://developers.google.com/web/tools/puppeteer/get-started).

### Setting up your Login

It is possible to manage logins with Puppeteer but its much simpler to just set up a debugging session and log in manually then have the puppeteer script connect itself to the logged-in browser. Especially since this script is designed to be run just once.

Within your project folder, in a path something like this:

```text
C:\dev\moveStars\node_modules\puppeteer\.local-chromium\win64-818858\chrome-win\
```

You should find `chrome.exe`.

Once you have your path to that file, run the following command to open a remote debugging session:

```text
C:\dev\moveStars\node_modules\puppeteer\.local-chromium\win64-818858\chrome-win\chrome.exe --remote-debugging-port=9222
```

Be sure to do it with the _full path_ in one command, if you just call `chrome.exe` without specifying this particular executable (puppeteer's copy) then it might end up using the system default.

This will open up a browser session. In the newly opened window go to URL `http://127.0.0.1:9222/json/version`.

You should see some information. Copy the `websocketDebuggerUrl` value - this is the unique session value, which should look something like this:

```text
ws://127.0.0.1:9222/devtools/browser/ca080c01-8152-4bf2-84e0-927cf7af9956
```

Now you can connect your script to this very same browser session:

```javascript
const wsChromeEndpointurl =
	'ws://127.0.0.1:9222/devtools/browser/ca080c01-8152-4bf2-84e0-927cf7af9956';
const browser = await puppeteer.connect({
	browserWSEndpoint: wsChromeEndpointurl
});
```

Now, instead of managing logins and possible captchas in the script, you can just log in normally to the Google account you want to import your stars to, and then run the script. The script will connect itself to the same browser session and will not need to login.

### The script

```javascript
/**
 * Based on:
 * https://gist.github.com/benjibee/37e0031a8aa7a25e9814a01bdb03217c
 * This script imports Google Stars from a geoJSON file to the logged in account.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

const jsonFile = fs.readFileSync(__dirname + '\\Saved Places.json');
const jsonData = JSON.parse(jsonFile);

const wsChromeEndpointurl =
	'ws://127.0.0.1:9222/devtools/browser/ca080c01-8152-4bf2-84e0-927cf7af9956';

let scrape = async () => {
	const browser = await puppeteer.connect({
		browserWSEndpoint: wsChromeEndpointurl
	});

	const page = await browser.newPage();
	await page.goto('http://maps.google.com/', { waitUntil: 'networkidle2' });

	for (let index in jsonData.features) {
		let place = jsonData.features[index].properties['Google Maps URL'];
		let name = jsonData.features[index].properties['Location']['Business Name'];

		await page.goto(place, { waitUntil: 'networkidle2' });
		await page.evaluate(() => {
			if (
				document.querySelectorAll(
					"[src='//maps.gstatic.com/consumer/companion/starred_list_1x.png']"
				).length == 0
			) {
				document.querySelectorAll("[aria-label^='Save']")[0].click();
				window.setTimeout(function () {
					document.querySelectorAll("[data-index='2']")[0].click();
				}, 50);

				console.log('Added "' + name + '" to your starred places!');
			} else {
				console.log('Skipping "' + name + '" as it was already starred…');
			}
			return;
		});

		await page.waitFor(200);
	}
	// uncomment if you want the browser to close after its done
	// browser.close();
	return;
};

scrape()
	.then((value) => {
		console.log('All done!');
	})
	.catch((e) => console.log(e));
```

Its a good idea to test the script with a few stars before leaving it to its devices. In particular, you may need to fiddle and dig around with the CSS selectors in this section:

```js
if (document.querySelectorAll(
        "[src='//maps.gstatic.com/consumer/companion/starred_list_1x.png']"
).length == 0) {
    document.querySelectorAll("[aria-label^='Save']")[0].click();
    window.setTimeout(function(){
        document.querySelectorAll("[data-index='2']")[0].click();
    }, 50);
    //...
```

Which is the code that identifies the sequence of buttons that you need to press to "star" a location.
