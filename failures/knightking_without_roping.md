# Antiknight, Antiking without roping

## Claim
A regular Sudoku puzzle with both an Antiknight and an Antiking constraint implies roping everywhere, i. e. there is no such puzzle without roping in all rows and columns of 3x3 boxes.

## Proof
### Assumptions
- The actual digits in a regular Sudoku are irrelevant. They could as well be any set of 9 symbols, as there is no inherent arithmetic property needed for fulfilling Sudoku rules.
- Both Antiking and Antiknight constraints define geometric properties of the puzzle, i. e. the actual digits gain no relevance with these constraints.
- Similarly, roping only defines geometric properties.
- Roping in a row/column of 3x3 boxes occurs, if there are 3 common digits in each one of 2 rows/columns of 2 boxes along a box row/column, which implies the same 3 digits for the leftover cells in that row/column of boxes.
- Roping can be detected by checking 2 cases for the first triple of a box:
  - compare first triple in first box to second triple in second box
  - compare first triple in first box to third triple in second box
- The `DifferentCombinationsComponent` of SudokuMaker custom constraints works correctly for restricting digit setups in given cells in order to define "no roping".
- Symmetry: Checking the first row of boxes is symmetrically equivalent to checking the last row or first/last column. Similarly, checking the middle row of boxes is symmetrically equivalent to checking the middle column of boxes. Therefore, checking only the first and second row of boxes would suffice, because horizontal, vertical or diagonal mirroring or grid rotation around a multiple of 90° are included by symmetry.

### Steps
1. [Create a regular Sudoku puzzle](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQCsJADCADQgAOArgF7MA2KBoOcMnhtEHEYIAFtAIgAwqKiZ0AFQj1R6ANaZBAYwgw%2BOBJPpQIEMAAI49YxDhbR5yFHzmcESwcwBaNTkwBzUQQAMg0cf3N0RgATCDVGcwB3TDEIEXMTekxw7RQ2NnQCAG1gAF8aMoryyprquqqG2sb6ptaW9ubOtq6O0H9MADcUPHwEKEYUOgG4NgmCImqQfqGRsYmpmbn8ACZF5eGCNcmQadn%2BAGY9wYPR8ePTrYAWK5XDu42zgjIXm6OPrYAbD9Vu8Tpt%2BAB2YFvdZgz74AAc0NusIe-AAnL0sT0cd08dj8biCe0ALp0HQ4dBjODZBCFfAlEAIACe9H4lEWLLZ8zoUBQ-Vw9KKlBoIpFRBoEol2xoMplYtFkqV0tlqoV4uVqrlNHOOr1jxoBoNZBoJpNuothqtxtNtstuqNVrNtoBNFdrohNE9noRNF9vvdbq9wZ9frDgY9IbD-pJnNZ-CIuwqTPj80uya5Cco2bo0RQYGyKWwI24vH4IDcGWU2X8gmyTEMDLJIAARnY1MNolwU9zCDo89oIAPCAB6EdMVgcEhwaLRKSC6m0%2Bcwei4YYIAAUOBQiXMABFMGAwGh18uW9lEMX0MvV9uDBuAORQIhwB80cxFYXviXmbZkj%2BJt%2BurmEQjz-kU2wGr%2BJq-gCJIkgAlAhADcAA6OBjhO7AoNOs7zpSi4GDea73tuu4HkeJ5Ebo548AgV7EXem5PkQLZvh%2BX4ge%2Bf7vhBP7bDKv7nOBRAwUQrogRC8FIWhOBYVOM5zguUA0tRK4kZuZH7oex58mptGXoKjHro%2BUDbK%2BvEQZ6v6%2Br%2B6Lgec6Lvo8IrmI8RDgWQP5kIJZDCYhKHofJOGKfhVIqUuui3iZWkUbpp40Re9FGVFGmmdsbGWds1nbLZ2z2bxjy2Y8TnmGQlDgY8gmPMBjxgQFsmYSw2G4UpBERWp0WkTu2mUXpCBnklDGpUxpnnBZHFkFBZAwWQcG8QCEkAtZAIIuBEK2RCpUIhVDXoU1k4hXhymqQNI0xT1cVUWdMAGcllLGfeT7nJlk3TbN80fhCMEQhJEJSQtpUQq5EIeXtGHjs1CnHe1p2PZpl06ddg10cN6mjQ%2BWgvuxn6uaVRBrbxuXvuc1mPJ9RRze%2BAI-fVMn7ZDh2tWFhE3V1CPkUj-Uo4ZD3nU9WOvbj7744TH75STxUAx%2BM3U1BEL%2BfTEPBczJ2RejF2c31CW3UNKUawL5k40UwGAb%2BHm8ecP4uc5BUy6Vq3vv90mBcrUNHW14Vw-zHO9fF%2Bl63zBvMVoGXG6bgnbBbH7nNV3kVbxZC2ctTtweDB0taFaudWlsVczrd1o%2Bzj5aONxsSaJ3FgZbUE1e%2BPngQCgmg%2B%2BO0u41jOZzDXvq8XefawHqP68XmMveX34wZBDkwXV9fCQtP7A079ngyA5QgDowdCrGdD1iIXDr1SzIcAfpSxqUQA) with:
  - Antiknight constraint
  - Antiking constraint
  - Given digits `1` to `9` along `R5C1` to `R5C9` (as the individual digits are irrelevant, any set of unique Sudoku digits would suffice)
  - custom constraint "no roping" with the following code (using all the triples, although the first 2 triples would suffice)
    ```
    puzzle.addConstraintComponent(new DifferentCombinationsComponent('r1a', [[0, 1, 2], [12, 13, 14], [24, 25, 26]]));
    puzzle.addConstraintComponent(new DifferentCombinationsComponent('r1b', [[0, 1, 2], [21, 22, 23], [15, 16, 17]]));
    puzzle.addConstraintComponent(new DifferentCombinationsComponent('r2a', [[27, 28, 29], [39, 40, 41], [51, 52, 53]]));
    puzzle.addConstraintComponent(new DifferentCombinationsComponent('r2b', [[27, 28, 29], [48, 49, 50], [42, 43, 44]]));
    //puzzle.addConstraintComponent(new DifferentCombinationsComponent('r3a', [[54, 55, 56], [66, 67, 68], [78, 79, 80]]));
    //puzzle.addConstraintComponent(new DifferentCombinationsComponent('r3b', [[54, 55, 56], [75, 76, 77], [69, 70, 71]]));
    //puzzle.addConstraintComponent(new DifferentCombinationsComponent('c1a', [[0, 9, 18], [28, 37, 46], [56, 65, 74]]));
    //puzzle.addConstraintComponent(new DifferentCombinationsComponent('c1b', [[0, 9, 18], [29, 38, 47], [55, 64, 73]]));
    //puzzle.addConstraintComponent(new DifferentCombinationsComponent('c2a', [[3, 12, 21], [31, 40, 49], [59, 68, 77]]));
    //puzzle.addConstraintComponent(new DifferentCombinationsComponent('c2b', [[3, 12, 21], [32, 41, 50], [58, 67, 76]]));
    //puzzle.addConstraintComponent(new DifferentCombinationsComponent('c3a', [[6, 15, 24], [34, 43, 52], [62, 71, 80]]));
    //puzzle.addConstraintComponent(new DifferentCombinationsComponent('c3b', [[6, 15, 24], [35, 44, 53], [61, 70, 79]]));
    ```
2. Let it find any solution.
3. This fails after a few seconds.

### Result
As the solver is not able to find any solution for this set of restrictions, the claim must therefore hold.

### Remark
The code for the custom constraint contains all possible places for roping, but only executes the first and second row. Each pair of lines covers the 2 cases to check. The other lines are commented out and can be enabled at will, however, this will make no difference.
