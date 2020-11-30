import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Text,
  Center
} from "@chakra-ui/react"
import AddCellTypeModal from "./AddCellTypeModal"

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

function InfectingControl({ setnewGenome, existingCellSpecies, setexistingCellSpecies }) {

  useEffect(() => {
    let initialCells = [
      {
        cellName: "cell 1",
        genome: {
          color: poolOfCellColors[0],
          mitosisVolume: 15
        }
      },
      {
        cellName: "cell 2",
        genome: {
          color: poolOfCellColors[1],
          mitosisVolume: 80
        }
      }
    ]

    setexistingCellSpecies(initialCells)

  }, [setexistingCellSpecies])


  return (
    <div>
      <AddCellTypeModal setexistingCellSpecies={setexistingCellSpecies} poolOfCellColors={poolOfCellColors} />

      <Flex flexDirection="column" w="100%">
        {existingCellSpecies.map((cellSpecies, index) =>
          <Box key={index} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="2" mt="2">
            <Center>
              <Button onClick={() => setnewGenome(cellSpecies.genome)} colorScheme={cellSpecies.genome.color.colorName} size="sm" w="100px">{cellSpecies.cellName}</Button>
            </Center>
            <Box mt="4">
              <Text>Mitosis volume: {cellSpecies.genome.mitosisVolume}</Text>
            </Box>
          </Box>
        )}
      </Flex>


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