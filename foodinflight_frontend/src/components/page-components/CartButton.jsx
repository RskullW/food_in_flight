import React, { useEffect, useState } from "react";
import { useCartContext } from "../../contexts/CartContext";
import EnterAlertDialog from './EnterAlertDialog';
import {
  Center,
  Link,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Box,
  Spacer,
  Text,
  Heading,
  IconButton,
  Image,
  Wrap,
  WrapItem,
  Card,
  CardBody,
  CardFooter
} from "@chakra-ui/react"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import OrderDetailsAlertDialog from "./OrderDetailsAlertDialog";

const CartButton = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showOrderDetailsWindow, setShowOrderDetailsWindow] = useState(false);
  const [scrollBehavior] = React.useState('inside')
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState(false);
  const { onPlusToCart, onMinusFromCart, checkProductInCart, cartProducts, countTotalPrice, removeFromCart,
    checkLoggedIn, loggedIn, EnterAlertDialogOpen, setEnterAlertDialogOpen } = useCartContext();

  useEffect(() => {
    countTotalPrice();
    checkLoggedIn();
  }, [])
  

  const handleContinueButtonClick = () => {
    setShowOrderDetailsWindow(true);
  };

  useEffect(() => {
    const getData = async () => {
      const productsResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/products/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (productsResponse.status === 200) {
        const productsJSON = await productsResponse.json();
        setProducts(productsJSON);
      } else {
        setProductsError(true);
      }
    }

    getData();
  }, [cartProducts, productsError, loggedIn]);

  return (
    <>
      <Center>
        <Link style={{ textDecoration: "none" }}>
          <Button
            h="50px"
            w="150px"
            minW="fit-content"
            p="5px"
            leftIcon={<AiOutlineShoppingCart />}
            bgColor="white"
            fontSize="lg"
            borderRadius="10px"
            onClick={onOpen}
            bgGradient="none"
            transition="700ms"
            transitionDelay="bgColor linear"
            _hover={{
              bgColor: "#CDCDCD"
            }}
          >
            Корзина
            {
              cartProducts.length ? (
                <Box
                  textColor="whiteAlpha.900"
                  bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                  borderRadius="50%"
                  p="15px"
                  maxW="20px"
                  maxH="20px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  ml='5px'
                >
                  {cartProducts.length}
                </Box>
              ) : null
            }
          </Button>
        </Link>
      </Center>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        filter='auto'
        size="4xl"
        scrollBehavior={scrollBehavior}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>


            <AlertDialogHeader fontSize='3xl' fontWeight='bold' display='inline-block' alignContent='center'>
              <Flex alignItems="center">
                <Text>Корзина</Text>
                <Spacer />
                <IconButton icon={<GrClose />} bgColor="white" _hover={{ bgColor: "white" }} onClick={onClose} />
              </Flex>
            </AlertDialogHeader>

            <AlertDialogBody>
              {
                cartProducts.length ? (
                  <Flex flexDirection="column">
                    <Flex>
                      <Flex flexDirection="column">
                        <Heading as="h3" fontSize="xl" fontWeight="semibold">Ваш заказ</Heading>
                        <Wrap justify="left">
                          {
                            products?.map((product) => (
                              checkProductInCart(product) ? (
                                <WrapItem
                                  key={product.slug}
                                >
                                  <Card
                                    minW="570px"
                                    maxW='570px'
                                    h="100px"
                                    mb="15px"
                                    shadow="lg"
                                  >
                                    <Flex direction="row">
                                      <CardBody p="0px">
                                        <Flex textAlign="left">
                                          <Image
                                            src={(product.images[0]?.image == null ? "https://i.ibb.co/Px7bWvM/Image-Not-Loaded.png" : product.images[0]?.image)}
                                            borderRadius="0.375rem 0rem 0rem 0.375rem"
                                            objectFit="cover"
                                            maxH="100px"
                                            margin="0px 0px 3px 0px"
                                            transition="200ms"
                                            _hover={{ opacity: "0.8" }}
                                          />

                                          <Flex flexDirection="column">
                                            <Text p="10px 0px 0px 10px" fontWeight="500">{product.title}</Text>
                                            <Spacer />
                                            <Text p="5px 0px 0px 10px" textColor="blackAlpha.500" fontWeight="400">{product.weight}г</Text>
                                          </Flex>
                                        </Flex>
                                      </CardBody>

                                      <CardFooter alignItems="center" padding="0px 10px 10px 10px">
                                        <Flex direction="column">
                                          <Text fontWeight="700">{product.price}₽</Text>

                                          <Spacer />

                                          <Box
                                            bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                                            _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
                                            borderRadius="10px"
                                          >
                                            <Flex
                                              gap="10px"
                                              alignItems="center"
                                              h="-moz-min-content"
                                            >

                                              <Button
                                                onClick={() => onMinusFromCart(product.slug)}
                                                textColor="whiteAlpha.900"
                                                bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                                                _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
                                              >
                                                <HiOutlineMinus />
                                              </Button>

                                              <Text textColor="whiteAlpha.900">
                                                {cartProducts?.find(p => p.slug === product.slug)?.quantity}
                                              </Text>

                                              <Button
                                                onClick={() => onPlusToCart(product.slug)}
                                                textColor="whiteAlpha.900"
                                                bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                                                _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
                                              >
                                                <HiOutlinePlus />
                                              </Button>
                                            </Flex>
                                          </Box>
                                        </Flex>
                                        <Spacer />
                                        <Flex>
                                          <IconButton
                                            icon={<GrClose />}
                                            onClick={() => removeFromCart(product.slug)}
                                            bgColor="white"
                                            _hover={{ bgColor: "white" }}
                                          />
                                        </Flex>
                                      </CardFooter>
                                    </Flex>
                                  </Card>
                                </WrapItem>
                              ) : null
                            ))
                          }
                        </Wrap>
                      </Flex>

                      <Spacer />

                      <Flex flexDirection="column" alignItems="start">
                        
                          <Heading as="h3" fontSize="xl" fontWeight="semibold" whiteSpace="nowrap">К оплате</Heading>
                        
                        
                        
                          <Text as='b' fontSize='2xl' fontWeight="bold">
                            {
                              countTotalPrice() + ' ₽'
                            }
                          </Text>
                        
                      </Flex>
                    </Flex>

                    <Flex justifyContent="end" mt="20px">
                      {
                        loggedIn ? (
                          <>
                            <Button
                              onClick={handleContinueButtonClick}
                              textColor="whiteAlpha.900"
                              bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                              _hover={{ bgGradient: "linear(to-r, #6E72FC, #AD1DEB)" }}
                            >
                              Продолжить
                            </Button>
                            {
                              showOrderDetailsWindow && (
                                <OrderDetailsAlertDialog isOpen={true} onClose={() => { setShowOrderDetailsWindow(false); onClose() }} />
                              )
                            }
                          </>
                        ) : (
                          <EnterAlertDialog
                            isOpen={EnterAlertDialogOpen}
                            onClose={() => setEnterAlertDialogOpen(false)}
                          />
                        )
                      }
                    </Flex>
                  </Flex>
                ) : (
                  <Box textAlign="center" padding='0px 0px 30px 0px'>
                    <Text>Корзина пуста</Text>
                    <Text>Добавьте что-нибудь в корзину</Text>
                    <br />
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}`}
                      textColor="whiteAlpha.900"
                      bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                      _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
                      borderRadius="20px"
                      p="10px 40px"
                    >
                      В меню
                    </Link>
                  </Box>
                )
              }


            </AlertDialogBody>

          </AlertDialogContent>
        </AlertDialogOverlay>

      </AlertDialog>
    </>
  )
}

export default CartButton