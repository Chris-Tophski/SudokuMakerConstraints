/*
* Component "CustomIndexComponent"
* 
* Usage: puzzle.addConstraintComponent(new CustomIndexComponent('NAME', valueCellId, arrayOfCellIds))
* 
* Based on an example by sirxemic.
* Extended for 1s in first indexed cell and common candidates between value and target cell by ChrisTophski
*/

function getAffectedCells (cell, cells)
{
  return [cell, ...cells];
}

function setParams (instance, cell, cells)
{
  instance.cell = cell;
  instance.cells = cells;
}

function* update (instance, puzzle)
{
  const { cell, cells } = instance;
  const allDigits = SudokuDigitSet.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const allBut1 = SudokuDigitSet.from([2, 3, 4, 5, 6, 7, 8, 9]);

  // indexable value is available
  if (puzzle.hasValue(cell))
  {
    yield puzzle.replaceComponent(
      instance,
      new IndexComponent(instance.name, puzzle.getValue(cell), cells[0], cells)
    );
  }

  // position is available
  else if (puzzle.hasValue(cells[0]))
  {
    const pos = puzzle.getValue(cells[0]);

    // position is 1
    if (pos == 1)
    {
      // so only digit 1 is available
      yield puzzle.removeCandidatesFromCell(allBut1, cell);
    }

    // position is > 1
    else
    {
      const val_can = puzzle.getCandidates(cell);
      const tgt_can = puzzle.getCandidates(cells[pos - 1]);
      const com_can = val_can.intersect(tgt_can);
      const rm_can = allDigits.subtract(com_can);

      // there are removable candidates in order to only keep common candidates of value and target cells
      if (Array.from(rm_can).length > 0)
      {
        yield puzzle.removeCandidatesFromCells(rm_can, [cell, cells[pos - 1]]);
      }
    }
  }

  // candidates for indexable value don't contain 1
  else if (!Array.from(puzzle.getCandidates(cell)).includes(1))
  {
    // so position cannot be 1
    yield puzzle.removeCandidateFromCell(1, cells[0]);
  }
}
