# Parity Inversion

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

## Experiments
### Experiment 1 (non-unique)
* [SudokuMaker](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQCsJADCADQgAOArgF7MA2KBoOcMnhtEHEYIAFtAIgAwqKiZ0AFQj1R6ANaZBAYwgw%2BOBJMBEBAAIActHhsTAZUYATCGsYmojDuhNx69NgE8SAB0cUwBBE3tMAHNMBBNMHC8IzF5cewiUBDQYBJRPcQB3E3gcPxMtFDY2TwSTMRQTAGYAD0avKBQ4E3RGKCgIRhxInCi60URyyutxgDcG%2BpN6ODkEMoh6qDG4RIXImLja3ZSYNKCQk3C92PjErq1MKC0ODKzYXPyIIpKyiqqandEDRabWWnW6vX6g2Go226QSTwcCVGYgmv2mcDmYwa6F4DSWKzKcE8R32Nyx5QeTxQZzCVWSqSGnlhFMeHnaDRicxwNJMABForEmWxcDDXCh0mxcl42K8eFkyfjYgFtFN0AQANqgGZwNiMfgANgAvjQtTq9QRGsbTbr%2BAAOK0gbU2ggAJgdTvN%2BCI7rN-DIPud%2BAA7AHPQBOUP8AAskYIEZNjt9BBjCY9-DdqaT%2BHtmcDltznpDBYNsfw-uLBG9FeDpar1s95fr0dLRur8abrtLOY7%2BHzPbricDGZ7RZ7jcH4dLfYnzerrZ73ZnFtL47TBHnS69pZTC9L7c3w83o83O83i7X%2BH3F43F%2BPF8PF%2BnF4HF9XWbfgZvWZfWafWYfWanhe55ZneWZXlmIGBmBeZ7iuLa1tupYAUOcHVkBoFdoh1Yfp6f6foaAC6dA6Dg6AIFAcAJAgar4JqICrPQ-CUA6jH8EQdAdDEuC0eqlA0Px-EccJNAuqJ4mCQJNAiRxYlyVJkkyeJ8mNDQqmqVGNCaZpZA0LpunqWpWnGTpelmYZGkmWZ%2Bk0Pqtn2UGNCOY5to0K5rl2Z5TneS5bl%2BV5dnOd57luYRDo8Hwkj3KyeSCGxrqUJQYkMMsvC8aA8WEFMmD0OgnCcc0BCUCQmkgFAfhFSVdDbFEHBFXQYCYFUkgAMRgO1HWJYI5H9Go-AgC1iVDdQdA9U4KAAOqYPYYiVUlRGjX4MAAEYQNUGrqhQunFWQxHqqQukHXtQbkNJ5B7Y0p0uudNDqraV03ftp2Xbtt0vWpj0nQZj07Vpj0HX9r3qlGp0g0D936Y9YNOZ9p1fXtv0Q8dp1I2FCYRf1kQMvYap0JlLqJcl%2BJpRqGV%2BExkgdFoCA1XVdAFNNs34MVdkgIC0SiIYzMkKztPRrpIBjX1U0zaIc3JUL-WDcNI3gE1bCtR1nXUAtgtLat610eq707Xt%2BqnUdt3Xbpxt7dDpu3RDok-c9j1bbZNu6ajrHk9GlCs5KOCxVrRBCWGomuY0jmNIH-tRvxUb%2B2QHmOfqHn%2B0GlBm-xjRyZpRD6oRxEgFEkK5RqjTh7Ztoutn5F%2BHV%2BCgDowpQIrYD6o3%2BpxaImBaGoXvoLRxVEP6LsU16Q10PYKCNTgsTYHgVcgBjUWUmyzJYycjKCAkTBc-R02SLnAz53QbBwMtlSSAA4nnuMpZRMC0WTA9lXABQgIaqvLXA7coEMXAMa7UUQCP2h-36gAeiAeUXAjUoi9AaF7KIiBMCYlIj1KiBhgjak2AzMQAB9GBcDMQAF46huBQAAbmCKg5YLIqSeAIWvEQJAd6MFynxQipCcBoPpMvHGJgaE4HXvQ8%2B%2B0WHkM2DqawBD1RCJwMEEBiwOj4gaJATYOCEDwIaIgiiyCED4BMCgOY5UxBIniJ4L2sRASbGilSEwOBoAcLSMERRJgAAU7DMDcJMJQYh8QTAAB4TC2iIJ4zAABqIJABKYIJgTDAGlGwEgTB0CiEcQAcjMEk0JnjDRkJwDI7wvgfjzzyPYmxziKFohMBAMAlCPAkDROgcJiQokxPVGiQibiklSCSRkrJOSfD%2BFsYyJxNjVpiHqQ4kp5ipjlMqUvNI6AamqnqcACJ8RKmONEc0qYrS8HbJMO0tJyzInrJaW0gAQp05ZlQ8oHKaccghSTeTnJwJkqR2TQG5L6eoyi1EwEwHoLgD%2BNEimbHGV4ghHivG%2BP8YEkJizlnoAwVoUQTj1mYEIvUyJSyGmRK0ESBoez8DXMiUwVgHASBwHsPYKQPENHUSpb8-5BhHGEsiVYlARQpAFLpX8r2jKkkWI4AAASSSYIJJhARsCYhgEgEUkT0MyFIKYZhcSOMwKEmgJh1SovRSyyJ6TmXLQ6HANQrCdU4ryrsh5BKsUsuJewak5LKXUq%2BQYLlDKEBMutTqr2RR%2BTY1dTy91SSZlDCFSKsVlRJVzJlSMOVCAFVVCVXwFVaqNVauZXqz1JgDWdGNdcs1eKzlWp1USlgdqyUUqpWRGlLrdDcoBR64tLLvUmA5TFf19a%2BUFNDaK8VkbpW8FlVEeVirlWqvVZqtF6aTXFttaSh1lakG0trW6htjbWU%2BuOGkdtvLg32G7eGiVaAo0DpjUOuNI6k1jtTZOzNGbG3ZqNdO7FuLdmpKLcWzAqyMGiGwSgWBKj8E7IonqbVjbZ32orU6zR273XMq9Wy8wKBTFoFbVSCwUBfWcJg8kkxGx929qPf2nIp7h0JtHSmidoHi13uLQ%2B3NDTnnPKfiRZdAb0rfzvjof%2BdBZ6EFQxwGDAD-6EBkaRCBUCbgIiwLgYI6juiVDAJg%2BEuoR7pAIcBkhsnqX0iiJg8lAArJTOAESqbcRp1hcnoBYIM0Zkz4ozNENYdI0BZ6nGMLqBAUJTRWiTD%2BO0AYQxfPWDfjoKA0IPOSd1NJxIYnoheEC38rAKjcBkgWLnaa9jBjU0niYM9ABJNha05iUtVI4tEsKGnsIgAZtxVmf02eUw4ezAB%2BDVJB2sEalUO3QmRyqxoAPJQDEBAKIuBRF%2BFCPYfTb8AXxuqGVqYoTWnaIkdO9h9gasEKxrphrxmVMtbax1iNhHut8AogEM9vrRs8CqBNqbM2XWlfK8tjVkjInsM2%2BUgzNTcA4vdRtqbNHP1OLymwRTjXTNAaIV5778TEnlenR0BAvRbhTdYc85zJgnTTTgTJnAYAsvJcSNjjbWQVVVu2BUdV4GKvYu09E2pJhDRuISORSnmmXnvYoZ9-LhW2DFbm%2BgBbfxmEZuWaJ3AKicB6nKTgPpwO0TMKMSYRqVRxTLOB44gAhOB2NgvQgdAAGLy3FML6ooSqNI5R4QvUTmGkS4MAkGXuB5eVJ6H0AL4XGeghVyb%2BwGvVk69LaSs9%2Bujd%2B7WYDy3mRrfmayZEiXgw4h-xxkA3RH8mSQkC2swLymSBecV0nZZ7CZhuN12epAvozfoFF2tih6eyJuI8cXihKfqHuLt5EsZ7CtBTK8ID5ZmKdWa8ceXzIlebRla8wAUhMC6Lz2ywVUciQ3zwQSCEBOuZclAzK28io39OjHDSR%2Bl9n-P7hOzKDR%2BR1AYnF%2BCGr%2Bndv65Vvb9Y-v%2BUil6B0fdNAegIraA3QWQ9AmWxmROAAVCYIwqTg0OTmzsZigNTsHigLTmAlWo0ozszjwvARUNOi3iIlNm4rzjMAASVn8NXrXssssnJlcDRG4vtOqmJE0OqppCYLpCYHZCYI5H4uqmGG9ljhQh0CcNqMtBwPyPsO3nYI4M4OIbEDYJkCQGAP0DAI4gwXPuqqpBweqtwa5CYHwTRvgeULCDjlkO3mPnGsYTAULrUpQQ0uLqAkIRAJiKIlmiICYKwWQGSPynkGSF0KtM0JMAYIAWiAHk4hQUnCYLPo0AvhviYAAGRxFOIACyiAogihwo0A4RrSoCYYM%2BTQMRJgRA2qQ%2BLKfgmAlQ6QuujhcwUglhiAeQhuyhc2ji1Rh8YhAoNE6qNhScNGzykS9hYowhaidRphXgWgoW4WCAEA-e%2BmJAHAIwYgyy3eFCtBfetBdSg%2B1ymuOKQwJheQJA4wQutBXmCRTiqxAAfDMXMR-FECMlRiUTqmURUYsMgSQNUSgLUbsTAY0boM0bQV0aqLYTqn0UzsEExv3P1FxvlDPLiJIJhluqxgCkJsAqArFpAh0JFowNFlpugaDuDntk1mpirjqHlBZtpttnplNrZvtkSXHsZtpnVpSYZhDvZupo5r-rlpkG5vQB5l5sCEFpnp7kFmMRMYYlMZidFmgRAvFpURAEljlocICLlnIP7vjoTjlsQaQYLmbqgVVp9oybtnZukK1uqO1gccdl1igD1udgNkNuINduNpNtNhUI9uQc9iYCtvwetp9hSYaTSSYCaWaZ1nMqdr1hdpkFdmNrdk6Q9uem6Yti9qtoYfqd9qRH9o4gDvpkDqsnidSYSRfjbigVcXDjqYjjHm-gZj-i8gTmATliTvUXATTAgUgSSigcECUXJgzqqEzizhTggZ3gIQQfpkQZkAViQfzuKNqd0WigOQ7lLs7nLmUArlMErvIL7mrqqZEprkHq2XrqqAbigMbhudXhbi-uWTsOyZziYHOU7g0C7kuW7hCJ7oYt7hiarhwJuSsk4juWWqHvueHseQZqedaq-hebbvHteaiQFsnl-mnlyIKVCE4tYgcHtvnkFswoYaXgQuYRPnqFkTRuwqvk3nXpsHvmCgOcseYn3kBZsdaiPjhVXloHkefpfsvjovBfvoUU%2BjotUDvpmnvuvlxcskfluass4pEXPgUVfmeTfnfjsm3k-rxTJdblhQ-vBVWZjv-hOZsORCgCAWqbWbgJAdAfUU4qzk2VTi8a2agZ2QKT2dgRZRzv0ZVtzoQQQpqROWQfNtOQYQ0jQR0e3moUwZoR4eqpwTobwV6YISgMIW0SgLIXQQQlIU4IwAlfIQgIocoaoRxOocwVoVweqrofoXgS5eYiMT4dha8aHuVdYYCT0SVQnqiYCO3CrjYpgPSl3JgKIQ0LuqEY4lkRJdEQWUQPEYkY4ikWIOkRAJkdOdeXoXkUNTskUbRY8eUWwJUa8eRMoEyiAPCQMrUH4RAAES6a8OyPEB1VgN1UECAL0VQfbg4TFU4cMV8fUUyOMdAJMdMd9vMbcaIEscUuth0WsQFcUVsasjsZEFYQcUSBmR0ScWNRcVcT9Xcdcg8aUWtRtbue8Z8ZDfUT8TAH8R0QCSLvVdciCYxsEMxrfJCYAoILxiAGYEhhsPxigOhntY6vSgGsiZIA7uJhiY1tifSbiQpnmZDoWWSegb6VSSybSZeZZnaUyaLayeLRya5o4u5lMXyT5q%2BUKWUiFh9WKdMQLTlmiTKYsHKRPCloqRyCqaAdlilh5QLk9otu2YYdVm5eUgrX6fmYGUdoepadaX1meoNsNg6dGfdidVOQmR6a9iRRED6SkDttLQSaZr7eaf7SGVaWdkHRGYnVGf4DGZHc7VUEtjHUmaVTMbVqmb9ogBmUBdOprrmTLQWRpjDlNnElifDotmWbJTMRpQZfbcTjqHsY2ezi2XajZfTnZVgTcDgRzsmR7Y7ZOcXdULYQMfeV%2BYXq0mue%2BersfoHuYWHoeRHrUsBTqqBSrVeTIhvcDu7lnl7t2T7rvZ%2BduYff%2BcfYBVHspW-nSQMToEnp-qnkRcsEKTnnCKhQXiuUXhXVhVZb%2BePoxXVTOYYUReRW7V-sRRBZReUNRQPg0mjfRVVQg5PkxRJSxUvsykRYJZvtas-vxRg9Q4fhBRfeJVrmpRnvDU4qXmw4A3Uv3TIlpXokAXpXbRAVAfQDAWZX2ZZTTq7X5VPZgb2XPQ1YOZXe5aOXzk7fGSTcg3YfI5LQFfQTlcFSwequweFYVZFXHa0d1QlZIQ4ClWlQoUoboKoR4bo85VzmVS9aMZVbudVT43kPhSozIu8e4WY74VmkdYEadSEfvWEbNVEQUSNaceNakVNTNUg3NbkYNck6Ddak8etXA6StjTVfjc0TY%2B0RIcTavaTQxmCZTURMaCALQlzKAAwvnHRNXKqBqIdPxC6MJHZC6EM4HMHHZI0BHCnDpKpEGAnPxPqM5KXHQBeNIFTSALUgXNJCbEM3JP045GQAnEs5uLtU-GjILKsJXMAM-GFIaEAA)
* [SudokuPad](https://sudokupad.app/fa2vefsqov)

### Experiment 2 (non-unique)
* [SudokuMaker](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQCsJADCADQgAOArgF7MA2KBoOcMnhtEHEYIAFtAIgAwqKiZ0AFQj1R6ANaZBAYwgw%2BOBJMBEBAAIActHhsTAZUYATCGsYmojDuhNx69NgE8SAB0cUwBBE3tMAHNMBBNMHC8IzF5cewiUBDQYBJRPcQB3E3gcPxMtFDY2TwSTMRQTAGYAD0avKBQ4E3RGKCgIRhxInCi60URyyutxgDcG%2BpN6ODkEMoh6qDG4RIXImLja3ZSYNKCQk3C92PjErq1MKC0ODKzYXPyIIpKyiqqandEDRabWWnW6vX6g2Go226QSTwcCVGYgmv2mcDmYwa6F4DSWKzKcE8R32Nyx5QeTxQZzCVWSqSGnlhFMeHnaDRicxwNJMABForEmWxcDDXCh0mxcl42K8eFkyfjYgFtFN0AQANqgGZwNiMfgAdgAvjQtTq9QQABzG026-gANmtIG1toIAE5Hc7zfgiB6zfwACy%2Bl34RpBr1kMP8ABMkbdsfwEZNTr9BB9Sc90fjofTKfwRpzwcDBa9DuL-CtZYIMcrIfjRZtXorDft8cTzbjNfz7e9rfjae72e7pe79eTwer3a7Y8b8fdNeH04D8anGYIg8Xltn8YnG57Nbbu6bu53q-wc8nvZr-d3C9Po9P67v8dvuZPuevp-Ph8vA%2BXfa3%2B51n%2BNaPrmR6nm%2BwYvsGoHBiuYE-sez7-jWX5PgAunQOg4OgCBQHACQIGq%2BCaiAqz0PwlCOuR-BEHQHQxLgxHqpQNCsaxdGcTQUbcbx7FsTQXF0TxIkCfxQm8aJjQ0NJ0n%2BjQ8nyWQNDKcpskyQpmlKSpOnqXJWk6apNB2sZpn6jQ5nmRaNDWdZJn2RZjlWTZLkOSZlmObZNnoY6PB8JI9ysnkgg0VWlCUDxDDLLwzGgKFhBTJg9DoJw9HNAQlAkPJIBQH4GVZXQ2xRBwGV0GAmBVJIADEYC1XV4WCLh-RqPwIBVeFHXUHQTVOCgADqmD2GI%2BURYamEgOgfgwAARhA1QauqdrkGx5CYeqpDKRta1RstO1kGt-q7atNDqhQyl7WtjTLVd%2B0nRtCnHeqN0qY9mXKUtt3qntFmPc9%2BqrT5SZ%2Ba1kQMvYap0PFUbhZF%2BIxRqcV%2BBRkgdFoCBFSVdAFINw34JlJkgIC0SiIYeMkATGMBspE14b1A1DaII2RT1LXVZ1DVlRVbDVXV9XUGN3VTbN80kady1vWtH0rZ9z2HZ991nZLy0fehgOI8j%2BD%2BpQBOSjgwWi0QHHWUQrrcaxUam40rGNKbWsKdZZAmf65mNPqB3mf6dprWQ8l2kp73ve5yn6vZdmm3arFkHR-p0Y0InSVGPFENpJlEPt41RJCyUao0dt2haUbjbhfglfgoA6MKUA82Adq13aIWiJgWhqHr6DEZlaeGtRSO0R1dD2Cg5U4LE2B4GXIDAwFlJssyoMnIyggJEwpOkYNkiZwM2d0GwcDTZUkgAOJZxDUX4TAxHq61%2BEFCAXfjdNcDNygQxcGRPcBRAA-aJ-rUAPS-%2BUXA5Uoi9AaHrKIiBMCYmwk1AiBhgjak2NjMQAB9cBkDMQAF46huBQAAbmCAg5YLIqSeGwUvEQJAN6MGSixdCBCcCIPpPPcGJhyE4GXlQ4%2B616FEM2Dqaw2D1S8JwMEf%2BiwOj4gaJATY6CEBQIaDAvCcCED4BMCgOYuUxBIniJ4PWsRASbEClSEwOBoDMLSMEGRJgAAUTDMBsJMJQPB8QTAAB4TAWiIC4zAABqXxABKYIJgTDAGlGwEgTB0CiBsQAcjMLEgJLjDSEJwOI7wvgfjTzyFY8xdjiFohMBAMAJCPAkDROgIJiRQnhPVGidCjjYlSFick1J6SfD%2BAsYyWx5jZpiCqdY-JRiphFJKXPNI6BymqiqcAYJ8QSk2IEXUqYDTMFrJME0xJcyQlLPqY0gAQi0uZlQUrbNqXs7BsTeRHJwCk0RaSAEZM6Uo-ChFAEwHoLgZ%2BRFcmbCGa47BzjXEeK8T4-xMy5noGQVoUQtilmYHQlUkJszqkhK0ESBomz8BnJCUwVgHASBwHsPYKQTFlGEVJR8r5BgbE4pCaYlARQpDZMpZ8vWNLYnGI4AAAViSYXxJhARsAohgEgfkkRUMyFIKYZhcQ2MwAEmgJh1QIqRfSkJSS6XTQ6HANQDD1XopShs652LUX0rxewakRKSVkteQYVl1KEC0rNeqvWRR%2BRgwdeyp1sTxlDF5fywVlQRWTPFSMSVCBpVVFlXweVirlWqrpZql1JhtWdD1Wcw1mLDmmvVbilglrCXEtJThcl9rdBsu%2Bc6vN9K3UmGZUFL1VbOXZIDQKoVIaxW8AlVEKVMq5UKqVSqxFSb9V5otQS61JbYEUorY66tNaGXuuOGkJtHK-X2DbUG4VaBQ3dvDb2yN-bY2DoTSOlNyaa1pt1WOtFGKNkJNzXmzACzkGiDQSgCB8isHrLwnqNVNaJ1WuLbalRa6nV0tdYy8wKADFoAbVSCwUAPUsPA3E-RGwt0dt3V2nIB6%2B3RoHfG4dAG82XrzdejN1S7l3NvlhOd3rYpvw1iAHQX86CT0IAhjg4Hv5f0IOI7CwDQE3ARFgXAwQlHdEqGAFB8JdQD3SNgv9%2BDJNkvpFEFBRKABWcmcAIkU44lTDCpPQFQTpvTBnxRGdwQwsRADD22JoXUCAASmitEmH8doAwhieesI-HQUBoQudE7qcTiQhPRC8L5z5WB5G4DJAsTOg0rGDDRqPEwh6ACSjC5pzBJaqGxaIIXVKYRAHTjizPvos-Jhw1mAD8yqSDNew6K3tuhMi5QjQAeSgGICAURcACL8KEew2nH7fKjdUIrUwAkNLUcIsdTD7AVewaDTTNX9MKYa01lrwacPtb4HhAIh6PWDZ4FUEbY2Jv2sK8V%2BbyqREhKYatopOnym4HRU6lbY3yMvtsSlNgsnauGd-bgtz72okxOK2OjoCBei3DGwwu59mTDOkGpAiTOAwBpfi4kdHK2sjytLdsCoSqgMlbRepsJFSTCGkcQkXCpPVP3Oe8Q172XctsHy1N9AM2-h0OTXMwTuB5E4D1EUnAnT-tojobokw5Uqjijmf9mxABCIDEbeehA6AAMS5uKfn1QAmkbhwjnBeo7PVJFwYBIEvcDS5KT0PoPngu09BArg39gVcLI1wWglh7td6694s37pvMjm%2BM6kkJIvBhxE-uDX%2BGjn5MkhL5xZvn5MkDc7Lyg6E5lMJmI4zXh6kB%2BiN%2BgQXS3iHJ5wo45xBfiEJ7IU4q3ITBlMK0KMrwv25kovVarmxJfMhl9tEVtzABSEwUY3NrMBaRkJtfPC%2BOwd4s5JyUB0ub-y1fY6UfVMH0XqfM%2B2HrMoOH%2BHUB8en%2BwUvsdG%2Bzlm6v2jm-RTiXoGR20gB6A8toG6FkegVLfTPHAAKhMBoUJwaGJyZ30xQHJ39xQEp0AVLRqVp3p3YRgIqDHUb34TG0cU5xmF-wKz%2BAryrzmTmSkyuCIkcXWiVR4iaCVXkhMGUhMBMhMHMk8SVVdCezR2IQ6BOG1Gmg4H5H2BbzsEcGcBENiBsEyBIDAH6BgBsVoOnyVWklYKVQ4OshMG4PIxwPKFhAxyyBb2H0jQMMgL5wqTIOqWFwAX4IgExAEVTREBMCYLIDJC5TyDJC6FmmaEmAMD-zRB91sVILzxMCn0aFn1XxMAADJojbEABZRAUQOQ4UaAEIhpABV0SfJoSIkwIgNVfvelPwTASodITXOwuYKQMwxAPIXXBQqbGxCo3eYQgUIiJVSwvPcjO5EJGwsUAQxRaoowrwLQQLYLBACAHvbTEgDgEYMQOZDvYhKg7vKgypPvM5VXdFIYQwvIEgcYPnKgtzWI2xJYgAPkmOmOfiiH6VI0KPVWKNKMWAQJIAqJQCqK2MgLqN0AaKoPaNVCsPVW6Lp2CFo27hYzY1SgnlxEkBQ1XQY2%2BT4z-gAUixAQ6FC0YHCzUxQMB2By2zqyUwVx1BShM3U3Wy0zG0s223xKj303UyqzJN0xB2s2U1sy-0y0yCc3oBczc2BD81T1dz82GNGJ0XGLRPC2QOAWizKIgDiwy0OEBEyzkG92x1xwywIKIN5yNyQLK1ezpM2ys3SEa3VGa12P2zaxQA62Ox6z63EHO2G1G3GwqFuxIPuxMAWx4OW1e1JL1MpJMENONNa0mUO06xO0yDOyG0u3tJuyPWdNmwe0Wz0J1Pe2wi%2BxsR%2B20z%2BwWWxIpLxNPwt0QPOKh01Nhwj2fx00-3uRx2AIywJxqOgPRlgPgPxUQOCEKKkxp1VDpwZxJ1gLb14NwO03wMyBy0IO53FA1I6MRV7JtzF3tylzKBlymDl3kE9yVyVJCVVz9ybK11VB1xQH11XIrxN0fxLJ2BZNZxMGnLtwaAd3nKdwhFdx0Xd1RMVw4DXPmVsU3MLUDx3ODwPJ0yPLNSf1PMt2jwvKRJ83j3fyTy5D5KhFsTMQOC22zz8zoT0KL2wRMNHz1HSPIyYSX3r2r02G30BV7IWKMW73-LWLNUH0wvLy0GyJPzPwX3URgp3zyNvXUWqE3xTW3xX3YrmX33XIWTsTCOn1yPP2PMv2v3WWb3vy4skvN3QtvxgvLNRx-1HM2FwhQEAOVKrNwDAIgJqNsUZ3rLJ0eKbKQLbN5M7IwNMpZx6NK3ZzwOwTVNHOIOmwnN0OqUoNaJb2UPoLUNcKVTYM0K4PdL4JQAEOaJQCkOoOwXEKcEYFipkIQDkIUKULohUIYPUPYKVS0J0OwMcqMUGM8IwqeMDxKosL%2BM6MKpjyRMBGbgV3MUwCpTbkwCEIaA3SCJsXSNEoiNzKIBiLiJsUSLEBSIgDSInIvO0OyP6vWXyKoruJKLYDKKeNwmUFpRABhO6VqG8IgF8MdNeHZHiFaqwA6qCBAC6PIOt1sMivsIGPeJqKZBGOgDGImPexmKuNEHmLyWW1aOWN8oKPWIWU2MiHMN2KJFTNaMOOGtOPOM%2BuuLOVuKKOWtWq3JeLeLBpqM%2BJgG%2BNaN%2BIFxqrOUBJo2CDo0vg-nY0hP8kIDMFgw2G4xQCQ22ptSpW9QRMkBt2E1RNqwxJpKxJk2zNBzzOJJQK9PJMZKpLPNM2tPpKFqZJFtZMcxsWc3GO5I8yfP5MKQC1euFImN5oy2RMlMWGlJHgSzlI5EVKAPSwS1cp5zu1mxbL0PK2cqKVlu9JzL9L2x3TNItK60PV6361tIjOu0OvHNjNdMe0IoiE9JSA2wltxMMy9pNJ9sDPNKO39tDLjvDP8EjLDodqqDm0jvjKKsmMqyTM%2B0QFTP-LHVVyzMltzJUwhzG0iXROh1m2LKksmNUt0ptvxx1G2LrOZ0bMtUsup2svQJuEwJZwTNdrtrHILuqCsN6JvPfNzwaWXJfOVwP19xMKDz3JDwqQAvVSAsVvPPEVXv%2B2dzTzdw7I9y3rfI3L3p-IPr-LDwUuf2pN6J0Djzf0T3wuWH5IzzhCQpz0XLzzQuL3KpHzouqsnL0PwpIudvfwItArIvKAot72qWRpougeQDooYvEuYvwr4rXzNQfx4pQdIb31AtPpErV2UpTxhtsSLwYb-sqR7vEXUs0X-20uttAPAPoEgOMu7LMopydu8vHrQK7Ontqr7LLpcqHK53tpjMJvgesMkbFt8poMyoCsYKVRYJCryrCujqaI6tirEIcESuStkPkN0CUNcPUYcrZ2KseqGLKq3IqrcbyBwrkfEReJcIMa8NTX2r8KOsCJ3uCKmvCNyMGqOJGqSPGsmrgemqyL6tiaBrNXuJWvMsLQxsqpxoaLMZaNEIJqXqJuo2BLJrGmNBAAoVJlAGoWzhInLlVA1FTnNnNnjhkmtg9gdl9kDnGlPGkHJtYzaZInehkltnsjzzoGGd5FvkBhphLn4GADvi7iAA)
* [SudokuPad](https://sudokupad.app/rhqmqlaj41)

### Experiment 3 (dynamic fog of war)
* [SudokuMaker](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQCsJADCADQgAOArgF7MA2KBoOcMnhtEHEYIAFtAIgAwqKiZ0AFQj1R6ANaZBAYwgw%2BOBJMBEBAAIActHhsTAZUYATCGsYmojDuhNx69NgE8SAB0cUwBBE3tMAHNMBBNMHC8IzF5cewiUBDQYBJRPcQB3E3gcPxMtFDY2TwSTMRQTAGYAD0avKBQ4E3RGKCgIRhxInCi60URyyutxgDcG%2BpN6ODkEMoh6qDG4RIXImLja3ZSYNKCQk3C92PjErq1MKC0ODKzYXPyIIpKyiqqandEDRabWWnW6vX6g2Go226QSTwcCVGYgmv2mcDmYwa6F4DSWKzKcE8R32Nyx5QeTxQZzCVWSqSGnlhFMeHnaDRicxwNJMABForEmWxcDDXCh0mxcl42K8eFkyfjYgFgqZ7H4eDktCZIKMIGATAVltopugCABtUAzOBsRj8RoAXxoluttoIACZHc6bfwAGyekBW70EMj%2BwOu-AAdlDLv4RGjQfwABZ4%2BGABwp-gATgzBDjToDMeDOaTxfT%2BbDduL2fLhfwHprCajDfDfvznJQeHwCDcKDoFYITa9aarxdbQ-49fHBGTzcrs9zxZD8-w1anJeXS7XebXY4LjdLxYdy8ne%2BHy%2B3p7na5na83l-dI%2BXu-7kdHxcH97rj7XZbXR63i7Fjen7AS%2Bq6fh%2BL7-p%2BF4vneL7PrWJ4vr%2Bn7IbWiEJrBtaQbWoG1qhcHfp%2B0FEcupEEcW6EJuBCH%2Bu2nbdrafY4UBxZxgAunQOg4Og3ZwAkCCmvgFogKs9D8JQ-ribGdAdDEuDCWalA0CpKlEDQGkaW6NA6TpamqZpRnabppkGepxmmXpNCNDZdmJjQDkOWQNAuS5tkeY5XnOa5vmebZTleW5vk%2BjQoWhRGNCRZFqY0LFsXhWFUXJTFcVpYlEUpWl8Ucf6Gr8CA9ysnkggye6lCUDpDDLLwSmgGVhBTJg9DoJwcnNAQlAkA5IBQH4nXdXQ2xRBwnV0GAmBVJIADEYBzfNFWCHx-RqAV00VRt1B0MtTgoAA6pg9hiANlX2lxIDoH4MAAEYQNU5pmom5COeQXFmo0z1PWQb1fTZr00I9z0Rv9Zpus9FDfQDYMuT6IPQ39kNmqm4Mg8jLnA4jXUwyDpAubjb1Y6pIMQ2FqPPR9iO43Fr25fm%2BWSJEDL2KadANW6FVVfitXmvVfgSZIHRaAgw2jXQBSHcd%2BBdaFICAtEoiGFLJAyyL-CJi5F3drtB1HaIJ1VTtq0zZti3jZNbAzfNC3UGd21Xbd90iWaJMQ29FOk4j8NfW9sPoyDGOuWTfuI77HtvVTaM%2B890NvQHFNvSTMcA2j1PfbTvP80mlAy5KOAlU7FlEOpma6ZFjShYmoVkM5MO2RGtk%2Bs5Fdl7FbqtyXbpabZbrdw5RB45lsVEJFbqhY07lOQFzm2WQOk%2BjpEYaRGJc%2BiXEbReFkVkCvKlkCpiYaY0OmNIfKmNCXib7yXZARhx51RJCLXmo0l9hambrnXxfijfgoA6MKUBLZgB9CAn010tpiVEJgLQag87oGEl1B0-pIg4muhwewBAmK9jEnzWMG06D2BQBNHAsRsCdm4LiSQRUqRMiGPSE4jJBAJCYIrUSh1JAPwGE-OgbA4DXUqJIAA4o-Fm1UoDc1-jgzOvU4AFBAPaW2IBrpwBgR2DBkiGqFQgIQ7Q2iCoAHp9HlFwBNKIvQGh5yiIgTAmIeLLQEgYYIVpNjizEAAfUsdYzEABeOoPYADcwQnHLBZDQkwvjmEiBIJwxgLVlIcUCTgZx9C0ieAiTgFh0SRFmiIAk4JmxrTWF8WaPJOBgiGMWB0fEDRICbE8QgGxDQ7H8UEvgEwKA5h9TEEieIng86xEBJsahzwcDQBSUMYItSTAAApkmYHCSYSg-j4gmAADwmFTEQZZmAADUOyACUwQTAmGANKNgJAmDoFENMgA5GYG5%2Bzln2iCTgCp3hfA-EpB4SZYzZkhLRCYPUoSPAkDROgQ5iQTlnLNGiDiCyblSBuU8l5byfD%2BHGczGZYzbpiAhVMv5QypiAv1IzBhzNQUmghcAI58R9TTMKTCqYcLvEspMAih5NLjkMthfCgAQkimllRWqcuhTy3xNzeQCpwM8spryjHvPRc08RgljEwHoLgDsQkfmbAJSs3xSyVnrM2dsvZVKaXoFcVoUQMyGWYA4hC451LIXHK0ESBo7L8AiuOUwVgHASBwHsPYKQikWkGGDWqjVBhpleuOSYPORQpBfJQOG9Veco03OGSgAAAjckwOyTCAjYBJDAJANRImiZkKQUwzC4mmZgfZNATBmjtQ62NxzHkxuuh0OAahElttda1NlkrPXOtjT69g1IA1BpDcqsNuhU2aujaOtt8a%2BTHDSCmyNCBbmkrSDmvNBbKjFvQKW3g5aoiVurbW%2Btjbm32pjR25dJgu2dF7SKgd7r%2BUjrbd6lgE7-WBuDbxUNCBN1pu3TG45q7E3FTA4ujNSb935sLce09OQRgVtA1evgdaG1NpbQ%2BvtP7x1%2BqnUB%2Bxgk4NRsg3GlARR%2BRMyo9um5u6hhIcPUWtAJ6y0YYvVhqoNacM3vw-ep9j6f3Pu7W%2B0dH62X3O-T%2BzAdLXGiA8SgKxDSfGsqwa2iTJHJ2AZnQ40D86t1Lokyuuj5gUADLQDBqkFgoAMbJUx25-SNjsZQ1xtD57L0CevXhu9umf3iZ-S%2BntRGZUyvkdxUz4G6pSIKjoHRdB6aEHsxwJjuidGEAqTxUx5ibgIiwLgYIzTuiVDAG4%2BENpCHpF8VgxJ5XGZRDcQGgAVtVnACI6sLMa2VkNgKoDuI611nr4o%2BsBJRUYvjMzYl1AgPsporRJh-HaAMOhAKVE6CgNCBbRWbQlcSPl6IXg6HqqwA03AZIFgP0OpMwYQsyEmD4wASSSXdOYQaTTTLRGayFySIAdYWdAEb9hOs1YcBNgA-E2kg8OvMlovboTIfVMMAHlhviCiLgQpfhQjg5UZqqtfxftTH2XCtpJSiPJPsMD3xLW2vg7G7VmHcOEdHu88jvg3YAh8YYzjngVR8eE4qGGn7f3KdNtKcc5J9PAUddBbgV1266fg9C0pmZrU2BVch717TPYluK8udcv7RGOgIF6LccHiSZXlKMYGQ61jSs4DAI9q7iRHd06yHW4D2wKiNv0-9l1g3TlgpMPaBZCQ%2BL%2B5QIkmlcvwcLLex9tgX2SfVDJ38eJj6aV5dwA0nAtpAU4HRZrtE8TenanNuKGlmvpkAEJ9OYYz%2BgUIHQABiNf7BZ%2BqPs4LFurd%2BNtPHyF%2BeDAJGL7gMv%2Boeh9A23t8PoJq9VFr5C%2BvTe-1%2Br4639vKAu%2Br57x1-vIrB9QB2FN2Vxz8%2BDDiNo5m%2BiOkdiZJCOh9K6E1ZIEtivlAOIJ5CTMAss3nxkgDGL3ugDnjTiEk-rxAsksv-psPfmkosqPscvisklqECsfjSk6m2vXtMsAZkKAd6L9ktgAKQmBuhLYsr6rBbHIwGeA7K%2BJbIipCooAxpIF5rMGRYvLHL4GAEUFUHhKsqUAD6ZBD6AE0HtJcjoBEZsGn7iHn4mCSGspIG27TbdCfZoDdBZD0APbdYe4ABUJgsS3uDQvuMe3WvYiwW%2BKAwexiwGUK4eke6SlhFQRGCBXgSeviKeMwWh32pOYKkBNKNKzWAoQkCyOSjaOkTQjaDkJgLkJgoUJgkUGyjamYMuyhISHQJwVoaCKA-I%2BwyBdgjgzghRsQNgmQJAYA-QMA0yURlBjatkSRjaqRsUJgGRoWnhrqQwTuWQyBhBoGsIfReQ4BwRkKeeRiOREAmIhSz6IgJg8RZAZIma-wSQt0zQkwBg2haIdedKYxv%2BJgFBjQ1BzBJgAAZOcTMgALKICiDVHCjQAHFwpGKZjkFNCnEmBECtq4Gxp%2BCYCVDpDN7TFzBSDDFmHoAd61EZ7TIgl8IcDlFCSNpBG-6hYyrHKTFii5FNLgmIB5BeBaA7Z7YIAQBeHtYkAcAjBiA0roEhJXB34krhHgo4Eir149GRAQkkDjDoDTL0lLaXEzL0kmAAB8ZJFJHYUQuKwWvxba-xgJNhvq1IIJyauJWQUJugMJ9JyJJo4xba6JEewQ0W0kuCVCeiggaWIAzmG6cWmq2WBiRiJ2ZiHQB2jAR2A2jh2uuu3WrO9W2o1orUTWg2jOo2euE2DWl%2B5WoOqmIZ3pUOvp-WsqFSs20y82JJS2wIq21Q62UImZBJRJPSJJLpR2DhpiZ2QJEAl2z2hwgIL2cg9g%2BhT212vh-hreve9hgO8uUZTOEOsZvWsOZo8OXJnOSOKAKOvOGOWOEAgueOBO7WRO4ugR5OUu1Onhau7WCywZzOoZ6Q-Zg5iOJ63OqOfOmQAuuOwus585-GmekuJgVOmRie65viQO4OSu3WiAvJx%2BRG9enpLOcZwhw%2BdhYpJubZ5uih1u7W6hsqbuBhz2XueJFhwsVhgeth9h5WYeJoEeUefuVhqBWRBS3hL2mQ72fhae4orZKJ9quF4%2BheU%2BpeZQ5eUwle8gK%2B6CexMym%2BipLeJoe%2BB%2B6C4BJ%2Bo6Z%2BF%2BI%2BvBJg1Fk%2BDQ0%2B9Fs%2BEIC%2BPSS%2BzpE0h%2BbFjegxu%2Bne3e9K6uYhluShCZmJOgt%2BgKga6Aj%2BMh2Zb%2BoyBw3pX%2BmZ8SnhkhCp-6IBYBFFoWySDBcBUBiBJlXloltJQyxKZJPxrJ%2BxgxxBtopBRxlBnxohManlTBXxRG9B1Q7BT6nBiVLBkKdu6%2B%2BxAhMV-5cVglYFyh-5ahgqqVChulnu-5DBkF9umhpFmwfEKAehru7uZCxhpheJMy0eiFAeTlHAqFoemZngLhNwbhceIRAOIS8uzZpFAR15OpqJHhkKYRRRkRGkjRsRixjaiRyRbR6R952RKAuR8JBRTJCyJRTgjAiJlRCA1RtR9RW1MRzRB1ja7RnRq1su-yqp%2BJvialf1PJbl31YlDpgIMC2oYymAEa8CmA%2BRGKKlzx0VJx-5RAFxVx0ytxYgDxEATxFFYlHR7xqNrK3xLJo6cpbAQJthJAfEyg0alp66jIZIXQGxWxrw7I8QsNWA%2BRQQIAaJ011%2BUxp1MxOJvREJeZ0AxJpJiulJkpogNJvytO4RQV9JzJkKMptKMy7JIxJ63JvJ4R-JmNQpopstEpUpIqmtxylN1NnFypYJ4teJ6pMAmp4R2p2eK1Iq%2BpUWwQMWGcSWZpqWlChAZgNmGwGWKAjmVpQwWWsWOWIA4%2BBWzpkObp3Wg2P525k2Iladjhm5PZ428ZEZg2XZMZBdWdU1iZM2mQc29AC26ZK2ClC%2BuZ22UtBZpJKdz2jpZZiwFZpC121ZHIdZDZHuhFCAxFLZEu5OwQvxHZBFJdW5vZbOA5HOnGI5Y5aOfGmOYgU5Z5-gF5YuV5wNS5t50u3lEQ8uedv5fZ7OQ5q9B5o5POG9J5KQ0555ouxOk9VQFOJ9K5M1%2BFj5CuL5PEKuH56uX5dKGdi99W4ZtoRuL5wFZuNKQlZJ9V7VMF12cFPufVseyFipw1jh6Fa2412DOFolD5yeRFqe6en91Q4xmJUlWtP%2BcKzFSlrFuV7Fal3FGlh%2B-FOlQ%2B%2BlY%2BRiDDmuc%2Br%2Bi%2BGFy%2BrDa%2BfBdKHFzlfm1QPFmlx%2BfDell%2BBlG2d%2BJlZlz%2BFl6Q7%2BcINl3%2BjFv%2BDlQBNNLlJBINnhnl%2BqZ9nBdj-lSt-yQV2BGtoVMyBBFjRBrl7xQhIhdB0hujmVyV7SlV6VvlITNKOVxyyDsyJgDeviDBRtMygBiTxlzMj6OVFS6AWhzVuhw9nVJh9AZhvV2FA1Qe09oRI1zhWFk1oN5DPhlDJF1Di5HtlFgtDhfEyQG1xSL1TRcRe1ja71aRHRx1mwcJ%2BRiJxRDgN1d1VRNRug9RSxHTExf95QQN5jnFO%2BQNzxXRgjWJotu1CRLNz6EAmxB9OxUwSNBNxxnx6NApWNdxuN%2BNy1LxRNKN9zIVFNAJVNg1SpItoJQNztMJkzCJTJ7ttDnt2VhpvtZ0joIAkSisoAMST8Ikf8Jo5o50L40gfthUmLIk2LtYlp8itMms38-AwACi%2BYDUl8FU3EBLZoi86ciW04FUGkYkcgUQF6GAPM%2BLfw5ozLPCfCAihAoQeLYKgrjQ50vC-CFshAvKErjLPot8wrcrkgUgSrArIkl8MrIr8rJL-okrIk58NkGke8rkW8GRarorIAAAolq47M7M3DZO3I5BfLkjawax3o60pBGB-F60Ir6%2BaG6A5C-Hq%2Bq4QAABLBs6tuSJgRu2uvaxvxKBuEAABSKbAUmk3cHkkMIAsrtrAA0im7PK5NK2myAAADKkt0BEJgAoBCwJaFsGvisMvatMupgsstuSBtv8tOv1zdv6uSCKvttOs3yuSxTbxhQbxDuRu4tjtKQnw2QXy-7%2Bg9uEC8jGgdt7xzu2tbuLvmg%2Bhrv5gbv2vbtOtuglyNCxSJhbw%2Bh7vesXtLsnugBns%2BuHsms6QHyPuSAfv9tKSJi3sZHrvDuED-vGtmiry-uECCLPvmhEBdugfztwefugy9wwcgCocAchu5LIe2sxtofVyuTfT4cGvJtoc%2BgNwOQ%2BjowLwJtkeSAUc4ciQgJRSkentgcgDMeQc%2BixTryYc8fKsaTzxRQqTLyCfwciRuhlwVwcdvtcdCcduFyvsFtceZtodtw2SRSVyYcacsfvRhvydqfzsltocgecemdSegyaRaQdyqdntmcGfZt4w6REC2REAORugfyMeEBOeQdltkDSu%2BfVvWeNABTftTyuR4eWe2s1uUfJRDwDyaQjwuSjyYfxcGephru5S5T2hAA)
* [SudokuPad](https://sudokupad.app/4nd1rcv0z7)
