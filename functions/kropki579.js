/*
This function determines if the digits of two cells with given IDs are either in a 1:2 reatio or both from the set { 5, 7, 9 }.
*/
function AreKropki579(cellId1, cellid2)
{
  const allowed_pairs = [
    [ 1, 2 ],
    [ 2, 4 ],
    [ 3, 6 ],
    [ 4, 8 ],
    [ 5, 7 ],
    [ 5, 9 ],
    [ 7, 9 ]
  ];

  cell_val1 = puzzle.getValue(cellId1);
  cell_val2 = puzzle.getValue(cellId2);

  if (cell_val1 == undefined || cell_val2 == undefined)
    return undefined;
  
  for (const ap of allowed_pairs)
  {
    if ((ap[0] == cell_val1 && ap[1] == cell_val2) || (ap[0] == cell_val2 && ap[1] == cell_val1))
      return true;
  }

  return false;
}
