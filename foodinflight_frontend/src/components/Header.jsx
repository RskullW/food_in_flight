import React from "react";
import { Grid, GridItem, Text, Image, Flex, Center } from "@chakra-ui/react";


const Header = () => {
  return (
    <Flex
      className="header"  
      position="fixed" 
      zIndex="100000" 
      bgColor="white" 
      gap="10%" 
      h="80px" 
      w="100%"
      borderBottom="1px solid rgba(0, 0, 0, 0.15)" 
      padding="10px 20px"
    >
      <Center 
        className="header__logo" 
        border="1px solid red"
        w="300px"
      >
        <Image src="/icons/full-logo.png" objectFit="cover" alt="full-logo"></Image>
      </Center>

      <Center className="header__search-bar" border="1px solid red" w="500px">
        <Text>Search-bar</Text>
      </Center>

      <Center className="header__adress-bar" border="1px solid red" w="400px">
        <Text>adress-bar</Text>
      </Center>

      <Center className="header__enter-account" border="1px solid red" w="300px">
        <Text>enter-account</Text>
      </Center>
    </Flex>
  )
}

export default Header;