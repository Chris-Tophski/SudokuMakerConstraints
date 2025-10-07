/*
* This script uses the mod() function from modulo.js.
*/

/*
* This script ensures the following constraint:
* "Cells a knight's move (in chess) apart, when wrapped-around, must contain different digits."
* The normal antiknight constraint is not enforced here and must be added separately, if needed.
*/

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
    for (const ac of affectedCells)
    {
      const acId = deltaToCellIdWrapped(currCellId, ac);
      const acCoords = helpers.cellIds.getCoordsFromId(acId);
      const acc = acCoords.x;
      const acr = acCoords.y;
      const name = 'Wrapped Antiknight R' + (i + 1) + 'C' + (j + 1) + ', R' + (acCoords.y + 1) + 'C' + (acCoords.x + 1);
      puzzle.addConstraintComponent(new DifferentDigitsComponent(name, [ currCellId, acId ]));
    }
  }
}
