---
layout: post
title: >-
  How to use the properties service in Apps Script to workaround the execution
  time limit.
date: 2020-11-20T00:00:00.000Z
tags:
  - apps-script
description: >-
  (StackOverflow Answer) If you are running into the execution time limit of
  Apps Script, first, you should ask yourself if you really need to do this in
  Apps Script! If you do though, here is a way to use the properties service to
  save the script state and then create a one time trigger to resume execution.
  It will do this in a loop until done.
---

redirect: https://stackoverflow.com/questions/65020367/save-google-app-script-state-while-parsing-an-object-array-and-continue-where-le/65024800#65024800
