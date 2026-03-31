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
| `puzzle.getConstraintComponentsAt(cell_id: number): Set` | Returns a `Set` of constraint components applied to the given cell ID. Each element is an object with properties specific to the used constraint, however, the `name` attribute always seems to exist. |
| `puzzle.removeConstraintComponent(?)` | (TODO) |
| `puzzle.setRegions(?)` | (TODO) |
| `puzzle.getCellAt(column_id: number, row_id: number): number` | Returns the ID of the cell identified by the 0-based coordinates given for row and column |
| `puzzle.getCellsCanHaveRepeats(?)` |  |
| `puzzle.getCellsDiagonallyAdjacentToCell(?)` |  |
| `puzzle.getCellsDiagonallyAdjacentToCoords(?)` |  |
| `puzzle.getCellsOrthogonallyAdjacentToCell(?)` |  |
| `puzzle.getCellsOrthogonallyAdjacentToCoords(?)` |  |
| `puzzle.getCellsSeeEachOther(?)` |  |
| `puzzle.getCellsSeenByCell(?)` |  |
| `puzzle.getColumn(?)` |  |
| `puzzle.getFriendlyDigitsForCell(?)` |  |
| `puzzle.getRegion(?)` |  |
| `puzzle.getRegionAt(?)` |  |
| `puzzle.getRegionCells(?)` |  |
| `puzzle.getRegions(?)` |  |
| `puzzle.getRow(?)` |  |
| `puzzle.getX(?)` |  |
| `puzzle.getY(?)` |  |
| `puzzle.hasRegions(?)` |  |
| `puzzle.unsafeGetCellAt(?)` |  |

## Helpers
### Naming

| Name | Description |
|-|-|
| `helpers.naming.getCellName(cell_id: number)` | Converts a cell ID to a cell name with row and column, starting at `R1C1` in the top left corner |
| `helpers.naming.getBranchingLineName(line_name: string, cell_ids: ?)` |  |
| `helpers.naming.getCageName(cage_name: string, cell_ids: ?)` |  |
| `helpers.naming.getCellName(?)` |  |
| `helpers.naming.getCellsDescription(?)` |  |
| `helpers.naming.getColumnName(?)` |  |
| `helpers.naming.getDigitFilterDescription(?)` |  |
| `helpers.naming.getDigitSetDescription(?)` |  |
| `helpers.naming.getEdgeClueName(?)` |  |
| `helpers.naming.getEdgeClueNameFromDomino(?)` |  |
| `helpers.naming.getLineName(?)` |  |
| `helpers.naming.getOuterClueName(?)` |  |
| `helpers.naming.getRowName(?)` |  |
| `helpers.naming.getTupleName(?)` |  |
| `helpers.naming.getTupleNameBySize(?)` |  |

### Digits

| Name | Description |
|-|-|
| `helpers.digits.allDigitsMask` |  |
| `helpers.digits.maxDigit` |  |
| `helpers.digits.minDigit` |  |
| `helpers.digits.createEvensDigitSet(?)` |  |
| `helpers.digits.createFilteredDigitSet(?)` |  |
| `helpers.digits.createFullDigitSet(?)` |  |
| `helpers.digits.createModuloDigitSet(?)` |  |
| `helpers.digits.createOddsDigitSet(?)` |  |

### Lines

| Name | Description |
|-|-|
| `helpers.lines.getAllPairsAlongLines(?)` |  |
| `helpers.lines.getCellsBetweenLineEnds(?)` |  |
| `helpers.lines.getLineEnds(?)` |  |

### Geometry

| Name | Description |
|-|-|
| `helpers.geometry.getSubsetsPerRegion(?)` |  |
| `helpers.geometry.getAdjacentCells(?)` |  |
| `helpers.geometry.getAllColumns(?)` |  |
| `helpers.geometry.getAllDiagonallyAdjacentPairs(?)` |  |
| `helpers.geometry.getAllDominoes(?)` |  |
| `helpers.geometry.getAllKingsMovePairs(?)` |  |
| `helpers.geometry.getAllKnightMovePairs(?)` |  |
| `helpers.geometry.getAllPairsWithOffset(?)` |  |
| `helpers.geometry.getAllQuadruples(?)` |  |
| `helpers.geometry.getAllRows(?)` |  |
| `helpers.geometry.getCellsAreKingsMoveApart(?)` |  |
| `helpers.geometry.getCellsInColumn(?)` |  |
| `helpers.geometry.getCellsInColumnOfCell(?)` |  |
| `helpers.geometry.getCellsInDiagonal(?)` |  |
| `helpers.geometry.getCellsInRow(?)` |  |
| `helpers.geometry.getCellsInRowOfCell(?)` |  |
| `helpers.geometry.getCellsKnightsMoveAwayFromCell(?)` |  |
| `helpers.geometry.getCellsPointedAtByOuterClue(?)` |  |
| `helpers.geometry.getDiagonallyAdjacentCells(?)` |  |
| `helpers.geometry.getManhattanDistanceBetweenCells(?)` |  |
| `helpers.geometry.getOrthogonallyAdjacentCells(?)` |  |

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
| `DigitSet.length` |  |
| `DigitSet.name` |  |
| `DigitSet.bind(?)` |  |
| `DigitSet.call(?)` |  |
| `DigitSet.intersect(digit_set: DigitSet)` |  |
| `DigitSet.subtract(digit_set: DigitSet)` |  |
| `DigitSet.union(digit_set: DigitSet)` |  |
| `DigitSet.has(digit: number)` |  |

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
| `getAffectedCells(param1, param2, ...)` |  |
| `setParams(instance, param1, param2, ...)` |  |
| `initialize(instance, puzzle): Generator<Change>` |  |
| `validate(instance, puzzle): boolean` |  |
| `update(instance, puzzle): Generator<Change>` |  |

(TODO)
