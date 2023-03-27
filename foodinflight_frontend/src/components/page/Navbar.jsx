import React, { useEffect, useState } from "react";
import {Box, Link} from "@chakra-ui/react";


const Navbar = () => {
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

    getCategories();
    getGroupCategories();
  }, [])


  return (
    <Box className="nav-bar" width="15%" borderRight="1px solid rgba(0, 0, 0, 0.1)"
      display={{ base: 'none', lg: 'block' }}
      bgGradient="linear(to-r, #EEEEEE, #F8F9E2)"
    >
      <Box margin="0px 0px 100px 20px">
        {
          allCategories.map((category) => (
            <Box margin="15px 0px">
              <Link href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/categories/${category.slug}`}
                style={{ textDecoration: "none" }}
              >
                {category.title}
              </Link>
            </Box>
          ))
        }
      </Box>

      <Box margin="20px 0px 100px 20px">
        {
          allGroupCategories.map((groupCategory) => (
            <Box margin="15px 0px">
              <Link
                style={{ textDecoration: "none" }}
                href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/group_categories/${groupCategory.slug}`}
              >
                {groupCategory.title}
              </Link>
            </Box>
          ))
        }

      </Box>
    </Box>
  )
}

export default Navbar