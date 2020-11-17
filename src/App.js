import { Flex, Box } from '@chakra-ui/react';
import React, { useState, useRef } from 'react'
import Canvas from './components/Canvas.js';
import CycleControl from './components/CycleControl.js';
import InfectingControl from './components/InfectingControl.js';
import TopBar from './components/TopBar.js';



function App() {

  const [cycleTimeOut, setcycleTimeOut] = useState(2400)
  const timeOutRef = useRef(cycleTimeOut)
  timeOutRef.current = cycleTimeOut
  const [cycleNumber, setcycleNumber] = useState(0)
  const cycleNumberRef = useRef(cycleNumber)
  cycleNumberRef.current = cycleNumber
  const [cycleIntervalID, setcycleIntervalID] = useState()

  const [newGenome, setnewGenome] = useState({
    r: 120,
    g: 120,
    b: 210
  })


  const startCycle = () => {
    setcycleIntervalID(setTimeout(() => startCycle(), timeOutRef.current))
    setcycleNumber(cycleNumberRef.current + 1)
  }

  const stopCycle = () => {
    clearTimeout(cycleIntervalID);
  }

  return (
    <Box h="100%" style={{ backgroundColor: "#d9d9d9" }}>
      <TopBar />
      <Box m="auto" w="700px" mt={10}>
        <Flex>
          <div>
            <Canvas
              cycleTimeOut={cycleTimeOut}
              setcycleTimeOut={setcycleTimeOut}
              cycleNumber={cycleNumber}
              setcycleNumber={setcycleNumber}
              newGenome={newGenome}
            />
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
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
