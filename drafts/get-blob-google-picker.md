---
layout: post
title: How to get a blob from selected files on GooglePicker
date: 2021-04-26T00:00:00.000Z
tags:
  - javascript
  - picker-api
  - drive-api
description: >-
  The Google Picker API is quite powerful but there is
  not much documentation on it. In this example the Picker is used to get a file
  ID and then make a Drive API call from the front-end with the same auth
  client, to get a blob.
---

The Google Picker API is a JavaScript library to open, get information and upload files to Google Drive. This is a way to get a file blob from Google Drive to use in your JavaScript.

The picker will only get you limited metadata for the files, so you can open them with your account (i.e. see them in another window) or let you upload files. If you want to _download_ the actual file, then you'll need to use the Drive API.

The flow would be:

- Let user pick file
- Get metadata object
- Extract file id from object
- Make a [`GET`](https://developers.google.com/drive/api/v3/reference/files/get) call to the Google Drive API with the `alt='media'` attribute set.

Here is an example of that flow using the Picker API to feed into the Drive API with `gapi`, using the same login client.

```html
<!-- index.html -->

<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <title>Google Picker Example</title>
  </head>
  <body>
    <button id="authorize_button" style="display: none;">Authorize</button>
    <button id="signout_button" style="display: none;">Sign Out</button>
    <div id="result"></div>

    <script type="text/javascript" src="script.js"></script>
    <script
      async
      defer
      src="https://apis.google.com/js/api.js"
      onload="this.onload=function(){};handleClientLoad()"
      onreadystatechange="if (this.readyState === 'complete') this.onload()"
    ></script>
  </body>
</html>
```

```js
// script.js

const API_KEY = 'AI...';
const CLIENT_ID = '44...';
const appId = "44...";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

const authorizeButton = document.getElementById("authorize_button");
const signoutButton = document.getElementById("signout_button");

// Use the Google API Loader script to load the google.picker script.
function handleClientLoad() {
  gapi.load("client:auth2:picker", initClient);
}

function initClient() {
  gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES[0]
    })
    .then(
      function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(handleSignIn);

        // Handle the initial sign-in state.
        handleSignIn(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
      },
      function (error) {
        appendPre(JSON.stringify(error, null, 2));
      }
    );
}

function handleSignIn(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = "none";
    signoutButton.style.display = "block";
    createPicker();
  } else {
    authorizeButton.style.display = "block";
    signoutButton.style.display = "none";
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function createPicker() {
  const token = gapi.client.getToken().access_token
  if (token) {

    let view = new google.picker.View(google.picker.ViewId.DOCS);
    view.setMimeTypes("image/png,image/jpeg,image/jpg");
    let picker = new google.picker.PickerBuilder()
      .enableFeature(google.picker.Feature.NAV_HIDDEN)
      .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
      .setAppId(appId)
      .setOAuthToken(token)
      .addView(view)
      .addView(new google.picker.DocsUploadView())
      .setDeveloperKey(API_KEY)
      .setCallback(getFile)
      .build();
    picker.setVisible(true);
  }
}

function getFile(pickerResp) {
  gapi.client.drive.files
    .get({
      fileId: pickerResp.docs[0].id,
      alt: 'media'
    })
    .then(resp => {
      console.log("fetch response", resp.status)
      let binary = resp.body

	  let l = binary.length
    let array = new Uint8Array(l);
    for (var i = 0; i<l; i++){
			array[i] = binary,charCodeAt(i);
	  }
      let blob = new Blob([array], {type: 'application/octet-stream'});
}
```

This code is adapted from the [Drive Quickstart](https://developers.google.com/drive/api/v3/quickstart/js) and the [Picker Quickstart](https://developers.google.com/picker/docs).

**Note** - this does give an error in the console, but it does seem to work all the same. This does seem to be a bug with the Picker - https://issuetracker.google.com/177046274

**EDIT from Gabrielle**  
**Note** - using get with `alt = media` is for binary files. To get sheets/docs/slides etc, you need to use the `export` end point.

https://stackoverflow.com/questions/66962609/how-to-get-a-blob-from-selected-files-on-googlepicker/66964765#66964765
