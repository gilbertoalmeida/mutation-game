import { Flex, Box } from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react'
import CycleControl from './components/CycleControl.js';
import InfectingControl from './components/InfectingControl.js';
import TopBar from './components/TopBar.js';
import Cell from "./Cell.js"
import { getCellsToInfect } from "./utils/getCellsToInfect"
import { getNeighbourCells } from "./utils/getNeighbourCells"

let cellSize = 10
let gameWidth = 0.9 * window.innerWidth
let gameHeight = 0.85 * window.innerHeight
let canvasWidth = gameWidth - 160
let canvasHeight = gameHeight - 100
let cellsInARow = Math.floor(canvasWidth / cellSize)
let cellsInAColumn = Math.floor(canvasHeight / cellSize)
let cells = []
let infectedCells = []

function App() {

  const [existingCellSpecies, setexistingCellSpecies] = useState([])
  const [cycleTimeOut, setcycleTimeOut] = useState(2400)
  const timeOutRef = useRef(cycleTimeOut)
  timeOutRef.current = cycleTimeOut
  const [cycleNumber, setcycleNumber] = useState(0)
  const cycleNumberRef = useRef(cycleNumber)
  cycleNumberRef.current = cycleNumber
  const [cycleIntervalID, setcycleIntervalID] = useState()

  //This default needs to change for the first default color
  const [newGenome, setnewGenome] = useState({
    color: {
      colorName: "blue",
      rgb: { r: 49, g: 130, b: 206 },
      hexColor: "#3182CE"
    }
  })

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    const ctx = canvas.getContext('2d')

    createCellsInCanvas(ctx);

    let resizeTimeOut;
    function resizedw() {
      console.log("resized")
      createCellsInCanvas(ctx);
    }
    window.onresize = function () {
      clearTimeout(resizeTimeOut);
      resizeTimeOut = setTimeout(function () {
        resizedw();
      }, 300);
    };

    let isMousedown = false

    const handleMousedown = (e) => {
      if (e.button === 0) { //only the left click
        isMousedown = true
        let cellsToInfect = getCellsToInfect(cellSize, cellsInARow, cellsInAColumn, canvas, e);

        if (cellsToInfect) {
          for (let i = 0; i < cellsToInfect.length; i++) {
            if (!cells[cellsToInfect[i][0]][cellsToInfect[i][1]].genome) { //it wasn't already infected
              infectedCells.push(cells[cellsToInfect[i][0]][cellsToInfect[i][1]])
            }

            if (cells[cellsToInfect[i][0]][cellsToInfect[i][1]].genome !== newGenome) { //it's not infected with the active genome yet
              cells[cellsToInfect[i][0]][cellsToInfect[i][1]].receiveGenome(newGenome)
              cells[cellsToInfect[i][0]][cellsToInfect[i][1]].paint()
            }
          }
        }
      }
    }

    const handleMousemove = (e) => {
      if (isMousedown) {
        let cellsToInfect = getCellsToInfect(cellSize, cellsInARow, cellsInAColumn, canvas, e);

        if (cellsToInfect) {
          for (let i = 0; i < cellsToInfect.length; i++) {
            if (!cells[cellsToInfect[i][0]][cellsToInfect[i][1]].genome) { //it wasn't already infected
              infectedCells.push(cells[cellsToInfect[i][0]][cellsToInfect[i][1]])
            }

            if (cells[cellsToInfect[i][0]][cellsToInfect[i][1]].genome !== newGenome) { //it's not infected with the active genome yet
              cells[cellsToInfect[i][0]][cellsToInfect[i][1]].receiveGenome(newGenome)
              cells[cellsToInfect[i][0]][cellsToInfect[i][1]].paint()
            }
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

  const createCellsInCanvas = ctx => {
    gameWidth = 0.9 * window.innerWidth
    gameHeight = 0.85 * window.innerHeight
    canvasWidth = gameWidth - 160
    canvasHeight = gameHeight - 100
    cellsInARow = Math.floor(canvasWidth / cellSize)
    cellsInAColumn = Math.floor(canvasHeight / cellSize)

    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    cells = []

    for (let i = 0; i < cellsInARow; i++) {
      cells[i] = new Array(cellsInAColumn)
    }

    for (let i = 0; i < cellsInARow; i++) {
      for (let j = 0; j < cellsInAColumn; j++) {
        let cell = new Cell(cellSize, i, j, ctx, null)
        cells[i][j] = cell
      }
    }

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        cells[i][j].paint()
      }
    }

  }


  const startCycle = () => {
    setcycleIntervalID(setTimeout(() => startCycle(), timeOutRef.current))
    setcycleNumber(cycleNumberRef.current + 1)

    for (let i = infectedCells.length - 1; i >= 0; i--) {
      let neighbourCells = getNeighbourCells(infectedCells[i].i, infectedCells[i].j, cellsInARow)
      let sterileNeighbourCells = []

      for (const neighbourCell of neighbourCells) {
        if (!cells[neighbourCell[0]][neighbourCell[1]].genome) {
          sterileNeighbourCells.push(cells[neighbourCell[0]][neighbourCell[1]])
        }
      }

      if (infectedCells[i]) {
        if (infectedCells[i].dead) {
          infectedCells.splice(i, 1)
        }
        if (infectedCells[i].readyToMitosis) {
          for (let s = 0; s < sterileNeighbourCells.length; s++) {
            sterileNeighbourCells[s].receiveGenome(infectedCells[i].genome)
            sterileNeighbourCells[s].paint()
            infectedCells.push(sterileNeighbourCells[s])
          }
        }

        infectedCells[i].metabolism()
        infectedCells[i].paint()
      }

    }
  }

  const stopCycle = () => {
    clearTimeout(cycleIntervalID);
  }

  return (
    <Box h="100%" style={{ backgroundColor: "#F7FAFC" }}>
      <TopBar />
      <Box m="auto" w="90%" mt={10}>
        <Flex>
          <div>
            <canvas id="canvas" ref={canvasRef} />
            <CycleControl
              cycleTimeOut={cycleTimeOut}
              setcycleTimeOut={setcycleTimeOut}
              cycleNumber={cycleNumber}
              startCycle={startCycle}
              stopCycle={stopCycle}
            />
          </div>
          <Box ml="auto">
            <InfectingControl
              newGenome={newGenome}
              setnewGenome={setnewGenome}
              existingCellSpecies={existingCellSpecies}
              setexistingCellSpecies={setexistingCellSpecies}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
