# Cages
An orthogonally connected set of cells enclosed in a dashed line is called a cage.
Cells in a cage have a specific property, that may optionally be described by a clue in a corner of the cage.
Depending on the specific rule a cage is used for:
* digits in it may or may not be able to repeat
* the descriptive clue (e. g. the sum) may be in the topmost, leftmost cell in its top left corner (default) or somewhere else or may not be given at all
* there might be different cages in different styles (color, dashing pattern, line thickness etc.) with different meanings

## Killer cages
### Rules
Digits in cages cannot repeat and must sum to the number in the top left corner.

### Implications
* In a 9x9 Sudoku, a killer cage with 9 cells is a region itself, i. e. it contains all of the digits exactly once.
* The smaller the cage and the more extreme the total, the fewer the available options to fill the cage, e. g.
  in a 9x9 Sudoku a 2 cell killer cage with the total 3 (or 17) can only be made up of the digits 1 and 2 (or 7 and 8, respectively).
  For other digit sets, the actual sums (and the meaning of "extreme") may differ, but the principle still applies.

### Implementation in SudokuMaker
SudokuMaker has a "Killer Cages" constraint included.

## Look-and-say cages
(TODO)

## Other aggregation cages
(TODO)
