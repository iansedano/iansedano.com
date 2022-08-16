---
layout: post
title: >-
  Draw Arcs in Google Slides with Apps Script and the JavaScript Canvas API
date: 2021-04-12T00:00:00.000Z
tags:
  - apps-script
  - google-slides
  - canvas
  - javascript
description: >-
  It would appear that you can manually increase the
  length of an arc in Google Slides, but doing it via the API or Apps Script is
  not possible. In this answer I prove this and offer a workaround to creating
  custom length arcs using a pop up and the Canvas API.
---

In Google Slides, you can manually create circle segments, or arcs, but there doesn't seem to be a corresponding way to create them programatically with the [Slides API](https://developers.google.com/slides/api) or with a ready-made [Apps Script](https://developers.google.com/apps-script) method.

I answered a StackOverflow question about this topic, and this article is adapted from the answer I gave.

## Searching the Slides API

You could start by manually drawing an arc and then examining all the potential attribues of the [`Shape`](https://developers.google.com/apps-script/reference/slides/shape) class from [`SlidesApp`](https://developers.google.com/apps-script/reference/slides/slides-app). None seem to refer to the arc sweep, though.

The next step would be getting a full JSON representation of the arc and the slide with the Slides API [page GET request](https://developers.google.com/slides/reference/rest/v1/presentations.pages/get). Which at most yielded these attributes:

```json
{
	"objectId": "p",
	"pageElements": [
		{
			"objectId": "SLIDES_API17000000589_3",
			"size": {...}
			},
			"transform": {
				"scaleX": -0.1652,
				"scaleY": -0.1636,
				"shearX": -0.1057,
				"shearY": 0.1067,
				"translateX": 6532089.87,
				"translateY": 1296513.29,
				"unit": "EMU"
			},
			"shape": {
				"shapeType": "ARC",
				"shapeProperties": {
					"shapeBackgroundFill": {...},
					"outline": {...},
					"shadow": {...}
				}
			}
		}
	],
	"slideProperties": {...},
	"revisionId": "_7MTqW3NeaZ8yQ",
	"pageProperties": {...}
}
```

Even changing the sweep of the arc manually and putting the two versions through a [diff](https://en.wikipedia.org/wiki/Diff) will yield no changes except for the `revisionId`.

If more native circle and arc drawing methods is something you are interested in seeing, there is an existing [feature request](https://issuetracker.google.com/issues/new?component=191598&template=823918). Go and add a ⭐ to it.

## Workarounds

The simplest way to create custom progress bars would be to keep static images of them in Google Drive and then insert them as images.

Alternatively, there is a slightly more complex method using the canvas API. Since you can load HTML and JavaScript in a sidebar with [`getUi`](<https://developers.google.com/apps-script/reference/slides/slides-app?hl=en#getUi()>), that means you can use the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). Since you can use the Canvas API, that means you can create any shape you want, and create an image from it.

```js
// code.gs

function test() {
	// This creates the HTML output from the file arc-creator.html
	let html = HtmlService.createHtmlOutputFromFile('arc-creator');
	// This uses the html to load the sidebar
	SlidesApp.getUi().showSidebar(html);
}

// This function will be called from the HTML
// once the canvas has finished drawing.
function addToPresentation(dataURL) {
	let slide = SlidesApp.getActivePresentation().getSlides()[0];
	// Convert the data Url to png and add to Presentation
	var type = dataURL.split(';')[0].replace('data:', '');
	var img = Utilities.base64Decode(dataURL.split(',')[1]);
	var blob = Utilities.newBlob(img, type, 'image.png');
	slide.insertImage(blob);
}
```

```html
<!-- arc-creator.html -->

<!DOCTYPE html>
<html>
	<head>
		<base target="_top" />
	</head>
	<body>
		<canvas id="canvas" width="200" height="200"></canvas>
	</body>
	<script>
		// This is the function that creates a data URL image
		// The argument is the percentage complete of the progress bar

		function createProgressArc(number) {
			// ID the canvas element and initialize the context
			var canvas = document.getElementById('canvas');
			var context = canvas.getContext('2d');

			// Some utility variables
			var cw = context.canvas.width / 2;
			var ch = context.canvas.height / 2;

			// Drawing background
			context.clearRect(0, 0, 200, 200);

			// Drawing first circle
			context.beginPath();
			context.arc(cw, ch, 50, 0, 2 * Math.PI);
			context.fillStyle = '#FFF';
			context.fill();
			context.strokeStyle = '#e7f2ba';
			context.lineWidth = 10;
			context.stroke();

			// Drawing arc
			context.fillStyle = '#000';
			context.strokeStyle = '#b3cf3c';
			context.lineWidth = 10;
			context.beginPath();
			let progress = 2 * Math.PI * (number / 100);
			context.arc(cw, ch, 50, 0, progress);
			context.stroke();

			// Converting to data URL
			var dataURL = canvas.toDataURL('image/png');
			return dataURL;
		}

		let dataURL = createProgressArc(75);

		// Here is where the resulting image is sent back
		// to the Presentation as a data URL
		google.script.run.addToPresentation(dataURL);
	</script>
</html>
```

Running this will open a sidebar in the UI, draw the image and then add the image to the first slide.

[![enter image description here][1]][1]

The drawback of this method is that you need to have the UI open, or else it won't run the JavaScript that is required to draw the arc.

[1]: https://i.stack.imgur.com/V2uF4.png

Originally posted in [Stack Overflow](https://stackoverflow.com/questions/67022218/increase-the-length-of-arc-programmatically/67059323#67059323)
