import React from 'react'
import { Box, GridItem } from '@chakra-ui/react'
import { Heading, Flex } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'


const Layout = ({ children }) => {
    return (
        <Box>
          <Header />
          
            <Flex mt="70px" bgGradient="linear(to-l, #E8DBFC, #F8F9D2)">
              <Navbar />
              <Box
                width={{ base: "100%", lg: "85%" }}
                border="1px solid rgba(0, 0, 0, 0.3)"
                shadow="2xl"
                bgColor="white"
                borderRadius="10px"
                margin="20px"
              >
                { children }
              </Box>
            </Flex>
          <Footer/>  
        </Box>  
    )
}

export default Layout