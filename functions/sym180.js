/*
This snippet demonstrates applying a constraint component to 180° symmetrical cells
*/

Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};

var w = puzzle.spec.size.width;
var h = puzzle.spec.size.height;
var last_index = Math.floor(w * h / 2);

for (var i = 0; i < last_index; i++)
{
  var x = i.mod(w);
  var y = Math.floor(i / h);
  var sym_cells = [
    i,
    ((h - 1) - y) * w + ((w - 1) - x)
  ];
  puzzle.addConstraintComponent(new XyzComponentTaking2Cells('sym180XYZ@r' + (y + 1) + 'c' + (x + 1), _SOMETHING_, sym_cells));
}
