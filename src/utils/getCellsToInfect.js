export const getCellsToInfect = (cellSize, cellsInARow, canvas, e) => {
  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  let clickedi = Math.floor(x / cellSize)
  let clickedj = Math.floor(y / cellSize)

  let cellsToInfect = []

  for (let i = clickedi - 2; i <= clickedi + 2; i++) {
    for (let j = clickedj - 2; j <= clickedj + 2; j++) {
      if (i < 0 || j < 0 || i > cellsInARow - 1 || j > cellsInARow - 1) {
        //inexisting indexes
      } else if (
        (i === clickedi - 2 && j === clickedj - 2) ||
        (i === clickedi + 2 && j === clickedj + 2) ||
        (i === clickedi + 2 && j === clickedj - 2) ||
        (i === clickedi - 2 && j === clickedj + 2)
      ) {
        // corner indexes (without them there's a circular appearence to the stroke)
      } else {
        cellsToInfect.push([i, j])
      }
    }
  }
  return cellsToInfect
}