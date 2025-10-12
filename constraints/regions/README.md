# Regions
* A region is a set of cells containing a subset of the available symbols, each symbol at most once.
* A full region contains each symbol exactly once and its size equals the number of symbols.
* In a continguous region all cells are orthogonally connected.
* In a disjoint region at least one cell is not orthogonally connected, but there may also be no connection at all or several groups of at least 2 cells etc.
* The shape of a region may be more or less regular or irregular. If there is at least one irregular region, we call that puzzle irregular as well.

## Default
* side length is a square number
  * A 4x4 Sudoku is made up of 4 regions, each in the shape of a 2x2 square. There are 2x2 regions.
  * A 9x9 Sudoku is made up of 9 regions, each in the shape of a 3x3 square. There are 3x3 regions.
  * ...
* side length is a composite number
  * A 6x6 Sudoku is made up of 6 regions, each in the shape of a 2x3 (or 3x2) square. There are 3x2 (or 2x3) regions.
  * ...
* side length is a prime number
  * Regular regions are impossible, so each region must be of irregular shape.

## Rules
* for the digits from 1 to 9: Place the digits 1 to 9 exactly once each into the regions.

## Implementation in SudokuMaker
* Default Sudoku puzzles inherently contain this constraint and it is explicitly listed in the lists of available and used constraints, as opposed to the ["Rows and Columns" constraint](/constraints/rows-columns/README.md).
* Custom puzzles with or without gaps may optionally contain this constraint, which can be added from the available constraints to the used constraints in the UI.
  We may leave some cells of the grid not assigned to any region.
