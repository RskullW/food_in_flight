import React from "react";
import {
  Box,
  Text,
  Link,
  Button
} from "@chakra-ui/react"
import { AiOutlineArrowLeft } from "react-icons/ai";

const Shipping = () => {
  return (
    <Box padding='40px'>
      <Link href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}`}>
        <Button size='sm' leftIcon={<AiOutlineArrowLeft />} variant='ghost'>
          Главная
        </Button>
      </Link>
      <br />
      <Text as='b' fontSize='4xl'>Доставка и оплата в Санкт-Петербурге</Text>
      <br />
      <br />
      <Text align='justify' fontSize='xl'>Заказы принимаются с 9:00 до 21:00 каждый день в режиме онлайн через наш сайт foodflight.ru или мобильное приложение. Каждый заказ готовится индивидуально и упаковывается непосредственно перед отправкой. Доставка еды осуществляется в специализированных термосумках, и мы даём гарантию, что она приедет к вам горячая!</Text>
      <br />
      <Text as='b' fontSize='xl'>Время и стоимость доставки</Text>
      <Text fontSize='xl'>Ознакомиться с подробными условиями оплаты заказа вы можете на странице
        <Link href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}`}>
          <Button size='lg' variant='link' marginLeft='5px' colorScheme='purple'>
            «Оплата».
          </Button>
        </Link>
      </Text>
      <br />
      <Text fontSize='xl'>Информация о доставке еды:</Text>
      <br />
      <Text as='b' fontSize='2xl'>В районы:</Text>
      <br />
      <Text fontSize='xl'>— Василеостровский район</Text>
      <Text fontSize='xl'>— Фрунзенский район</Text>
      <Text fontSize='xl'>— Адмиралтейский район</Text>
      <Text fontSize='xl'>— Центральный район</Text>
      <Text fontSize='xl'>— Петроградский район</Text>
      <Text fontSize='xl'>— Василеостровский район</Text>
      <Text fontSize='xl'>— Крансосельский район</Text>
      <Text fontSize='xl'>— Кировский район</Text>
      <Text fontSize='xl'>— Красногвардейский район</Text>
      <Text fontSize='xl'>— Приморский район</Text>
      <Text fontSize='xl'>— Калининский район</Text>
      <Text fontSize='xl'>— Выборгский район</Text>
      <Text fontSize='xl'>— Невский район</Text>
      <Text fontSize='xl'>— Московский район</Text>
      <Text as='b' fontSize='2xl'>В города:</Text>
      <Text fontSize='xl'>— Пушкин</Text>
      <Text fontSize='xl'>— Стрельна</Text>
      <Text fontSize='xl'>— Петергоф</Text>
      <Text fontSize='xl'>— Красное село</Text>
      <Text fontSize='xl'>— Мурино</Text>
      <br />
      <Text as='b' fontSize='xl'>Реквизиты</Text>
      <Text align='justify' fontSize='xl'>Фирменное наименование: Общество с ограниченной ответственностью «Фуд ин Флайт»</Text>
      <br />
      <Text align='justify' fontSize='xl'>Место нахождения: 190005, Санкт-Петербург, 1-я Красноармейская ул., 1</Text>
      <br />
      <Text align='justify' fontSize='xl'>Режим работы: с 9:00 до 21:00, 7 дней в неделю.</Text>
    </Box>
  )
}

export default Shipping