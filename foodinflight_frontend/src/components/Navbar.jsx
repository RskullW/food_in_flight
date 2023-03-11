import React from "react";
import {GridItem, Box, Link} from "@chakra-ui/react";
import { CATEGORIES, GROUP_CATEGORIES } from "../data/Categories";

const Navbar = () => {
  return (
    <GridItem className="nav-bar" colSpan="2" borderRight="1px solid rgba(0, 0, 0, 0.15)">
        <Box margin="20px 0px 100px 20px">
          {
            CATEGORIES.map((CATEGORIE) => (
              <Box margin="10px 0px">
                <Link style={{textDecoration: "none"}}>{CATEGORIE.title}</Link>
              </Box>
            ))
          }
        </Box>
        <Box margin="20px 0px 0px 20px">
          {
            GROUP_CATEGORIES?.map((GROUP_CATEGORIE) => (
              <Box margin="20px 0px">
                <Link style={{textDecoration: "none"}}>{GROUP_CATEGORIE.title}</Link>
              </Box>
            ))
          }
        </Box>
      </GridItem>
  )
}

export default Navbar