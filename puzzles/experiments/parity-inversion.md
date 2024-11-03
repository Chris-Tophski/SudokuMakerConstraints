# Parity Inversion

## Rules
* Normal Sudoku rules apply.
* A digit in a diamond determines how many cells in the 3x3 area surrounding that cell have the parity other than the digit in the diamond.
* A digit in a circle determines how many cells in the 3x3 area surrounding and including that cell have the same parity as the digit in the circle.
* All diamonds and circles are given.
* Digits along a red line alternate in parity.

## Cosmetics
### Circles
* cosmetic symbol: circle
* center only
* parameters: 40/40/0/2
* transparent fill, black border

### Diamonds
* cosmetic symbol: rectangle
* center only
* parameters: 60/60/45/2
* transparent fill, black border

## Built-in constraints
* Parity line: use entropic/mod3 line and set the groups to `13579 2468`

## Custom constraints
* add custom JS constraint
* add 2 groups (first group will represent circles, the second one will represent diamonds)
* add cells with a circle and/or diamond to appropriate group
* add code

### Code
#### Main code
````javascript
// configure negative constraint
var with_negative = true;

var circles = input.groups[0];
var diamonds = input.groups[1];
var all = [];

// prepare for negative constraint: everything is neither circle nor diamond
for (var i = 0; i < 81; i++)
  { all.push('N'); }

// apply circles
for (var cell of circles.cells)
  { all[cell] = 'C'; }

// apply diamonds (or both)
for (var cell of diamonds.cells)
{
  if (all[cell] === 'C')
    all[cell] = 'B';
  else
    all[cell] = 'D';
}

// apply constraint components
for (var i = 0; i < 81; i++)
{
  switch (all[i])
  {
    case 'C':
      puzzle.addConstraintComponent(
        new CircleComponent('circle@' + helpers.naming.getCellName(i), [i])
      );
      break;
    case 'D':
      puzzle.addConstraintComponent(
        new DiamondComponent('diamond@' + helpers.naming.getCellName(i), [i])
      );
      break;
    case 'B':
      puzzle.addConstraintComponent(
        new CircleComponent('circle@' + helpers.naming.getCellName(i), [i])
      );
      puzzle.addConstraintComponent(
        new DiamondComponent('diamond@' + helpers.naming.getCellName(i), [i])
      );
      break;
    case 'N':
      if (with_negative === true)
        puzzle.addConstraintComponent(
          new NeitherCircleNorDiamondComponent('neither@' + helpers.naming.getCellName(i), [i])
        );
      break;
  }
}
````

#### CircleComponent
````javascript
// configure inclusion
const self_included = true;
const diag_adj_included = true;
const orth_adj_included = true;

// get (up to) 3x3 cells around cell according to inclusion config and position in the grid
function getInvolvedCells(cell)
{
  var oadj = orth_adj_included ? [...helpers.geometry.getOrthogonallyAdjacentCells(cell)] : [];
  var dadj = diag_adj_included ? [...helpers.geometry.getDiagonallyAdjacentCells(cell)] : [];
  var adj = oadj.concat(dadj);
  if (self_included == true) adj.push(cell);
  return adj;
}

// validation
function validate(instance, puzzle)
{
  const { cells } = instance;

  var adj = getInvolvedCells(cells[0]);

  // continue only if cell[0] is filled
  if (!puzzle.getCellsAreFilled(cells))
    return true;

  // continue only if surrounding cells are filled
  if (!puzzle.getCellsAreFilled(adj))
    return true;

  // count odds/evens around (and incl.) cell[0]
  var v = puzzle.getValue(cells[0]);
  var evens = 0;
  var odds = 0;

  for (var c of adj)
  {
    if ((puzzle.getValue(c) % 2) === 0)
      evens += 1;
    else
      odds += 1;
  }

  if ((v % 2) === 0)
    return v === evens;
  else
    return v === odds;
}

// solver step
function* update (instance, puzzle)
{
  const { cells } = instance;
  
  var adj = getInvolvedCells(cells[0]);
  
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var removableDigits = SudokuDigitSet.from([1, 2, 3, 6, 7, 8, 9]);
  
  var candidates = puzzle.getCandidates(cells[0]);
  
  // remove all but 4, 5 in circles in a box center cell
  if ((cells[0] % 3) == 1 && (Math.floor(cells[0] / 9) % 3) == 1)
  {
    yield puzzle.removeCandidatesFromCell(removableDigits, cells[0]);
  }
  
  // remove candidates according to adj.length
  for (var digit of digits)
  {
    if (candidates.has(digit) && (digit > adj.length))
    {
      yield puzzle.removeCandidateFromCell(digit, cells[0]);
    }
  }
}
````

#### DiamondComponent
````javascript
// configure inclusion
const self_included = false;
const diag_adj_included = true;
const orth_adj_included = true;

// get (up to) 3x3 cells around cell according to inclusion config and position in the grid
function getInvolvedCells(cell)
{
  var oadj = orth_adj_included ? [...helpers.geometry.getOrthogonallyAdjacentCells(cell)] : [];
  var dadj = diag_adj_included ? [...helpers.geometry.getDiagonallyAdjacentCells(cell)] : [];
  var adj = oadj.concat(dadj);
  if (self_included == true) adj.push(cell);
  return adj;
}

function validate(instance, puzzle)
{
  const { cells } = instance;

  var adj = getInvolvedCells(cells[0]);

  // continue only if cell[0] is filled
  if (!puzzle.getCellsAreFilled(cells))
    return true;

  // continue only if surrounding cells are filled
  if (!puzzle.getCellsAreFilled(adj))
    return true;

  // count odds/evens around (not incl.) cell[0]
  var v = puzzle.getValue(cells[0]);
  var evens = 0;
  var odds = 0;

  for (var c of adj)
  {
    if ((puzzle.getValue(c) % 2) == 0)
      evens += 1;
    else
      odds += 1;
  }

  if ((v % 2) == 0)
    return v == odds;
  else
    return v == evens;
}

// solver step
function* update (instance, puzzle)
{
  const { cells } = instance;
  
  var adj = getInvolvedCells(cells[0]);
  
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var removableDigits = SudokuDigitSet.from([1, 2, 3, 6, 7, 8, 9]);
  
  var candidates = puzzle.getCandidates(cells[0]);
  
  // check for impossible diamond
  if ((cells[0] % 3) == 1 && (Math.floor(cells[0] / 9) % 3) == 1)
  {
    yield puzzle.stop("Diamonds in a box center are impossible.");
  }
  
  // remove candidates according to adj.length
  for (var digit of digits)
  {
    if (candidates.has(digit) && (digit > adj.length))
    {
      yield puzzle.removeCandidateFromCell(digit, cells[0]);
    }
  }
}
````

#### NeitherCircleNorDiamondComponent
````javascript
// configure inclusion
const self_included = true;
const diag_adj_included = true;
const orth_adj_included = true;

// get (up to) 3x3 cells around cell according to inclusion config and position in the grid
function getInvolvedCells(cell)
{
  var oadj = orth_adj_included ? [...helpers.geometry.getOrthogonallyAdjacentCells(cell)] : [];
  var dadj = diag_adj_included ? [...helpers.geometry.getDiagonallyAdjacentCells(cell)] : [];
  var adj = oadj.concat(dadj);
  if (self_included == true) adj.push(cell);
  return adj;
}

function validate(instance, puzzle)
{
  const { cells } = instance;

  var adj = getInvolvedCells(cells[0]);

  // only if cell[0] is filled
  if (!puzzle.getCellsAreFilled(cells))
    return true;

  // only if surrounding cells are filled
  if (!puzzle.getCellsAreFilled(adj))
    return true;

  // count odds/evens around (and incl.) cell[0]
  var v = puzzle.getValue(cells[0]);
  var evens = 0;
  var odds = 0;

  for (var c of adj)
  {
    if ((puzzle.getValue(c) % 2) == 0)
      evens += 1;
    else
      odds += 1;
  }

  return (v != evens) && (v != odds);
}

// solver step
function* update (instance, puzzle)
{
  const { cells } = instance;
  
  var adj = getInvolvedCells(cells[0]);
  
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var removableDigits = SudokuDigitSet.from([4, 5]);
  
  var candidates = puzzle.getCandidates(cells[0]);
  
  // remove 4, 5 in a box center cell
  if ((cells[0] % 3) == 1 && (Math.floor(cells[0] / 9) % 3) == 1)
  {
    yield puzzle.removeCandidatesFromCell(removableDigits, cells[0]);
  }
}
````

## Variants
### Variant 1
#### Grid setup

    Symbols:
    NNN DNC NNN
    NCN NNN DCN
    NND CDN NNB
    DCN CNN NCN
    BCN NCN NNN
    NNN NNN NNC
    NNN NND NNN
    NNN NCN NCN
    BNN NNN NCN

    Parity line:
    R2C2 → R5C2 → R5C5 → R8C5 → R8C8
    R5C5 → R2C8

#### possible Solution

    638 215 794
    942 837 651
    715 469 283
    127 593 468
    356 148 927
    489 672 315
    561 324 879
    873 956 142
    294 781 536

### Variant 2
#### Grid setup

    Symbols:
    NNN NND BNN
    NCN NNN NNN
    NNC NCC NNN
    NNN CNN NNN
    NCN DNN NNN
    NDN CNN NNN
    CNN NNN DNN
    NNC CNN NNN
    NNN NNN NNN

    Parity line:
    R2C2 → R3C1 → R3C3 → R4C3 → R4C4 → R5C4 → R5C5 → R7C3 → R6C3 → R5C2
    R6C3 → R6C2
    R7C1 → R8C2 → R7C2 → R8C3 → R8C4 → R9C4 → R9C5 → R8C6 → R8C7 → R6C7 → R5C6 → R3C6 → R3C5 → R2C6 → R1C6 → R1C7 → R2C7 (→ R2C6)

#### possible Solution

    786 914 352
    951 237 468
    234 865 971
    513 642 789
    647 389 215
    829 751 643
    462 198 537
    195 473 826
    378 526 194

