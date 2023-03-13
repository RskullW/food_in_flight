import React from 'react'
import { Box } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'


const Layout = ({ children }) => {
    return (
        <Box>
          <Header />
            <Box>
                { children }
            </Box>
          <Footer/>  
        </Box>  
    )
}

export default Layout