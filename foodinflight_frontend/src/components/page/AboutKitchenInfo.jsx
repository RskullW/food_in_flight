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
        Кухни для нас — главное. В них воплощается весь наш опыт. Именно здесь профессиональные повара на современном производстве создают блюда, которые ежедневно заказывают тысячи людей.
      </Text>
      <br />
      <Text align='justify' fontSize='xl'>
        Мы тщательно отбираем поставщиков и продукты для каждого блюда. Все ингредиенты проходят этапы тестов и дегустаций, после чего ложатся в основу нового рецепта. После запуска мы внимательно следим за вашими отзывами и дорабатываем каждый продукт, чтобы он нравился всем.
      </Text>
      <br />
      <Text align='justify' fontSize='xl'>
        Ежедневно инспектор службы контроля проверяет каждую из наших кухонь на соответствие высоким стандартам качества и чистоты.
      </Text>
      <br />
      <br />
      <Text as='b' fontSize='2xl'> 
        Пицца
      </Text>
      <br />
      <br />
      <Text align='justify' fontSize='xl'>
        Мы замешиваем тесто только вручную, потом раскатываем его тонким слоем. Покрываем соусами по оригинальным рецептам и равномерно выкладываем начинку. Мы выпекаем пиццу в специальной конвейерной печи и следим за тем, чтобы она пропекалась со всех сторон. Каждый рецепт нашей пиццы — это выверенное сочетание теста, соуса, сыра и начинки.
      </Text>
      <br />
      <br />
      <Text as='b' fontSize='2xl'> 
        Суши и роллы
      </Text>
      <br />
      <br />
      <Text align='justify' fontSize='xl'>
        В основе нашей кухни только свежая рыба и правильный рис. У нас есть эталонная библиотека блюд, с которой мы сравниваем каждый наш ролл и суши. Мы готовим их по уникальной рецептуре, тщательно подбираем все компоненты и следим за качеством продуктов, соблюдением пропорций и размеров.
      </Text>
      <br />
      <br />
      <Flex>
        <Image src="/icons/img-kitchen-reagents.webp" />
        <Spacer />
        <Image src="/icons/img-kitchen-reagents.webp" marginRight='0px'/>
        <Spacer />
        <Image src="/icons/img-kitchen-reagents.webp"/>
      </Flex>
      <br />
      <Flex>
        <Text as='b' fontSize='xl'>
          Отбираем вкусные и натуральные продукты высшего качества
        </Text>
        <Spacer />
        <Text as='b' fontSize='xl' align='center'>
          Работаем только с проверенными поставщиками
        </Text>
        <Spacer />
        <Text as='b' fontSize='xl' align='right'>
          Проверяем каждое блюдо на всех стадиях приготовления
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
        Мы предъявляем очень жесткие требования ко всем продуктам, которые к нам поступают, и к блюдам, которые готовят наши повара. Все ингредиенты и готовые блюда зафиксированы в матрице эталонов качества, с которой мы сверяемся постоянно. Мы работаем напрямую только с проверенными поставщиками и производителями.
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
                Проверяем поставщиков еще до первой закупки. Приезжаем на производства и лично оцениваем весь процесс и качество продуктов.
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
                После того как все заготовки сделаны, мы повторно проверяем свежесть, внешний вид, запах и эталонный вес.
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
                Когда блюдо готово, эксперт службы контроля качества сравнивает его внешний вид с эталонной матрицей.
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
                Каждый повар сам упаковывает блюдо, которое приготовил. Повара лучше знают, как правильно и бережно упаковать еду, чтобы она добралась до вас горячей и невредимой.
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
                Мы постоянно устраиваем контрольные закупки своей продукции. Когда нам привозят нашу еду, мы тщательно проверяем все: скорость доставки, внешний вид и вежливость курьера, упаковку продуктов, их состояние и температуру.
              </Text>
            </Box>
          </Flex>
        </Box>
        <Spacer />
        <Box w='350px'>
          <Center>
            <Image src="/icons/img-kitchen-quality.webp"/>
          </Center>
        </Box>
      </Flex>
    </Box>
  )
}

export default AboutKitchenInfo