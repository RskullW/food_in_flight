import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Link,
  Flex,
  Spacer
} from "@chakra-ui/react";

const ExtraInfo = () => {
  return (
    <Box className="extra-info" margin="20px 20px 0px 20px">

      <Box
        className="extra-info__image-block"
        justify="center"
        position="relative"
        borderRadius="20px"
      >

        <Image
          src="/icons/extra-info_image.webp"
          objectFit="cover"
          maxH="400px"
          w="100%"
          borderRadius="15px"
          filter="auto"
          brightness="60%"
        />

        <Box
          textAlign="center"
          position="absolute"
          top="25%" left="25%" right="25%"
        >

          <Text
            fontSize="xl"
            fontWeight="bold"
            color="whiteAlpha.900"
          >
            Во главе каждой из наших кухонь стоят повара,
            <br />
            которые живут своей работой, вкладывают душу.
          </Text>

        </Box>

        <Box
          textAlign="center"
          position="absolute"
          top="80%"
          left="45%"
        >
          <Link
            href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/aboutKitchen`}
            style={{ textDecoration: "none" }}
          >
            <Button
              bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
              textColor="whiteAlpha.900"
              _hover={{ bgColor: "none", bgGradient: "linear(to-t, #6E72FC, #AD1DEB)" }}
            >
              Узнать больше
            </Button>
          </Link>
        </Box>

      </Box>

      <Flex
        className="extra-info__article-block"
        padding="20px 0px"
      >
        <Flex flexDirection="column" mr="20px">
          <Heading
            as="h3"
            size="lg"
            fontWeight="700"
            margin="20px 0px 0px 0px"
          >
            Доставка еды 24 часа в сутки
          </Heading>

          <Text
            margin="20px 0px 0px 0px"
          >
            Представьте, что специально для вас трудятся квалифицированные повара.
            Они замешивают душистое тесто, делают оригинальные соусы.
            Изысканные десерты, закуски становятся шедеврами в руках настоящих мастеров.
            Вы можете попробовать новое блюдо или заказать что-то традиционное.
            Совсем не обязательно искать поваренную книгу, хорошее заведение рядом с домом или работой.
            Идеальный обед, перекус или ужин гораздо ближе, чем вы думаете.
          </Text>
        </Flex>

        <Spacer />

        <Flex flexDirection="column">
          <Heading
            as="h2"
            size="lg"
            fontWeight="700"
            margin="20px 0px 0px 0px"
          >
            Заказать еду на дом
          </Heading>

          <Text
            margin="20px 0px 0px 0px"
          >
            Чем еще мы можем порадовать своих клиентов?
            Например, круглосуточной доставкой еды по Санкт-Петербургу.
            Если настигнет голод, мы готовы решить эту проблему с помощью наших логистических
            и кулинарных возможностей. Мы с удовольствием доставим вам первые и вторые блюда,
            десерты, суши, снеки и напитки, приготовленные по рецептам русской, итальянской,
            японской и осетинской кухонь. Кроме традиционных национальных, у наших шеф-поваров
            есть собственные кулинарные рецепты, которые непременно стоит попробовать.
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ExtraInfo

