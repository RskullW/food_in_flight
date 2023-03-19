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
  Divider,
  Spacer
} from "@chakra-ui/react";

const PopularCategory = () => {

  const [allProducts, setAllProducts] = useState([]);
  const [productsError, setProductsError] = useState(false);

  useEffect(() => {
    const getData = async() => {
      const productsResponse = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:8000/api/products/`, {
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
    <Box className="popular-category" border="2px solid blue" margin="100px 20px 0px 20px">

      <Center className="popular-category__header" area={`header`}>
        <Heading as="h2">Популярное</Heading>
      </Center>

      <Wrap justify="center" margin="20px 0px">
      {
        allProducts.map((product) => (
          product.is_popular ? (
            <WrapItem 
              className="popular-category__item"
            >
              <Card maxW="300px" minH="335px">
                <CardBody p="0 !important">
                  <Box>
                    <Link 
                      href={`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:3000/products/${product.slug}`} 
                      style={{textDecoration: "none"}}
                    >
                      <Box textAlign="center">

                        <Image 
                          src={product.images[0]?.image}
                          borderRadius="0.375rem 0.375rem 0rem 0rem"
                          margin="0px 0px 10px 0px"
                        />

                        {product.title}

                        <Divider margin="10px 0px 10px 0px"/>
                            
                      </Box>
                    </Link>
                  </Box>
                </CardBody>

                <CardFooter alignItems="center">
                  <Text>{product.price}₽</Text>

                  <Spacer/>

                  <Button>В корзину</Button>
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