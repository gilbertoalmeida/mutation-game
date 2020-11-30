export const getNeighbourCells = (i, j, cellsInARow, cellsInAColumn) => {

  let neighbourCells = []

  for (let m = i - 1; m <= i + 1; m++) {
    for (let n = j - 1; n <= j + 1; n++) {
      if (m >= 0 && m < cellsInARow && n >= 0 && n < cellsInAColumn) {
        neighbourCells.push([m, n])
      }
    }
  }

  return neighbourCells
}