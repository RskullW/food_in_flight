import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Box,
  Image,
  Link,
  Heading,
  Wrap,
  Center,
  WrapItem,
  Text,
  Button,
  List,
  ListItem,
  IconButton,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Spacer
} from "@chakra-ui/react";

import Categories from "../page-components/Categories";
import PopularCategory from "../page-components/PopularCategory";
import Carousel from "../page-components/Carousel";
import ExtraInfo from "../page-components/ExtraInfo";
import FooterMainPart from "../page-components/FooterMainPart";


const MainPart = () => {
  return (
    <GridItem
      className="main-part"
      colSpan="10"
      border="1px solid black"
      borderRadius="10px"
      margin="20px 20px 20px 0px"
    >

      <Carousel />

      <Categories />

      <PopularCategory />

      <ExtraInfo />

      <FooterMainPart />

    </GridItem>
  )

}

export default MainPart