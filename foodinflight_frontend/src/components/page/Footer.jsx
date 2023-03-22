import React from "react";
import { Box, Wrap, WrapItem, List, ListItem, Flex, Spacer, Text, Link} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

const Footer = () => {
  return(
    <Box 
      className="footer" 
      bgColor="rgba(0, 0, 0, 0.8)" 
      position="relative" 
      borderTop="1px solid rgba(0,0,0,0.15)" 
      h="90px"
      padding="10px 20px"
    >

      <Flex className="footer__content" flexDirection="column">
        <Flex 
          justifyContent="center" 
          gap="30px" 
          textAlign="center" 
          margin="10px 0px 0px 0px"
          textColor="white"
        >
          <Link>Пользовательское соглашение</Link>
          <Link>Контакты</Link>
          <Link>Доставка</Link>
          <Link>Обратная связь</Link>
        </Flex>
          
        <Flex 
          justifyContent="space-between" 
          margin="10px 0px 10px 0px"
          textColor="white"
        >
          <Text>© 2023 ООО «Food in Flight»</Text>
          <Text>Проект компании Шпонка Шапокляка</Text>
        </Flex>
          
      </Flex>
      
    </Box>
  )
}

export default Footer