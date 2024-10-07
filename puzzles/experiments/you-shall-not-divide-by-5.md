# You shall not divide by 5

## Grid setup

* standard 9x9 Sudoku
* regular regions
* digits `1` to `9`

## Constraints

* Custom constraint "Orthogonally Adjacent not 0 mod 5 with wraparound"

```` javascript
var neg_sums = [5, 10, 15];

for (var i = 0; i < puzzle.spec.size.width; i++)
{
  for (var j = 0; j < puzzle.spec.size.height; j++)
  {
    var current = i * 9 + j;
    var oa_cells = puzzle.getOrthogonallyAdjacentToCoords(j, i);
    for (var oac of oa_cells)
    {
      puzzle.addConstraintComponent(new NegativeSumComponent('nsr' + j + 'c' + i, neg_sums, [current, oac]));
    }
  }
}

puzzle.addConstraintComponent(new NegativeSumComponent('nswa_top', neg_sums, [0, 8]));
puzzle.addConstraintComponent(new NegativeSumComponent('nswa_left', neg_sums, [0, 8*9]));
puzzle.addConstraintComponent(new NegativeSumComponent('nswa_right', neg_sums, [8, 8*9+8]));
puzzle.addConstraintComponent(new NegativeSumComponent('nswa_bottom', neg_sums, [0*9, 8*9+8]));

for (var i = 0; i < puzzle.spec.size.width - 1; i++)
{
  puzzle.addConstraintComponent(new NegativeSumComponent('nswa_r'+i, neg_sums, [i*9, i*9+8]));
  puzzle.addConstraintComponent(new NegativeSumComponent('nswa_c'+i, neg_sums, [i, 8*9+i]));
}
````

## Variants
### Variant 1
#### Constraints

* Quadruples
  * after `R1C5`: `2369`
  * after `R3C3`: `1345`
  * after `R4C5`: `1345`
  * after `R4C8`: `4678`
  * after `R5C1`: `4567`
  * after `R5C4`: `3679`
  * after `R6C6`: `1279`
  * after `R8C4`: `2349`

#### Solution

    367 429 815
    815 763 429
    924 518 367
    293 184 576
    671 395 248
    548 672 931
    436 851 792
    752 936 184
    189 247 653

### Variant 2
#### Constraints

* Antiknight
* Custom constraint "Wrapped Antiknight"

```` javascript
Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};

const pwidth = puzzle.spec.size.width;
const pheight = puzzle.spec.size.height;

const rows = [ 0, 1, pwidth - 2, pwidth - 1 ];
const cols = [ 0, 1, pheight - 2, pheight - 1 ];

for (const i of rows)
{
  for (const j of cols)
  {
    const currCellId = i * pwidth + j;
    var affectedCells = [
      (currCellId - 2 * pwidth - 1).mod(pwidth),
      (currCellId - 2 * pwidth + 1).mod(pwidth),
      (currCellId - 1 * pwidth - 2).mod(pwidth),
      (currCellId + 1 * pwidth - 2).mod(pwidth),
      (currCellId - 1 * pwidth + 2).mod(pwidth),
      (currCellId + 1 * pwidth + 2).mod(pwidth),
      (currCellId + 2 * pwidth - 1).mod(pwidth),
      (currCellId + 2 * pwidth + 1).mod(pwidth)
    ];
    for (const ac of affectedCells)
    {
      const { acc, acr } = helpers.cellIds.getCoordsFromId(ac)
      const name = 'Wrapped Antiknight R' + i + 'C' + j + ', R' + acr + 'C' + acc;
      puzzle.addConstraintComponent(new DifferentDigitsComponent(name, [ currCellId, ac ]));
    }
  }
}
````
