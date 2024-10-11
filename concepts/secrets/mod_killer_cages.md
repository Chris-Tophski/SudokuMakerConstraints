# Secrets of Modular Killer Cages

We have a look at Modular Killer Cages with `k` cells and a modular sum of `m` (mod `n`).

## Modular values

* If `n` is prime, the modular values form a field, i. e. you can calculate with them whatever you want, solve equations and so on.

### `n=2`
* Possible values: `0` ... `1`
* The cage essentially tells, whether the sum is even (`0`) or odd (`1`).

### `n=3`
* Possible values: `0` ... `2`
* Normal Sudoku digits are split into 3 groups of 3 digits: `369`, `147`, `258`

### `n=4`
* Possible values: `0` ... `3`
* Normal Sudoku digits are split into 4 groups: `48`, `159`, `26`, `37`

### `n=5`
* Possible values: `0` ... `4`
* Normal Sudoku digits are split into 5 groups: `5`, `16`, `27`, `38`, `49`

### `n=6`
* Possible values: `0` ... `5`
* Normal Sudoku digits are split into 6 groups: `6`, `17`, `28`, `39`, `4`, `5`

### `n=7`
* Possible values: `0` ... `6`
* Normal Sudoku digits are split into 6 groups: `7`, `18`, `29`, `3`, `4`, `5`, `6`

## Cage sizes

### `k=2`
* If the modular value of one cell is known, the modular value of other one is known as well, even if the actual digits are still unknown.
* For geometry reasons, such a cage can only contain repeating digits, if it is not part of a normal Sudoku, because the cells are orthogonally adjacent and row/column rules would kick in.

### `k=3`
* If a constraint has to be applied to properties of digits/indices in orthogonally adjacent cells, the middle cell of such a cage might be interesting.
