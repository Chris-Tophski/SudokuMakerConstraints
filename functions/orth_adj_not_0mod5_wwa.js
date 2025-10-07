/*
* This script ensures the following constraint:
* "The sum of orthogonally adjacent cells (with wrap-around) is not divisible by 5."
*/

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
