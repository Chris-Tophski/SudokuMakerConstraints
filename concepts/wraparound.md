# Wrap-around

## Toroidal Wrap-around

For this definition, a puzzle grid is a finite, rectangular area of cells. A wrap-around constraint is applied to cells on the opposite side of the grid, leaving the grid in one direction and re-entering it on the opposite side. The grid is like a torus, now. The wrap-around itself is only describing the geometric structure of the grid, it does not necessarily describing a relationship between cells. This relationship must be added to the wrap-around constraint (either in the custom constraint code or by a custom constraint component) in order to complete it. For example:

* King's move with wrap-around: `R1C1` sees `R9C9` in a standard Sudoku.
* Knight's move with wrap-around: `R1C1` sees `R8C2` in a standard Sudoku.
* Orthogonally adjacent cells with wrap-around: `R1C1` sees `R9C1` in a standard Sudoku.
* A 3x3 block with wrap-around surrounding `R1C1` also covers `R9C9`, `R9C1`, `R9C2`, `R1C9`, `R2C9` in a standard Sudoku.
* A black dot to the right of `R2C9` is equivalent to a black dot to the left of `R2C1` in a standard Sudoku with kropki dots and wrap-around, and it defines a relationship between `R2C1` and `R2C9`, where one of the cells is double the other.

## Möbius Wrap-around

### Single Möbius Wrap-around

Either the horizontal edges or the vertical edges are connected to wrap the grid. The connection is mirrored, though, such that e. g. `R1C1` is orthogonally adjacent to `R9C9`. Moving across the border acts like a mirror.

### Full Möbius Wrap-around

Both the horizontal and vertical edges are connected.
