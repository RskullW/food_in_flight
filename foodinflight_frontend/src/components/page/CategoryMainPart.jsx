import React, { useState, useEffect } from "react";
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
  Button
} from "@chakra-ui/react"

import {BiArrowBack} from "react-icons/bi"

const CategoryMainPart = () => {

  const [allCategories, setAllCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productsError, setProductsError] = useState(false);

  

  useEffect(() => {
    const getData = async() => {
      const productsResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/products/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (productsResponse.status === 200) {
        const productsData = await productsResponse.json();
        setAllProducts(productsData);
      } else {
        setProductsError(true);
      }
    }

    const getCategories = async () => {
      const categoriesResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/categories/`, {
        method: "GET",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }
      })


      if (categoriesResponse.status === 200) {
        const categoriesData = await categoriesResponse.json();
        setAllCategories(categoriesData);
      } else {
        setCategoriesError(true);
      }
    }

    getData();
    getCategories();
  }, [])

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

        {
          allCategories.map((category) => (
            (`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/categories/${category.slug}` === window.location.href) ? (
              <Heading 
                as="h2" 
                fontSize="2xl"
                p="10px 0px 0px 0px"
              >
                {category.title}
              </Heading>
            ) : null
          ))
        } 

      </Box>

      <Wrap justify="center" margin="20px 0px" p="5px">
      {
        allProducts.map((product) => (
          (`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/categories/${product.category.slug}` === window.location.href) ? (
            <Box>
              <WrapItem>
                <Card 
                  maxW="296px" 
                  h="320px" 
                  mb="15px"
                  shadow="lg"
                  transition="200ms ease-out"
                  _hover={{shadow:"md", h:"318px"}}
                >

                  <CardBody p="0px">
                    <Box>
                      <Link 
                        href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/${product.category.slug}/${product.slug}`} 
                        style={{textDecoration: "none"}}
                      >
                        <Box textAlign="left">
                          <Image 
                            src={product.images[0]?.image}
                            borderRadius="0.375rem 0.375rem 0rem 0rem"
                            margin="0px 0px 3px 0px"
                            transition="200ms"
                            _hover={{opacity:"0.8"}}
                          />

                          <Text p="10px 0px 0px 10px" fontWeight="500">{product.title}</Text>
                                    
                        </Box>
                      </Link>
                    </Box>
                  </CardBody>

                  <CardFooter alignItems="center" padding="0px 10px 10px 10px">
                    <Text fontWeight="700">{product.price}₽</Text>

                    <Spacer/>

                    <Button
                      textColor="whiteAlpha.900"
                      bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                      _hover={{bgGradient: "linear(to-t, #6E72FC, #AD1DEB)"}}
                    >
                      В корзину
                    </Button>

                  </CardFooter>

                </Card>

              </WrapItem>
            </Box>
            
          ) : null
        ))
      }
      </Wrap>
    </Box>
  )
}

export default CategoryMainPart