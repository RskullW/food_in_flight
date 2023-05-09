import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Center, Spacer, Link, Button } from "@chakra-ui/react";
import EnterAlertDialog from "../page-components/EnterAlertDialog";
import SearchBar from "../page-components/SearchBar";
import AdressBar from "../page-components/AdressBar";
import CartButton from "../page-components/CartButton";


const Header = () => {

  let [logoSrc, setLogoSrc] = useState("/icons/full-logo.png");

  useEffect(() => {
    if (window.innerWidth < 992) {
      setLogoSrc("/icons/logo.png");
    }
  }, [])

  return (
    <Flex
      className="header"
      position="fixed"
      top='0'
      zIndex="100000"
      bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
      h={{ xl: "70px", lg: "70px", md: "70px", sm: "70px" }}
      w="100%"
      borderBottom="1px solid rgba(0, 0, 0, 0.15)"
      p={{ xl: "0px 20px", lg: "0px 10px", md: "0px 10px", sm: "0px 10px" }}
    >

      <Flex>
        <Link
          href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/`}
        >
          <Center
            className="header__logo"
            minW={{xl:"120px", lg:"120px", md:"80px", sm:"80px"}}
            h="100%"
            display="block"
            mr={{ xl: "90px", lg: "40px", md: "10px", sm: "10px" }}
          >
            <Image
              src={logoSrc}
              h="100%"
              maxW="100%"
              alt="logo"
            />
          </Center>
        </Link>
        <Center 
          mr={{xl:'90px', lg:'50px', md:'10px', sm:'10px'}}
        >
          <SearchBar />
        </Center>
      </Flex>


      <Spacer />

      <Flex>
        <CartButton />

        <Center 
          m={{xl:"0px 0px 0px 90px", lg:"0px 0px 0px 90px", md:"0px 0px 0px 10px", sm:"0px 0px 0px 10px"}}
        >
          <EnterAlertDialog />
        </Center>

      </Flex>


    </Flex>
  )
}

export default Header;