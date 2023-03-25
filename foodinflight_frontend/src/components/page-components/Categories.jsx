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
} from "@chakra-ui/react";

const Categories = () => {

  const [allCategories, setAllCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);

  useEffect(() => {
    const getCategories = async() => {
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

    getCategories();

  }, [])

  return (
    <Box 
      className="category" 
      margin="20px 0px 0px 0px"
    >
      <Center area={`header`}>
        <Heading as="h1" size="2xl">Категории</Heading>
      </Center>

      <Wrap justify="center" margin="20px 0px">
      {
        allCategories.map((category) => (
          <WrapItem>
            <Card 
              maxW="295px" 
              shadow="md"
              _hover={{opacity:"0.8"}}
            >

              <CardBody p="0 !important">
                <Box>
                  <Link 
                    href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/categories/${category.slug}`} 
                    style={{textDecoration: "none"}}
                  >
                    <Box textAlign="center" textColor="whiteAlpha.900" fontSize="lg">
                      <Image 
                        src={category.image}
                        borderRadius="0.375rem 0.375rem 0.375rem 0.375rem"
                        margin="0px 0px -27px 0px"
                      />

                      {category.title}

                    </Box>
                  </Link>
                </Box>
              </CardBody>

            </Card>
          </WrapItem>
        ))
      }
      </Wrap>
    </Box>
  )
}

export default Categories



