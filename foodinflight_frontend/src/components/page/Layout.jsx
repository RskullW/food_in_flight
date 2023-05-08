import React from 'react'
import { Box, Flex} from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import FooterMainPart from '../page-components/FooterMainPart'


const Layout = ({ children }) => {
    return (
        <Box>
          <Header />
          
            <Flex mt="70px" bgGradient="linear(to-l, #E8DBFC, #F8F9D2)">
              <Navbar />
              <Box
                width={{  xl:"85%", md: "100%", base: "100%", lg: "100%" }}
                border="1px solid rgba(0, 0, 0, 0.3)"
                shadow="2xl"
                bgColor="white"
                borderRadius="10px"
                m={{xl:"10px 20px", lg:"10px 10px", md:"10px 10px", sm:"10px 10px"}}
              >
                { children }
                <FooterMainPart />
              </Box>
            </Flex>
          <Footer/>  
        </Box>  
    )
}

export default Layout