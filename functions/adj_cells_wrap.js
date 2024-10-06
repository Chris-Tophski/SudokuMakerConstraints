/*
These functions use the mod() function from modulo.js.
*/

/*
Get orthogonally adjacent cells with wrap-around:
*/
function getOrthogonallyAdjacentCellsWithWrapAround(cellId)
{
  var center_coords = helpers.cellIds.getCoordsFromId(cellId);
  var top_id = (cell_coords.y - 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + cell_coords.x.mod(puzzle.spec.size.width);
  var left_id = cell_coords.y.mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x - 1).mod(puzzle.spec.size.width);
  var right_id = cell_coords.y.mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x + 1).mod(puzzle.spec.size.width);
  var bottom_id = (cell_coords.y + 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + cell_coords.x.mod(puzzle.spec.size.width);

  return [
    top_id,
    left_id,
    right_id,
    bottom_id
  ];
}

/*
Get diagonally adjacent cells with wrap-around:
*/
function getDiagonallyAdjacentCellsWithWrapAround(cellId)
{
  var center_coords = helpers.cellIds.getCoordsFromId(cellId);
  var tl_id = (cell_coords.y - 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x - 1).mod(puzzle.spec.size.width);
  var tr_id = (cell_coords.y - 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x + 1).mod(puzzle.spec.size.width);
  var bl_id = (cell_coords.y + 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x - 1).mod(puzzle.spec.size.width);
  var br_id = (cell_coords.y + 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x + 1).mod(puzzle.spec.size.width);

  return [
    tl_id,
    tr_id,
    bl_id,
    br_id
  ];
}

/*
Get surrounding cells with wrap-around:
*/
function getSurroundingCellsWithWrapAround(cellId)
{
  var center_coords = helpers.cellIds.getCoordsFromId(cellId);
  var tl_id = (cell_coords.y - 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x - 1).mod(puzzle.spec.size.width;)
  var top_id = (cell_coords.y - 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + cell_coords.x.mod(puzzle.spec.size.width);
  var tr_id = (cell_coords.y - 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x + 1).mod(puzzle.spec.size.width);
  var left_id = cell_coords.y.mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x - 1).mod(puzzle.spec.size.width);
  var right_id = cell_coords.y.mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x + 1).mod(puzzle.spec.size.width);
  var bl_id = (cell_coords.y + 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x - 1).mod(puzzle.spec.size.width);
  var bottom_id = (cell_coords.y + 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + cell_coords.x.mod(puzzle.spec.size.width);
  var br_id = (cell_coords.y + 1).mod(puzzle.spec.size.height) * puzzle.spec.size.height + (cell_coords.x + 1).mod(puzzle.spec.size.width);

  return [
    tl_id,
    top_id,
    tr_id,
    left_id,
    right_id,
    bl_id,
    bottom_id,
    br_id
  ];
}
