import React from "react";
import { Grid, GridItem, Box, Image, Link} from "@chakra-ui/react";
import { CATEGORIES } from "../data/Categories";

const MainPart = () => {
  return (
    <GridItem className="main-part" colSpan="10" border="1px solid black" borderRadius="10px" margin="20px 20px 20px 0px">
      <Box className="carousel" border="2px solid blue" margin="20px">
        <Image src="/favicon.ico"></Image>
      </Box>
      <Grid className="category" gridTemplateColumns="repeat(4, 1fr)" gap="25px" border="2px solid blue" margin="20px">
        {
          CATEGORIES.map((CATEGORIE) => (
            <GridItem display="block" border="5px solid pink">
              <Link style={{textDecoration: "none"}}>{CATEGORIE.title}</Link>
            </GridItem>
          ))
        }
      </Grid>
      <Grid className="popular-category" border="2px solid blue" margin="20px"></Grid>
      <Box className="extra-info" border="2px solid blue" margin="20px"></Box>
      <Grid className="footer" border="2px solid blue" margin="20px"></Grid>
    </GridItem>
  )
  
}

export default MainPart