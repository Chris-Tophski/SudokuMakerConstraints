# Rings and diamonds
- Cells may be marked in their center with a ring, a diamond or both.
- A marked cell references the (up to) 3x3 cells around the marked cell.
- The digit in a marked cell is the number of cells (in the referenced area), that meet a certain condition. See variants.

## Implementation in SudokuMaker
- Currently, there is no custom JS rule implemented, only cosmetic symbols.

## Variants

### Rings and diamonds on parity

- Rings count cells in the referenced area with the same parity as the marked digit, i. e. an odd number of odds or an even number of evens.
- Diamonds count cells in the refernced area with the other parity as the marked digit, i. e. an odd number of evens or an even number of odds.

#### Rules
> TODO

#### Implications

- Sudoku on digits `1` to `9`:
  - By Sudoku rules, there are 5 odd and 4 even digits per row, column and 3x3 box.
  - A marked middle cell of a 3x3 box therefore refers to the entire box.
    - A ring in a middle cell can only be `4` or `5`, because it counts either the even or the odds in the entire box.
    - A diamond in a middle cell always contradicts and cannot therefore ever be placed in a middle cell.
  - Along edges and in the corners of the grid there are less than 9 referenced cells, namely 4 cells in the corners and 6 along the edges, so their candidates are slightly limited.
  - Cells marked with both ring and diamond count both parities separately and equate them, i. e. there is the same number of odds and evens.
    - Inner cells always reference a full 3x3 area, which is an odd number of cells. As this is not divisible by 2, there is no way to evenly split the area into odd and even digits and therefore a doubly marked inner cell does not exist.
    - As the number of referenced cells of rings and diamonds along the edges and in the corner is even, a doubly marked outer cell can be placed. It results in a `3` along an edge and in a `2` in a corner.

#### Implementation in SudokuMaker

- [Rings and Diamonds On Parity Experiment (9x9 Sudoku)](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQBsJADCADQgAOArgF7MA2KBoOcMnhAJUw4A5ugAEcHABNxAEUy9c0iQHkc4gApwomBAE9xAUQAe9NJj44EtEHEYIAFtAIgAwo93oAKhHqP0AGtMWwBjCBgrG0IAWnF0RmkIQMYAHRw43VEJKVlpRRhldDCUNjZi-ABtYABfGlr6uobmptbG9paOts6e7r6ugd7B-qHRkfHhybGpiem52b6AXTpwnHQEKDhhBArqkANzAkom-f1D-CI6KBQRbDWCSsoaJ6fLt5oAJk-vl%2Bead8uXyBf1%2BAO%2BwIAzDQoVCACw0eHwgCsNBRKJh0IRWORqNxGLh2NxaJoZBJZIA7DRKZSABw0Ol00lMqks2n09nM0nUlkM%2BmLE48PiuLJiWwHfgfSiUL4MHS8XagcWuUpsTD0dCcK4mI4keEgKD6HV6qQiDhHOhgTBlVwAYjA9odUts6ygyX4IBtUq91DoLrdAHVMNInDrpTVliB0PoYAAjCDlB6VGKUEgo5Opxb8%2BogQXu-JKGTFOhK-CS6V0ehymAK07nfUoUIIE1mugAdyDIfwKdJIEcKEwIkc0W7dGb-FhKMjGwDHccoZlfsC7s93p94CtbFtDsd1HDvujcYTVSTKbTp8zJxLREolxAoRVuwj630ZvwoHCbBchBtKBjNPJUoQhCzqYMw-ApjSNSXmc-DXk8d4Pg8T4GK%2B77xl%2BHqULCAH2kBIFgTqkHhlBQA)

#### Interactions

- Given Odd/Even (circles and squares):
  > TODO
- Kropki dots:
  > TODO
- Parity line:
  > TODO
- modulo 5:
  > TODO

### Rings and diamonds on polarity

- Rings count cells in the referenced area with the same polarity as the marked digit, i. e. high number of highs or a low number of lows.
- Diamonds count cells in the referenced area with the other polarity as the marked digit, i. e. low number of highs or high number of lows.
- `5` is neither high nor low.

#### Rules
> TODO

#### Implications
> TODO

#### Implementation in SudokuMaker

- [Rings and Diamonds On Polarity Experiment (9x9 Sudoku)](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQBsJADCADQgAOArgF7MA2KBoOcMnhAJUw4A5ugAEcHABNxAEUy9c0iQHkc4gAoQ2cKJgQBPcQFEAHvTSY%2BOBLRBxGCABbQCIAMLP96ACoR6Z3QAa0x7AGMIGBs7QgBacXRGaQhgxgAdHAT9UQkpWWlFGGV0CJQ2NlL8AG1gAF8aesaGptaW9ubOtq6O7r7egZ6h-uHBkfGxydHpiZmp2YX5gYBdOkicdAQoOGEEKtqQI0sCShbDw2P8IjooFBFsDYJqyhoXl%2BuPmgAmb9%2B315on2uPxBAP%2BQN%2BoIAzDQYTCACw0RGIgCsNDRaLhsKRONR6PxWIRuPxGJoZDJFIA7DRqdSABw0BkM8ksmls%2BmMzms8m0tlMxnLM48PjuHJiexHfhfSiUH4MPS8fagSXucpsTD0dCcG5mE4kREgKCGPUGqQiDgnOhgTAVdwAYjAjqdMvsmygqX4IDtMp91Dobo9AHVMNIXHrZXVViB0IYYAAjHT7apxSgkNEptPLQWNEDCz2FJQyUp0FX4aWyuj0BUwJXnS6GlDhBBmi10ADuIbD%2BFT5JAzhQmBEzliPboLf48LR0a2Qc7znDcoDwU93t9fvANrY9qdzuokf9sYTlSeydT6bPWcjdTqQA)

#### Interactions

- Cells with high/low indication:
  > TODO
- German Whisper line:
  > TODO
- modulo 5:
  > TODO

### Rings and diamonds on primality

- Rings count cells in the referenced area with the same primality as the marked digit, i. e. prime number of primes or non-prime number of non-primes.
- Diamonds count cells in the referenced area with the other primality as the marked digit, i. e. prime number of non-primes or non-prime number of primes.
- `1` is neither prime nor composite, so it may not be counted in a particular variant. Otherwise it is considered non-prime.

#### Rules
> TODO

#### Implications
> TODO

#### Implementation in SudokuMaker
- [Rings and Diamonds On Primality Experiment (9x9 Sudoku)](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQBsJADCADQgAOArgF7MA2KBoOcMnhAJUw4A5ugAEcHABNxAEUy9c0iQHkc4gApRM8NpgQBPcQFEAHvTS6UOBLRBxGCABbQCIAMLOd6ACoR6Z3QAa0x7AGMIGD5bdwBacXRGaQhgxgAdHASdUQkpWWlFGGUJXHF6HT0DQ0yEit04fSNxfRwUdAiUNjYO-ABtYABfGiGR4dGJ8amxmcnZ6bnFheX51aW1lfWtzZ2Nve393YPjo%2BWAXTpInHQEKDhhBF6BkCNLAkpxl8M3-CI6KBQImw1wIfUoNHB4L%2B0JoACY4QjIRCaDC-vD0cikaiERiAMw0fH4gAsNBJJIArDRKZTCQTSfSKVSmbTiQymdSaGROdyAOw0Pl8gAcNGFwq54v5kqFIplEq5AslopFZ0%2BPD47hyYnsr34sMolHhDDgdxgT1AOvcXX09HQnH%2BZneJBJICghkdzqkIg47zoYEw3XcAGIwCHQ-r7DcoKl%2BCBA-r49Q6JHowB1TDSFyOg2DC4gdCGGAAIwgPVBfTilBIlIrVbOKpGIDVMcKShkHToFvweoNdHoxt4Zq%2BPxdKHCCE93roAHd05n8JWuSBnChMCJnHZ5%2BQ6BP%2BETKXnbqnZ84s4bk8EY3GE4nwP62EHQ2HqDmkwXi6X%2BuXK9Xv3XVbwY20BommMVp2m1b5d0oRcwKeXMRCjRgbVBIgeXhQVyUoXMbkMb18FASI2DcQhgzAcJwjgOBtWcTBwmCNp0F6SsiHJQYczYoA)

#### Interactions

- Cells with primality indication:
  > TODO
- primality line:
  > TODO

### Negative constraint
> TODO

### Construction
> TODO
