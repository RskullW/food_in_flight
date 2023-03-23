import React, { useState, useEffect } from "react";
import { 
  Grid, 
  GridItem, 
  Box, 
  Image, 
  Link, 
  Heading, 
  Wrap, 
  Center, 
  WrapItem, 
  Text, 
  Button, 
  List, 
  ListItem, 
  IconButton,
  Flex,
  Spacer,
  Icon
} from "@chakra-ui/react";

import { FaTelegramPlane } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"
import { SlSocialVkontakte } from "react-icons/sl"
import { BsApple, BsGooglePlay } from "react-icons/bs"

const FooterMainPart = () => {
  const [allCuisines, setAllCuisines] = useState([]);
  const [cuisinesError, setCuisinesError] = useState(false);

  useEffect(() => {

    const getCuisinesData = async() => {
      const url = `${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/cuisines/`;
      const cuisinesResponse = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      })
      
      if (cuisinesResponse.status === 200) {
        const cuisinesData = await cuisinesResponse.json();
        setAllCuisines(cuisinesData);
      } else {
        setCuisinesError(true);
      }

      console.log(cuisinesResponse);
    }

    getCuisinesData();
  }, []);

  return (
    <Flex 
      className="footer" 
      m="100px 20px 20px 20px" 
      p="20px 0px 0px 0px" 
      borderTop="1px solid rgba(0, 0, 0, 0.15)"
    >

      <Flex flexDirection="column" className="footer__nav-menu">
        <Heading as="h3" fontSize="xl" m="0px 0px 15px 0px">Кухни</Heading>
        {
          allCuisines.map((cuisine) => (
            <List p="5px 0px">

              <Link 
                style={{textDecoration: "none"}}
                href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/cuisines/${cuisine.slug}`}
              >

                <ListItem>
                  {cuisine.title}
                </ListItem>
                  
              </Link>

            </List>
          ))
        }
      </Flex>

      <Spacer />

      <Flex flexDirection="column" className="footer__nav-menu">
        <Heading as="h3" fontSize="xl"  m="0px 0px 15px 0px">Компания</Heading>
        <List>
          <ListItem p="5px 0px">
            <Link style={{textDecoration: "none"}}>Наша Кухня</Link>
          </ListItem>
          <ListItem p="5px 0px">
            <Link style={{textDecoration: "none"}}>Оплата</Link>
          </ListItem>
          <ListItem p="5px 0px">
            <Link 
              href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/shipping`}
              style={{textDecoration: "none"}}
            >
              Доставка
            </Link>
          </ListItem >
        </List>
      </Flex>

      <Spacer />

      <Flex 
        className="footer__nav-item"
        flexDirection="column" 
        textAlign="center" 
        justifyContent="center" 
        gap="10px" 
      >
        
          <Heading 
            as="h3" 
            fontSize="xl"
          >
            Заказывайте через 
            <br/>
            мобильное приложение
          </Heading>

          <Text>Получай подарок к каждому заказу</Text>

          <Flex 
            flexDirection="column"
            justifyContent="center" 
            gap="10px" 
          >
            <Button 
              bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
              _hover={{ bgGradient:"linear(to-r, #6E72FC, #AD1DEB)"}}
              p="0px"
            >
              <Box margin="0px 10px 0px 0px">
                <BsApple/>
              </Box>
              
              
              <Text color="whiteAlpha.900">
                Загрузить в App Store
              </Text>
            </Button>

            <Button 
              bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
              _hover={{ bgGradient:"linear(to-r, #6E72FC, #AD1DEB)"}}
              textAlign="left"
            >
              <Box margin="0px 10px 0px 0px">
                <BsGooglePlay />
              </Box>

              <Text color="whiteAlpha.900">
                Загрузить в Google Play
              </Text>
            </Button>
          </Flex>

          <Flex justifyContent="center" gap="20px">
            <IconButton 
              bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
              borderRadius="50%"
              w="50px"
              h="50px"
            >
              <SlSocialVkontakte color="black" />
            </IconButton>

            <IconButton 
              bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
              borderRadius="50%"
              w="50px"
              h="50px"
            >
              <FaTelegramPlane />
            </IconButton>
            
            <IconButton 
              bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
              borderRadius="50%"
              w="50px"
              h="50px"
            >
              <AiFillGithub />
            </IconButton>
          </Flex>
          
      </Flex>
      
    </Flex>
  )
}

export default FooterMainPart