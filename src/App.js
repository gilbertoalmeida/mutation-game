import React, { useState, useRef } from 'react'
import Canvas from './components/Canvas.js';
import CycleControl from './components/CycleControl.js';



function App() {

  const [cycleTimeOut, setcycleTimeOut] = useState(2400)
  const timeOutRef = useRef(cycleTimeOut)
  timeOutRef.current = cycleTimeOut
  const [cycleNumber, setcycleNumber] = useState(0)
  const cycleNumberRef = useRef(cycleNumber)
  cycleNumberRef.current = cycleNumber
  const [cycleIntervalID, setcycleIntervalID] = useState()


  const startCycle = () => {
    setcycleIntervalID(setTimeout(() => startCycle(), timeOutRef.current))
    setcycleNumber(cycleNumberRef.current + 1)
  }

  const stopCycle = () => {
    clearTimeout(cycleIntervalID);
  }

  return (
    <div style={{ margin: "auto", display: "block", width: "500px" }}>
      <Canvas cycleTimeOut={cycleTimeOut} setcycleTimeOut={setcycleTimeOut} cycleNumber={cycleNumber} setcycleNumber={setcycleNumber} />
      <CycleControl cycleTimeOut={cycleTimeOut} setcycleTimeOut={setcycleTimeOut} cycleNumber={cycleNumber} startCycle={startCycle} stopCycle={stopCycle} />
    </div>

  );
}

export default App;
