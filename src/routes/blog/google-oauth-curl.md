---
layout: post
title: 'Curl Script to Get Google OAuth Tokens'
date: 2021-08-18T00:00:00.000Z
description: >-
  If you just need a token to do some experimenting, or perhaps you don't want
  to download the whole client library just to get your hands on a token, here
  is a minimal cURL script.
---

While the Google client libraries that wrap the OAuth functionality are great, sometimes you want something a bit more basic.

Here is a basic shell script that will allow you to grab an OAuth token:

```shell
#!/bin/bash

# Usage
#
# . get_token.sh [CLIEND_ID] [CLIENT_SECRET] [SCOPE]
#
# Script will prompt you to visit a url to get the auth code,
# and wait for you to provide them and then output the tokens.


CLIENT_ID=$1
CLIENT_SECRET=$2
SCOPE=$3
REDIRECT_URI="urn:ietf:wg:oauth:2.0:oob"

AUTH_CODE_URL="https://accounts.google.com/o/oauth2/v2/auth?"`
          `"client_id=${CLIENT_ID}&scope=${SCOPE}&response_type=code&"`
          `"redirect_uri=${REDIRECT_URI}"

echo "get your auth code from:
${AUTH_CODE_URL}
"

read -p "Enter the authorization code:" AUTH_CODE


CURL_DATA="client_id=${CLIENT_ID}&"`
  `"client_secret=${CLIENT_SECRET}&"`
  `"code=${AUTH_CODE}&"`
  `"redirect_uri=${REDIRECT_URI}&"`
  `"grant_type=authorization_code"

printf "\n"
echo $CURL_DATA

curl --request POST --data $CURL_DATA https://oauth2.googleapis.com/token
printf "\n"
```
