/*
This snippet demonstrates applying a constraint component to 90° symmetrical cells
*/

Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};

var w = puzzle.spec.size.width;
var h = puzzle.spec.size.height;

function invx(x)
{
  return (w - 1) - x;
}

function invy(y)
{
  return (h - 1) - y;
}

function idx(x, y)
{
  return y * w + x;
}

var hw = Math.ceil(w / 2);
var hh = Math.ceil(h / 2);

for (var i = 0; i < hw; i++)
{
  for (var j = 0; j < hh; j++)
  {
    if (i == (hw - 1) && j == (hh - 1))
      continue;
    
    var sym_cells = [
      idx(j, i),
      idx(invx(i), j),
      idx(invy(j), invx(i)),
      idx(i, invy(j))
    ];
    puzzle.addConstraintComponent(new XyzComponentTaking4Cells('sym90XYZ@r' + (i + 1) + 'c' + (j + 1), _SOMETHING_, sym_cells));  
  }
}
