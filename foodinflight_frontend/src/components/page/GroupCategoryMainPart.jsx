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
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi"

const CuisinesMainPart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [groupCategory, setGroupCategory] = useState(null);
  const [groupCategoryError, setGroupCategoryError] = useState(false);
  const [productsWithCertainGroupCategory, setAllProductsWithCertainGroupCategory] = useState([]);
  const [productsError, setProductsError] = useState(false);

  const { onAddToCart, onPlusToCart, onMinusFromCart, checkProductInCart, cartProducts } = useCartContext();
  const { groupCategoryName } = useParams();

  useEffect(() => {
    const getProductsWithCertainGroupCategory = async () => {
      try {
        const productsResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/products/`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (productsResponse.status === 200) {
          const productsJSON = await productsResponse.json();
          const filteredProducts = [];
          productsJSON.forEach((product) => {
            let filteredId = -1;
            for (let i = 0; i < product.group_categories.length; i++) {
              if (product.group_categories[i]?.slug === groupCategoryName) {
                filteredId = i;
                break;
              }
            }
            if (product.group_categories[filteredId]?.slug === groupCategoryName) {
              filteredProducts.push(product);
            }
          });
          setAllProductsWithCertainGroupCategory(filteredProducts);
        } else {
          setProductsError(true);
        }

      } catch (error) {
        setProductsError(true);
      }

    };

    const getGroupCategory = async () => {
      setIsLoading(true);
      try {
        const groupResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/group_categories/${groupCategoryName}/`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (groupResponse.status === 200) {
          const groupNameJSON = await groupResponse.json();
          setGroupCategory(groupNameJSON);
          setIsLoading(false);
        } else {
          setGroupCategoryError(true);
        }
      } catch (error) {
        setGroupCategoryError(true);
      }
    };

    getProductsWithCertainGroupCategory();
    getGroupCategory();

  }, [groupCategoryName, cartProducts]);


  return (
    <Box margin="10px 0px 0px 0px">

      <Box p="0px 0px 0px 20px">
        <Link
          style={{ textDecoration: "none" }}
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

        {
          groupCategory ? (
            <Heading
              as="h2"
              fontSize="2xl"
              p="10px 0px 0px 0px"
            >
              {groupCategory.title}
            </Heading>
          ) : null
        }

      </Box>

      <Wrap justify="center" margin="20px 0px" p="5px">
        {
          productsWithCertainGroupCategory.map((product) => (
            <WrapItem
              key={product.slug}
              className="popular-category__item"
            >
              <Card
                maxW="296px"
                h="340px"
                mb="15px"
                shadow="lg"
                transition="200ms ease-out"
                _hover={{ shadow: "md", h: "338px" }}
              >

                <CardBody p="0px">
                  <Box>
                    <Link
                      href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/${product.category.slug}/${product.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Box textAlign="left">

                        <Image
                          src={(product.images[0]?.image == null ? "https://i.ibb.co/Px7bWvM/Image-Not-Loaded.png" : product.images[0]?.image)}
                          borderRadius="0.375rem 0.375rem 0rem 0rem"
                          objectFit="cover"
                          maxH="200px"
                          margin="0px 0px 3px 0px"
                          transition="200ms"
                          _hover={{ opacity: "0.8" }}
                        />

                        <Flex flexDirection="row" alignItems="start">
                          <Text p="10px 0px 0px 10px" fontWeight="500" fontSize="lg">{product.title}</Text>
                          <Spacer />
                          <Text p="10px 10px 0px 10px" textColor="blackAlpha.500" fontWeight="400">{product.weight}г</Text>
                        </Flex>

                      </Box>
                    </Link>
                  </Box>
                </CardBody>

                <CardFooter alignItems="center" padding="0px 10px 20px 10px">
                  <Text fontWeight="700" fontSize="lg">{product.price}₽</Text>

                  <Spacer />

                  <Box
                    bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                    _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
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
                            _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
                          >
                            <HiOutlineMinus />
                          </Button>

                          <Text textColor="whiteAlpha.900" fontSize="lg">
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
                      ) : (
                        <Button
                          onClick={() => { onAddToCart(product) }}
                          textColor="whiteAlpha.900"
                          fontSize="lg"
                          bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                          _hover={{ bgGradient: "linear(to-b, #6E72FC, #AD1DEB)" }}
                        >
                          В корзину
                        </Button>
                      )
                    }
                  </Box>

                </CardFooter>

              </Card>

            </WrapItem>

          )
          )
        }
      </Wrap>
    </Box>
  );
};

export default CuisinesMainPart