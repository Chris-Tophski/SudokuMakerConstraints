# Digit alteration

* Some digits in a sudoku variant may be altered, such that their value differs from the digit.
* Other rules may be based on the digits or the values.

## Common digit alterations

More or less common examples of digit alterations are:

* Doublers and halvers: the value of a cell is double/half its digit
* Hot and cold spots: the value of a cell is one more/less than its digit
* Inversion: the value of a cell is `10-x`, where x is its digit (9x9 Sudokus with digits `1` to `9`), or `9-x` (10x10 Sudoku with digits `0` to `9`)
* Indexing: the value of a cell is some sort of row/column/region index function result, possibly involving its digit
* Constant: the value of a cell is some some constant, regardless of its digit
* Change of number system: e. g. the value of a cell is its digit as imaginary value: `3` → `3i` or other similar functions like `3` → `1/3`

## Selection of altered digits

* one of a type in each row/column/region
* two of a type in each row/column/region (starbattle-ish)
* one specific digit everywhere
* based on indexing
