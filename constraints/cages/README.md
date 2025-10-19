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
### Rules
* The clue of a cage, digit by digit, describes how many of a digit are in the cage, e. g. `1233` means one `2` and three `3`s.
* Read the clue out loud, which describes the nature of the cage, e. g. ....

#### Variations
* Repeating digits: By default, digits can repeat in a look-and-say cage, but a "digits cannot repeat" rule may be added.
* Strict clues: By default, the rules don't unambiguously define, if a digit in a clue (e. g. `15` → one `5`) may occur one more time (e. g. a second `5`).
  By strict interpretation it means the digits occur exactly as many times as given by the clue.
  The geometry of the puzzle and the cage, however, may exclude such a possibility and therefore may render the clue itself unambiguous.
  Alternative interpretations (which should be included in the rules text, if used) may apply a meaning to the clue like "at most" or "at least".
  Even the strict interpretation does not prohibit other digits not mentioned in the clue to be contained within the cage.

### Implications
* The example rules show that digits may repeat. In connection with other rules about no repetition (like Sudoku), repeating digits must be placed in different rows, columns and regions.

### Implementation in SudokuMaker
SudokuMaker has a "Look-and-say Cages" constraint included.

## Other aggregation cages
* A cage may use a different aggregation function for the clue.
* Make sure to define whether repeating digits is allowed.

### Aggregation functions
* An aggregation function in general is a function from a set of numbers to a single number.
* Numbers may be digits or other clues of the puzzle.
* One such function is the sum, which is very popular. There are more, though, e. g.:
  * product
  * means (arithmetic, geometric, harmonic, ...)
  * median
  * extremes (minimum, maximum)
  * count

### Implications
* The implications depend on the used digits and the aggregation function.
* Examples for a 9x9 Sudoku with the digits from `1` to `9` (in parentheses from `0` to `8`):
  * The sum of all digits is 45 (36)
  * The product of all digits is 362880 (0)
  * The arithmetic mean of all digits is 5 (4)
  * The geometric mean of all digits is just below 4.15 (0)
  * The harmonic mean of all digits is just below 3.2 (undefined)

### Implementation in SudokuMaker
* SudokuMaker does not allow for changing the aggregation function of a killer cage.
* There are "cosmetic cages", however, which can be used to mark the cages in the grid without giving the computer the ability to account for their logic.
* Additionally, a custom JavaScript constraint may be used to enforce the logic.
  Unfortunately, it doesn't seem to be possible to retrieve the cosmetics from the grid within JavaScript code in order to apply logic.
  Instead, we will have to use a non-global JavaScript constraint together with groups, which have to be applied to the same positions as the cosmetic cages.

## Other meanings for cages
* There may be another function applied to the result of the aggregate function, e. g. the clue may only be given as the remainder of a division by 5 ("mod 5 cages").
* The clue may be a variable (`x` or `y`) or an equation (`2x+y`).
* The cage may be used to include/exclude cells in conjunction with another rule (shading, path drawing etc.).
* There may be several values in a cage clue, from which the correct option has to be determined by the solver.

### Implications
* The implications heavily depend on the rules of a cage.

### Implementation in SudokuMaker
* SudokuMaker does not support any other cage types at the moment.
* There are "cosmetic cages", however, which can be used to mark the cages in the grid without giving the computer the ability to account for their logic.
* Additionally, a custom JavaScript constraint may be used to enforce the logic.
  Unfortunately, it doesn't seem to be possible to retrieve the cosmetics from the grid within JavaScript code in order to apply logic.
  Instead, we will have to use a non-global JavaScript constraint together with groups, which have to be applied to the same positions as the cosmetic cages.
