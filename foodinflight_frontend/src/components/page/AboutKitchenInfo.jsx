import React from "react";
import {
  Text,
  Box,
  Link,
  Button,
  Flex,
  Spacer,
  Image,
  Center
} from "@chakra-ui/react"
import { BiArrowBack } from "react-icons/bi";

const AboutKitchenInfo = () => {
  return (
    <Box padding='40px'>
      <Link href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}`}>
        <Button
          bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
          iconSpacing="0px 10px 0px 0px"
          leftIcon={<BiArrowBack />}
          textColor="black"
        >
          Главная
        </Button>
      </Link>
      <br />
      <br />
      <Image 
        objectFit='cover' 
        w='100%' 
        maxH='300px' 
        src="/icons/extra-info_image.webp" 
        borderRadius='10px'
      />
      <br />
      <Text fontSize='4xl' as='b'>
        Наша кухня
      </Text>
      <br />
      <br />
      <Text align='justify' fontSize='xl'>
        Кухни для нас — главное. В них воплощается весь наш космический опыт в приготовлении кулинарных шедевров. Именно здесь наши профессиональные повара-джедаи создают галактические блюда, которые заказывают в разных точках нашей Галактики.
      </Text>
      <br />
      <Text align='justify' fontSize='xl'>
        Мы тщательно отбираем поставщиков среди всех инопланетян. Все ингредиенты проходят этапы тестов и дегустаций на орбите, после чего возвращаются на кухню и ложатся в основу нового звездного рецепта. После запуска мы внимательно следим за приборами внутри нашего нового гастрономического корабля, а также за вашими отзывами, исходя из чего дорабатываем каждый продукт, чтобы он был востребован на всех планетах.
      </Text>
      <br />
      <Text align='justify' fontSize='xl'>
        Ежедневно имперский штурмовик-контроллер проверяет каждую из наших межгалактических кухонь на соответствие высоким стандартам качества и чистоты.
      </Text>
      <br />
      <br />
      <Text as='b' fontSize='2xl'> 
        Пицца
      </Text>
      <br />
      <br />
      <Text align='justify' fontSize='xl'>
        Мы замешиваем тесто только с помощью космической центрифуги, потом раскатываем его световым мечом тонким слоем. Покрываем соусами из космический тюбиков по оригинальным рецептам и равномерно выкладываем начинку. Мы выпекаем пиццу в специальных космических разогревателях и следим за тем, чтобы она пропекалась со всех сторон. Каждый рецепт нашей пиццы — это выверенное сочетание теста, соуса, сыра, начинки и звездного духа.
      </Text>
      <br />
      <br />
      <Text as='b' fontSize='2xl'> 
        Суши и роллы
      </Text>
      <br />
      <br />
      <Text align='justify' fontSize='xl'>
        В основе нашей кухни только рыба с Марса и рис с Сатурна. У нас есть эталонная межгалактическая библиотека блюд, которая была составлена великими умами Галактики, с которой мы сравниваем каждый наш ролл и суши. Мы готовим их по уникальной рецептуре, тщательно подбираем все компоненты и следим за качеством продуктов, соблюдением пропорций и размеров.
      </Text>
      <br />
      <br />
      <Flex>
        <Image src="/icons/logo-nasha-kuhnya-1.webp" />
        <Spacer />
        <Image src="/icons/logo-nasha-kuhnya-2.webp" marginRight='0px'/>
        <Spacer />
        <Image src="/icons/logo-nasha-kuhnya-3.webp"/>
      </Flex>
      <br />
      <Flex>
        <Text as='b' fontSize='xl'>
          Отбираем вкусные и натуральные продукты со всех планет
        </Text>
        <Spacer />
        <Text as='b' fontSize='xl' align='center'>
          Работаем только с проверенными инопланетянами
        </Text>
        <Spacer />
        <Text as='b' fontSize='xl' align='right'>
          Проверяем каждое блюдо на всех стадиях запуска
        </Text>
      </Flex>
      <br />
      <br />
      <Text fontSize='4xl' as='b'>
        Стандарты качества
      </Text>
      <br />
      <br />
      <Text align='justify' fontSize='xl'>
        Мы предъявляем очень жесткие требования ко всем продуктам, которые к нам поступают, и к блюдам, которые готовят наши повара-джедаи. Все ингредиенты и готовые блюда зафиксированы в космическом сборнике эталонов качества, с которым мы сверяемся постоянно. Мы работаем напрямую только с проверенными инопланетянами и Галактиками.
      </Text>
      <br />
      <Flex>
        <Box w='350px' h='200px'>
          <Flex>
            <Box>
              <Text textColor='purple' fontSize='4xl'>
                1
              </Text>
            </Box>
            <Spacer />
            <Box marginLeft='15px'>
              <Text as='b' fontSize='md'> 
                Контроль закупки продуктов
              </Text>
              <Text fontSize='md'>
                Проверяем инопланетян еще до первой закупки. Приезжаем на производства и лично оцениваем весь процесс и качество продуктов.
              </Text>
            </Box>
          </Flex>
        </Box>
        <Spacer />
        <Box w='350px'>
          <Flex>
            <Box>
              <Text textColor='purple' fontSize='4xl'>
                2
              </Text>
            </Box>
            <Spacer />
            <Box marginLeft='15px'>
              <Text as='b' fontSize='md'> 
                Контроль заготовок
              </Text>
              <Text fontSize='md'>
                После того как все подготовительные работы для запуска сделаны, мы повторно проверяем свежесть, внешний вид, запах и эталонный вес.
              </Text>
            </Box>
          </Flex>
        </Box>
        <Spacer />
        <Box w='350px'>
          <Flex>
            <Box>
              <Text textColor='purple' fontSize='4xl'>
                3
              </Text>
            </Box>
            <Spacer />
            <Box marginLeft='15px'>
              <Text as='b' fontSize='md'> 
                Контроль готового блюда
              </Text>
              <Text fontSize='md'>
                Когда блюдо готово, имперский штурмовик-контроллер сравнивает его внешний вид с космическим сборником элатонов качества.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Flex>
        <Box w='350px' h='200px'>
          <Flex>
            <Box>
              <Text textColor='purple' fontSize='4xl'>
                4
              </Text>
            </Box>
            <Spacer />
            <Box marginLeft='15px'>
              <Text as='b' fontSize='md'> 
                Контроль упаковки
              </Text>
              <Text fontSize='md'>
                Каждый повар-джедай сам упаковывает блюдо, которое приготовил. Джедаи лучше знают, как правильно и бережно упаковать еду, чтобы она добралась до Вас через метеоритный дождь.
              </Text>
            </Box>
          </Flex>
        </Box>
        <Spacer />
        <Box w='350px'>
          <Flex>
            <Box>
              <Text textColor='purple' fontSize='4xl'>
                5
              </Text>
            </Box>
            <Spacer />
            <Box marginLeft='15px'>
              <Text as='b' fontSize='md'> 
                Контроль доставки
              </Text>
              <Text fontSize='md'>
                Мы постоянно устраиваем контрольные закупки своей продукции. Когда к нам прилетает наша еда, мы тщательно проверяем все: скорость полета, скафандр и космическую сумку курьера, упаковку продуктов, их состояние, температуру и герметичность.
              </Text>
            </Box>
          </Flex>
        </Box>
        <Spacer />
        <Box w='400px'>
          <Center>
            <Image src="/icons/kosmonavt.webp"/>
          </Center>
        </Box>
      </Flex>
    </Box>
  )
}

export default AboutKitchenInfo