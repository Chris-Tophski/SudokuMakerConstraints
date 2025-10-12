# Given Symbols
* There may be given symbols in a puzzles, e. g. given digits in a classic Sudoku.
* Indirectly, a digit can be given by other constraints, whose properties or interactions with other constraints only leaves one possible candidate.

## Rules
There are no explicitly expressed rules.

## Visualization
Given symbols are directly put into the grid in a different color than the candidates and solution digits.
They cannot be overriden by solution digits.
If they are under the fog (in a fog of war puzzle) and the fog in their respective cells is cleared, they override the candidates and solution digits.

## Implications
A given digit removes this digit from the candidate list of cells that may not have the same digit as the cell, the given digit is in.
As obvious as this seems, this is only valid if there is a rule about not repeating any or specific digits.

## Implementation in SudokuMaker
* The "Given Digits" constraint seems to always be included in the used constraints list. It may be removed, if not needed.
  If the constraint is used, it is removed from the available constraints list, such that it cannot be added twice.

