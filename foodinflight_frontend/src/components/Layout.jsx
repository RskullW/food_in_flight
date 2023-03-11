import React from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from './Navbar'
import Footer from './Footer'


const Layout = ({ children }) => {
    return (
        <Box>
            <Navbar />
            <Box>
                { children }
            </Box>
            <Footer />
        </Box>
    )
}

export default Layout