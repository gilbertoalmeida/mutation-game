import React, { useRef, useEffect, useState } from 'react'
import Cell from "../Cell.js"

let cellSize = 1
let cellsInARow = 400
let infectingStroke = 2
let cells = []


function Canvas() {
  const canvasRef = useRef(null)
  const [newGenome, setnewGenome] = useState({
    r: 120,
    g: 120,
    b: 210
  })

  useEffect(() => {
    const canvas = canvasRef.current

    const ctx = canvas.getContext('2d')

    if (cells.length === 0) {
      for (let i = 0; i < cellsInARow; i++) {
        cells[i] = new Array(cellsInARow)
      }

      for (let i = 0; i < cellsInARow; i++) {
        for (let j = 0; j < cellsInARow; j++) {
          let cell = new Cell(cellSize, i, j, ctx, undefined)
          cells[i][j] = cell
        }
      }

      for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
          cells[i][j].paint()
        }
      }
    }

    function getCellsToInfect(canvas, event) {
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      let clickedi = Math.floor(x / cellSize)
      let clickedj = Math.floor(y / cellSize)

      let cellsToInfect = []

      for (let i = clickedi - infectingStroke; i <= clickedi + infectingStroke; i++) {
        for (let j = clickedj - infectingStroke; j <= clickedj + infectingStroke; j++) {
          if (i < 0 || j < 0 || i > cellsInARow - 1 || j > cellsInARow - 1) {
            //inexisting indexes
          } else if (
            (i === clickedi - infectingStroke && j === clickedj - infectingStroke) ||
            (i === clickedi + infectingStroke && j === clickedj + infectingStroke) ||
            (i === clickedi + infectingStroke && j === clickedj - infectingStroke) ||
            (i === clickedi - infectingStroke && j === clickedj + infectingStroke)
          ) {
            // corner indexes (without them there's a circular appearence to the stroke)
          } else {
            cellsToInfect.push(cells[i][j])
          }
        }
      }
      return cellsToInfect
    }

    let isMousedown = false

    const handleMousedown = (e) => {
      if (e.button === 0) { //only the left click
        isMousedown = true
        let cellsToInfect = getCellsToInfect(canvas, e);

        if (cellsToInfect) {
          for (let i = 0; i < cellsToInfect.length; i++) {
            cellsToInfect[i].receiveGenome(newGenome)
            cellsToInfect[i].paint()
          }
        }
      }
    }

    const handleMousemove = (e) => {
      if (isMousedown) {
        let cellsToInfect = getCellsToInfect(canvas, e);

        if (cellsToInfect) {
          for (let i = 0; i < cellsToInfect.length; i++) {
            cellsToInfect[i].receiveGenome(newGenome)
            cellsToInfect[i].paint()
          }
        }
      }
    }

    const handleMouseup = () => {
      isMousedown = false
    }

    canvas.addEventListener("mousedown", handleMousedown)
    canvas.addEventListener("mousemove", handleMousemove)
    canvas.addEventListener("mouseup", handleMouseup)

    return () => {
      canvas.removeEventListener("mousedown", handleMousedown);
      canvas.removeEventListener("mousemove", handleMousemove);
      canvas.removeEventListener("mouseup", handleMouseup);
    }

  }, [newGenome])




  // const repeat = () => {
  //   window.requestAnimationFrame(repeat)
  //   console.log(window.event.clientX)
  // }

  //repeat()

  const setPurple = () => {
    setnewGenome({ r: 120, g: 120, b: 210 })
  }

  const setGreen = () => {
    setnewGenome({ r: 120, g: 210, b: 120 })
  }


  return (
    <>
      <canvas id="canvas" ref={canvasRef} width={cellSize * cellsInARow} height={cellSize * cellsInARow} />
      <div>
        <button onClick={setPurple}>purple</button>
        <button onClick={setGreen}>green</button>
        <div>{newGenome.g === 120 ? "purple" : "green"}</div>
      </div>

    </>
  );
}

export default Canvas;




/*

||
(i === clickedi - infectingStroke && j === clickedj - infectingStroke + infStrokeCorr) ||
(i === clickedi - infectingStroke + infStrokeCorr && j === clickedj - infectingStroke) ||
(i === clickedi + infectingStroke - infStrokeCorr && j === clickedj - infectingStroke) ||
(i === clickedi + infectingStroke && j === clickedj - infectingStroke + infStrokeCorr) ||
(i === clickedi - infectingStroke && j === clickedj + infectingStroke - infStrokeCorr) ||
(i === clickedi - infectingStroke + infStrokeCorr && j === clickedj + infectingStroke) ||
(i === clickedi + infectingStroke && j === clickedj + infectingStroke - infStrokeCorr) ||
(i === clickedi + infectingStroke - infStrokeCorr && j === clickedj + infectingStroke)

*/