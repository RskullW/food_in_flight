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


const MainPart = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productsError, setProductsError] = useState(false);
  const [allCuisines, setAllCuisines] = useState([]);
  const [cuisinesError, setCuisinesError] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);

  useEffect(() => {
    const getData = async() => {
      const productsResponse = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:8000/api/products/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (productsResponse.status === 200) {
        const productsData = await productsResponse.json();
        setAllProducts(productsData);
      } else {
        setProductsError(true);
      }
    }

    const getCuisinesData = async() => {
      const cuisinesResponse = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:8000/api/cuisines/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (cuisinesResponse.status === 200) {
        const cuisinesData = await cuisinesResponse.json();
        setAllCuisines(cuisinesData);
      } else {
        setCuisinesError(true);
      }
    }

    const getCategories = async() => {
      const categoriesResponse = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:8000/api/categories/`, {
        method: "GET",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        }
      })

  
      if (categoriesResponse.status === 200) {
        const categoriesData = await categoriesResponse.json();
        setAllCategories(categoriesData);
      } else {
        setCategoriesError(true);
      }
    }

    getData();
    getCuisinesData();
    getCategories();
  }, []);

  return (
    <GridItem className="main-part" colSpan="10" border="1px solid black" borderRadius="10px" margin="20px 20px 20px 0px">
      
      <Box className="carousel" border="2px solid blue" margin="20px">
        <Image src="/favicon.ico"></Image>
      </Box>

      <Box className="category" border="2px solid blue" margin="50px 20px 0px 20px">
        <Center area={`header`}>
          <Heading as="h2">Категории</Heading>
        </Center>

        <Wrap justify="center" margin="20px 0px">
          {
            allCategories.map((category) => (
              <WrapItem>
                <Card maxW="300px">
                  <CardBody p="0 !important">
                    <Box>
                      <Link 
                        href={`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:3000/category/${category.slug}`} 
                        style={{textDecoration: "none"}}
                      >
                        <Box textAlign="center">

                          <Divider margin="10px 0px 10px 0px"/>

                          {category.title}

                        </Box>
                      </Link>
                    </Box>
                  </CardBody>

                </Card>
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
            <WrapItem 
              className="popular-category__item"
            >
              <Card maxW="300px">
                <CardBody p="0 !important">
                  <Box>
                    <Link 
                      href={`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOSTNAME}:3000/products/${product.slug}`} 
                      style={{textDecoration: "none"}}
                    >
                      <Box textAlign="center">

                        <Image 
                          src={product.images[0]?.image}
                          borderRadius="0.375rem 0.375rem 0rem 0rem"
                          margin="0px 0px 10px 0px"
                        />

                        {product.title}

                        <Divider margin="10px 0px 10px 0px"/>
                        
                      </Box>
                    </Link>
                  </Box>
                </CardBody>

                <CardFooter alignItems="center">
                  <Text>{product.price}₽</Text>

                  <Spacer/>

                  <Button>В корзину</Button>
                </CardFooter>
              </Card>

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
    </GridItem>
  )
  
}

export default MainPart