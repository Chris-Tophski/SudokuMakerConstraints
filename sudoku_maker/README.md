# Sudoku Maker web app

See https://sudokumaker.app/ for the web app and https://www.youtube.com/@chameleon_yura/videos for introduction videos to the web app.

## A note of the owner of the repo
Even though it is a really great puzzle setting app, there are a few problems with the documentation of the API and the code completion feature,
such that I found it quite tricky to get started, although the idea of the creator of the app on how to implement custom constraints is definitely very brilliant.
Now, the app is explicitly not in a released state, so we cannot seriously blame anyone for that.
Instead, I try to extract useful information from the videos, my experiments etc. and try to summarize them here in this repo
in order to start a proper documentation somewhere.
Just to reiterate: as of writing this, the web app is not released and may change (according to a note in the constraint maker of the web app itself) anytime,
so anything here could get obsolete very quickly.

At the moment, I am not involved in the development of the web app.

## Restrictions of the web app

* pre-release, and everything that follows from that
* It is not clear if the web app is intended to be published as open source at some point, but I still have to go through the Sudoku Maker Discord channel. There seem to be Google spreadsheets for bug reports and feature requests, though.
* The entire puzzle definition with solution and code is part of the URL. This is not just a Sudoku Maker thing, this seems to be done in most of the other web apps as well. As long as no huge code is involved, this is not a problem, but it may become one for complex constraints with several complex constraint components and images etc., as browsers (and servers) may put a limit to thw URL length, which would result in an incomplete puzzle definition and, therefore, data loss.
* Although there are a lot of constraint components included, they do not cover a lot of concepts, so far. Therefore, the need for a custom component may arise quickly, even for puzzle constraints that sound quite easy.

## Geometry

(TODO)

## Access to the puzzle

(TODO)

## Helpers

(TODO)

## Custom constraints

(TODO)

## Custom constraint components

(TODO)
