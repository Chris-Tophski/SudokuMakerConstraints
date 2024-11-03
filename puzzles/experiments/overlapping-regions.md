# Overlapping regions
## Rules
* 8x8 Sudoku with digits from 0 to 7
* each 2 orthogonally adjacent marked 2x2 blocks form a rectangular region of 8 cells
* numbered rooms: digits outside the grid must be placed in the position determined by the first digit in the grid in that direction (`1` means the first cell).

## Grid setup
* 8x8 grid with digits from 0 to 7
* remove standard regions and make sure, rows and columns are restricted to be unique
* cosmetic lines: snap to corners only, thickness 5, black
  * draw outline of the grid
  * draw horizontal and vertical lines, such that there are four 2x2 blocks horizontally and vertically
* add additional regions, such that each two orthogonally adjacent 2x2 blocks are contained within a region (24 regions total)
* add numbered rooms constraint:
  * top: `_7474421`
  * left: `_6137460`
  * right: `137222_4`
  * bottom: `67_01010`

## Solution

    04 75 26 31
    26 13 40 75
    13 60 75 24
    57 24 31 06
    40 57 62 13
    62 31 04 57
    71 42 53 60
    35 06 17 42
