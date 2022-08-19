---
layout: post
title: VBA Artworks
img: 'https://www.dropbox.com/s/bmdmf4ipcfbhcv5/VBA_square.png?raw=1'
tags:
  - art
  - software
  - vba
  - programming
date: 2020-03-20T00:00:00.000Z
description: >-
  An example of using the VBA Scripting Dictionary to model data and manage an
  excel spreadsheet, along with some useful devlopment tools.
---

At the start of the financial crisis I got a job for a small art gallery. The art scene had collapsed in Spain due to the crisis, but the owner of the gallery had a connection to a very successful sculptor living in Spain and a gallery in London. The partnership between this scluptor and this gallery seemed to be more successful than anyone imagined it could be.

This lead to a significant operation being developed in Spain. Bronze sculptures, since Grecian times, have been cast using the lost-wax method. This allows an artist to create one master sculpture out of any material they'd like, and then a master mould is made, which can be used to produce as many sculptures as wanted.

The number of sculptures that gets produced by a particular master mould is typically limited. For example, an edition of 8 is a very typical number for a life-sized figurative sculpture.

In modern times we aren't limited to casting in bronze, and it's typical to create different editions for different materials. So, you could have 8 sculptures in bronze, numbered 1 to 8, and then another 8 in aluminium, for example.

This allowed us to ramp up production while keeping editions limited and exclusive. We would also produce many different size variations, with the smallest sculptures being editions of 99.

This is the story of trying to implement some kind of software to aid our operations, all the while having no experience with software at this level.

## The Requirements and Data Model

The data being modelled is artworks. The main data is in this format:

- Version ID - unique and numeric
- Title
- Materials summary i.e. "Bronze"
- Size summary i.e. "Large"

Each artwork was a specific edition of a larger family. Edition sizes range from 1 to hundreds. Every artwork has to be unique. Other information tracked for every individual sculpture is.

- producer
- purchase order
- exporter
- owner
- shipping information and history
- artwork dimensions
- crate dimensions
- dates
- costs
- prices

## The Starting Point

The foundry where these sculptures were produced

At the beginning the main data was kept in one excel table.

The main table is no different because I was not allowed to make changes because the team is already used to the format and making changes however they like. This means that there is a lot of duplicate data. That said, in the new version table, there is hardly any duplicate data, and this is used to check the consistency of the main table. It is glue code, and yet it will probably stay in use for a long time to come.

While everyone I have consulted with has suggested that this data should be in a database - at only 7000 artworks so far, it has been manageable, though messy, with VBA. The main advantage of taking this glue code approach has been that to the users of this spreadsheet, nothing has changed. They are able to use it in exactly they same way they have been using it for years. The only things that has changed have been added features, allowing them to do what they have always done, quicker.

## Tools used

- **Rubberduck** - vba IDE utilities.
- **Git-XL** - Git extension allowing proper version control for excel files with vba.
- **Sublime text** - for nice syntax highlighting and search and replace utilities.
- **Text Editor Anywhere** - to be able to edit in Sublime while text is automatically updated in the VBA IDE.

## General Structure

- Classes

  - Artwork - representing an individual work of art
  - Version - representing a family to which and Artwork belongs.
  - Refs - Utility class to define a bunch of references without making global variables (caused many many bugs).

- Modules

  - Object Dictionary Functions - functions such as creating, manipulating, merging Object Dictionaries (Artwork and Versions).
  - Tests - A few tests to ensure nothing is broken
  - Levenshtein - An implementation of the Levenshtein distance algorithm for searching.
  - Picture Report - Fetches pictures from external folder based on the ID of Artworks, and inserts them into the spreadsheet, properly sized.
  - General Subs - Higher level subroutines that draw on the functions
  - Utilities - conversions, cleaning, trimming etc.

- Forms
  - Dashboard - Simple dashboard with buttons to different forms.
  - Merge Ranges - A graphical way to execute a INDEX-MATCH without using formulas.
  - New Pieces - Insert new sculptures and auto-filling data based on version.
  - Search - A reference tool to quickly search the versions.

## Building the Object Dictionary

This is the heart of the application. Instead of iterating over the rows for every operation, the data is dumped into an Object, which then is inserted into a dictionary. This results in a huge speed boost. At most, the operations I carry out with the Object dictionaries only take a few seconds.

I wrote a function that takes as arguments

- a Class name (Artworks or Versions)
- a range to make into objects
- a dictionary of fields
  - The dictionary of fields is a way to limit the information loaded into the object dictionary. Since the class is able to contain all the different columns in the spreadsheet, but only a few of these are needed for most operations, a dictionary of fields, i.e. `("id": 1)` which indicated that the `id` field is at index 1.

And outputs a dictionary of objects. In case of Artworks, one object per artwork, and in case of versions, one object per version.

```vbnet
Function dictObjects(cls As String, rg As Range, dictFields As Scripting.Dictionary)

    Debug.Print "initializing dictObjects"

    Dim arr As Variant: arr = rg
    Dim dict As New Scripting.Dictionary
    Dim i As Variant 'for iterating through the array
    Dim k As Variant 'for iterating through keys in ObjDict
    Dim arrIndex As Variant 'to hold the index
    Dim arrVal As Variant 'for assigning values

    If cls = "clsArtwork" Then
        Debug.Print "Artwork Class detected, starting to populate dictionary"

        Dim oArtwork As clsArtwork 'defines temporary object as clsArtwork
        ' go through each line in the arr
        ' set the value or properties as per the dictFields dict.
        For i = 1 To UBound(arr, 1)
            arrIndex = arr(i, 1)
            If dict.Exists(arrIndex) = False Then
                'create new object
  Set oArtwork = New clsArtwork
  ' iterate through the dictFields
                For Each k In dictFields.Keys
                    arrVal = arr(i, dictFields(k))
                    If arrVal <> vbNullString Then
   'assign value in cell to property "k"
                        CallByName oArtwork, k, VbLet, arrVal
                    End If
                Next
                oArtwork.index = i
  ' Add the artwork object to the collection
                dict.Add arrIndex, oArtwork
            End If
        Next i
        Debug.Print "Artwork Dictionary Complete"

    ElseIf cls = "clsVersion" Then
 ' does the same as above except does it for Version.

    Else
        MsgBox "class not recognized"
        End
    End If
    Set dictObjects = dict

End Function
```

Below is one of the scripts that is used to check if the Version list is updated. Every Artwork needs to belong to a version. Orders are often created in a rush, and the version is not updated. The following Sub creates an Artwork Object dictionary, a Version Object dictionary and then compared them.

This makes reference to various other functions, the main ones of which, are posted at the end.

```vbnet
Sub UpdateVersionList()

 Application.ScreenUpdating = False
 Dim Refs As clsRefs
 Set Refs = New clsRefs

 'Field map for Master Table
 Dim dictMstFields As Scripting.Dictionary
 Set dictMstFields = New Scripting.Dictionary
 With dictMstFields
  .Add "code_serial", 7
  .Add "edition", 8
  .Add "title", 9
  .Add "material", 10
  .Add "size", 11
 End With

 ' Field map for Stock Code Table
 Dim dictStockCodeFields As Scripting.Dictionary
 Set dictStockCodeFields = New Scripting.Dictionary
 With dictStockCodeFields
  .Add "title", 2
  .Add "material", 3
  .Add "size", 4
 End With


 Call Utils.clearDebugConsole

 Debug.Print "Clearing VBAOutput"
 Refs.wsOutput.Cells.Clear

 ' Master Range to Artwork Object dict
 Debug.Print "trimming values in master"
 Utils.TrimRange Refs.rgMaster, dictMstFields
 Dim dictMaster As Scripting.Dictionary
 Set dictMaster = New Scripting.Dictionary
 Set dictMaster = dictObjects("clsArtwork", Refs.rgMaster, dictMstFields)
 Debug.Print "dictMaster made"

 ' get versions from master range
 Dim dictUniqueMasterSerials As Scripting.Dictionary
 Set dictUniqueMasterSerials = New Scripting.Dictionary
 Set dictUniqueMasterSerials = UniqueVersionsInArtworkDict(dictMaster, "code_serial")
 Debug.Print "dictUnique Serials made"

 ' Stock Code range to stock code Object dict
 Debug.Print "trimming values in stock codes"
 Utils.TrimRange Refs.rgStockCodes, dictStockCodeFields
 Dim dictStockCodes As Scripting.Dictionary
 Set dictStockCodes = New Scripting.Dictionary
 Set dictStockCodes = dictObjects("clsVersion", Refs.rgStockCodes, dictStockCodeFields)
 Debug.Print "dictStockCodes made"

 ' see which serials from master are not in stock code list
 Dim dictNewSerials As Scripting.Dictionary
 Set dictNewSerials = New Scripting.Dictionary
 Set dictNewSerials = dictDiff(dictUniqueMasterSerials, dictStockCodes)
 Debug.Print "dictNew Serials made"

 ' output results of pieces that need to be added
 PrintDictOfObjectsToSheet dictNewSerials, dictStockCodeFields, Refs.wsOutput
 Debug.Print "Operation Success!"

 MsgBox "All done."


 End Sub
```

The following are the main subs and functions referred to in the above code block. Other subs and functions are basic helper functions to help break up the code, like `print dict to sheet` etc.

```vbnet
Function UniqueVersionsInArtworkDict(dict As Scripting.Dictionary, key As String)

' Keep only unique version ID in Artwork Object Dictionary
' This will then be used to check against the Version Object Dictionary

    Dim dictUniques As Scripting.Dictionary
    Set dictUniques = New Scripting.Dictionary

    Dim oVersion As clsVersion

    Dim k As Variant
    Dim i As Variant

    For Each k In dict.Keys

        i = CallByName(dict(k), key, VbGet)

        If dictUniques.Exists(i) = False Then
            Set oVersion = New clsVersion
            dictUniques.Add i, oVersion
            With dictUniques(i)
                .title = dict(k).title
                .material = dict(k).material
                .size = dict(k).size
            End With
        End If
    Next

    Set UniqueVersionsInArtworkDict = dictUniques

End Function



Function dictDiff(dict1 As Scripting.Dictionary, dict2 As Scripting.Dictionary)

' Output any keys that are in dict1 but not in dict2.

    Dim k As Variant
    Dim k2 As Variant

    Dim dictOutput As Scripting.Dictionary: Set dictOutput = New Scripting.Dictionary

    For Each k In dict1.Keys
        If dict2.Exists(k) = False Then
            dictOutput.Add k, dict1(k)
        End If
    Next

    Set dictDiff = dictOutput

End Function



Sub MergeDictsOfObjects(dictOrigin As Scripting.Dictionary, dictDestination As Scripting.Dictionary, _
                    dictFieldsToUpdate As Scripting.Dictionary, collChanges As Collection)

'  Take two dictionaries of Objects
'  one Origin, one Destination
'  Update Destination Dict object properties
'  with the fields specified in dictFieldsToUpdate,
'  Output a list of the keys that were updated in collChanges



    Dim kOrigin As Variant ' Origin keys
    Dim kDestination As Variant ' Destination keys
    Dim kField As Variant ' Field keys
    Dim val As Variant  ' Temporary holder of values


    For Each kOrigin In dictOrigin.Keys
        If dictDestination.Exists(kOrigin) Then
            For Each kField In dictFieldsToUpdate.Keys
                val = CallByName(dictOrigin(kOrigin), kField, VbGet)
                CallByName dictDestination(kOrigin), kField, VbLet, val
            Next
            dictDestination(kOrigin).change = True
            collChanges.Add kOrigin
        End If
    Next

End Sub

```

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

- Wax
- Ceramic
- Casting
- Chiselling / Sandblasting
- Mounting
- Finishing
- Crating

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

- install touch-screens with bar-code scanners.
- install a server and a database.
- create a UI for workers to identify themselves, the piece they were working on, and what they were doing to the piece.
- make the data available for us.

The renewed spec contained:

- all of the above
- e-mail notifications if a worker had spent 30min inactive
- automatic invoice creation
- repository for all data relating to artwork
- shipping dashboard
- material costs for every sculptures down to the gram
- etc.

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
