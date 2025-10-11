# Windoku
"Windoku" or "Window Sudoku" is a variant on Sudoku with 4 additional regions marked in the grid, forming the appearance of a window.

## Rules
Windoku rules apply.

Normal Sudoku Rules apply. Additionally, there are no repeated digits in the marked cages.

## Marking
Usually, the window regions are marked as gray 3x3 squares, but it also often makes sense to just use cages or just mention the constraint without marking it.
See below for some technical advice.

## Implications
Additionally to the marked or mentioned 4 regions, there are 5 implicit regions emerging from that rule.
These are based on [Set Equivalence Theory](/constraints/set) applied to the entire grid and the 4 marked or mentioned regions:
* As there is a set of all symbols in each row and column, the leftover cells in each row/column other than those within the additional regions also form (disjoint) regions.
* Taking all of the cells within the marked or mentioned regions and the leftover cells so far out of all of the cells of the entire grid, there are 9 cells left, that also form a (disjoint) region.

## Implementation in SudokuMaker
There is no direct rule for this constraint.
Ways to implement this, based on a normal Sudoku puzzle, are:
* using "extra regions" constraint
* using "killer cages" constraint (without totals)
* using a custom JavaScript constraint

The custom JavaScript constraint might be overkill, but it won't be shown in the grid, doesn't collide with the concept of cages and may be very performant with the solver.
To mark the regions anyway, we could use "cosmetic symbols" as squares with a huge side length.

The "extra regions" constraint is very slow with the solver, but doesn't collide with the concept of cages. Hiding it in the grid will need some attention, though,
and each region needs a separate copy of the constraint.

The killer cages approach collides with actual killer Sudoku markings and may therefore not always be appropriate. We can add several "killer cages" constraints to keep them sepearate,
but visually, this is not ver attractive. However, the solver is very fast with killer cages, compared to extra regions.
