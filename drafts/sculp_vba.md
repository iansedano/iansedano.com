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

```visualbasic
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

```visualbasic
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

```visualbasic
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
