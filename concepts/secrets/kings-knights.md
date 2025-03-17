# Sudoku with Anti-Knight and Anti-King constraints

* Edge cells of the central box are in only 2 places of the adjacent box.
* Edge cells next to the central box have only 2 candidates.
* The digit in the center cell is in 2 of the 4 corner cells of the grid.
* There is always roping everywhere. Proof:
  * Prepare the grid with letters (the actual digits of a puzzle don't matter, it's only a structural thing):
    * Center cell is `A`.
    * Fill the central box with letters from `B` to `I`.
  * Choose one main diagonal and place `A` in the corners at the ends of the diagonal.
  * Solve `A`s.
  * Solve with bifurcation on pairs (positional or digit), trying to avoid roping anywhere.
  * No path yields a solution.

# Sudoku with Anti-King constraint

* Slow thermometers are regular thermometers.
