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
  Button,
  Flex
} from "@chakra-ui/react"

import {BiArrowBack} from "react-icons/bi"
import AddToCartButton from "../page-components/AddToCartButton";

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

      </Box>

      <Flex justify="flex-start" margin="20px 0px" p="0px 0px 0px 20px">
      {
        allProducts.map((product) => (
          (`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/${product.category.slug}/${product.slug}` === window.location.href) ? (
            
            <Flex gap="50px">
              <Box 
                className="product__image-block"
              >
                <Image 
                  src={product.images[0]?.image}
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

                  <AddToCartButton />
                  
                </Flex>

              </Flex>
            </Flex>
            
          ) : null
        ))
      }
      </Flex>
    </Box>
  )
}

export default CategoryMainPart