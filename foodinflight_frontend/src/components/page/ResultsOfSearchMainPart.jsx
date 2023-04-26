import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import {
  Box,
  Text,
  Heading,
  Wrap,
  WrapItem,
  Card,
  CardBody,
  CardFooter,
  Link,
  Image,
  Spacer,
  Button,
  Flex
} from "@chakra-ui/react"

import { BiArrowBack } from "react-icons/bi"
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";


const ResultsOfSearchMainPart = () => {

  const [allProducts, setAllProducts] = useState([]);
  const [productsError, setProductsError] = useState(false);
  const { onAddToCart, onPlusToCart, onMinusFromCart, checkProductInCart, cartProducts } = useCartContext();
  const { queryName } = useParams();

  useEffect(() => {
    const getProducts = async() => {
      try {
        const productsResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/products/`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json"
          }
        })
  
        if (productsResponse.status === 200) {
          const productsJSON = await productsResponse.json();
          const filteredProducts = productsJSON.filter((product) => product.title.toLowerCase().includes(queryName));
          setAllProducts(filteredProducts);
          console.log(allProducts.length);
        } else {
          setProductsError(true);
        }
      } catch (error) {
        setProductsError(true);
      }
    }

    getProducts();
  }, [queryName, cartProducts])

  return (
    <Box margin="10px 0px 0px 0px">

      <Box p="0px 0px 0px 20px">
        <Link
          style={{textDecoration:"none"}}
          href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}`}
        >
          <Button
            bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
            iconSpacing="0px 10px 0px 0px"
            leftIcon={<BiArrowBack />}
            textColor="black"
          >
            <Text>Главная</Text>
          </Button>
        </Link>

        
        <Heading 
          as="h2" 
          fontSize="2xl"
          p="10px 0px 0px 0px"
        >
          Результаты поиска
        </Heading>

      </Box>

      { 
        allProducts.length > 0 ? (
          <Wrap justify="center" margin="20px 0px" p="5px">
          {
            allProducts.map((product) => (
              <Box>
                <WrapItem>
                  <Card 
                    maxW="296px" 
                    h="340px" 
                    mb="15px"
                    shadow="lg"
                    transition="200ms ease-out"
                    _hover={{shadow:"md", h:"338px"}}
                  >

                    <CardBody p="0px">
                      <Box>
                        <Link 
                          href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/${product.category.slug}/${product.slug}`} 
                          style={{textDecoration: "none"}}
                        >
                          <Box textAlign="left">
                            <Image 
                              src={(product.images[0]?.image == null ? "https://i.ibb.co/Px7bWvM/Image-Not-Loaded.png" : product.images[0]?.image)}
                              borderRadius="0.375rem 0.375rem 0rem 0rem"
                              objectFit="cover"
                              maxH="200px"
                              margin="0px 0px 3px 0px"
                              transition="200ms"
                              _hover={{opacity:"0.8"}}
                            />

                            <Flex flexDirection="column">
                              <Text p="10px 0px 0px 10px" fontWeight="500">{product.title}</Text>
                              <Spacer/>
                              <Text p="5px 0px 0px 10px" textColor="blackAlpha.500" fontWeight="400">{product.weight}г</Text>
                            </Flex>
                                        
                          </Box>
                        </Link>
                      </Box>
                    </CardBody>

                    <CardFooter alignItems="center" padding="0px 10px 10px 10px">
                      <Text fontWeight="700">{product.price}₽</Text>

                      <Spacer/>

                      <Box 
                        bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                        _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
                        borderRadius="10px"
                      >
                        {
                          checkProductInCart(product) ? (
                            <Flex 
                              gap="10px"
                              alignItems="center"
                              h="-moz-min-content"
                            >

                              <Button
                                onClick={() => onMinusFromCart(product.slug)}
                                textColor="whiteAlpha.900"
                                bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                                _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
                              >
                                <HiOutlineMinus />
                              </Button>

                                <Text textColor="whiteAlpha.900">
                                  { cartProducts?.find(p => p.slug === product.slug)?.quantity }
                                </Text>
                                  
                                <Button
                                  onClick={() => onPlusToCart(product.slug)}
                                  textColor="whiteAlpha.900"
                                  bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                                  _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
                                >
                                  <HiOutlinePlus />
                                </Button>
                              </Flex>
                          ) : (
                                <Button 
                                  onClick={() => { onAddToCart(product) }}
                                  textColor="whiteAlpha.900"
                                  bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                                  _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
                                >
                                  В корзину
                                </Button>
                          )
                        }
                      </Box>

                    </CardFooter>

                  </Card>

                </WrapItem>
              </Box>
                  
            ) 
            )   
          }
          </Wrap>
        ) : (
              <Flex flexDirection="column" justifyContent="center" margin="20px 20px" p="5px" gap="20px">
                <Box textAlign="center">
                  <Text>
                    Такого блюда у нас нет
                    <br/>
                    Уточните запрос или посмотрите меню
                  </Text>
                </Box>

                <Spacer />

                <Box textAlign="center">
                  <Link
                    style={{textDecoration:"none"}}
                    href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}`}
                    
                    textColor="whiteAlpha.900"
                    bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                    _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
                    borderRadius="20px"
                    textAlign="center"
                    p="10px 40px"
                  >
                    В меню
                  </Link>
                </Box>
              </Flex>
        )
      }
  
    </Box>
  )
}

export default ResultsOfSearchMainPart