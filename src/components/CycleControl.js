import React from 'react'
import { mapSliderToCycleSpeed } from "../utils/mapSliderToCycleSpeed"
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button, ButtonGroup
} from "@chakra-ui/react"


function CycleControl({ cycleTimeOut, setcycleTimeOut, cycleNumber, startCycle, stopCycle }) {

  return (
    <>
      <div>
        <Slider colorScheme="pink" defaultValue={30} onChange={(val) => setcycleTimeOut(mapSliderToCycleSpeed(val, 0, 100, 3000, 1000))}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <div>{cycleTimeOut}</div>
        <ButtonGroup size="sm">
          <Button onClick={() => { startCycle() }} colorScheme="teal">Start</Button>
          <Button onClick={stopCycle} colorScheme="red">Stop</Button>
          <div>Cycle round: {cycleNumber}</div>
        </ButtonGroup>
      </div>

    </>
  );
}

export default CycleControl;