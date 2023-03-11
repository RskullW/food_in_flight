import React from "react";
import { Grid, GridItem, Box, Text, Link, textDecoration, Heading } from "@chakra-ui/react";
import Navbar from "./Navbar";
import MainPart from "./MainPart";

const MainContent = () => {
  return (
    <Grid className="main-content" templateColumns="repeat(12, 1fr)" gap="2%" minH="calc(100vh - 80px)">
      <Navbar />
      <MainPart />
    </Grid>
  )
}

export default MainContent