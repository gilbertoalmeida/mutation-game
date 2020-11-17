import React from 'react'
import {
  Button, ButtonGroup
} from "@chakra-ui/react"


function InfectingControl({ newGenome, setnewGenome }) {

  const setPurple = () => {
    setnewGenome({ r: 120, g: 120, b: 210 })
  }

  const setGreen = () => {
    setnewGenome({ r: 120, g: 210, b: 120 })
  }

  return (
    <div>
      <ButtonGroup size="sm">
        <Button onClick={setPurple} colorScheme="purple">Purple</Button>
        <Button onClick={setGreen} colorScheme="green">Green</Button>
      </ButtonGroup>
      <div>{newGenome.g === 120 ? "purple" : "green"}</div>
    </div>
  );
}

export default InfectingControl;