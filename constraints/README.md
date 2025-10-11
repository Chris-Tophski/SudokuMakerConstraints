# Puzzle Constraints
Here, I try to collect puzzle constraints I come along in one way or another and document them.

## Objectives
* define a proper, unambiguous textual representation of a constraint rules
* supply a description and examples in order to make the idea behind the constraint as clear as possible
* propose a default way of visualization within puzzles
* explain implications of the constraint rules (the "secrets")
* explain variations of the constraint
* explain ways to implement the constraint in SudokuMaker

## Completeness
* A constraint may apply globally or locally.
* A global constraint applies everywhere in the grid or to the entire grid as a whole.
* A local constraint may be marked (or markings may have to be deduced) in places, where it applies.
  Other ways of identifying the places of local constraints may involve the corners, edges, center or other described positions without explicitily marking them.
* A local constraint may be valid
  * at least in the marked places (often calles "positive constraint")
  * only in the marked places (often called "negative constraint" with descriptions like "all things are given")
  * everywhere, except in the marked places (which would be the actual "negative" constraint, but let's call it "inverse" instead)
  * in some marked places and not in other marked places (e. g. "wrogn" puzzles)

## Locations of markings
A local constraint marking may be located:
* in the center of a cell
* on an edge between 2 cells
* in the common corner of 4 cells
* on the edge of an edge cell outwards of the grid
* in the common corner of 2 edge cells outward of the grid
* outside the grid
  * next to an edge cell of the grid (pointing orthogonally and/or diagonally)
  * next to the middle of 2 edge cells of the grid (pointing orthogonally and/or diagonally)
  * diagonally outwards from a corner cell of the grid (pointing orthogonally and/or diagonally)
* over a set of cells like
  * lines
  * cages
  * big circles

