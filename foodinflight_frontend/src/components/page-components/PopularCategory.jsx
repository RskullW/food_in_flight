import React, { useState, useEffect } from "react";
import { 
  Box, 
  Image, 
  Link, 
  Heading, 
  Wrap, 
  Center, 
  WrapItem, 
  Text, 
  Button, 
  Card,
  CardBody,
  CardFooter,
  Spacer
} from "@chakra-ui/react";

const PopularCategory = () => {

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

    getData();
  }, [])

  return (
    <Box className="popular-category" margin="50px 0px 0px 0px">

      <Center className="popular-category__header">
        <Heading as="h1" size="2xl">
          Популярное
        </Heading>
      </Center>

      <Wrap justify="center" margin="20px 0px" p="5px">
      {
        allProducts.map((product) => (
          product.is_popular ? (
            <WrapItem 
              className="popular-category__item"
            >
              <Card maxW="296px" h="320px" maxH="350px" shadow="lg">
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
                    bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                    textColor="whiteAlpha.900"
                    _hover={{bgColor: "none", bgGradient: "linear(to-t, #6E72FC, #AD1DEB)"}}
                  >
                    В корзину
                  </Button>

                </CardFooter>

              </Card>

            </WrapItem>
          ) : null
        )  
        )
      }
      </Wrap>

    </Box>
  )
}

export default PopularCategory