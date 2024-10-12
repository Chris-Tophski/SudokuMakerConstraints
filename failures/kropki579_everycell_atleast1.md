# Idea: Kropki-579, every cell has at least one such dot
## Explanation

* Black kropki dots between 2 cells indicate digits in a 1:2 ratio.
* A variant of this rule is to also include the rest of the digits, for which such a ratio is impossible (5, 7, 9) like:
  * "Cells separated by a black kropki dot either contain digits in a 1:2 ratio or both digits are from the set of digits, for which such a ratio is impossible."
* The idea was to not show any dot in the grid and make the solver deduce their positions, given, that there must be at least one dot around each cell.

## Results

* The first attempts with regular Sudoku broke.
* Next, a wrap-around constraint seemed to make it easier to achieve, however, there was no solution either.
