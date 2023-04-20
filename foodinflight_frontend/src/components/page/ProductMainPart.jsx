import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { CartContext, useCartContext } from "../../contexts/CartContext"
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi"
import {
  Box,
  Text,
  Heading,
  Link,
  Image,
  Button,
  Flex
} from "@chakra-ui/react"

import {BiArrowBack} from "react-icons/bi"

const CategoryMainPart = () => {

  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(null);
  const [productError, setProductError] = useState(null);
  const { productName } = useParams();
  const { onAddToCart, onPlusToCart, onMinusFromCart, onRemoveFromCart, cartProducts, } = useCartContext();

  useEffect(() => {
    const getData = async () => {
      const productResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/products/${productName}/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (productResponse.status === 200) {
        const productData = await productResponse.json();
        setProduct(productData);
        setProductError(false);

      } else {
        setProductError(true);
      }
    }

    getData();

    const productInCart = cartProducts.find((product) => product.slug === productName);
    setIsInCart(productInCart ? true : false);

  }, [productError, isInCart, cartProducts])

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

      </Box>
      { product ? (
        <Flex justify="flex-start" margin="20px 0px" p="0px 0px 0px 20px">
          <Flex gap="50px">
            <Box 
              className="product__image-block"
            >
              <Image 
                src={product?.images[0]?.image}
                borderRadius="0.375rem 0.375rem 0.375rem 0.375rem"
                h="500px"
                w="100%"
                objectFit="cover"
              >

              </Image>
            </Box>

            <Flex
              className="product__info"
              flexDirection="column"
            >

              <Box>
                <Heading as="h2" fontSize="3xl">
                  {product.title}
                </Heading>
              </Box>
              
              <Box p="20px 0px 0px 0px">
                <Text>
                  {product.weight} г
                </Text>
              </Box>

              <Box p="20px 0px 0px 0px">
                <Text>
                  {product.description}
                </Text>
              </Box>

              <Box p="20px 0px 0px 0px">
                <Heading as="h3" fontSize="xl">
                  Состав
                </Heading>
                <Text>
                  {product.composition}
                </Text>
              </Box>

              <Box p="20px 0px 0px 0px">
                <Heading as="h3" fontSize="xl">
                  Пищевая ценность на 100 г
                </Heading>
              </Box>

              <Flex gap="20px">
                <Box>
                  <Text textColor={"gray.400"}>Белки</Text>
                  <Text>{product.proteins} г</Text>
                </Box>
                <Box>
                  <Text textColor={"gray.400"}>Жиры</Text>
                  <Text>{product.fats} г</Text>
                </Box>
                <Box>
                  <Text textColor={"gray.400"}>Углеводы</Text>
                  <Text>{product.carbohydrates} г</Text>
                </Box>
                <Box>
                  <Text textColor={"gray.400"}>Энерг. ценность</Text>
                  <Text>{product.calories} кКал</Text>
                </Box>
              </Flex>

              <Flex gap="50px" p="50px 0px 0px 0px" alignItems="center">

                <Box>
                  <Text fontWeight="500" fontSize="24px">{product.price}₽</Text>
                </Box>

                <Box 
                  bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                  _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
                  borderRadius="10px"
                >
                  {
                    isInCart ? (
                      <Flex 
                        gap="10px"
                        alignItems="center"
                        h="-moz-min-content"
                      >

                        <Button
                          onClick={() => onMinusFromCart(productName)}
                          textColor="whiteAlpha.900"
                          bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                          _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
                        >
                          <HiOutlineMinus />
                        </Button>

                          <Text textColor="whiteAlpha.900">
                            { cartProducts?.find(p => p.slug === productName)?.quantity }
                          </Text>
                            
                          <Button
                            onClick={() => onPlusToCart(productName)}
                            textColor="whiteAlpha.900"
                            bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                            _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
                          >
                            <HiOutlinePlus />
                          </Button>
                        </Flex>
                      ) : (
                        <Button 
                          onClick={() => { onAddToCart(product); setIsInCart(true); }}
                          textColor="whiteAlpha.900"
                          bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                          _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
                        >
                          В корзину
                        </Button>
                      )
                  }
                </Box>  
              </Flex>
            </Flex>
          </Flex> 
        </Flex>
      ) : null }
    </Box>
  )
}

export default CategoryMainPart