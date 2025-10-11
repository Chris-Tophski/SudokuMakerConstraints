# Sudoku
A Sudoku puzzle in general consists of a square shaped, contiguous grid of n by n cells, with n rows, n columns and n regions.
The solution consists of n different symbols, not repeating within a row, column and region.
Classic Sudoku puzzles also have given digits, but they may be omitted or minimized in a variant Sudoku, because of restrictions of additional rules render them redundant.

## Default
The default Sudoku is a 9x9 grid, regularly partitioned into 3x3 boxes.
The solution is some configuration of the digits 1 to 9.

### Rules
Normal Sudoku rules apply. Place each of the digits 1 to 9 exactly once in every row, column and 3x3 box.

### Implications
* From the rules emerge a number of implications that can be used for elimination of candidates and eventually to solve the puzzle.
  These are commonly known as "naked single", "hidden pair", "X wing" and dozens more.
  We won't go into further detail on these, here. Please see some other resource on the internet for explanations of these.
* Arithmetics:
  * As each row, column and region contains the digits from 1 to 9 once each, the sum of the digits in each of these cell sets is 45 and the sum of all of the cells in the entire grid is 405.
    For more details on this, see [Sudoku Secrets](/concepts/secrets/sudoku.md).
  * Similarly the average value of each row, column, region and the entire grid is 5.
  * The product is 9! (nine factorial), or (9!)^9 (nine factorial to the power of nine).
  * There are 4 even and 5 odd digits. The even digits sum to 20, the odd ones to 25.
  * There are 3 sets with 3 digits each, for
    * remainders, when divided by 3; summing to 9, 12 and 15
    * low, medium, high; summing to 6, 15 and 24
  * There is no annulator (0), 1 unit, 4 primes, 4 composites, 3 squares, 2 cubes, 1 quartic, 1 quintic number etc., where the digit 1 is unit/square/cube/...
* Geometry: By "Set Equivalence Theory" ([SET](set/README.md)), it is possible to equate certain sets of cells within the puzzle, meaning a certain set of cells contains the same digits as another set of cells,
  e. g. the [Phistomefel Ring](set/README.md#phistomefel-ring).

## Other configurations
* Sudoku puzzles may differ in size. Only square numbers allow for regular, square shaped regions. Prime numbers cannot have regular regions.
* Sudoku puzzles may have irregular regions. Irregular regions may be contiguous or disjoint. There may be additional regions, such as in [Windoku puzzles](/constraints/windoku/README.md), [Killer Sudoku](/constraints/cages/README.md#killer-cages), and others.
* Other than grids with a contiguous square structure, some puzzles may include gaps, that don't contain a digit, such as in [Deconstruction puzzles](constraints/deconstruction/README.md) and [One-Gap-Each puzzles](one-gap-each.md).
* The solution of Sudoku puzzles may contain any set of n symbols. Solutions may not have any arithmetic structure, e. g. if the symbols are letters or pictures.
  There may be more or less than n symbols, if repetitions or omissions of symbols are allowed.
* A sudoku is a [Latin Square](latin-squares.md) with the additional constraint of regions.

### Rules
(Irregular) nxn Sudoku rules apply. Place the symbols exactly once in every row, column and 3x3 box.

### Implications
Differing from the default rules of a 9x9 Sudoku with the digits from 1 to 9, we need to rethink the implications of the rules.
If 0 is a digit used in the solution, the product of digits will collapse to 0, for example.

# Implementation in SudokuMaker
* Normal Sudokus are the default setting in SudokuMaker, but it is possible to create a new puzzle from the UI with custom size and digit range.
* A symbol set other than non-negative digits is not directly supported. A mapping from a digit range to an ordered symbol set is needed in that case.
* There are rules available for rows, columns and regions. In Sudoku puzzles, rows and columns are always included, in custom puzzles a "rows and columns" constraint is optionally available.
  For non-contiguous grids, grids with non-square shape, side lengths other than the number of symbols the "rows and columns" constraint won't work properly in general.
  The constraint "Extra Regions" or a JavaScript based custom constraint can be used to enforce uniqe symbols in each row and column.
* The constriant "Given Digits" may be used to supply - as the name suggests - given digits.
