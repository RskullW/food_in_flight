import React from "react";
import { FormControl, Input, Center } from "@chakra-ui/react";

const AdressBar = () => {
  return (
    <Center w="300px">
      <FormControl _focus={{borderColor:"rgba(255, 165, 0, 1)"}}>
        <Input
          h="50px"
          bgColor="white"
          borderRadius="10px"
          type="search" 
          placeholder="Введите адрес"
          focusBorderColor="#CDCDCD"
          
        />
      </FormControl>
    </Center>
  )
}

export default AdressBar