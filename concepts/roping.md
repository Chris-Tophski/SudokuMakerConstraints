# Roping

Roping is the effect, where

* the same 3 digits in a row or column
* within one box
* and within a row or column in another box in a row or column of boxes

lead to

* the same 3 digits in the leftover row or column in the leftover box
* and all that also being valid for all of the other rows or columns withing that triple of boxes.

## Anti-Roping constraint

This constraint mandates no roping anywhere in the puzzle. The following script enforces this as a custom constraint:

```` javascript
const w = puzzle.spec.size.width;
const h = puzzle.spec.size.height;

function is_same_set(fix, candidate)
{
  return true
    && candidate[0] in fix
    && candidate[1] in fix
    && candidate[2] in fix
    ;
}

for (var i = 0; i < 3; i++)
{
  for (var j = 0; j < 3; j++)
  {
    var h_block_offset = i * 3 * w;
    var h_rope_fix = [ h_block_offset + j * w, h_block_offset + j * w + 1, h_block_offset + j * w + 2 ];

    var v_block_offset = i * 3;
    var v_rope_fix = [ v_block_offset + j, v_block_offset + j + 1 * w, v_block_offset + j + 2 * w ]
    
    var h_rope_candidate1 = [];
    var h_rope_candidate2 = [];
    
    var v_rope_candidate1 = [];
    var v_rope_candidate2 = [];

    if (j == 0)
    {
      h_rope_candidate1 = [ h_rope_fix[0] + 3 + 1 * w, h_rope_fix[1] + 3 + 1 * w, h_rope_fix[2] + 3 + 1 * w ];
      h_rope_candidate2 = [ h_rope_fix[0] + 3 + 2 * w, h_rope_fix[1] + 3 + 2 * w, h_rope_fix[2] + 3 + 2 * w ];
      
      v_rope_candidate1 = [ v_rope_fix[0] + 3 * w + 1, v_rope_fix[1] + 3 * w + 1, v_rope_fix[2] + 3 * w + 1 ];
      v_rope_candidate2 = [ v_rope_fix[0] + 3 * w + 2, v_rope_fix[1] + 3 * w + 2, v_rope_fix[2] + 3 * w + 2 ];
    }
    else if (j == 1)
    {
      h_rope_candidate1 = [ h_rope_fix[0] + 3 - 1 * w, h_rope_fix[1] + 3 - 1 * w, h_rope_fix[2] + 3 - 1 * w ];
      h_rope_candidate2 = [ h_rope_fix[0] + 3 + 1 * w, h_rope_fix[1] + 3 + 1 * w, h_rope_fix[2] + 3 + 1 * w ];
      
      v_rope_candidate1 = [ v_rope_fix[0] + 3 * w - 1, v_rope_fix[1] + 3 * w - 1, v_rope_fix[2] + 3 * w - 1 ];
      v_rope_candidate2 = [ v_rope_fix[0] + 3 * w + 1, v_rope_fix[1] + 3 * w + 1, v_rope_fix[2] + 3 * w + 1 ];
    }
    else if (j == 2)
    {
      h_rope_candidate1 = [ h_rope_fix[0] + 3 - 2 * w, h_rope_fix[1] + 3 - 2 * w, h_rope_fix[2] + 3 - 2 * w ];
      h_rope_candidate2 = [ h_rope_fix[0] + 3 - 1 * w, h_rope_fix[1] + 3 - 1 * w, h_rope_fix[2] + 3 - 1 * w ];
      
      v_rope_candidate1 = [ v_rope_fix[0] + 3 * w - 2, v_rope_fix[1] + 3 * w - 2, v_rope_fix[2] + 3 * w - 2 ];
      v_rope_candidate2 = [ v_rope_fix[0] + 3 * w - 1, v_rope_fix[1] + 3 * w - 1, v_rope_fix[2] + 3 * w - 1 ];
    }

    console.log([i, j]);
    
    console.log(h_rope_fix);
    console.log(h_rope_candidate1);
    console.log(h_rope_candidate2);
    
    console.log(v_rope_fix);
    console.log(v_rope_candidate1);
    console.log(v_rope_candidate2);
    
    puzzle.addConstraintComponent(new DifferentCombinationsComponent('NR-H1@' + i + ':' + j, [ h_rope_fix, h_rope_candidate1 ]));
    puzzle.addConstraintComponent(new DifferentCombinationsComponent('NR-H2@' + i + ':' + j, [ h_rope_fix, h_rope_candidate2 ]));
    
    puzzle.addConstraintComponent(new DifferentCombinationsComponent('NR-V1@' + i + ':' + j, [ v_rope_fix, v_rope_candidate1 ]));
    puzzle.addConstraintComponent(new DifferentCombinationsComponent('NR-V2@' + i + ':' + j, [ v_rope_fix, v_rope_candidate2 ]));
  }
}
````
