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

const FooterMainPart = () => {
  const [allCuisines, setAllCuisines] = useState([]);
  const [cuisinesError, setCuisinesError] = useState(false);

  useEffect(() => {

    const getCuisinesData = async() => {
      const url = `${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/cuisines/`;
      const cuisinesResponse = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      })
      
      if (cuisinesResponse.status === 200) {
        const cuisinesData = await cuisinesResponse.json();
        setAllCuisines(cuisinesData);
      } else {
        setCuisinesError(true);
      }

      console.log(cuisinesResponse);
    }

    getCuisinesData();
  }, []);

  return (
    <Grid className="footer" gridTemplateColumns="repeat(3,1fr)" m="100px 20px 20px 20px" p="20px 0px 0px 0px" borderTop="1px solid rgba(0, 0, 0, 0.15)">
      <GridItem className="footer__nav-menu">
        <Heading m="0px 0px 15px 0px">Кухни</Heading>
        {
          allCuisines.map((cuisine) => (
            <List p="5px 0px">

              <Link 
                style={{textDecoration: "none"}}
                href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/cuisines/${cuisine.slug}`}
              >

                <ListItem>
                  {cuisine.title}
                </ListItem>
                  
              </Link>

            </List>
          ))
        }
      </GridItem>

      <GridItem className="footer__nav-menu">
        <Heading m="0px 0px 15px 0px">Компания</Heading>
        <List >
          <ListItem p="5px 0px">
            <Link>Наша Кухня</Link>
          </ListItem>
          <ListItem p="5px 0px">
            <Link>Оплата</Link>
          </ListItem>
          <ListItem p="5px 0px">
            <Link>Контакты</Link>
          </ListItem >
        </List>
      </GridItem>

      <GridItem className="footer__nav-item">
        <Wrap>
          <Heading>Заказывайте через мобильное приложение</Heading>
          <Text>Получай подарок к каждому заказу</Text>
          <Button 
            bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
          >
            Загрузить в App Store
          </Button>

          <Button 
            bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
          >
            Загрузить в Google Play
          </Button>

          <IconButton 
            bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
          >

          </IconButton>

          <IconButton 
            bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
          >

          </IconButton>
          
          <IconButton 
            bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
          >

          </IconButton>
        </Wrap>
      </GridItem>
      
    </Grid>
  )
}

export default FooterMainPart