import React, { useState, useEffect } from "react";
import { Grid, GridItem, Box, Image, Link, Heading, Wrap, Center, WrapItem, Text, Button, List, ListItem, IconButton} from "@chakra-ui/react";
import { CATEGORIES } from "../data/Categories";
import { POPULAR_CATEGORIES } from "../data/PopularCategories";
import { KITCHENS } from "../data/Kitchens";

const MainPart = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productsError, setProductsError] = useState(false);

  useEffect(() => {
    const getData = async() => {
      const productsResponse = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:8000/api/products/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (productsResponse.status == 200) {
        const productsData = await productsResponse.json();
        setAllProducts(productsData);
      } else {
        setProductsError(true);
      }
    }
    getData();
  }, []);

  return (
    <GridItem className="main-part" colSpan="10" border="1px solid black" borderRadius="10px" margin="20px 20px 20px 0px">
      <Box className="carousel" border="2px solid blue" margin="20px">
        <Image src="/favicon.ico"></Image>
      </Box>
      <Box className="category" border="2px solid blue" margin="50px 20px 0px 20px" padding="20px 0px">
        <Wrap justify="center" margin="20px 0px">
          {
          CATEGORIES.map((CATEGORIE) => (
            <WrapItem border="5px solid pink" w="200px">
              <Link style={{textDecoration: "none"}}>{CATEGORIE.title}</Link>
            </WrapItem>
          ))
        }
        </Wrap>
      </Box>
      <Box className="popular-category" border="2px solid blue" margin="100px 20px 0px 20px">
        <Center className="popular-category__header" area={`header`}>
          <Heading as="h2">Популярное</Heading>
        </Center>
        <Wrap justify="center" margin="20px 0px">
          {
          allProducts.map((product) => (
            <WrapItem className="popular-category__item" area={`item`} border="5px solid pink" w="250px">
              <Link style={{textDecoration: "none"}}>{product.title}</Link>
              <Image src={product.images[0]?.image} />
            </WrapItem>
          ))
        }
        </Wrap>
      </Box>
      <Box className="extra-info" border="2px solid blue" margin="20px">
        <Wrap className="extra-info__image-block" justify="center" border="5px solid pink" margin="20px 0px 0px 0px" padding="20px 0px">
          <WrapItem>
            <Image src="/favicon.ico" objectFit="cover"></Image>
          </WrapItem>
          <WrapItem>
            <Text> Во главе каждой из наших кухонь стоят повара, которые живут своей работой, вкладывают душу.</Text>
          </WrapItem>
          <WrapItem>
            <Button>Узнать больше</Button>
          </WrapItem>
        </Wrap>

        <Box className="extra-info__article-block" margin="50px 0px" padding="20px 0px">
          <Heading as="h1" margin="20px 0px 0px 0px">Бесплатная доставка еды 24 часа домой и в офис</Heading>
          <Text margin="20px 0px 0px 0px">Представьте, что специально для вас трудятся квалифицированные повара. Они замешивают душистое тесто, делают оригинальные соусы. Изысканные десерты, закуски становятся шедеврами в руках настоящих мастеров. Вы можете попробовать новое блюдо или заказать что-то традиционное. Совсем не обязательно искать поваренную книгу, хорошее заведение рядом с домом или работой. Идеальный обед, перекус или ужин гораздо ближе, чем вы думаете.</Text>
          <Heading as="h2" margin="20px 0px 0px 0px">Заказать еду на дом</Heading>
          <Text margin="20px 0px 0px 0px">Чем еще мы можем порадовать своих клиентов? Например, круглосуточной доставкой еды по Санкт-Петербургу. Если настигнет голод, мы готовы решить эту проблему с помощью наших логистических и кулинарных возможностей. Мы с удовольствием доставим вам первые и вторые блюда, десерты, суши, снеки и напитки, приготовленные по рецептам русской, итальянской, японской и осетинской кухонь. Кроме традиционных национальных, у наших шеф-поваров есть собственные кулинарные рецепты, которые непременно стоит попробовать.</Text>
        </Box>
      </Box>
      <Grid className="footer" gridTemplateColumns="repeat(3,1fr)" border="2px solid blue" margin="20px">
        <GridItem className="footer__nav-menu">
          <Heading>Кухни</Heading>
          <List>
            {
              KITCHENS.map((KITCHEN) => (
                <ListItem>
                  <Link>{(KITCHEN.title)}</Link>
                </ListItem>
              ))
            }
          </List>
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
    </GridItem>
  )
  
}

export default MainPart