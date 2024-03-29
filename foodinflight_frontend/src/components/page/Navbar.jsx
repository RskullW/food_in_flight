import React, { useEffect, useState } from "react";
import {
  Box,
  Link,
  Text,
  Flex,
  Image,
  Spinner,
  Skeleton,
  Stack
} from "@chakra-ui/react";


const Navbar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [allGroupCategories, setAllGroupCategories] = useState([]);
  const [groupCategoriesError, setGroupCategoriesError] = useState(false);

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

    const getGroupCategories = async () => {
      const groupCategoriesResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/group_categories/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (groupCategoriesResponse.status === 200) {
        const groupCategoriesData = await groupCategoriesResponse.json();
        setAllGroupCategories(groupCategoriesData);
      } else {
        setGroupCategoriesError(true);
      }
    }

    Promise.all([getCategories(), getGroupCategories()]).then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    })
  }, [])


  return (
    <Box
      className="nav-bar"
      width={{ xl: "15%", lg: "20%", md: "0%", sm: "0%" }}
      borderRight="1px solid rgba(0, 0, 0, 0.1)"
      display={{ base: 'none', xl: 'block', lg: 'block' }}
      bgGradient="linear(to-r, #EEEEEE, #F8F9E2)"
    >
      {
        isLoading ? (
          <Stack flexDirection="column" m="10px 20px 0px 20px" spacing={4}>
              {
                allCategories.map((category) => (
                  <Skeleton key={category.slug} startColor="#E8DBFC" endColor="#F8F9D2" h="24px" />
                ))
              }
              {
                allGroupCategories.map((groupCategory) => (
                  <Skeleton key={groupCategory.slug} startColor="#E8DBFC" endColor="#F8F9D2" h="24px" />
                ))
              }
          </Stack>
        ) : (
          <>
            <Box margin="0px 0px 50px 20px">
              {
                allCategories.map((category) => (
                  <Box margin="15px 0px" key={category.slug}>
                    <Link href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/categories/${category.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Text color="blackAlpha.900" fontWeight="semibold" fontSize="lg">
                        {category.title}
                      </Text>
                    </Link>
                  </Box>
                ))
              }
            </Box>

            <Box margin="0px 0px 0px 20px">
              {
                allGroupCategories.map((groupCategory) => (
                  <Box margin="15px 0px" key={groupCategory.slug}>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/group_categories/${groupCategory.slug}`}
                    >
                      <Flex>
                        <Box>
                          <Image
                            src={groupCategory.icon}
                            objectFit="cover"
                            maxH="24px"
                            mr="3px"
                            borderRadius="50%"
                          />
                        </Box>
                        <Text color="blackAlpha.900" fontWeight="semibold" fontSize="lg">
                          {groupCategory.title}
                        </Text>
                      </Flex>
                    </Link>
                  </Box>
                ))
              }

            </Box>
          </>
        )
      }
    </Box>
  )
}

export default Navbar