import React, { useEffect, useState } from "react";
import {GridItem, Box, Link, Text} from "@chakra-ui/react";

const Navbar = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [allGroupCategories, setAllGroupCategories] = useState([]);
  const [groupCategoriesError, setGroupCategoriesError] = useState(false);

  useEffect(() => {
    const getCategories = async() => {
      const categoriesResponse = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:8000/api/categories/`, {
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

    const getGroupCategories = async() => {
      const groupCategoriesResponse = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:8000/api/group_categories/`, {
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
    <GridItem className="nav-bar" colSpan="2" borderRight="1px solid rgba(0, 0, 0, 0.15)">
        <Box margin="20px 0px 100px 20px">
          {
            allCategories.map((category) => (
              <Box margin="15px 0px">
                <Link href={`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:3000/categories/${category.slug}`} 
                style={{textDecoration: "none"}}
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
              style={{textDecoration: "none"}}
              href={`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:3000/group-categories/${groupCategory.slug}`}
              >
                {groupCategory.title}
              </Link>
            </Box> 
            )) 
          }
          
        </Box>
      </GridItem>
  )
}

export default Navbar