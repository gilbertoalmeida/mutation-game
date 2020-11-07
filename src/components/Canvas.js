import React, { useRef, useEffect } from 'react'
import Cell from "../Cell.js"

function Canvas() {

  let cellSize = 2
  let cellsInARow = 200
  let infectingStroke = 2
  let cells = []
  let ctx

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    // eslint-disable-next-line
    ctx = canvas.getContext('2d')

    for (let i = 0; i < cellsInARow; i++) {
      cells[i] = new Array(cellsInARow)
    }

    for (let i = 0; i < cellsInARow; i++) {
      for (let j = 0; j < cellsInARow; j++) {
        let cell = new Cell(cellSize, i, j, ctx, undefined)
        cells[i][j] = cell
      }
    }


    function getCellsToInfect(canvas, event) {
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      let clickedi = Math.floor(x / cellSize)
      let clickedj = Math.floor(y / cellSize)

      let cellsToInfect = []

      for (let i = clickedi - infectingStroke; i < clickedi + infectingStroke; i++) {
        for (let j = clickedj - infectingStroke; j < clickedj + infectingStroke; j++) {
          if (i < 0 || j < 0 || i > cellsInARow - 1 || j > cellsInARow - 1) {
            return
          }
          cellsToInfect.push(cells[i][j])
        }
      }

      return cellsToInfect

    }

    let mouseDown = false

    let newGenome = {
      r: 120,
      g: 120,
      b: 210
    }

    canvas.addEventListener("mousedown", function (e) {
      if (e.button === 0) { //only the left click
        mouseDown = true
        let cellsToInfect = getCellsToInfect(canvas, e);

        if (cellsToInfect) {
          for (let i = 0; i < cellsToInfect.length; i++) {
            cellsToInfect[i].receiveGenome(newGenome)
            cellsToInfect[i].paint()
          }
        }
      }
    })

    canvas.addEventListener("mousemove", function (e) {
      if (mouseDown) {
        let cellsToInfect = getCellsToInfect(canvas, e);

        if (cellsToInfect) {
          for (let i = 0; i < cellsToInfect.length; i++) {
            cellsToInfect[i].newGenome(newGenome)
            cellsToInfect[i].paint()
          }
        }
      }
    })

    canvas.addEventListener("mouseup", function (e) {
      mouseDown = false
    })

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        cells[i][j].paint()
      }
    }
  }, [])









  // const repeat = () => {
  //   window.requestAnimationFrame(repeat)
  //   console.log(window.event.clientX)
  // }

  //repeat()


  return (
    <canvas ref={canvasRef} width={cellSize * cellsInARow} height={cellSize * cellsInARow} />
  );
}

export default Canvas;
