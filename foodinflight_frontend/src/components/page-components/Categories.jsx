import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Link,
  Heading,
  Wrap,
  Center,
  WrapItem,
  Card,
  CardBody,
  Spinner
} from "@chakra-ui/react";

const Categories = () => {

  const [allCategories, setAllCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    Promise.all([getCategories()]).then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [])

  return (
    <Box
      className="category"
      margin="20px 0px 0px 0px"
    >
      <Center area={`header`}>
        <Heading as="h1" size="xl">Категории</Heading>
      </Center>

      <Wrap justify="center" margin="20px 0px" >
        {
          isLoading ? (
            <Spinner />
          ) : (
            allCategories.map((category) => (
              <WrapItem key={category.slug}>
                <Card
                  maxW="295px"
                  h="147px"
                  shadow="md"
                  _hover={{ opacity: "0.8" }}
                >

                  <CardBody p="0">
                    <Box>
                      <Link
                        href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/categories/${category.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Box textAlign="center" textColor="whiteAlpha.900" fontSize="xl">
                          <Image
                            src={category.image}
                            borderRadius="0.375rem 0.375rem 0.375rem 0.375rem"
                            margin="0px 0px -30px 0px"
                            objectFit="cover"
                          />

                          {category.title}

                        </Box>
                      </Link>
                    </Box>
                  </CardBody>

                </Card>
              </WrapItem>
            ))

          )
        }
      </Wrap>
    </Box>
  )
}

export default Categories



