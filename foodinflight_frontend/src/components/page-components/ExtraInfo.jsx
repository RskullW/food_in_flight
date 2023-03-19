import React from "react";
import {  
  Box, 
  Image, 
  Heading, 
  Wrap, 
  WrapItem, 
  Text, 
  Button, 
} from "@chakra-ui/react";

const ExtraInfo = () => {
  return (
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
  )
}

export default ExtraInfo

