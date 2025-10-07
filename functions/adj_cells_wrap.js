/*
These functions use the mod() function from modulo.js.
*/

/*
Get orthogonally adjacent cells with wrap-around:
*/
function getOrthogonallyAdjacentCellsWithWrapAround(cellId)
{
  const w = puzzle.spec.size.width;
  const h = puzzle.spec.size.height;
  const center_coords = helpers.cellIds.getCoordsFromId(cellId);
  const top_id = (center_coords.y - 1).mod(h) * h + center_coords.x.mod(w);
  const left_id = center_coords.y.mod(h) * h + (center_coords.x - 1).mod(w);
  const right_id = center_coords.y.mod(h) * h + (center_coords.x + 1).mod(w);
  const bottom_id = (center_coords.y + 1).mod(h) * h + center_coords.x.mod(w);

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
  const w = puzzle.spec.size.width;
  const h = puzzle.spec.size.height;
  const center_coords = helpers.cellIds.getCoordsFromId(cellId);
  const tl_id = (center_coords.y - 1).mod(h) * h + (center_coords.x - 1).mod(w);
  const tr_id = (center_coords.y - 1).mod(h) * h + (center_coords.x + 1).mod(w);
  const bl_id = (center_coords.y + 1).mod(h) * h + (center_coords.x - 1).mod(w);
  const br_id = (center_coords.y + 1).mod(h) * h + (center_coords.x + 1).mod(w);

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
  const w = puzzle.spec.size.width;
  const h = puzzle.spec.size.height;
  const center_coords = helpers.cellIds.getCoordsFromId(cellId);
  const tl_id = (center_coords.y - 1).mod(h) * h + (center_coords.x - 1).mod(w);
  const top_id = (center_coords.y - 1).mod(h) * h + center_coords.x.mod(w);
  const tr_id = (center_coords.y - 1).mod(h) * h + (center_coords.x + 1).mod(w);
  const left_id = center_coords.y.mod(h) * h + (center_coords.x - 1).mod(w);
  const right_id = center_coords.y.mod(h) * h + (center_coords.x + 1).mod(w);
  const bl_id = (center_coords.y + 1).mod(h) * h + (center_coords.x - 1).mod(w);
  const bottom_id = (center_coords.y + 1).mod(h) * h + center_coords.x.mod(w);
  const br_id = (center_coords.y + 1).mod(h) * h + (center_coords.x + 1).mod(w);

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
