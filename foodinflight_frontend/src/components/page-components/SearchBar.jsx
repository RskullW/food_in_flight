import React from "react";
import { FormControl, Input, Center} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi"

const SearchBar = () => {
  return (
    <Center w="500px">
      <BiSearch></BiSearch>
      <FormControl>
        <Input 
          h="60px" 
          type="search" 
          placeholder="Поиск по меню"
        />
      </FormControl> 
    </Center>
  )
}



export default SearchBar