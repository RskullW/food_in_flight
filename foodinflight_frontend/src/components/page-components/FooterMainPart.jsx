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
      const url = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}/api/cuisines/`;
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
    <Grid className="footer" gridTemplateColumns="repeat(3,1fr)" margin="70px 20px 20px 20px">
      <GridItem className="footer__nav-menu">
        <Heading>Кухни</Heading>
        {
          allCuisines.map((cuisine) => (
            <List>

              <Link 
                style={{textDecoration: "none"}}
                href={`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:3000/cuisines/${cuisine.slug}`}
              >

                <ListItem margin="20px 0px">
                  {cuisine.title}
                </ListItem>
                  
              </Link>

            </List>
          ))
        }
      </GridItem>

      <GridItem className="footer__nav-menu">
        <Heading>Компания</Heading>
        <List>
          <ListItem>
            <Link>Наша Кухня</Link>
          </ListItem>
          <ListItem>
            <Link>Оплата</Link>
          </ListItem>
          <ListItem>
            <Link>Контакты</Link>
          </ListItem>
        </List>
      </GridItem>

      <GridItem className="footer__nav-item">
        <Wrap>
          <Heading>Заказывайте через мобильное приложение</Heading>
          <Text>Получай подарок к каждому заказу</Text>
          <Button className="footer__nav-links-app">Загрузить в App Store</Button>
          <Button className="footer__nav-links-app">Загрузить в Google Play</Button>
          <IconButton className="footer__nav-links-socials"></IconButton>
          <IconButton className="footer__nav-links-socials"></IconButton>
          <IconButton className="footer__nav-links-socials"></IconButton>
        </Wrap>
      </GridItem>
      
    </Grid>
  )
}

export default FooterMainPart