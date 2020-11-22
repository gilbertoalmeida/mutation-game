import React, { useEffect, useState } from 'react'
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter
} from "@chakra-ui/react"

let poolOfCellColors = [
  {
    colorName: "blue",
    rgb: { r: 49, g: 130, b: 206 },
    hexColor: "#3182CE"
  },
  {
    colorName: "green",
    rgb: { r: 56, g: 161, b: 105 },
    hexColor: "#38A169"

  },
  {
    colorName: "yellow",
    rgb: { r: 214, g: 158, b: 46 },
    hexColor: "#D69E2E"

  }

]

function InfectingControl({ newGenome, setnewGenome, existingCellSpecies, setexistingCellSpecies }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()

  const [modalSelectedColor, setmodalSelectedColor] = useState(poolOfCellColors[0])

  useEffect(() => {
    let initialCells = [
      {
        cellName: "cell 1",
        genome: poolOfCellColors[0].rgb,
        colorName: poolOfCellColors[0].colorName
      },
      {
        cellName: "cell 2",
        genome: poolOfCellColors[1].rgb,
        colorName: poolOfCellColors[1].colorName
      }
    ]

    setexistingCellSpecies(initialCells)

  }, [setexistingCellSpecies])

  const addingNewCell = () => {
    const newCell = {
      cellName: "Cell 3",
      genome: modalSelectedColor.rgb,
      colorName: modalSelectedColor.colorName
    }

    setexistingCellSpecies(prevState => {
      return [...prevState, newCell]
    })
  }


  return (
    <div>
      <Button onClick={onOpen}>Add a cell type</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Build your cell genome</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Species name</FormLabel>
              <Input ref={initialRef} />
            </FormControl>
            <ButtonGroup>
              {poolOfCellColors.map((cell, index) => <Button
                key={index}
                colorScheme={cell.colorName}
                variant={modalSelectedColor.rgb.r === cell.rgb.r ? "solid" : "outline"}
                onClick={() => setmodalSelectedColor(cell)}
                _focus={{
                  boxShadow: "none"
                }}
              />
              )}
            </ButtonGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3}
              onClick={
                () => addingNewCell()
              }
            >
              Add cell
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex flexDirection="column" w="100%">
        {existingCellSpecies.map((cellSpecies, index) =>
          <Box key={index} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
            <Button onClick={() => setnewGenome(cellSpecies.genome)} colorScheme={cellSpecies.colorName} size="sm" w="100px">{cellSpecies.colorName}</Button>
          </Box>
        )}
      </Flex>

      <div>{newGenome.g === 130 ? "blue" : "green"}</div>
    </div>
  );
}

export default InfectingControl;


/*
colors
blue.500: #3182CE (49, 130, 206)
green.500: #38A169 (56, 161, 105)
yellow.500: #D69E2E (214, 158, 46)

*/