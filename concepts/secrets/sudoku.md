# The secret(s)

I don't want to spoil it, but ... there is a secret in standard Sudoku. Actually, there are at least two of them,
and in Sudoku variants there may be even more.

## Definition

A "secret" of a puzzle is an implicit fact, that is not stated explicitly in the rules, but can be derived from them.

## Standard Sudoku secrets

Based on standard 9x9 Sudokus with the digits from 1 to 9, each row, column and 3x3 block (region) consists of the digits from `1` to `9`, which sum to `45`.
The entire grid sums to `405`.

This even holds for irregular Sudokus of that size and set of digits.

## Secrets of different grid sizes and sets of digits

The following table contains

* examples of (regular or irregular, as applicable) Sudokus
* in different sizes (`n` as in height or width of a `n x n` square grid)
* with different digit sets (`0 to n-1` or `1 to n`)
* showing the sum of a row/column/region and the total sum of the grid.

| width | min digit | region sum | grid sum |
|-|-|-|-|
| 3 | 0 | 3 | 9 |
| 3 | 1 | 6 | 18 |
| 4 | 0 | 6 | 24 |
| 4 | 1 | 10 | 40 |
| 5 | 0 | 10 | 50 |
| 5 | 1 | 15 | 75 |
| 6 | 0 | 15 | 90 |
| 6 | 1 | 21 | 126 |
| 7 | 0 | 21 | 147 |
| 7 | 1 | 28 | 196 |
| 8 | 0 | 28 | 224 |
| 8 | 1 | 36 | 288 |
| 9 | 0 | 36 | 324 |
| 9 | 1 | 45 | 405 |
| 10 | 0 | 45 | 450 |
| 10 | 1 | 55 | 550 |
| 11 | 0 | 55 | 605 |
| 11 | 1 | 66 | 726 |
| 12 | 0 | 66 | 792 |
| 12 | 1 | 78 | 936 |
| 13 | 0 | 78 | 1014 |
| 13 | 1 | 91 | 1183 |
| 14 | 0 | 91 | 1274 |
| 14 | 1 | 105 | 1470 |
| 15 | 0 | 105 | 1575 |
| 15 | 1 | 120 | 1800 |
| 16 | 0 | 120 | 1920 |
| 16 | 1 | 136 | 2176 |

## Secrets with negative values
A variation of a regular Sudoku grid, but with values from `-4` to `+4`, where the digits are the absolute value, has both a region sum as well as a grid sum of `0`.
Similarly, this is also valid for any Sudoku-ish grid with an odd number of rows and columns, if the values include `0` as well as for an even number of rows and columns, if `0` is not included.
