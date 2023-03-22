import React from "react";
import { FormControl, Input, Center} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi"

const SearchBar = () => {
  return (
    <Center w="300px">
      <FormControl
        display="block" 
      >
        <Input 
          h="50px"
          bgColor="white"
          borderRadius="10px"
          type="search" 
          placeholder="Поиск по меню"
          focusBorderColor="rgba(255, 165, 0, 1)"
        />
      </FormControl> 
    </Center>
  )
}



export default SearchBar