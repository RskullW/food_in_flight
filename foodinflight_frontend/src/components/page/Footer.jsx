import React from "react";
import { Box, Wrap, WrapItem, List, ListItem, Flex, Spacer, Text, Link} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

const Footer = () => {
  return(
    <Box 
      className="footer" 
      bgColor="white" 
      position="relative" 
      bottom="-80px" 
      borderTop="1px solid rgba(0,0,0,0.15)" 
      h="80px"
      padding="10px 20px"
    >
      <Heading className="footer__article">
        О компании
      </Heading>
      <Flex className="footer__content" flexDirection="column">
        <Flex justifyContent="space-between" margin="10px 0px 0px 0px">
          <Link>Пользовательское соглашение</Link>
          <Link>Контакты</Link>
          <Link>Доставка</Link>
          <Link>Обратная связь</Link>
        </Flex>
          
        <Flex justifyContent="space-between" margin="10px 0px 10px 0px">
          <Text>© 2023 ООО «Food in Flight»</Text>
          <Text>Проект компании Шпонка Шапокляка</Text>
        </Flex>
          
      </Flex>
      
    </Box>
  )
}

export default Footer