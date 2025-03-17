# Secrets of Modular Killer Cages

We have a look at Modular Killer Cages with `k` cells and a modular sum/product of `m` (mod `n`).
The cage total `m` may be a sum or a product. Digits in a cage may or may not repeat.

## Modular values

* If `n` is prime, the modular values form a field, i. e. you can calculate with them whatever you want, solve equations and so on.

### `n=2`
* Possible values: `0` ... `1`
* The cage essentially tells, whether the sum is even (`0`) or odd (`1`).
* Normal Sudoku digits are split into 2 groups: `2468`, `13579`
* Signed Sudoku values are split into 2 groups: `-4 -2 0 +2 +4`, `-3 -1 +3 +1`

### `n=3`
* Possible values: `0` ... `2`
* Normal Sudoku digits are split into 3 groups of 3 digits: `369`, `147`, `258`
* Signed Sudoku values are split into 3 groups: `-4 -1 +2`, `-3 0 +3`, `-2 +1 +4`

### `n=4`
* Possible values: `0` ... `3`
* Normal Sudoku digits are split into 4 groups: `48`, `159`, `26`, `37`
* Signed Sudoku values are split into 4 groups: `-4 0 +4`, `-3 1`, `-2 +2`, `-1 +3`

### `n=5`
* Possible values: `0` ... `4`
* Normal Sudoku digits are split into 5 groups: `5`, `16`, `27`, `38`, `49`
* Signed Sudoku values are split into 5 groups: `-4 +1`, `-3 +2`, `-2 +3`, `-1 +4`, `0`

### `n=6`
* Possible values: `0` ... `5`
* Normal Sudoku digits are split into 6 groups: `6`, `17`, `28`, `39`, `4`, `5`
* Signed Sudoku digits are split into 6 groups: `-4 +2`, `-3 +3`, `-2 +4`, `-1`, `0`, `+1`

### `n=7`
* Possible values: `0` ... `6`
* Normal Sudoku digits are split into 7 groups: `7`, `18`, `29`, `3`, `4`, `5`, `6`
* Signed Sudoku digits are split into 7 groups: `-4 +3`, `-3 +4`, `-2`, `-1`, `0`, `+1`, `+2`

## Cage sizes

### `k=2`
* If the modular value of one cell is known, the modular value of other one is known as well, even if the actual digits are still unknown.
* For geometry reasons, such a cage can only contain repeating digits, if it is not part of a normal Sudoku, because the cells are orthogonally adjacent and row/column rules would kick in.

### `k=3`
* If the modular value of one cell is known, the other 2 cells add to the modular difference, e. g. in a 0-mod5 cage `[1 x y]` the `x + y` portion is congruent to `0 - 1 (mod 5) = 4 (mod 5)`.
* If a constraint has to be applied to properties of digits/indices in orthogonally adjacent cells, the middle cell of such a cage might be interesting.
* Repeating digits are possible around box borders from here on.

### `k=4`
* From here on, there are lots of degrees of freedom, so there is no general rule. However, it may sometimes be useful to split parts of the cage into sets of cells, whose modular value is known.

## Setup of digits
* `n=5`, `k=3`: Modular sums have one of the following setups:
  * `sum=0mod5`:
    *  Either all digits are `5`
    *  or there is a `5` together with a `1mod5` and a `4mod5`
    *  or there is a `5` together with a `2mod5` and a `3mod5`
    *  or there is one remaainder together with one different remainder twice,
    *  but never 3 different remainders apart from `0mod5`.
  *  otherwise:
    *  Either there is a `5` together with some pair making up the remaainder
    *  or there is only one remainder involved 3 times
    *  or all remainders are different.

## Preparation for a puzzle
* Often, it may be helpful to prepare an overview of the combinations. Especially if the rules of the puzzle point towards solving equations, where you may need to divide.
* Create operator tables, where the first operand is in the first column and the second operand in the first row. You could swap the order for commutative operators, but it is better to get used to a certain order for non-commutative operators.
* Be diligent calculating modular values. Things may seem more obvious than they are, particularly when it comes to division tables or negative values. Keep in mind, there is no division available if `n` is not a prime number (it's actually more complex than this, but exponentials of primes etc. are ignored here). Also, division by zero must be avoided.
* Operator tables for `n=2`:

|+|0|1|
|-|-|-|
|0|0|1|
|1|1|0|

|-|0|1|
|-|-|-|
|0|0|1|
|1|1|0|

|*|0|1|
|-|-|-|
|0|0|0|
|1|0|1|

|/|0|1|
|-|-|-|
|0| |0|
|1| |1|

* Operator tables for `n=3`:

|+|0|1|2|
|-|-|-|-|
|0|0|1|2|
|1|1|2|0|
|2|2|0|1|

|-|0|1|2|
|-|-|-|-|
|0|0|2|1|
|1|1|0|2|
|2|2|1|0|

|*|0|1|2|
|-|-|-|-|
|0|0|0|0|
|1|0|1|2|
|2|0|2|1|

|/|0|1|2|
|-|-|-|-|
|0| |0|0|
|1| |1|2|
|2| |2|1|

* Operator tables for `n=5`:

|+|0|1|2|3|4|
|-|-|-|-|-|-|
|0|0|1|2|3|4|
|1|1|2|3|4|0|
|2|2|3|4|0|1|
|3|3|4|0|1|2|
|4|4|0|1|2|3|

|-|0|1|2|3|4|
|-|-|-|-|-|-|
|0|0|4|3|2|1|
|1|1|0|4|3|2|
|2|2|1|0|4|3|
|3|3|2|1|0|4|
|4|4|3|2|1|0|

|*|0|1|2|3|4|
|-|-|-|-|-|-|
|0|0|0|0|0|0|
|1|0|1|2|3|4|
|2|0|2|4|1|3|
|3|0|3|1|4|2|
|4|0|4|3|2|1|

|/|0|1|2|3|4|
|-|-|-|-|-|-|
|0| |0|0|0|0|
|1| |1|3|2|4|
|2| |2|1|4|3|
|3| |3|4|1|2|
|4| |4|2|3|1|

* Operator tables for `n=7`:

|+|0|1|2|3|4|5|6|
|-|-|-|-|-|-|-|-|
|0|0|1|2|3|4|5|6|
|1|1|2|3|4|5|6|0|
|2|2|3|4|5|6|0|1|
|3|3|4|5|6|0|1|2|
|4|4|5|6|0|1|2|3|
|5|5|6|0|1|2|3|4|
|6|6|0|1|2|3|4|5|

|-|0|1|2|3|4|5|6|
|-|-|-|-|-|-|-|-|
|0|0|6|5|4|3|2|1|
|1|1|0|6|5|4|3|2|
|2|2|1|0|6|5|4|3|
|3|3|2|1|0|6|5|4|
|4|4|3|2|1|0|6|5|
|5|5|4|3|2|1|0|6|
|6|6|5|4|3|2|1|0|

|*|0|1|2|3|4|5|6|
|-|-|-|-|-|-|-|-|
|0|0|0|0|0|0|0|0|
|1|0|1|2|3|4|5|6|
|2|0|2|4|6|1|3|5|
|3|0|3|6|2|5|1|4|
|4|0|4|1|5|2|6|3|
|5|0|5|3|1|6|4|2|
|6|0|6|5|4|3|2|1|

|/|0|1|2|3|4|5|6|
|-|-|-|-|-|-|-|-|
|0| |0|0|0|0|0|0|
|1| |1|4|5|2|3|6|
|2| |2|1|3|4|6|5|
|3| |3|5|1|6|2|4|
|4| |4|2|6|1|5|3|
|5| |5|6|4|3|1|2|
|6| |6|3|2|5|4|1|

