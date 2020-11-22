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
  const [modalCellName, setmodalCellName] = useState("")
  const [invalidModalCellName, setinvalidModalCellName] = useState(false)

  useEffect(() => {
    let initialCells = [
      {
        cellName: "cell 1",
        genome: {
          color: poolOfCellColors[0]
        }
      },
      {
        cellName: "cell 2",
        genome: {
          color: poolOfCellColors[1]
        }
      }
    ]

    setexistingCellSpecies(initialCells)

  }, [setexistingCellSpecies])

  const addingNewCell = () => {
    if (modalCellName === "") {
      setinvalidModalCellName(true)
      return
    }

    const newCell = {
      cellName: modalCellName,
      genome: {
        color: modalSelectedColor
      }
    }

    setexistingCellSpecies(prevState => {
      return [...prevState, newCell]
    })
    onClose()
  }


  return (
    <div>
      <Button onClick={() => {
        onOpen()
        setmodalCellName("")
        setinvalidModalCellName(false)
      }}>Add a cell type</Button>

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
            <FormControl
              isRequired
              isInvalid={invalidModalCellName}
            >
              <FormLabel>Species name</FormLabel>
              <Input
                ref={initialRef}
                onChange={e => setmodalCellName(e.target.value)} />
            </FormControl>
            <ButtonGroup>
              {poolOfCellColors.map((cellColor, index) => <Button
                key={index}
                colorScheme={cellColor.colorName}
                variant={modalSelectedColor.rgb.r === cellColor.rgb.r ? "solid" : "outline"}
                size="xs"
                onClick={() => setmodalSelectedColor(cellColor)}
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
            <Button onClick={() => setnewGenome(cellSpecies.genome)} colorScheme={cellSpecies.genome.color.colorName} size="sm" w="100px">{cellSpecies.cellName}</Button>
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