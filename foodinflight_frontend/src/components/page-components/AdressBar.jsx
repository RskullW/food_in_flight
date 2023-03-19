import React from "react";
import { FormControl, Input, Center } from "@chakra-ui/react";

const AdressBar = () => {
  return (
    <Center w="400px">
      <FormControl>
        <Input
          h="60px" 
          type="search" 
          placeholder="Введите адрес"
        />
      </FormControl>
    </Center>
  )
}

export default AdressBar