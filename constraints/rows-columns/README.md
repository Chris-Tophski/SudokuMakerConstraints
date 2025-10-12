# Rows and Columns
Each symbol is placed exactly once in each row and/or column.

## Rules
* nxn default grid with default digits: Place the digits 1 to n exactly once in each row and column.
* nxn default grid with digits starting from 0: Place the digits 0 to n-1 exactly once in each row and column.

## Implications
* The digits in a row/column, which holds this constraint, sum to the triangular number of the number of cells in that row/column (digits 1 to n)
  or to the triangular number of one less than the number of cells in that row/column (digits 0 to n-1).
* If the number of cells equals the number of symbols, each symbol appears exactly once and no symbol is repeating.

## Implementation in SudokuMaker
* Default Sudoku puzzles inherently contain this constraint and the constraint is not explicitly listed in the lists of available and used constraints.
* Custom puzzles without gaps may optionally contain this constraint, which can be added from the available constraints to the used constraints in the UI.
* Custom puzzles with gaps or a number of symbols differing from the width or height of the puzzle can't use the "Rows and Columns" constraint directly.
  We may use the "Extra Region" or a custom JavaScript constraint to approach this constraint then.
* If the solution of a puzzle does not have each and every cell of the grid filled with a digit, the solution won't be exported.
  In such a case, we need to use "Share" and the checkbox "Use currently filled-in values as the solution anyway" (which needs at least one solution digit in order to be visible)
  or add the solution manually via "Edit JSON".
