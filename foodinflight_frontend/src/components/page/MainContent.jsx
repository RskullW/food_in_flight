import React from "react";
import { Grid} from "@chakra-ui/react";
import Navbar from "./Navbar";
import MainPart from "./MainPart";

const MainContent = () => {
  return (
    <Grid
      className="main-content"
      position="relative"
      top="70px"
      templateColumns="repeat(12, 1fr)"
      gap="2%"
    >
      <Navbar />
      <MainPart />
    </Grid>
  )
}

export default MainContent