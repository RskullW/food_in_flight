import React from "react";
import {
  Box
} from "@chakra-ui/react";

import Categories from "../page-components/Categories";
import PopularCategory from "../page-components/PopularCategory";
import Carousel from "../page-components/Carousel";
import ExtraInfo from "../page-components/ExtraInfo";
import FooterMainPart from "../page-components/FooterMainPart";


const MainPart = () => {
  return (
    <Box>

      <Categories />

      <PopularCategory />

      <ExtraInfo />

      <FooterMainPart />

    </Box>
  )

}

export default MainPart