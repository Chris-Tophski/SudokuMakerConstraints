# Sudoku Maker web app

See https://sudokumaker.app/ for the web app and https://www.youtube.com/@chameleon_yura/videos for introduction videos to the web app.

## A note of the owner of the repo
Even though it is a really great puzzle setting app, there are a few problems with the documentation of the API and the code completion feature,
such that I found it quite tricky to get started, although the idea of the creator of the app on how to implement custom constraints is definitely very brilliant.
Now, the app is explicitly not in a released state, so we cannot seriously blame anyone for that.
Instead, I try to extract useful information from the videos, my experiments etc. and try to summarize them here in this repo
in order to start a proper documentation somewhere (if not for anyone else, at least for me).
Just to reiterate: as of writing this, the web app is not released and may change (according to a note in the constraint maker of the web app itself) anytime,
so anything here could get obsolete very quickly.

At the moment, I am not involved in the development of the web app.

## Restrictions of the web app

* pre-release, and everything that follows from that
* It is not clear if the web app is intended to be published as open source at some point, but I still have to go through the Sudoku Maker Discord channel. There seem to be Google spreadsheets for bug reports and feature requests, though.
* The entire puzzle definition with solution and code is part of the URL. This is not just a Sudoku Maker thing, this seems to be done in most of the other web apps as well. As long as no huge code is involved, this is not a problem, but it may become one for complex constraints with several complex constraint components and images etc., as browsers (and servers) may put a limit to thw URL length, which would result in an incomplete puzzle definition and, therefore, data loss.
* Although there are a lot of constraint components included, they do not cover a lot of concepts, so far. Therefore, the need for a custom component may arise quickly, even for puzzle constraints that sound quite easy.

# Documentation Attempt
## Access to the puzzle
The puzzle object is accessible either via `puzzle` or via `sudoku` and provides the following attributes:

| Name | Description |
|-|-|
| `puzzle.helpers` | helpers and tools for grid puzzles, also directly available as `helpers` |
| `puzzle.spec` | specification of the current grid puzzle |
| `puzzle.state` | current state of the current grid puzzle |

These functions are available:

| Name | Description |
|-|-|
| `puzzle.addConstraintComponent(component)` | Adds a new instance of a constraint component to the puzzle |
| `puzzle.getConstraintComponentsAt(cell_id: number): Set` | Returns a `Set` of constraint components applied to the given cell ID. Each element is an object with properties specific to the used constraint, however, the `name` attribute always seems to exist. Note that only those constraint components are returned that are defined before the custom constraint. |
| `puzzle.removeConstraintComponent(?)` | (TODO) |
| `puzzle.setRegions(?)` | (TODO) |
| `puzzle.getCellAt(column_id: number, row_id: number): number` | Returns the ID of the cell identified by the 0-based coordinates given for row and column |
| `puzzle.getCellsCanHaveRepeats(cell_ids: array): boolean` | Returns `true` if cells identified by their ID can have repeated digits (based on the constraints), `false` otherwise. Note that only those constraint components are evaluated that are defined before the custom constraint. |
| `puzzle.getCellsDiagonallyAdjacentToCell(cell_id: number): Generator<number>` | Yields IDs of cells diagonally adjacent to the cell identified by the given cell ID. Note that the algorithm does not check upper bounds based on the puzzle size, only IDs lower than 0 are not yielded. |
| `puzzle.getCellsDiagonallyAdjacentToCoords(column_id: number, row_id: number): Generator<number>` | Yields IDs of cells diagonally adjacent to the cell identified by the given 0-based coordinates. Note that the algorithm does not check bounds based on the puzzle size, only IDs lower than 0 are not yielded. |
| `puzzle.getCellsOrthogonallyAdjacentToCell(cell_id: number)` | Yields IDs of cells orthogonally adjacent to the cell identified by the given cell ID. Note that the algorithm does not check upper bounds based on the puzzle size, only IDs lower than 0 are not yielded. |
| `puzzle.getCellsOrthogonallyAdjacentToCoords(column_id: number, row_id: number): Generator<number>` | Yields IDs of cells orthogonally adjacent to the cell identified by the given 0-based coordinates. Note that the algorithm does not check bounds based on the puzzle size, only IDs lower than 0 are not yielded. |
| `puzzle.getCellsSeeEachOther(cell_ids: array): boolean` | Returns `true` if cells identified by their ID see each other (i. e. must contain different digits based on the constraints), `false` otherwise. Note that only those constraint components are evaluated that are defined before the custom constraint. |
| `puzzle.getCellsSeenByCell(cell_id: number): Set` | Returns a set of cell IDs seen by the cell identified by the given ID (i. e. all of them must contain a digit different to the digit in the given cell, based on the constraints). Note that only those constraint components are evaluated that are defined before the custom constraint. |
| `puzzle.getColumn(cell_id: number): number` | Returns the 0-based column ID of the cell identified by the given cell ID. Note that the algorithm does not check the upper bounds based on the puzzle size, only for negative cell IDs `-1` is returned. |
| `puzzle.getFriendlyDigitsForCell(cell_id: number): DigitSet` | Returns a `DigitSet` of friendly digits for the cell identified by the given ID. Depending on the involved constraints, the 1-based indizes of row, column and region of the cell are collected into the set. However, row and column seem to be evaluated for this purpose, no matter if a "Rows and columns" constraints is active or not. |
| `puzzle.getRegion(cell_id: number): number` | Returns the 0-based ID of the region containing the cell identified by the given ID. Cell IDs out of bounds result in `-1`. |
| `puzzle.getRegionAt(column_id: number, row_id: number): number` | Returns the 0-based ID of the region containing the cell identified by the given 0-based coordinates. |
| `puzzle.getRegionCells(region_id: number): array` | Returns an array of IDs of cells contained within the region identified by the given 0-based region ID. Region IDs out of bounds return `undefined`. |
| `puzzle.getRegions(): array` | Returns an array of arrays of cell IDs, such that the first level contains the regions and the second level contains all the cell IDs for that region. |
| `puzzle.getRow(cell_id: number): number` | Returns the 0-based row ID of the cell identified by the given cell ID. Note that the algorithm does not check the upper bounds based on the puzzle size, only for negative cell IDs `-1` is returned. |
| `puzzle.getX(cell_id: number): number` | Returns the 0-based column ID for the given cell ID |
| `puzzle.getY(cell_id: number): number` | Returns the 0-based row ID for the given cell ID |
| `puzzle.hasRegions(): boolean` | Returns `true` if the puzzle includes a constraints defining regions of some sort, `false` otherwise. Note that this function does not depend on the order of constraints, i. e. it seems to be correctly evaluated, even if the regions constraint is located after the custom constraint. |
| `puzzle.unsafeGetCellAt(?)` | (TODO) |

## Helpers
### Naming

| Name | Description |
|-|-|
| `helpers.naming.getCellName(cell_id: number)` | Converts a cell ID to a cell name with row and column, starting at `R1C1` in the top left corner |
| `helpers.naming.getBranchingLineName(line_name: string, cell_ids: ?)` | (TODO) |
| `helpers.naming.getCageName(cage_name: string, cell_ids: ?)` | (TODO) |
| `helpers.naming.getCellName(?)` | (TODO) |
| `helpers.naming.getCellsDescription(?)` | (TODO) |
| `helpers.naming.getColumnName(?)` | (TODO) |
| `helpers.naming.getDigitFilterDescription(?)` | (TODO) |
| `helpers.naming.getDigitSetDescription(?)` | (TODO) |
| `helpers.naming.getEdgeClueName(?)` | (TODO) |
| `helpers.naming.getEdgeClueNameFromDomino(?)` | (TODO) |
| `helpers.naming.getLineName(?)` | (TODO) |
| `helpers.naming.getOuterClueName(?)` | (TODO) |
| `helpers.naming.getRowName(?)` | (TODO) |
| `helpers.naming.getTupleName(?)` | (TODO) |
| `helpers.naming.getTupleNameBySize(?)` | (TODO) |

### Digits

| Name | Description |
|-|-|
| `helpers.digits.allDigitsMask` | (TODO) |
| `helpers.digits.maxDigit` | (TODO) |
| `helpers.digits.minDigit` | (TODO) |
| `helpers.digits.createEvensDigitSet(?)` | (TODO) |
| `helpers.digits.createFilteredDigitSet(?)` | (TODO) |
| `helpers.digits.createFullDigitSet(?)` | (TODO) |
| `helpers.digits.createModuloDigitSet(?)` | (TODO) |
| `helpers.digits.createOddsDigitSet(?)` | (TODO) |

### Lines

| Name | Description |
|-|-|
| `helpers.lines.getAllPairsAlongLines(?)` | (TODO) |
| `helpers.lines.getCellsBetweenLineEnds(?)` | (TODO) |
| `helpers.lines.getLineEnds(?)` | (TODO) |

### Geometry

| Name | Description |
|-|-|
| `helpers.geometry.getSubsetsPerRegion(?)` | (TODO) |
| `helpers.geometry.getAdjacentCells(?)` | (TODO) |
| `helpers.geometry.getAllColumns(?)` | (TODO) |
| `helpers.geometry.getAllDiagonallyAdjacentPairs(?)` | (TODO) |
| `helpers.geometry.getAllDominoes(?)` | (TODO) |
| `helpers.geometry.getAllKingsMovePairs(?)` | (TODO) |
| `helpers.geometry.getAllKnightMovePairs(?)` | (TODO) |
| `helpers.geometry.getAllPairsWithOffset(?)` | (TODO) |
| `helpers.geometry.getAllQuadruples(?)` | (TODO) |
| `helpers.geometry.getAllRows(?)` | (TODO) |
| `helpers.geometry.getCellsAreKingsMoveApart(?)` | (TODO) |
| `helpers.geometry.getCellsInColumn(?)` | (TODO) |
| `helpers.geometry.getCellsInColumnOfCell(?)` | (TODO) |
| `helpers.geometry.getCellsInDiagonal(?)` | (TODO) |
| `helpers.geometry.getCellsInRow(?)` | (TODO) |
| `helpers.geometry.getCellsInRowOfCell(?)` | (TODO) |
| `helpers.geometry.getCellsKnightsMoveAwayFromCell(?)` | (TODO) |
| `helpers.geometry.getCellsPointedAtByOuterClue(?)` | (TODO) |
| `helpers.geometry.getDiagonallyAdjacentCells(?)` | (TODO) |
| `helpers.geometry.getManhattanDistanceBetweenCells(?)` | (TODO) |
| `helpers.geometry.getOrthogonallyAdjacentCells(?)` | (TODO) |

## Specification

| Name | Description |
|-|-|
| `puzzle.spec.digitCount` | number of digits used in the puzzle |
| `puzzle.spec.maxDigit` | highest digit used in the puzzle |
| `puzzle.spec.minDigit` | lowest digit used in the puzzle |
| `puzzle.spec.size.height` | total height of the grid (number of cells) |
| `puzzle.spec.size.width` | total width of the grid (number of cells) |
| `puzzle.spec.type` | `sudoku` or `custom` |

## DigitSet and SudokuDigitSet

| Name | Description |
|-|-|
| `DigitSet.from(digits: array)` | Converts an array of numbers (puzzle digits) to a DigitSet |
| `DigitSet.length` | (TODO) |
| `DigitSet.name` | (TODO) |
| `DigitSet.bind(?)` | (TODO) |
| `DigitSet.call(?)` | (TODO) |
| `DigitSet.intersect(digit_set: DigitSet)` | (TODO) |
| `DigitSet.subtract(digit_set: DigitSet)` | (TODO) |
| `DigitSet.union(digit_set: DigitSet)` | (TODO) |
| `DigitSet.has(digit: number)` | (TODO) |

## Custom constraints
Custom constraints consist of a main code segment and one code segment per custom constraint component.
The main segment contains code for preparing the logic and setting up the necessary components.

A custom constraint can be global, i. e. it is valid across the entire grid,
or local, i. e. the author defines groups of cells for which the constraint is supposed to hold.
Groups are accessed through `input.groups` which is an array of group objects.
Each group object has the following attributes:

| Name | Description |
|-|-|
| `value` | The string given in the value field of the group |
| `cells` | The array of cell IDs in order |

## Custom constraint components
Custom constraint components are optional. They contain the actual constraint logic and are evaluated during solver execution.

The following functions can be defined in order to establish the logic of a custom constraint:

| Name | Description |
|-|-|
| `getAffectedCells(param1, param2, ...)` | (TODO) |
| `setParams(instance, param1, param2, ...)` | (TODO) |
| `initialize(instance, puzzle): Generator<Change>` | (TODO) |
| `validate(instance, puzzle): boolean` | (TODO) |
| `update(instance, puzzle): Generator<Change>` | (TODO) |

(TODO)
