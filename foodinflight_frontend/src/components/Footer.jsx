import React from "react";
import { Box, Wrap, WrapItem, List, ListItem, Flex, Spacer, Text, Link} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

const Footer = () => {
  return(
    <Box className="footer" bgColor="white" position="relative" bottom="-80px" zIndex="10000000" borderTop="1px solid rgba(0,0,0,0.15)" h="80px">
      <Heading className="footer__article">О компании</Heading>
      <Wrap className="footer__content">
        <WrapItem className="footer__nav-menu">
          <Flex flexDirection="row">
            <List display="flex">
              <ListItem>
                <Link>Пользовательское соглашение</Link>
              </ListItem>
              <Spacer />
              <ListItem>
                <Link>Контакты</Link>
              </ListItem>
              <Spacer />
              <ListItem>
                <Link>Доставка</Link>
              </ListItem>
              <Spacer />
              <ListItem>
                <Link>Обратная связь</Link>
              </ListItem>
            </List>
          </Flex>
        </WrapItem>
        <WrapItem className="footer__copyright">
          <Text>© 2023 ООО «Food in Flight»</Text>
          <Text>Проект компании Шпонка Шапокляка</Text>
        </WrapItem>
      </Wrap>
      
    </Box>
  )
}

export default Footer