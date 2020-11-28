import React from 'react'
import { Box, Heading } from '@chakra-ui/react';

const headingStyle = {
  fontFamily: 'Goldman',
  letterSpacing: "10px"
}

export default function TopBar() {
  return (
    <Box p={4} >
      <Box m="auto" w="90%" >
        <Heading color="blue.600" size="lg" style={headingStyle}>Mutation</Heading>
      </Box>
    </Box>
  )
}
