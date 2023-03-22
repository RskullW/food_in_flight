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
    <Box className="popular-category" border="2px solid blue" margin="100px 20px 0px 20px">

      <Center className="popular-category__header" area={`header`}>
        <Heading as="h2">Популярное</Heading>
      </Center>

      <Wrap justify="center" margin="40px 0px" p="5px">
      {
        allProducts.map((product) => (
          product.is_popular ? (
            <WrapItem 
              className="popular-category__item"
            >
              <Card maxW="300px" h="350px" maxH="350px" shadow="base">
                <CardBody p="0px">
                  <Box>
                    <Link 
                      href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/products/${product.slug}`} 
                      style={{textDecoration: "none"}}
                    >
                      <Box textAlign="left">

                        <Image 
                          src={product.images[0]?.image}
                          borderRadius="0.375rem 0.375rem 0rem 0rem"
                          margin="0px 0px 5px 0px"
                        />

                        <Text p="10px 0px 0px 20px">{product.title}</Text>
                            
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