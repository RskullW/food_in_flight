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
  Spacer,
  Flex
} from "@chakra-ui/react";
import AddToCartButton from "./AddToCartButton";

const PopularCategory = () => {
  const [isLoading, setIsLoading] = useState([]);
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
        const filteredProducts = productsData.filter((product) => product.is_popular)
        setAllProducts(filteredProducts);
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

                <AddToCartButton />

              </CardFooter>

            </Card>

          </WrapItem>
    
        )  
        )
      }
      </Wrap>

    </Box>
  )
}

export default PopularCategory