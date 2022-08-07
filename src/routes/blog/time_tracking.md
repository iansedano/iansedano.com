---
layout: post
title: Tracking Time in a Foundry
date: 2017-02-05T00:00:00.000Z
tags:
  - vba
  - hardware
  - programming
  - spreadsheet
description: >-
  The story of trying to get a foundry to use computers, with some lessons in
  keeping design simple and not letting salesmen near the specification.
---

<https://www.dropbox.com/s/t4aja50e62if07j/FSConvert%2001.jpg?raw=1>

This is a write-up of my multi-year project that culminated in a time-tracking software and hardware solution.

## The Foundry

### Some Background

<img src="https://www.dropbox.com/s/6tzn17dgnllkuxq/IMG_9005.JPG?raw=1" class="post-img">

The "lost-wax" method of making sculptures has its origins possibly 6000 years ago, and today is still largely unchanged. So it was not surprising that the foundry had no need for much technology. When I first visited the foundry, only the General Administrator had a computer. As it turned out, most were technologically averse.

With the 2008 financial crisis eternally unfolding in the background, this foundry had secured a partnership with a prominent artist, who had in turn secured a contract with a famous gallery. While businesses were closing, operations in the foundry were ramping up.

The first order of business was establishing some lines of communication between the needs of the gallery, the constraints of the artist and the abilities of the foundry.

<img src="https://www.dropbox.com/s/uwgx4ka0ym26mu9/2015-01-28%2011.23.33.jpg?raw=1" class="post-img">

In the world of the gallery, e-mail and spreadsheets were ubiquitous. They would send through "London-style" messages, asking the impossible, the ridiculous, but at least they did so with some aloof politeness and a spreadsheet attached. The owner of the foundry would read it and become incensed. He couldn't believe how brash they were, and how much they asked for.

What he didn't know was that the messages from the gallery should have been read as a wish-list and not a demand. I can't blame him for not realizing this. The e-mail was full of words like: "must be", "asap", "no delay" and "deadline". What the gallery wanted in response was - "Ok, we'll do out best and keep you informed of our progress." Instead, response from foundry: "Impossible!"

Stereotypes are real only in the sense that people rely on them, and in most cases, are just negative oversimplifications. The foundry came to look upon the gallery as arrogant and the gallery came to look upon the foundry as lazy.

We stepped in and started to mediate the conversation as soon as possible, this allowed each party to focus on their work and not get frustrated with miscommunications.

<img src="https://www.dropbox.com/s/t4aja50e62if07j/FSConvert%2001.jpg?raw=1" class="post-img">

## Spreadsheets

These became our bread and butter. The gallery, as the sole client, wanted numbers, dates and progress reports. Without any IT infrastructure, we started tracking individual sculptures from order to delivery.

At the time there were around 30 artisans working making the sculptures. The number of sculptures that could be simultaneously in production were about 50. Though, depending on the size of the sculptures, only 20 or so could be worked on simultaneously.

One of the first steps I took was defining a series of steps that the sculpture needed to go through. The simplified version of which was:

* Wax
* Ceramic
* Casting
* Chiselling / Sandblasting
* Mounting
* Finishing
* Crating

I implemented a simple priority system using numbers from 1 to 5. We had progress bars to indicate which stage of production the sculpture was in. It was also a place to store technical specifications.

Around this time I convinced everyone to use Dropbox or Google Suite so we could collaborate and not rack up hundreds of versions of spreadsheets.

<img src="https://www.dropbox.com/s/2ozns1litytfmwo/FSConvert%2002.jpg?raw=1" class="post-img">

## Data Entry

I had always assumed that somehow, the work of data entry would eventually be distributed or automated. The spreadsheet was being asked to track too much information for one spreadsheet to handle. Even if we did have state-of-the-art software, one person wouldn't be able to handle all the data entry in real-time. Yet, management expected one person to make it happen. That person happened to be the Floor Manager, who already had enough on his plate.

I helped design the spreadsheet to be as user-friendly as possible, but it was not enough. I saw the solution, and it involved multiple computers or tablets distributed around the foundry that were able to update a central database, or even a google spreadsheet. Yet this suggestion fell on deaf ears.

After a year or so of trying to persuade them, the floor manager left his position and the next in line was unable to keep up. I saw an opportunity. In an effort to make an incremental change towards my goal, I proposed some manual time-sheets. Each worker would fill out a piece of paper, by hand, and hand it to an office assistant, who would be tasked with entering it into a spreadsheet. Obviously a bad solution, but it turned out to be an essential stepping stone.

I spoke with the assistant in private and told them that they were never going to be able to keep up with the flow of data. That the best thig they could do was process a few time-sheets everyday and keep the backlog organized in boxes. The boxes piled up and soon my strategy had paid off - I was being asked to investigate subcontractors to implement a "proper" solution.

<img src="https://www.dropbox.com/s/ro9euh9os42rbyz/IMG_8984.JPG?raw=1" class="post-img">

## Implementation

I was underqualified for this job. Yet there was no better alternative, so I did the best I could. I made mistakes along the way but in the end, we got a stable system to do what we wanted it to do.

I looked at many different proposals, and in the end I chose one that supported touch screens, bar-code scanning and most importantly, the option to view your data in a spread-sheet, where you can edit values directly, like a spread-sheet. This was because it had been made clear that no one was going to learn a new interface. If it was at least spread-sheet like, there wouldn't be any issues.

Then came long meeting to discuss the specifications of implementation. I was always clear that what I wanted from the company was a simple solution to the bounded problem of time-tracking. I needed their help procuring and setting up the server, the database and the touch-screen network. From there, we could develop our own solutions for reporting, or develop it in conjunction with them.

Unfortunately for my simple and reliable plan, someone in management had spoken to the salesman, and the plan began to get complex. The salesman had convinced them that their "extended" software package would able to achieve everything they could wish for. We ended up buying the whole package from them, with the promise that they would be able to customize their product towards out needs.

The initial spec I had drawn up was:

* install touch-screens with bar-code scanners.
* install a server and a database.
* create a UI for workers to identify themselves, the piece they were working on, and what they were doing to the piece.
* make the data available for us.

The renewed spec contained:

* all of the above
* e-mail notifications if a worker had spent 30min inactive
* automatic invoice creation
* repository for all data relating to artwork
* shipping dashboard
* material costs for every sculptures down to the gram
* etc.

It was to become the all-singing, all-dancing machine of the future. Many of the features were left vague and undefined. Such as the "shipping dashboard" - no details were discussed. Nevertheless, I had to do my best to cooperate and make sure it wasn't a failure.

It didn't take long for their team to assign me endless configuration tasks. They asked me to start defining every single separate part of every single sculpture, manually. It quickly became obvious that their tech-support didn't know what they were doing, and then the salesman had become "unavailable". When they told me that I couldn't even copy a 'set' of parts from one sculpture edition to the next, I had had it.

I spend hours on the phone with management and the technical team compromising and deciding how to implement something closer to my simplified spec, from which if we needed, we could build on later. Many intense days later and barring some minor server connection hiccups, we had it up and running.

## Training and Maintenance

Then we proceeded to train the staff. I trained them all individually and incorporated feedback to the workflow. The whole process of training took around 3 months.

I would analyse the data in Python using Pandas every week to begin with and then every month, to collect data about how the system was being used. With some targeted training dispensed as needed. By year 1, it was stable and the initial objectors were now dependent on the system, grateful that they no longer had to constantly verbally report their activities or write them down by hand. Management were also extremely pleased to be able to start to understand what the most time consuming tasks were.

Since then, it has been used everyday, to track hours, to track progress of individual sculptures, and for invoicing. Its data has informed decisions at every level of the business.

Unfortunately those extra features that we were promised by the salesman were never delivered!

Here is a picture of one of the terminals today.
<img src="https://www.dropbox.com/s/p94lhafffikiyiu/terminal.JPG?raw=1" class="post-img">
