# Parity Inversion
> TODO: rework naming: "Rings and Diamonds"

> TODO: finish code

## Core Rules
* Normal Sudoku rules apply.
* A digit in a diamond determines how many cells in the 3x3 area surrounding that cell have the parity other than the digit in the diamond.
* A digit in a circle determines how many cells in the 3x3 area surrounding and including that cell have the same parity as the digit in the circle.

### Code
The following main code and components to ensure the circles and diamonds constraint is a non-working draft. The solver produces wrong solutions.

#### Custom constraint
* add custom JS constraint
* add 2 groups (first group will represent circles, the second one will represent diamonds)
* add cells with a circle and/or diamond to appropriate group

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
