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
    <Box className="category" border="2px solid blue" margin="50px 20px 0px 20px">
      <Center area={`header`}>
        <Heading as="h2">Категории</Heading>
      </Center>

      <Wrap justify="center" margin="20px 0px">
      {
        allCategories.map((category) => (
          <WrapItem>
            <Card maxW="300px">
              <CardBody p="0 !important">
                <Box>
                  <Link 
                    href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/${category.slug}`} 
                    style={{textDecoration: "none"}}
                  >
                    <Box textAlign="center" textColor="white">
                      <Image 
                        src={category.image}
                        borderRadius="0.375rem 0.375rem 0.375rem 0.375rem"
                        margin="0px 0px -24px 0px"
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



