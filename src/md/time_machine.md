---
slug: music-making-machine
title: "Music Making Machine"
date: 2018-12-15T00:00:00.000Z
description: >-
  A music performance augmentation system. Finding creative ways to integrate
  digital tools into a live improvised performance.
---

In the aftermath of a band's breakup, Juan Nieto and I decided to start playing together in around 2016. We didn't have many expectations going into the weekly sessions, but after a couple night of playing covers we started to experiment with getting a computer involved.

The first song that really kicked the project into a higher gear was when I set up a simple loop and went between playing different key and guitar sounds. There was something magical in the interplay between the rigid loop and the organic rhythms of Juan. His exuberance was well suited to bringing life to the somewhat monotonous loops.

<img src="https://www.dropbox.com/s/vrd2mdn3ykwkktc/2018-07-01%2015.52.19%20-%20Copy.jpg?raw=1" class="post-img">

Every week I developed something on the "machine", which he started to call it "la maquina del espacio-tiempo" (the space-time machine), he even coined a catchphrase for it - "it can not only take you back and forward in time, but sideways too."

One of the defining features of the "machine" was to be an _alesis perc pad_. It became our bass instrument.

<iframe class='insta-iframe' src="//www.instagram.com/p/BlgGenznyRm/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe>

## Challenges

- Numerous MIDI devices
- Some of these devices were MIDI USB and unreliable
- Designing and programming the system to be flexible but "playable"
- Overcoming software limitations that weren't designed to be tweaked

## Hardware

- MIDI percussion pad - our bass instrument
- Keyboard
- Analogue synth - for some sounds
- MIDI Foot-pedal - to control the looper
- Midi-mix - as a master mixer and controller
- NanoKontrol - as an additional controller for the looper and global effects

All of these devices apart from the synth input to the USB audio interface. The only devices that received MIDI outputs were the synth and the Midi-mix.
The Midi-mix and NanoKontrol were USB MIDI.

## Connections

<img src="https://www.dropbox.com/s/h8mm3qtqjm5nga8/midisix4pix.jpg?raw=1" class="post-img">

<img src="https://www.dropbox.com/s/kalq9f9l4cdoon1/uhmr.jpg?raw=1" class="post-img">

These three devices were the cheapest way I could get everything to work smoothly. They are, a midi splitter, a merger, and a usb to midi host.

This was how I laid it out in the rack:
<img src="https://www.dropbox.com/s/bmhr5ylg66hdg0p/midi_connections_annotated.jpg?raw=1" class="post-img">

I made custom midi cables to length so that any interference would be cut down to a minimum, that's why you can see such perfect MIDI Cables!

All MIDI ins eventually needed to go to the interface, and all devices that needed to receive MIDI, the MIDI message had to come from the interface. This was all managed by assigning channels to the MIDI devices (MIDI has 16 channels).

<img src="https://www.dropbox.com/s/gjaq29zel9an4m5/200522_120128_EXCEL.png?raw=1" class="post-img">

This is the spreadsheet in which I kept planned out all the mappings and channels.

## The DAW

The design in the DAW went through various iterations, starting out in Reaper and ending up in Ableton Live.

The first iteration looked like this:

<img src="https://www.dropbox.com/s/ndq0o4qdskyuhl6/Annotation%202020-05-22%20101219.jpg?raw=1" class="post-img">

It was a mess. The main problem I had was that I ended up with too many tracks to manage, to many sub mixes. This was solved by moving into Ableton Live where Instrument Racks effectively allow you to have as many tracks as you want, but they all live within one "grouped" track. It just makes everything much easier to manage. I probably had more fine grain control in Reaper, but for live performance, Ableton Live lived up to its name.

<img src="https://www.dropbox.com/s/s9ssdmitzjrk8n5/Annotation%202020-05-22%20101907.jpg?raw=1" class="post-img">

Everything just looked cleaner, was easier to understand, and control.

## The control panel

Here is an image of the controls that I programmed in for the MidiMix:

<img src="https://www.dropbox.com/s/0uxf26uv7rqhuso/2018-11-19%2019.26.32.jpg?raw=1" class="post-img">

Along the bottom were almost always the master volume for each track. The knobs along the top were for FX controls. In the case of the pad, it was also to control the key and scale it was using. The buttons were used to enable specific sends and configured to light up when they were active. Later in this post I will go into more detail about how exactly I managed to program this with the aid of much research and Bome Midi Translator.

## Keys

<img src="https://www.dropbox.com/s/o1owicjxj0r2ipe/Key%20instrument.png?raw=1" class="post-img">

This was easy, just a simple instrument selector. I had organ sounds, piano sounds, I could route the notes to the hardware synth, virtual instruments like "pad" sounds for atmosphere (long ethereal notes soaked in reverb).

## The Bass Pads

<iframe class='insta-iframe' src="//www.instagram.com/p/BlgGenznyRm/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe>

<img src="https://www.dropbox.com/s/c9qe4awl7qskf2e/pad%20instrument.png?raw=1" class="post-img">

This was how the bass pads waee set up. First the MIDI stream ran through a scale converter. When I say "scale" I mean selection of 5 notes (one for each pad, and one for the foot pedal). Something between an arpeggio and a pentatonic scale. The root note was always on the foot pedal, and the 4 other notes were varied but the 5th and 7th typically always made their way in there.

Then it ran through a transposer in the computer that could modify the key. I designed it so it would switch in 5ths going up and in 4ths going down, like the circle of fifths. This allowed us to make some simple chord changes on the fly.

The spreadsheet I used to map out and compose the bass notes is below:

<img src="https://www.dropbox.com/s/3jciensp2g5xcb5/200522_120152_EXCEL.png?raw=1" class="post-img">

In general the I always had a note that was the 4th, then another sub-dominant functioning scale degree. Almost always the flat 7th, and for the dominant note, either a 5th degree, an octave of the root, a 2nd degree, or a tritone. Once I had everything in Ableton Live, it was much easier to adjust.

I also had some instruments at the end of the chain, but we mainly used the percussion pad to control the hardware synth as that had many more tone shaping possibilities and more dynamic sounds.
