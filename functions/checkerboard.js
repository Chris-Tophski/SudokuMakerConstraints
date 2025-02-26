/*
This snippet demonstrates applying a constraint component to cells in the same checkerboard set
*/

Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};

var w = puzzle.spec.size.width;
var h = puzzle.spec.size.height;
var last_index = Math.floor(w * h / 2);

function idx(x, y)
{
  return y * w + x;
}

function chkr_black(ids)
{
  var result = [];
  
  for (var id of ids)
  {
    var x = id.mod(w);
    var y = Math.floor(id / h);
    if ((x + y).mod(2) == 0)
      result = result.concat(idx(x, y))
  }

  return result;
}

function chkr_white(ids)
{
  var result = [];
  
  for (var id of ids)
  {
    var x = id.mod(w);
    var y = Math.floor(id / h);
    if ((x + y).mod(2) != 0)
      result = result.concat(idx(x, y))
  }

  return result;
}

var all_cells = [];
for (var i = 0; i < (w * h); i++)
{
  all_cells = all_cells.concat(i);
}

var chkr_black_cells = chkr_black(all_cells);
var chkr_white_cells = chkr_white(all_cells);

puzzle.addConstraintComponent(new XyzComponentTaking41Cells('chkrBXYZ', _SOMETHING_, chkr_black_cells));
puzzle.addConstraintComponent(new XyzComponentTaking40Cells('chkrWXYZ', _SOMETHING_, chkr_white_cells));
