import React from "react";
import { Text, Image, Flex, Center, Spacer, Link } from "@chakra-ui/react";
import EnterAlertDialog from "../page-components/EnterAlertDialog";
import SearchBar from "../page-components/SearchBar";
import AdressBar from "../page-components/AdressBar";
import CartButton from "../page-components/CartButton";


const Header = () => {
  return (
    <Flex
      className="header"  
      position="fixed"
      top='0' 
      zIndex="100000" 
      bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
      h="70px" 
      w="100%"
      borderBottom="1px solid rgba(0, 0, 0, 0.15)" 
      p="0px 20px"
    >

      <Flex
        justifyContent="space-between"
        
      >
        <Link
            href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/`}
        >
          <Center 
            className="header__logo" 
            minW="120px"
            h="100%"
            display="block"
            margin="0px 90px 0px 0px"
          >
            <Image src="/icons/full-logo.png" h="100%" maxW="100%" alt="full-logo"></Image>
          </Center>
        </Link>

      </Flex>
      
      <Flex padding='0px 90px 0px 0px'>
        <SearchBar/>
      </Flex>

      <Spacer/>

      <Flex>
        <CartButton />
        
        <Center className="header__adress-bar" w="200px" m="0px 90px 0px 90px">
          <EnterAlertDialog/>
        </Center>

      </Flex>

      
    </Flex>
  )
}

export default Header;