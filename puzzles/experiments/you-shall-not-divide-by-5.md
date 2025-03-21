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
    var oa_cells = puzzle.getCellsOrthogonallyAdjacentToCoords(j, i);
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
* [SudokuMaker](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQCsJADCADQgAOArgF7MA2KBoOcMnhATQiMABOgAWcNmxE4ICEQBNMAN0yKUIgEYBPEWVog4jBOOgEQAYXFRM6ACoR649AGtMhgMYQYfHAgtAIgIRADloeBkAZUZFCFdRKEYOdBE4eno2HRIAHRxggBFMAHNMBBTMHBFoUwgi3ClM1MUAKzhPFH8RdukU2Nl5MUYYEQQIVJEVKUZNZTUsLQ5tPQpc4PtxTSLbRREAdyg0lLgoYRxFGkHPcRHJBW62csrTTVH6ERPd1KhNarM6nmkejgLTaHQUoxumnuj0h2nko2GH1SZy6KB6IgqsI4YDuEDYQyeY2eqPRmOJtiK4lx%2BJgOByeREAEdGMD0F40Q8CABtUCTfH8ADMAF8aLypvwAGwisX8ggAdmlID50wIABZFcr%2BAAmDXiggATl1svwAA4jSr8ERzfwyNaCGbRUq9Za7fhbY7NfLXVKPc7hb7jeqAxadcH%2BIawwbXaGZRag7Gba6rZHTa7-QmCD6M-gFSmY07jRHs%2BmCxbk9mHdn46XEync9mszXM67602XSmS578EW2%2B7s-mu9Wu5Xe66h86R13G13W12B86e13O87y23x8bl8bpxPXX226uZ67F8758bZ8693Oj2nvUnXZPneuy-fr3mxy3bynL36hQBdOjeDg6AIAcFRlNyoAIDo9D8JQipQTBBBEHQ3wlLgbL4FylA0Nh2HIfhNBaoRxG4ThNAEchRFUWRpEUcR1ECjQjGMaqNCsaxZA0JxnHMUxbH8RxXFCbxLECUJ3E0BKknSXKNCybJJo0IpilSapcnqQpSlaWpUnyepylKb%2Bio8HwFgAPJQDU-wNHoACCILtJ0cgKJQIgwBAOxkHspTXPsaTHKciiGAh-BEJQ4V0BoYAVKU2B4Pg3C8PwIAWVZ9SAiI9mtI5CjOSIrnuZ53mmHsBz0AFjBnIYFRMAEmH-iAWhtK4HRBQlIAhRY3gaF4HnJZMUCyCgRQAProEMKQALwiFynEiGFFxEGQv4ANy5LkkCDQAFANGIiNNlArXtAA8IhMKwHAkOgMGeCQyglAglinAgR2YAA1G9ACUuTALkIgiJtIg7ccIjNPt%2BVHWDp3newKBXTdd3FKUT2VS9oMfd9lQiL9WP-btniMFA3ydNNmAiAAVCI%2BoiG9oNrbjEwgxAcAjdC4Mw5dRQoI9HLoKlfzpZkWWgv4jhPdAijoFtzQXJgn30-9-2A8Dg3M54VRgFULPQpjivY39etnSwsMkMCihPUBIFwGBT0wPQuBgltOAoJ8ITDYgqgoNEMC2-bzv%2BFtADkQFQIHb3NG9geeGHmAXM7o3jTA6AXFyBNE2CFxq7%2Bn3ywb-1CgbBc4EXuQc3DZsW8BoH%2BL7DsB87rvuwgnve7X-sIEHQG7CzryB3Hw1jRNKfYSIJrZ7nOBl6bijm%2BhVs2z4fuOw3oRNy3Qxt47wfoN3I3YggfdDQnQ8zSPJrk-q4-01PFdz9Xj2L3XHcr27RQeyoXsb4-7edzvLMUlSQ%2B8dB5JxTopUeF83pjxztfY2l1b6W3vpveuLtV5v2bh-Vu38t5dxZloeEPggED0TsnGa599QXHIVAq%2B60cDK12mTaaRBXoiGhnAuG10UC3XusjZ6IgAC081XoYx%2BgbG%2BM9K7zxrtglBjd0Hrx9jIju29d6hzerHI%2BIDSFckwBfWWkDoET3%2BuI2eiDrbSLtk-J2qDX7v0-ooyxP8VHaxjv3Y%2BoCZoaKoZgGhxdcggBFCAbwjiwQYS5EZOgNUTBcECcBHQHAYnwWgoKSgjEgn8jCaAbwUBnZQAIAKNJPDwKYWQqJZaipsm5MzFJEARSwmUXUpfCp0Aqn4FVJxWpSNilckEopJpjpKloAIGQVinSHphMYrpGg-SsktKGW0xSYzShhNYlMsezScnzLIMhJZ3TBK6QibMzZeTLQdLqdyIikzpmHKCXMk5JpRnnMwpc-iTSGpxISe1LAOAigcAADIVH4GAKQ6AUBCj-OCoAA)
* [SudokuPad](https://sudokupad.app/poug0ax196)

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

* [SudokuMaker](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQCsJADCADQgAOArgF7MA2KBoOcMnhATQiMABOgAWcNmxE4ICEQBNMAN0yKUIgEYBPEWVog4jBOOgEQAYXFRM6ACoR649AGtMhgMYQYfHAgtAIgIRAGVGRQhXRgAdHGCAeShTCABzXCk2PThFACs4TxR-WXkRShEYCEV9WOCAQX9MAFpXHEwU8QUAd0xTEU6oOHo4KGEcRS8UaXQCAG1QFSlGfiIAXxp5xf4yNY22JYIAJh2QBb3%2BADZjlNVCggQoJbpT-fwAZmPn-gAWD82CAA5fmcCABOIEvADs4P4gPWJz%2B%2BDBcM%2BBChcOuKlu%2BHuj3hwPwq2RCO2RPxR1JL0uFP472pBB%2BdPwVN2L1pLO%2B0IBnMR3LR7IIhNAGKxOJQT2J3PJ-PwUrxlKuNzw2IeYrlNO5DOlsOlSOlfLVAu5JOlmoN%2BG1Zt1Zv1KIJCsxStF4vxxpAwsdKudL1ltuZZrZ1vtIs9ZsFZtdtp9CL9toD7ruIdtpttFttVrTvO5Ydtrvjytxke5MYRAaT3NTJY15e56YRNoR2YljKj%2BOLLslRe5ccVCYLCOTCIr%2BNr%2BPr%2BNWAF06N4cOh7nBMP5pvg5iAEDp6PxKMd15uBXQoChrrhlzNKDRz%2BeiDRr9eDjR7-fLxeb6%2B7w%2BP8%2Br2%2BP4%2BaK9-0Ar4aGA4CyBocDwIA6CQNgsCIIQmCANA2DIIQ84aAwjCIRoHCcP%2BGgCIIrDMNwsj8MIyiSOw8jKKIicdw3ZZKBYugNDARcemwJVuF4fgQH6QZNyqOAGhaNoOkMRcmACFcpxALR8lcQpxnwUBd347wNC8Sp%2BIAOUYGAtDQEh6BGBB5CYkgKiqABeEQwEYHBPAQbiRAAChwABKERgFiEQRGiEBGHQTQ51sFygoAbn8kRDwQRgoBwDz3NMOwRAAUlkHyAGpssy2QYpwFYitiGc5xEehukUXp7KYVgOBIdBN08JrMGYFASGq0wivKhRnBQCSFDqlh2E65qUFarAOpIcRBvaBBSuck8FBGTp0BEeyZlKGgRGvSruvEERGhEe8DvUXoTqIEQJ16laRG8NgNq2na9t2gahuO073rmz6rpupbHOc1zcCUSYEDgRxLEmNgAElFAAdQGehhPcgppAAfXUXaNDYCGvNiPzkoe%2B70bYSwIGgRRnpEOa2E3DASDJ%2BH0BIFIUAQCmqfQAAxEYYHhtGYaxxQvKKgK%2BrilB0EYPHNpEGZYoCoXpC5qBqZIAAPEQ8txiGzwnLzrMqdyqou8QvJoJWPLJtWNb0XXwbgGYiEN43FFNw6CeJidYvixLksPGW8ZdicRAAKnOmqjryoPZYQA2ipWWJYkgKAbfuzARAgMA4ogdbvaJgK04z2cFBybPc8e9BvYCouApJsuHsSqBoekeH5azyOzejnWRBycWG4AeiH8qIEathUjRlu27h0XB4ChZ07gMAwEmhAUEUWeacV4mG4V479saA4bqtveG%2B2t7jpPqdrYC7bj92xprtv8-7%2Bv3a9tPu%2BD%2B%2Bw-v7fr-M6X9X773fs-T%2BN8z5gN-vtU6N1ra3WtiPMeE8p4rzXi5Te28xbWxLmje6%2BRK4iAwevbBMMa7W3rvvSW%2BQO72T1pDCAs94ZIyEpvaeUBW4w3hrtfIuDAG0M8HbGmdMGas2ZhrdmnNKbq15vzQWdD54-xQSecenVJ4pHcvkERAiYFCM8PLHRsiNaawXg3IR6d7LGO5iQHQ5iJb3R4HweWAByNhKNN4iHqK5cSC0RAACVXF93clnPKRBcoiFcZYYJeV3IV3CZE1xu0gkhJsXIuxfcIl92ibEjy6TTFZL0WA1Rs51EkE0Z5PixT971TGiQbIW8VoDEXDImA9BcCFAQJ5FAnQRAABFMCrzQF0wZ1wEDoApu0zp-gql8F2ttTwM8eGKD4Z4DuhsakiGTsTHZKwQBrBAN4aZOAumngYnQaSJguCHLnDoDgNzGJ7gJAGDSAoWLnhAOxTiIMeIgGcfxaAyQ0g8GkFkXI%2BQunFAUGUGy%2Bg%2Bg9COoJIYIwnLjEuTgGSsx5KKU8MpMYXA1xMQsFpTg05dIWCXrII8GMZYwB3uBPa549pkCQTgVO0APJUqzvZSgUURBZwADyVVGo1CaU12qdUOvyzAOUcqF1ivgqlFdeX8orsKupYqWptRmr9Baaq5W118tbKlSyuFQvsl3EQII%2B4DxNcMbOcAMZkxppqzq0jt6JGBekMFtQIUFH8FDEx6B4m7UwFspVDqIBEJzo651FCjV1x-m6hpigmllxaf4KZHTTmzNOX0vSR5EA3DCDAbNMzumuNnFAPJCSomeDyZgXapyUi0sMugBZZrDz%2BF2tGzwmzzE7ICnslOmLRWdUaRTDNC4s0%2BBzV0npBai2uUxKW8tubK2zk6E6iy9BknUtbXSjtCtmX-AHbEFNk7mkzrafOvNvSRCFpSMW1dhl10LqregbdGMOBgAQPultbb6ULNPeHEE56x0NQnWmqd4Ub3vvvUu59K6UBrrnRW9yn7v22AWgBmlR6FkEREP8MDOUz1eQEZemD17WkIe6fmx9y6S1vvQxuzDW6nVaHkBZGAeHD3tpA2B3aJGQRkYgxy9O7luXyz5QKkQGrx1NW1dNKV5svpEBlYawmsUqPprg7R1jC6GNPpfahljJyP0cYxjWnKTaD1AePTMTAQmBWkfI8U3TsH5wGYs4hxjyHmNlsM7MrDTqG22ebfhgTCs7MidsxB-Zhzjl3omdiw5VzZLAFueuB5akVgrAYisIAA)
* [SudokuPad](https://sudokupad.app/cggklbau26)

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

#### Variant 3a
##### Additional Constraints

* Black/white Quadruple Dots (negative): "A white dot in a corner of 4 cells indicates exactly one pair of digits, whose sum is divisible by 5. A black dot indicates 2 pairs of such digits around the dot. All dots are given."
  * white dots:
    * after `R0C0`
    * after `R0C2`
    * after `R0C4`
    * after `R0C6`
    * after `R0C9`
    * after `R1C0`
    * after `R1C2`
    * after `R1C5`
    * after `R1C6`
    * after `R1C7`
    * after `R1C8`
    * after `R1C9`
    * after `R2C0`
    * after `R2C2`
    * after `R2C3`
    * after `R2C4`
    * after `R2C8`
    * after `R2C9`
    * after `R3C1`
    * after `R3C2`
    * after `R3C3`
    * after `R3C5`
    * after `R3C6`
    * after `R3C8`
    * after `R4C0`
    * after `R4C5`
    * after `R4C6`
    * after `R4C8`
    * after `R4C9`
    * after `R5C1`
    * after `R5C7`
    * after `R6C0`
    * after `R6C1`
    * after `R6C3`
    * after `R6C4`
    * after `R6C6`
    * after `R6C8`
    * after `R6C9`
    * after `R7C0`
    * after `R7C1`
    * after `R7C2`
    * after `R7C3`
    * after `R7C9`
    * after `R8C0`
    * after `R8C1`
    * after `R8C4`
    * after `R8C6`
    * after `R8C7`
    * after `R8C8`
    * after `R8C9`
    * after `R0C0`
    * after `R0C2`
    * after `R0C4`
    * after `R0C6`
    * after `R0C9`
  * black dots:
    * after `R0C8`
    * after `R1C1`
    * after `R2C1`
    * after `R4C4`
    * after `R4C7`
    * after `R5C2`
    * after `R5C8`
    * after `R7C8`
    * after `R8C5`
    * after `R9C8`

#### Variant 3b
##### Additional Constraints

* Quadruples:
  * after `R1C1`: `347`
  * after `R1C4`: `489`
  * after `R1C7`: `129`
  * after `R2C2`: `268`
  * after `R2C5`: `127`
  * after `R2C8`: `568`
  * after `R4C1`: `458`
  * after `R4C4`: `236`
  * after `R4C7`: `679`
  * after `R5C2`: `137`
  * after `R5C5`: `589`
  * after `R5C8`: `124`
  * after `R7C1`: `126`
  * after `R7C4`: `157`
  * after `R7C7`: `358`
  * after `R8C2`: `459`
  * after `R8C5`: `346`
  * after `R8C8`: `279`

#### Variant 3c
##### Additional Constraints

* Quadruples:
  * after `R1C2`: `578`
  * after `R1C5`: `268`
  * after `R1C8`: `136`
  * after `R2C1`: `239`
  * after `R2C4`: `134`
  * after `R2C7`: `459`
  * after `R4C2`: `247`
  * after `R4C5`: `138`
  * after `R4C8`: `159`
  * after `R5C1`: `356`
  * after `R5C4`: `279`
  * after `R5C7`: `468`
  * after `R7C2`: `369`
  * after `R7C5`: `479`
  * after `R7C8`: `478`
  * after `R8C1`: `157`
  * after `R8C4`: `568`
  * after `R8C7`: `123`

### Variant 4
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

#### Variant 4a
##### Additional Constraints

* Product cages: Digits in cells in a cage don't repeat and multiply to the value in the top left corner of the cage.
  * `prod(R2C2:R2C3) = 8`
  * `prod(R2C4:R2C5) = 18`
  * `prod(R2C6:R2C7) = 42`
  * `prod(R2C8:R3C8) = 3`
  * `prod(R3C2:R4C2) = 27`
  * `prod(R4C3:R4C4) = 6`
  * `prod(R4C8:R5C8) = 10`
  * `prod(R5C2:R6C2) = 8`
  * `prod(R5C6:R5C7) = 27`
  * `prod(R6C8:R7C8) = 48`
  * `prod(R6C2:R7C2) = 5`
  * `prod(R8C3:R8C4) = 12`
  * `prod(R8C5:R8C6) = 12`
  * `prod(R8C7:R8C8) = 7`

#### Variant 4b
##### Additional Constraints

* Product cages: Digits in cells in a cage multiply to the value in the top left corner of the cage.
  * `prod(R1C1:R2C1) = 10`
  * `prod(R1C2:R1C3) = 18`
  * `prod(R1C4:R1C5) = 32`
  * `prod(R1C6:R1C7) = 7`
  * `prod(R1C8:R1C9) = 45`
  * `prod(R2C9:R3C9) = 8`
  * `prod(R3C1:R4C1) = 36`
  * `prod(R4C9:R5C9) = 7`
  * `prod(R5C1:R6C1) = 7`
  * `prod(R6C9:R7C9) = 48`
  * `prod(R7C1:R8C1) = 24`
  * `prod(R8C9:R9C9) = 27`
  * `prod(R9C1:R9C2) = 42`
  * `prod(R9C3:R9C4) = 72`
  * `prod(R9C5:R9C6) = 5`
  * `prod(R9C7:R9C8) = 8`

#### Variant 4c
##### Additional Constraints

* Given digits:
````
... ... ...
... ... ...
... ... ...
..6 ... ...
... ... 3..
... ... ...
..2 ... ...
... ... ...
... ... ...
````

* Numbered rooms: Digits outside the grid must be placed `n` cells away in theat direction, where `n` is the digit placed in the first cell in that direction.
  * top:
    * `C2=2`
    * `C5=6`
  * left:
    * `R4=7`
    * `R5=3`
    * `R7=2`
    * `R9=5`
  * right:
    * `R4=6`
    * `R6=7`
    * `R7=1`
  * bottom:
    * `C1=9`
    * `C2=9`
    * `C3=3`
    * `C6=9`
    * `C9=8`

#### Variant 4d
##### Additional Constraints

* Given digits:
````
... ... ...
... ... ...
.9. ... ...
... 1.. ...
... ..9 ...
... ... .8.
..2 ... ...
... .6. ...
... ... ...
````

* Numbered rooms: Digits outside the grid must be placed `n` cells away in theat direction, where `n` is the digit placed in the first cell in that direction.
  * top:
    * `C1=5`
    * `C2=2`
    * `C3=7`
    * `C4=1`
    * `C5=6`
    * `C6=1`
    * `C7=5`
    * `C8=4`
    * `C9=1`
  * left:
    * `R1=6`
    * `R2=9`
    * `R3=5`
    * `R4=7`
    * `R5=3`
    * `R6=1`
    * `R7=2`
    * `R8=7`
    * `R9=5`
  * right:
    * `R1=8`
    * `R2=7`
    * `R3=1`
    * `R4=6`
    * `R5=1`
    * `R6=7`
    * `R7=1`
    * `R8=8`
    * `R9=2`
  * bottom:
    * `C1=9`
    * `C2=9`
    * `C3=3`
    * `C4=2`
    * `C5=1`
    * `C6=9`
    * `C7=1`
    * `C8=8`
    * `C9=8`

#### Variant 4e
##### Additional Constraints

* X-Sums
  * top:
    * `C1=7`
    * `C3=11`
    * `C5=44`
    * `C7=42`
  * left:
    * `R1=8`
    * `R5=39`
    * `R7=6`
    * `R8=36`
    * `R9=36`
  * right:
    * `R3=3`
    * `R4=33`
    * `R7=42`
    * `R9=9`
  * bottom:
    * `C4=41`
    * `C7=3`

#### Variant 4f
##### Additional Constraints

* X-Sums
  * top:
    * `C1=7`
    * `C3=11`
    * `C5=44`
    * `C6=1`
    * `C7=42`
    * `C8=45`
  * left:
    * `R1=8`
    * `R4=45`
    * `R5=39`
    * `R6=1`
    * `R7=6`
    * `R8=36`
    * `R9=36`
  * right:
    * `R3=3`
    * `R4=33`
    * `R5=1`
    * `R7=42`
    * `R8=45`
    * `R9=9`
  * bottom:
    * `C3=45`
    * `C4=41`
    * `C5=1`
    * `C7=3`
