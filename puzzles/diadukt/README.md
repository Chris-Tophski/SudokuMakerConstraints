# Diadukt
## Rules
- Normal Sudoku rules apply.
- Each cell in the grid is a column indexer, e. g. a 5 in R2C1 means there is a 1 in R2C5.
- Digits along a line must be strictly between the digits in the circles at the ends of that line.
- Digits in adjacent cells along all positive diagonals (from bottom left to top right) must have a difference of at least 4.

## Origin
Experiments with indexers

## Status:
- [X] Solution included
- [X] Submitted for testing: `2025-10-24`
- [ ] Feedback:

## Links
- [SudokuMaker](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQCsJADCADQgAOArgF7MA2KBoOcMnhAEUxwAJowDWCWiDiMEAC2gEQAYXlRM6ACoR689OMzSAxhBh8cUwoCICAAQA5aPDa2AyoxERxjW1EYd0Wzh6ejYATxIAHRw7AFE4Y3lbYxQ2F0wcWwUUWwBzDRFbTSDkiDZGGEyMkRQADzQaWxQSPJa4WzIizIAlACYVIls%2BOBxA7Kgc4vbBjNs%2BlQpouyFczARAuDZcXJK2DJyYRnQEWwAjHOONYwRws5QEAHcUFEzs2xFMVfWurPkc40wUGMASCJzeLxEgQgYF%2BiFsexwzSWthWa0Cs1EACsEi8Tik0hstjgdpsXPQIFgEJgAG45D5wXK4TaBAAUYCgZjOEAQCE5HDAYIgWV0vk%2B8gQAEohkcTvI4LSSh8wGA0C8UrZoaD4Sg4MdbAAWEgmVJsdAEADaoGpm0Y-DIAF8aFabfx9Y7neV%2BABmd0ga2egi9X3%2B20EIjBl0EACcEYD%2BAAHLHQ-gAOxJ-gANnTBETTr9kdT2fwWbzIbtRbdpYLPqrcaDteT4Yb-BjzcDRabHuTra7-FzvYIabbxaLDuHlYH%2BBrk5Lk7Hk4n%2Bbj06Xyfrk87q5bRf7W8HRZ7e4TRaHM9HFaLK7L7eHm%2BvU6L66Pd4Lh-vu-vp6Ps6P86Pi8-Isf3vP97wA6tHw7A8dyg4c3wLD8Cy-e9gILUCC3A5dIPHS9sI3aDh0QuNkILVC4wdABdOhTFGBAoDgDJ1gtUAEDCeh%2BEoX1WPYsM6AmVZcDNfBzUoGhRNEogaEkyTehoWTZPEsSpOUmS5LUxSJJUtT5JoL1dP0-UaEMwyyBoUzTL0yyjOskyzLsqy9OM6zzLsjMaDctyUxoLyvPjGg-L8jz3O8kLfP88Kgs80LwoCiiuLYzNKEkkB8VNC1RKjKS-N6LyvTc-VzMMjM9JTWSUz0jMTNM-U3K9Lzej8ohMqITTZL0ohZKIGTRN6TKvT8-UvLIDzTJTQyU1MjM3LILz9T8r0%2BokxyjNE-VMrIQKfM8ryMz8sh1tWySvXk9rbLcohTN6QyvUc2SyEkjNRIzTKUz8lMXqeySyFk-VLMM3pTKIKLGvq2rqpMiqysk%2BMevko6iCokBjjCDguBSsolEIABiMAo0ofGCZAe14p4-B9SSugERQITzXNSSoyounGp6xmcqk5qjsZvK5OyiSfsZgrdPqzLemkvSyEZshjNq%2BbYakorGeKszqtyvqZPa0bGdK9yTPygbROOuTDKB-ytYq8zZsy-Ujr0gGpJTLWiumvbVra-6My1yahvWyTft0iWaHNFMPMC0TvqM-UtZ2zKMy%2Br0tbep7ei1yT3ooxGYAyIRlVVHAUgIQykdY1H8FAUwtigZQcbAOBHsJugFEwYxxERdAhMoEgLuJvNuNdSg9JAKmafNbm6t0%2BarcOoyfscyPEeRkvQCHtHG%2Bb1v2876iMcr7G4D3-eiboCEAAUIEYoTQCwZgOJIPzwEwNIq%2BVZ%2BwBh6RLi8fgWPkJuW%2BpjfKCyXRhXKu%2B8D7E2JnFe0QA)
- [SudokuPad](https://sudokupad.app/o96ufvj11x)

## Preview
![Preview](preview.png)

## Intended solution path
- between line: the circles must be a `19` pair
- between line, diagonals: Neither `1` nor `9` can be on the line, so all cells diagonally adjacent to line cells along positive diagonals (R4C3...R4C9, R6C1...R6C7) cannot be `5`, therefore `5`s are limited to R4C1, R4C2, R6C8, R6C9.
- where is `5` in box 5?
- column indexers: indexing `5`s
  - R4C5 is `12`
  - R6C5 is `89`
  - R5C5 is `456`
- diagonal along R5C5: R4C6 and R6C4 are `1289` → `1289` quadruple in box 5
- `12589` in box 5 are approximately placed → R4C4 is `347`, R5C5 is `367`
- column indexers, diagonals, box 5: Where are `4` and `6` in row 5? → R5C4 is `56`, R5C6 is `45`
- `456` triple in box 5 → `37` pair in box 5
- `2378` quadruple in row 5
- diagonal along R5C6 → R4C7 is `89` → where is `7` in box 6
- diagonal along R5C4 → R6C3 is `12` → where is `3` in box 4
- diagonal along R5C3 or R5C7 → resolves `37` pair in box 5
- column indexers: where are `4` in row 4 and `6` in row 6?
- diagonals along R4C3 and R6C7 → resolve `2378` quadruple in row 5, R3C4 is `89`, R7C6 is `12`
- diagonals: R4C8 and R3C5 are `789`, R6C2 and R7C5 are `123`
- column indexers: R6C2 → where is `2` in box 5? → R4C2 is `56`
- column indexers: R4C8 → where is `8` in box 5? → R6C8 is `45`
- diagonals along R4C3 and R6C7: R3C4 is `89`, R7C6 is `12`
- diagonals along R4C2 and R6C8: R3C3 is `129`, R7C7 is `189`
- column indexers: where are `4` and `5` in row 3? where are `5` and `6` in row 7? → where are `6` in box 1 and `4` in box 9?
- column indexers: where are `3` in box 2 and `7` in box 8?
- where are `3` in box 8 and `7` in box 2?
- column indexers: where are `5` in box 7 and `3` in box 8? where are `5` in box 3 and `7` in box 2?
- diagonals: eliminations available in box 5 → `19` pair in box 5, resolving `2` and `8` in box 5 → resolving `456` triple in box 5 → resolving `5` in boxes 4 and 6
- diagonals: eliminations available in R3C3 and R7C7
- where are `6` in box 4 and `4` in box 6?
- column indexers: `4` and `6` in boxes 4 and 6 resolve `19` pair in box 5 and `4` in box 6 and `6` in box 4
- column indexers: R3C4 is `8`, R7C6 is `2`
- `123` triple in box 4 or `789` triple in box 6 resolve the `19` pair along the between line
- where are `2` in box 2 and `8` in box 8?
- column indexers: where are `6` in boxes 9 and 3 and `4` in boxes 1 and 7?
- column indexers: where are `1` in box 8 and `9` in box 2?
- where are `1` in box 2 and `9` in box 8?
- column indexers: where is `5` in boxes 1 and 9?
- diagonals along R3C8 and R7C2: R2C9 is `89`, R8C1 is `12`
- column indexers: where are `9` in box 3 and `1` in box 7?
- diagonals: R2C8 and R8C2 are `19`
- diagonals: R2C6 and R8C4 resolved
- column indexers: R2C6 and R8C4 resolve `6` in box 1 and `4` in box 9
- diagonals: R2C3 and R8C7 resolve R1C4 and R9C6
- diagonals: R1C4 and R9C6 resolve `4` in box 1 and `6` in box 9
- where are `1` in box 1 and `9` in box 9? → `123` triple in column 1, `789` triple in column 9
- diagonals: eliminations available for `1` and `9` in boxes 1, 3, 7, 9
- column indexers: `58` pair in box 1, `25` pair in box 9
- diagonals along R4C1 and R6C9: R3C2 is `12`, R7C8 is `89`
- where are `2` in boxs 1 and 3 and `8` in boxes 7 and 9?
- diagonals: where are `1` in box 3 and `9` in box 7? → resolves x-wings on `1` and `9` → resolves `58` pair in box 1 and `25` pair in box 9 by column indexers
- diagonals: where are `3` in box 3 and `7` in box 7? → resolves triples in rows 3 and 7 → resolves triples in rows 4 and 6 → resolves `6` in box 3 and `4` in box 7
- (Sudoku)


