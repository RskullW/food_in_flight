import React from "react";
import { Grid, GridItem, Text, Image } from "@chakra-ui/react";


const Header = () => {
  return (
    <Grid className="header" templateColumns="repeat(6, 1fr)" templateRows="repeat(4, 1fr)" gap="10%" h="80px" borderBottom="1px solid rgba(0, 0, 0, 0.15)" padding="10px 20px">
      <GridItem className="header__logo" colSpan="1" rowStart="1" rowSpan={4} border="1px solid red">
        <Image src="/full-logo.png"></Image>
      </GridItem>

      <GridItem className="header__search-bar" colSpan="2" rowStart="2" rowSpan={2} border="1px solid red">
        <Text>Search-bar</Text>
      </GridItem>

      <GridItem className="header__adress-bar" colSpan="2" rowStart="2" rowSpan={2} border="1px solid red">
        <Text>adress-bar</Text>
      </GridItem>

      <GridItem className="header__enter-account" colSpan="1" rowStart="2" rowSpan={2} border="1px solid red">
        <Text>enter-account</Text>
      </GridItem>
    </Grid>
  )
}

export default Header;