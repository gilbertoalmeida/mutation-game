import React, { useState } from 'react'
import {
  ButtonGroup,
  Button,
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
  ModalFooter,
  Text,
  Center,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react"

function AddCellTypeModal({ setexistingCellSpecies, poolOfCellColors }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()

  const [modalSelectedColor, setmodalSelectedColor] = useState(poolOfCellColors[0])
  const [modalCellName, setmodalCellName] = useState("")
  const [modalMitosisVolume, setmodalMitosisVolume] = useState(30)
  const [invalidModalCellName, setinvalidModalCellName] = useState(false)

  const addingNewCell = () => {
    if (modalCellName === "") {
      setinvalidModalCellName(true)
      return
    }

    const newCell = {
      cellName: modalCellName,
      genome: {
        color: modalSelectedColor,
        mitosisVolume: modalMitosisVolume
      }
    }

    setexistingCellSpecies(prevState => {
      return [...prevState, newCell]
    })
    onClose()
  }


  return (
    <div>
      <Center>
        <Button onClick={() => {
          onOpen()
          setmodalCellName("")
          setinvalidModalCellName(false)
        }}>Add a cell type</Button>
      </Center>


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
            <Text>Mitosis volume: {modalMitosisVolume}</Text>
            <Slider colorScheme="pink" defaultValue={30} onChange={(val) => setmodalMitosisVolume(val)}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
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

    </div>
  );
}

export default AddCellTypeModal;
