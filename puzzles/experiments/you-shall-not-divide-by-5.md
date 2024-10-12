# You shall not divide by 5

## Grid setup

* standard 9x9 Sudoku
* regular regions
* digits `1` to `9`

## Fundamental Constraints

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
#### Additional Constraints

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
#### Additional Constraints

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

function deltaToCellIdWrapped(cell_id, delta)
{
  const cellCoords = helpers.cellIds.getCoordsFromId(cell_id);
  const result = [
    (cellCoords.x + delta[0]).mod(pwidth),
    (cellCoords.y + delta[1]).mod(pwidth)
  ]
  return result[1] * pwidth + result[0];
}

for (const i of rows)
{
  for (const j of cols)
  {
    const currCellId = i * pwidth + j;
    //console.log(currCellId);
    var affectedCells = [
      [ -1, -2 ],
      [  1, -2 ],
      [ -2, -1 ],
      [ -2,  1 ],
      [  2, -1 ],
      [  2,  1 ],
      [ -1,  2 ],
      [  1,  2 ]
    ];
    //console.log(affectedCells);
    for (const ac of affectedCells)
    {
      const acId = deltaToCellIdWrapped(currCellId, ac);
      const acCoords = helpers.cellIds.getCoordsFromId(acId);
      //console.log(acCoords);
      const acc = acCoords.x;
      const acr = acCoords.y;
      const name = 'Wrapped Antiknight R' + (i + 1) + 'C' + (j + 1) + ', R' + (acCoords.y + 1) + 'C' + (acCoords.x + 1);
      //console.log(name);
      puzzle.addConstraintComponent(new DifferentDigitsComponent(name, [ currCellId, acId ]));
    }
  }
}
````

#### Solution

    152 634 897
    897 152 634
    634 897 152
    263 489 715
    489 715 263
    715 263 489
    971 526 348
    348 971 526
    526 348 971

### Variant 2a
#### Additional Constraints

* Given digits:
````
... .3. ...
... 1.. ...
... ... .5.
..3 ... ...
... ..5 2..
.1. ... 4..
... .2. ...
... ... ...
... .4. ...
````


### Variant 2b
#### Additional Constraints

* Killer cages
  * `sum(R1C1:R3C1) = 15`
  * `sum(R1C2, R1C3, R2C2) = 16`
  * `sum(R1C4:R1C6) = 13`
  * `sum(R1C7:R1C9) = 24`
  * `sum(R2C3, R2C4, R3C3) = 12`
  * `sum(R2C5:R2C7) = 13`
  * `sum(R2C8:R4C8) = 9`
  * `sum(R2C9:R4C9) = 11`
  * `sum(R3C2:R5C2) = 17`
  * `sum(R3C4:R3C6) = 24`
  * `sum(R3C7:R5C7) = 10`
  * `sum(R4C1:R6C1) = 13`
  * `sum(R4C3:R6C3) = 17`
  * `sum(R5C8:R7C8) = 18`
  * `sum(R5C9:R7C9) = 20`
  * `sum(R6C2:R8C2) = 12`
  * `sum(R6C7, R7C6, R7C7) = 13`
  * `sum(R7C1:R9C1) = 17`
  * `sum(R7C3:R7C5) = 8`
  * `sum(R8C3:R8C5) = 24`
  * `sum(R8C6:R8C8) = 8`
  * `sum(R8C9, R9C8, R9C9) = 14`
  * `sum(R9C2:R9C4) = 11`
  * `sum(R9C5:R9C7) = 21`

### Variant 2c
#### Additional Constraints

* Given digits:
````
.5. 6.4 .9.
8.. ... ..4
... ... ...
2.. ... ..5
... ... ...
7.. ... ..9
... ... ...
3.. ... ..6
.2. 3.8 .7.
````

### Variant 2d
#### Additional Constraints

* Quadruples
  * after `R1C2`: `257`
  * after `R1C7`: `689`
  * after `R2C1`: `368`
  * after `R2C8`: `245`
  * after `R7C1`: `379`
  * after `R7C8`: `468`
  * after `R8C2`: `268`
  * after `R8C7`: `579`

### Variant 2e
#### Additional Constraints

* Quadruples
  * after `R2C3`: `1478`
  * after `R2C6`: `1267`
  * after `R3C2`: `346`
  * after `R3C7`: `157`
  * after `R6C2`: `157`
  * after `R6C7`: `348`
  * after `R7C3`: `1589`
  * after `R7C6`: `1356`

### Variant 2f
#### Additional Constraints

* Quadruples
  * after `R1C2`: `257`
  * after `R1C7`: `689`
  * after `R2C1`: `368`
  * after `R2C4`: `18`
  * after `R2C5`: `27`
  * after `R2C8`: `245`
  * after `R4C2`: `36`
  * after `R4C7`: `17`
  * after `R5C2`: `15`
  * after `R5C7`: `48`
  * after `R7C1`: `379`
  * after `R7C4`: `59`
  * after `R7C5`: `16`
  * after `R7C8`: `468`
  * after `R8C2`: `268`
  * after `R8C7`: `579`

### Variant 2g
#### Additional Constraints

* Quadruples
  * after `R1C4`: `1356`
  * after `R1C5`: `2345`
  * after `R4C1`: `2468`
  * after `R4C8`: `1356`
  * after `R5C1`: `1478`
  * after `R5C8`: `3689`
  * after `R8C4`: `3479`
  * after `R8C5`: `1478`

### Variant 2h
#### Additional Constraints

* Cages mod 7: Cells in cages sum to a value whose remainder (when divided by 7) is given in brackets in the top left corner of the cage.
  * `sum(R1C1:R2C2) mod 7 = 2`
  * `sum(R1C3:R2C3) mod 7 = 2`
  * `sum(R1C7:R2C7) mod 7 = 0`
  * `sum(R1C8:R2C9) mod 7 = 2`
  * `sum(R3C1:R3C2) mod 7 = 2`
  * `sum(R3C3:R3C4) mod 7 = 5`
  * `sum(R3C5:R3C6) mod 7 = 2`
  * `sum(R3C7:R4C7) mod 7 = 1`
  * `sum(R3C8:R3C9) mod 7 = 0`
  * `sum(R4C3:R5C3) mod 7 = 5`
  * `sum(R5C7:R6C7) mod 7 = 6`
  * `sum(R6C3:R7C3) mod 7 = 6`
  * `sum(R7C1:R7C2) mod 7 = 2`
  * `sum(R7C6:R7C7) mod 7 = 2`
  * `sum(R7C8:R7C9) mod 7 = 5`
  * `sum(R8C1:R9C2) mod 7 = 0`
  * `sum(R8C3:R9C3) mod 7 = 0`
  * `sum(R8C7:R9C7) mod 7 = 0`
  * `sum(R8C8:R9C9) mod 7 = 2`

### Variant 2i
#### Additional Constraints

* Cages mod 7 (`?` means no given total mod 7):
  * `sum(R1C1:R6C1, R1C2:R3C2) mod 7 = ?`
  * `sum(R1C3:R2C3) mod 7 = 2`
  * `sum(R1C4:R1C9, R2C4:R2C6) mod 7 = ?`
  * `sum(R2C7:R2C8) mod 7 = 2`
  * `sum(R2C9:R3C9) mod 7 = 6`
  * `sum(R3C3:R3C4) mod 7 = 5`
  * `sum(R3C5:R3C6) mod 7 = 2`
  * `sum(R3C7:R3C8) mod 7 = 6`
  * `sum(R4C9:R9C9, R7C8:R9C8) mod 7 = ?`
  * `sum(R7C1:R8C1) mod 7 = 5`
  * `sum(R7C2:R7C3) mod 7 = 1`
  * `sum(R7C4:R7C5) mod 7 = 0`
  * `sum(R7C6:R7C7) mod 7 = 2`
  * `sum(R8C2:R8C3) mod 7 = 5`
  * `sum(R8C4:R8C6, R9C1:R9C6) mod 7 = ?`
  * `sum(R8C7:R9C7) mod 7 = 0`

### Variant 2j
#### Additional Constraints

* X-Sums
  * top
    * `C1=1`
    * `C3=9`
    * `C7=36`
    * `C8=45`
  * left
    * `R2=41`
    * `R4=8`
    * `R7=45`
  * right
    * `R3=7`
    * `R6=45`
    * `R7=36`
  * bottom
    * `C2=6`
    * `C6=41`
    * `C7=45`
    * `C9=1`


### Variant 2k
#### Additional Constraints

* Quadruples
  * after `R3C4`: `489`
  * after `R3C5`: `789`
  * after `R4C3`: `3479`
  * after `R4C6`: `2579`
  * after `R5C3`: `2579`
  * after `R5C6`: `2345`
  * after `R6C4`: `256`
  * after `R6C5`: `236`

### Variant 2l
#### Additional Constraints

* Quadruples
  * after `R1C1`: `1589`
  * after `R1C8`: `3479`
  * after `R3C3`: `348`
  * after `R3C4`: `489`
  * after `R3C5`: `789`
  * after `R3C6`: `179`
  * after `R6C3`: `125`
  * after `R6C4`: `256`
  * after `R6C5`: `236`
  * after `R6C6`: `346`
  * after `R8C1`: `2345`
  * after `R8C8`: `1267`

### Variant 3
#### Additional Constraints

(TODO)

#### Solution

    475 986 213
    318 452 976
    926 317 458
    842 631 795
    597 248 631
    631 795 842
    263 179 584
    189 524 367
    754 863 129

### Variant 4
#### Additional Constraints

(TODO)

#### Solution

    263 481 795
    581 297 634
    497 536 812
    936 158 427
    748 629 351
    125 743 986
    312 974 568
    854 362 179
    679 815 243

