import React, { useState } from "react"
import {
  Button,
  Flex,
  Box,
  Text
} from "@chakra-ui/react"

import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi"

const AddToCartButton = (props) => {
  const [isClicked, setIsClicked] = useState(0);

  const handleClick = () => {
    setIsClicked(isClicked + 1);
  }

  const minusClick = () => {
    setIsClicked(isClicked - 1);
  }

  return (
    <Box 
      bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
      _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
      borderRadius="10px"
    >
      {isClicked === 0 && (
        <Button 
          onClick={handleClick}
          textColor="whiteAlpha.900"
          bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
          _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
        >
          В корзину
        </Button>
      )}

      {isClicked > 0 && 
      <Flex 
        gap="10px"
        alignItems="center"
        h="-moz-min-content"
      >

        <Button
          onClick={minusClick}
          textColor="whiteAlpha.900"
          bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
          _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
        >
          <HiOutlineMinus />
        </Button>

        <Text textColor="whiteAlpha.900">
          {isClicked}
        </Text>
          
        <Button
          onClick={handleClick}
          textColor="whiteAlpha.900"
          bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
          _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
        >
          <HiOutlinePlus />
        </Button>

      </Flex>
      }
    </Box>
  );
}

export default AddToCartButton