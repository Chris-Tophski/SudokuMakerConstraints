/*
This snippet finds all orthogonally adjacent pairs of cell IDs and applies a constraint component to each pair.
The pairs are unique (in both directions, i. e. commutative/symmetric), such that no component is applied twice.
*/

const pwidth = puzzle.spec.size.width;
const pheight = puzzle.spec.size.height;
const cellCount = pwidth * pheight;

var pairs = [];

for (var i = 0; i < cellCount; i++)
{
  var cells = helpers.geometry.getOrthogonallyAdjacentCells(i);
  for (var cell of cells)
  {
    var found = false;
    for (var pair of pairs)
    {
      if (((i === pair[0]) && (cell === pair[1])) || ((i === pair[1]) && (cell === pair[0])))
      {
        found = true;
        break;
      }
    }

    if (found === false)
    {
      pairs = pairs.concat([[i, cell]]);
      var name = "SomeConstraint@" + helpers.naming.getCellName(i) + ":" + helpers.naming.getCellName(cell);
      // TODO: change this to an appropriate component
      puzzle.addConstraintComponent(new SomeConstraintComponent(name, i, cell));
    }
  }
}
