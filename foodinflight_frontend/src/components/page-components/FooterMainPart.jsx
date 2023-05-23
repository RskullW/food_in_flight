import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  IconButton,
  Flex,
  Spacer,
  Spinner
} from "@chakra-ui/react";

import { FaTelegramPlane } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"
import { SlSocialVkontakte } from "react-icons/sl"
import { BsApple, BsGooglePlay } from "react-icons/bs"

const FooterMainPart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allCuisines, setAllCuisines] = useState([]);
  const [cuisinesError, setCuisinesError] = useState(false);

  useEffect(() => {

    const getCuisinesData = async () => {
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

    }

    Promise.all([getCuisinesData()]).then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
    })
  }, []);


  return (
    <Flex
      m="20px 20px 20px 20px"
      p="20px 0px 10px 0px"
      borderTop="1px solid rgba(0, 0, 0, 0.15)"
    >

      <Flex flexDirection="column" className="footer__nav-menu">
        <Heading as="h3" fontSize="xl" m="0px 0px 15px 0px">Кухни</Heading>
        {
          isLoading ? (
            <Spinner />
          ) : (
            allCuisines.map((cuisine) => (
              <List p="5px 0px" key={cuisine.slug}>
                <Link
                  href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/cuisines/${cuisine.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem>
                    {cuisine.title}
                  </ListItem>
                </Link>
              </List>
            ))
          )
        }
      </Flex>

      <Spacer />

      <Flex flexDirection="column" className="footer__nav-menu">
        <Heading as="h3" fontSize="xl" m="0px 0px 15px 0px">Компания</Heading>
        <List>
          <ListItem p="5px 0px">
            <Link
              href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/aboutKitchen`}
              style={{ textDecoration: "none" }}
            >
              Наша Кухня
            </Link>
          </ListItem>
          <ListItem p="5px 0px">
            <Link
              href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/aboutPayment`}
              style={{ textDecoration: "none" }}
            >
              Оплата
            </Link>
          </ListItem>
          <ListItem p="5px 0px">
            <Link
              href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/shipping`}
              style={{ textDecoration: "none" }}
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
        gap="10px"
      >

        <Heading
          as="h3"
          fontSize="xl"
        >
          Заказывайте через
          <br />
          мобильное приложение
        </Heading>

        <Text>Получай подарок к каждому заказу</Text>

        <Flex
          flexDirection="column"
          justifyContent="center"
          gap="10px"
        >
          <Box>
            <Link
              style={{ textDecoration: "none" }}
              href="https://www.apple.com/ru/app-store/"
              isExternal
            >
              <Button
                bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                justifyContent="left"
                borderRadius="20px"
                _hover={{ bgGradient: "linear(to-r, #6E72FC, #AD1DEB)" }}
                w="100%"
              >

                <Box margin="0px 10px 0px 0px">
                  <BsApple />
                </Box>


                <Text color="whiteAlpha.900">
                  Загрузить в App Store
                </Text>

              </Button>
            </Link>
          </Box>

          <Box>
            <Link
              style={{ textDecoration: "none" }}
              href="https://play.google.com/store/games?hl=ru&gl=US&pli=1"
              isExternal
            >
              <Button
                bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                _hover={{ bgGradient: "linear(to-r, #6E72FC, #AD1DEB)" }}
                justifyContent="left"
                borderRadius="20px"
                w="100%"
              >
                <Box margin="0px 10px 0px 0px">
                  <BsGooglePlay />
                </Box>

                <Text color="whiteAlpha.900">
                  Загрузить в Google Play
                </Text>
              </Button>
            </Link>
          </Box>

        </Flex>

        <Flex justifyContent="center" gap="20px">

          <Link
            isExternal
            href="https://vk.com/5fs4d3j2"
          >
            <IconButton
              bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
              borderRadius="50%"
              w="50px"
              h="50px"
            >
              <SlSocialVkontakte color="black" />
            </IconButton>
          </Link>

          <Link
            isExternal
            href="https://t.me/rskullw"
          >
            <IconButton
              bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
              borderRadius="50%"
              w="50px"
              h="50px"
            >
              <FaTelegramPlane />
            </IconButton>
          </Link>

        </Flex>

      </Flex>

    </Flex>
  )
}

export default FooterMainPart