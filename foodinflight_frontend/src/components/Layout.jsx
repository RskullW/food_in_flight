import React from 'react'
import { Box } from '@chakra-ui/react'
import Header from './Header'


const Layout = ({ children }) => {
    return (
        <Box>
          <Header />
            <Box>
                { children }
            </Box>
        </Box>
    )
}

export default Layout