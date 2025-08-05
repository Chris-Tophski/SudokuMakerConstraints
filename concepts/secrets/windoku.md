# Secrets of Windoku puzzles
## Virtual regions
* 9x9 Sudoku grid
* with 9 3x3 regions
* with 4 3x3 boxes symmetrically overlaid:
  * `R2C2:R4C4`
  * `R6C2:R8C4`
  * `R2C6:R4C8`
  * `R6C6:R8C8`
* Besides the given regions, there are 5 more virtual, disjoint regions:
  * `R1C2:R1C4, R5C2:R5C4, R9C2:R9C4`
  * `R1C6:R1C8, R5C6:R5C8, R9C6:R9C8`
  * `R2C1:R4C1, R2C5:R4C5, R2C9:R4C9`
  * `R6C1:R8C1, R6C5:R8C5, R6C9:R8C9`
  * `R1C1, R1C5, R1C9, R5C1, R5C5, R5C9, R9C1, R9C5, R9C9`
