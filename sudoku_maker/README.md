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
| `puzzle.filterCandidatesInCell(?)` | (TODO) |
| `puzzle.filterCandidatesInCells(?)` | (TODO) |
| `puzzle.getCandidates(?)` | (TODO) |
| `puzzle.getCandidatesBitMask(?)` | (TODO) |
| `puzzle.getCellAt(column_id: number, row_id: number): number` | Returns the ID of the cell identified by the 0-based coordinates given for row and column |
| `puzzle.getCellsAreFilled(?)` | (TODO) |
| `puzzle.getCellsCanHaveRepeats(cell_ids: array): boolean` | Returns `true` if cells identified by their ID can have repeated digits (based on the constraints), `false` otherwise. Note that only those constraint components are evaluated that are defined before the custom constraint. |
| `puzzle.getCellsDiagonallyAdjacentToCell(cell_id: number): Generator<number>` | Yields IDs of cells diagonally adjacent to the cell identified by the given cell ID. Note that the algorithm does not check upper bounds based on the puzzle size, only IDs lower than 0 are not yielded. |
| `puzzle.getCellsDiagonallyAdjacentToCoords(column_id: number, row_id: number): Generator<number>` | Yields IDs of cells diagonally adjacent to the cell identified by the given 0-based coordinates. Note that the algorithm does not check bounds based on the puzzle size, only IDs lower than 0 are not yielded. |
| `puzzle.getCellsOrthogonallyAdjacentToCell(cell_id: number)` | Yields IDs of cells orthogonally adjacent to the cell identified by the given cell ID. Note that the algorithm does not check upper bounds based on the puzzle size, only IDs lower than 0 are not yielded. |
| `puzzle.getCellsOrthogonallyAdjacentToCoords(column_id: number, row_id: number): Generator<number>` | Yields IDs of cells orthogonally adjacent to the cell identified by the given 0-based coordinates. Note that the algorithm does not check bounds based on the puzzle size, only IDs lower than 0 are not yielded. |
| `puzzle.getCellsSeeEachOther(cell_ids: array): boolean` | Returns `true` if cells identified by their ID see each other (i. e. must contain different digits based on the constraints), `false` otherwise. Note that only those constraint components are evaluated that are defined before the custom constraint. |
| `puzzle.getCellsSeenByCell(cell_id: number): Set` | Returns a set of cell IDs seen by the cell identified by the given ID (i. e. all of them must contain a digit different to the digit in the given cell, based on the constraints). Note that only those constraint components are evaluated that are defined before the custom constraint. |
| `puzzle.getColumn(cell_id: number): number` | Returns the 0-based column ID of the cell identified by the given cell ID. Note that the algorithm does not check the upper bounds based on the puzzle size, only for negative cell IDs `-1` is returned. |
| `puzzle.getConstraintComponentsAt(cell_id: number): Set` | Returns a `Set` of constraint components applied to the given cell ID. Each element is an object with properties specific to the used constraint, however, the `name` attribute always seems to exist. Note that only those constraint components are returned that are defined before the custom constraint. |
| `puzzle.getFriendlyCandidates(?)` | (TODO) |
| `puzzle.getFriendlyDigitsForCell(cell_id: number): DigitSet` | Returns a `DigitSet` of friendly digits for the cell identified by the given ID. Depending on the involved constraints, the 1-based indizes of row, column and region of the cell are collected into the set. However, row and column seem to be evaluated for this purpose, no matter if a "Rows and columns" constraints is active or not. |
| `puzzle.getRegion(cell_id: number): number` | Returns the 0-based ID of the region containing the cell identified by the given ID. Cell IDs out of bounds result in `-1`. |
| `puzzle.getRegionAt(column_id: number, row_id: number): number` | Returns the 0-based ID of the region containing the cell identified by the given 0-based coordinates. |
| `puzzle.getRegionCells(region_id: number): array` | Returns an array of IDs of cells contained within the region identified by the given 0-based region ID. Region IDs out of bounds return `undefined`. |
| `puzzle.getRegions(): array` | Returns an array of arrays of cell IDs, such that the first level contains the regions and the second level contains all the cell IDs for that region. |
| `puzzle.getRow(cell_id: number): number` | Returns the 0-based row ID of the cell identified by the given cell ID. Note that the algorithm does not check the upper bounds based on the puzzle size, only for negative cell IDs `-1` is returned. |
| `puzzle.getValue(?)` | (TODO) |
| `puzzle.hasValue(?)` | (TODO) |
| `puzzle.getX(cell_id: number): number` | Returns the 0-based column ID for the given cell ID |
| `puzzle.getY(cell_id: number): number` | Returns the 0-based row ID for the given cell ID |
| `puzzle.hasRegions(): boolean` | Returns `true` if the puzzle includes a constraints defining regions of some sort, `false` otherwise. Note that this function does not depend on the order of constraints, i. e. it seems to be correctly evaluated, even if the regions constraint is located after the custom constraint. |
| `puzzle.removeCandidateFromCell(?)` | (TODO) |
| `puzzle.removeCandidateFromCells(?)` | (TODO) |
| `puzzle.removeCandidatesFromCell(?)` | (TODO) |
| `puzzle.removeCandidatesFromCells(?)` | (TODO) |
| `puzzle.removeComponent(?)` | (TODO) |
| `puzzle.removeConstraintComponent(?)` | (TODO) |
| `puzzle.replaceComponent(?)` | (TODO) |
| `puzzle.setRegions(?)` | (TODO) |
| `puzzle.stop(message: string): Change` | (TODO) |
| `puzzle.unsafeGetCellAt(?)` | (TODO) |

## Helpers
### Naming

| Name | Description |
|-|-|
| `helpers.naming.getCellName(cell_id: number): string` | Converts a cell ID to a cell name with row and column, starting at `R1C1` in the top left corner |
| `helpers.naming.getBranchingLineName(line_name: string, cell_ids: array): string` | Builds a name for a line and a cell on it, using the pattern "the <LINE_NAME> containing <CELL_NAME>". Note that only the first cell ID is used and that using a number instead of an array throws an error. |
| `helpers.naming.getCageName(cage_name: string, cell_ids: array): string` | Builds a name for a cage and a cell in it, using the pattern "the <CAGE_NAME> at <CELL_NAME>". Note that only the first cell ID is used and that using a number instead of an array throws an error. |
| `helpers.naming.getCellsDescription(cell_ids: array): string` | Builds a cell name list based on the given array of cell IDs. An empty array results in `???`, an array with a single item results in its name as returned by `getCellName()`, and longer arrays return in a comma-separated list of cell names, where the last 2 cell names are separated by "and", e. g. "R1C1, R2C2 and R3C3". |
| `helpers.naming.getColumnName(column_id: number): string` | Builds a 1-based column name from a given 0-based column ID like "C1". Note that neither lower nor upper bounds of puzzle size are checked, such that this can result in column names like "C-9". |
| `helpers.naming.getDigitFilterDescription(?)` | (TODO) |
| `helpers.naming.getDigitSetDescription(?)` | (TODO) |
| `helpers.naming.getEdgeClueName(?)` | (TODO) |
| `helpers.naming.getEdgeClueNameFromDomino(?)` | (TODO) |
| `helpers.naming.getLineName(?)` | (TODO) |
| `helpers.naming.getOuterClueName(?)` | (TODO) |
| `helpers.naming.getRowName(row_id: number): string` | Builds a 1-based row name from a given 0-based row ID like "R1". Note that neither lower nor upper bounds of puzzle size are checked, such that this can result in row names like "R-9". |
| `helpers.naming.getTupleName(?)` | (TODO) |
| `helpers.naming.getTupleNameBySize(?)` | (TODO) |

### Digits

| Name | Description |
|-|-|
| `helpers.digits.allDigitsMask` | A number, whose binary representation has a `1` for each available digit of the puzzle. E. g. the Sudoku digits from `1` to `9` result in the mask `1022` decimal, which is binary `1111111110`. |
| `helpers.digits.maxDigit` | The highest of the available digits of the puzzle |
| `helpers.digits.minDigit` | The lowest of the available digits of the puzzle |
| `helpers.digits.createEvensDigitSet(): DigitSet` | Returns a `DigitSet` with all the even digits available in the puzzle. |
| `helpers.digits.createFilteredDigitSet(?)` | (TODO) |
| `helpers.digits.createFullDigitSet(): DigitSet` | Returns a `DigitSet` witt all available digits in the puzzle, i. e. based on the `allDigitsMask` |
| `helpers.digits.createModuloDigitSet(?)` | (TODO) |
| `helpers.digits.createOddsDigitSet(): DigitSet` | Returns a `DigitSet` with all the odd digits available in the puzzle. |

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
| `DigitSet.from(digits: array): DigitSet` | Converts an array of numbers (puzzle digits) to a DigitSet |
| `DigitSet.length: number` | (TODO) |
| `DigitSet.name: string` | (TODO) |
| `DigitSet.bind(?)` | (TODO) |
| `DigitSet.call(?)` | (TODO) |
| `DigitSet.intersect(digit_set: DigitSet): DigitSet` | (TODO) |
| `DigitSet.subtract(digit_set: DigitSet): DigitSet` | (TODO) |
| `DigitSet.union(digit_set: DigitSet): DigitSet` | (TODO) |
| `DigitSet.has(digit: number): boolean` | (TODO) |

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

## Standard constraint components

The following table contains the documentation of standard constraint components as shown in the Constraint Maker,
if available and may continue additional information from experiments.

| Name | Description |
|-|-|
| `AsymmetricalPairComponent(name: string, filterOrMapping: ((d1: number, d2: number) => boolean) \| DigitSet[], cell1: CellId, cell2: CellId)` | see `PairComponent` |
| `BetweenComponent(name: string, endPoints: [CellId, CellId], midPoints: CellId[])` | The digits on all `midPoints` must be between the digits on the `endPoints`. |
| `ConsecutiveDigitsComponent(name: string, cells: CellId[])` | All digits within `cells` must make a set of consecutive digits, but may repeat as well. |
| `ConsecutiveDigitsSetComponent(name: string, cells: CellId[])` | All digits within `cells` must make a set of consecutive digits, without repeats. |
| `CountDigitComponent(name: string, digit: number, counterCell: CellId, targetCells: CellId[])` | The digit in `counterCell` must equal the amount of occurrences of `digit` in `targetCells` |
| `CountDigitsComponent(name: string, digits: DigitSet, counterCell: CellId, targetCells: CellId[])` | The digit in `counterCell` must equal the amount of occurrences of digits from `digits`. |
| `DifferenceComponent(name: string, difference: number \| number[], cell1: CellId, cell2: CellId)` | The difference between the values at `cell1` and `cell2` must be exactly `difference`. |
| `DifferentCombinationsComponent(name: string, cellGroups: CellId[][])` | Every group of cells of `cellGroups` must have a distinct make-up of digits. |
| `DifferentDigitsComponent(name: string, cells: CellId[])` | Every cell of `cells` must have a different digit from the rest. |
| `DifferentGroupsComponent(name: string, groups: DigitSet[], cells: CellId[])` | Every cell of `cells` must have a digit from a different group from `groups`. E.g. if one group is 123, and one cell has a 1, the other cells cannot be 2 or 3. **Note**: currently only works properly when the groups do not overlap. |
| `DiverseGroupsComponent(name: string, groups: DigitSet[], cells: CellId[])` | A digit from every group from `groups` must appear at least once in `cells`, or from different groups if there are less cells than there are groups. Note: currently only works properly when the groups do not overlap. |
| `ExactDigitCountComponent(name: string, value: number, count: number, cells: CellId[])` | The digit `value` must appear exactly `count` times in `cells`. |
| `ForbiddenCandidatesComponent(name: string, candidates: DigitSet, cellOrCells: CellId \| CellId[])` | The value of `cellOrCells` cannot be any of `candidates`. |
| `GreaterThanComponent(name: string, lesserCell: CellId, greaterCell: CellId)` | The digit in `lesserCell` must be less than the one in `greaterCell`. Aliases: LessThanComponent |
| `GreaterThanOrEqualsComponent(name: string, lesserCell: CellId, greaterCell: CellId)` | The digit in `greaterCell` must be greater than or equal to the one in `lesserCell` |
| `HouseComponent(name: string, cells: CellId[])` | Every digit must appear exactly once in `cells`. |
| `IndexComponent(name: string, valueToIndex: number, indexerCell: CellId, cells: CellId[])` | The value of `indexerCell` must be the (1-based) index of an appearance of `valueToIndex` in the sequence of cells `cells`. |
| `LessThanComponent(name: string, lesserCell: CellId, greaterCell: CellId)` | See `GreaterThanComponent` |
| `MaxDigitCountComponent(name: string, value: number, maxCount: number, cells: CellId[])` | The digit `value` must appear at most `maxCount` times in `cells`. |
| `MaximumDifferenceComponent(name: string, maxDifference: number, cell1: CellId, cell2: CellId)` | The difference between the values of `cell1` and `cell2` must be at most `maxDifference`. |
| `MinimumDifferenceComponent(name: string, minDifference: number, cell1: CellId, cell2: CellId)` | The difference between the values of `cell1` and `cell2` must be at least `minDifference`. |
| `NegativeBetweenComponent(name: string, endPoints: [CellId, CellId], midPoints: CellId[])` | The digits on all `midPoints` must not be between the digits on the `endPoints`. |
| `NegativeDifferenceComponent(name: string, differences: number[], cell1: CellId, cell2: CellId)` | The difference between the values of `cell1` and `cell2` must not be any of `differences`. |
| `NegativeIndexComponent(name: string, valueToNotIndex: number, indexerCell: CellId, cells: CellId[])` | The value of `indexerCell` must not be the (1-based) index of `valueToNotIndex` in the sequence of cells `cells`. |
| `NegativeRatioComponent(name: string, ratios: number[], cell1: CellId, cell2: CellId)` | The ratio of the values of `cell1` and `cell2` (either way) must not be any of `ratios`. |
| `NegativeSumComponent(name: string, sums: number[], cells: CellId[])` | The digits within `cells` must not sum to any of `sums`. |
| `PairComponent(name: string, filterOrMapping: ((d1: number, d2: number) => boolean) \| DigitSet[], cell1: CellId, cell2: CellId)` | The digits `digit1` and `digit2` in `cell1` and `cell2` are valid when `filterOrMapping(digit1, digit2)` evaluates to `true`, or when `filterOrMapping[digit1].has(digit2)`. Aliases: AsymmetricalPairComponent |
| `PredefinedCandidatesComponent(name: string, candidates: DigitSet, cellOrCells: CellId[])` | The value of `cellOrCells` must be one of `candidates`. |
| `ProductComponent(name: string, productOrProducts: number \| number[], cells: CellId[])` | The product of the digits in `cells` must equal to `productOrProducts`. |
| `RatioComponent(name: string, ratioOrRatios: number \| number[], cell1: CellId, cell2: CellId)` | The ratio of the values of `cell1` and `cell2` (either way) must equal `ratioOrRatios`. |
| `RequiredDigitsComponent(name: string, values: number[], cells: CellId[])` | Every digit of `values` must be assigned a unique cell of `cells`. Requiring a digit to repeat can be achieved by repeating that digit in `values`. |
| `RequiredGroupsComponent(name: string, groups: DigitSet[], cells: CellId[])` | For every group from `groups`, a digit must appear at least once in `cells`. E.g. If the groups are 123, 456 and 789, then `cells` must be at least 3 cells, and one digit of every group is assigned to a cell. Note: currently only works properly when the groups do not overlap. |
| `SameDigitComponent(name: string, cells: CellId[])` | Every cell of `cells` must have the same value. |
| `SameGroupComponent(name: string, groups: DigitSet[], cells: CellId[])` | Every cell of `cells` must have a digit from the same group within `groups`. E.g. if the groups are the evens and the odds, then either every cell is even, or every cell is odd. 
Note: currently only works properly when the groups do not overlap. |
| `SameSumComponent(name: string, groups: { name: string, cells: CellId[], weights?: Map<CellId, number>, asNumber?: boolean }[])` | Every group of cells from `groups` must sum to the same value. Set `asNumber` to true, to interpret that group as a sequence that spells out a number (e.g. for arrows), where the least significant digit is at index 0. Use `weights` to set a custom weight for specific cells (see `WeightedSumComponent` for details) |
| `SandwichSumComponent(name: string, sum: number, sandwichDigits: [number, number], cells: CellId[])` | Along `cells` there must be a sequence of values starting with one of `sandwichDigits`, then some values summing to `sum`, then another digit from `sandwichDigits`. Note: currently requires all cells to be different. |
| `SequenceComponent(name: string, cells: CellId[])` | Digits along `cells` must increase or decrease by the same amount (or stay the same) |
| `SkyscraperComponent(name: string, amount: number, cells: CellId[])` | Digits along `cells` represent skyscrapers, blocking cells further along the sequence. The amount of skyscrapers seen from the start must equal `amount`. |
| `SumComponent(name: string, sumOrSums: number \| number[], cells: CellId[])` | The digits in `cells` must sum to (one of) `sumOrSums`. If a cell appears N times in `cells`, the value in that cell is counted N times. |
| `WeakLinkComponent(name: string, cell1: CellId, value1: number, cell2: CellId, value2: number)` | If `cell1` is set to `value1`, `cell2` must not be `value2`. Similarly, if `cell2` is set to `value2`, `cell1` cannot be `value1`. |
| `WeakLinksComponent(name: string, cells1: CellId \| CellId[], value1: DigitSet, cells2: CellId \| CellId[], value2: DigitSet)` | If any of `cells1` is set to one of `values1`, all of `cells2` cannot be any of `values2`. Similarly, if any of `cells2` is set to one of `values2`, all of `cells1` cannot be any of `values1`. |
| `WeightedSumComponent(name: string, sumOrSums: number \| number[], cellWeightMapping: Map<CellId, number>)` | The sums of every value of cell X in `cellWeightMapping`, multiplied by `cellWeightMapping.get(X)`, must sum to (one of) `sumOrSums`. Note: Currently only supports positive weights. To avoid floating point inaccuracies breaking this component, use whole numbers as weights. In case you want to do something like x+y/3=5, multiply it all such that you get 3x+y=15 |
| `XSumComponent(name: string, sum: number, xCell: CellId, cells: CellId[])` | The first X digits along `cells` must sum to `sum`, where X is the value of `xCell`. |

(TODO)
