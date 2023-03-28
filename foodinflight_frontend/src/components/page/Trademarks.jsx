import React from "react";
import {
  Box, 
  Text,
  Link,
  Button,
  Wrap,
  WrapItem,
  Image
} from "@chakra-ui/react"
import {BiArrowBack} from "react-icons/bi"

const Trademarks = () => {
  return (
    <Box padding='40px'>
      <Link
          style={{textDecoration:"none"}}
          href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}`}
        >
          <Button
            bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
            iconSpacing="0px 10px 0px 0px"
            leftIcon={<BiArrowBack />}
            textColor="black"
          >
            <Text>Главная</Text>
          </Button>
        </Link>
      <br />
      <Text as='b' fontSize='4xl'>Товарные знаки Food in Flight</Text>
      <br />
      <br />
      <Wrap spacing='50px' marginLeft='20px'>
        <WrapItem>
          <Image src="/icons/full-logo.png" objectFit='cover' h='100%' w='230px'></Image>
        </WrapItem>
        <WrapItem>
          <Image src="/icons/full-logo.png" objectFit='cover' h='100%' w='230px'></Image>
        </WrapItem>
        <WrapItem>
          <Image src="/icons/full-logo.png" objectFit='cover' h='100%' w='230px'></Image>
        </WrapItem>
        <WrapItem>
          <Image src="/icons/full-logo.png" objectFit='cover' h='100%' w='230px'></Image>
        </WrapItem>
        <WrapItem>
          <Image src="/icons/full-logo.png" objectFit='cover' h='100%' w='230px'></Image>
        </WrapItem>
        <WrapItem>
          <Image src="/icons/full-logo.png" objectFit='cover' h='100%' w='230px'></Image>
        </WrapItem>
        <WrapItem>
          <Image src="/icons/full-logo.png" objectFit='cover' h='100%' w='230px'></Image>
        </WrapItem>
        <WrapItem>
          <Image src="/icons/full-logo.png" objectFit='cover' h='100%' w='230px'></Image>
        </WrapItem>
      </Wrap>
    </Box>
  )
}

export default Trademarks