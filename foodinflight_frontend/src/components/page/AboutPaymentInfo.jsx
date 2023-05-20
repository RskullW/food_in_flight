import React from "react";
import { 
  Text,
  Box,
  Link,
  Button 
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

const AboutPaymentInfo = () => {
  return (
    <Box padding='40px 40px 0px 40px'>
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
      <Text as='b' fontSize='4xl'>
        Оплата еды на планете Санкт-Петербург
      </Text>
      <br />
      <br />
      <Text fontSize='xl'>
        Мы принимаем оплату:
      </Text>
      <Text fontSize='xl'>
        — Наличными курьеру V-35
      </Text>
      <Text fontSize='xl'>
        — Онлайн с банковской карты
      </Text>
      <Text fontSize='xl'>
        — Банковской картой через терминал у курьера V-35.
      </Text>
      <br />
      <br />
      <Text as='b' fontSize='3xl'>
        Оплата наличными
      </Text>
      <br />
      <Text fontSize='xl' align='justify'>
        Несмотря на то, что технологии уже давно впереди, а люди закрепились в космосе почти также, как на Земле, наличные - один из самых привычных способов оплаты заказа, поэтому мы предусмотрели и этот вариант оплаты. Если вам потребуется молекулярная сдача, просто оставьте соответствующий комментарий при оформлении заказа онлайн. V-35 привезет сдачу вместе с вашим заказом.
      </Text>
      <br />
      <br />
      <Text as='b' fontSize='3xl'>
        Оплата банковской картой во время получения заказа
      </Text>
      <br />
      <Text fontSize='xl' align='justify'>
        21 век на дворе и у Вас нет наличных? Не беда, ведь Вы можете оплатить свой заказ банковской картой. V-35 привезет терминал для оплаты заказа марсовой или юпитерианской картой, и Вам не придется производить запуск Вашей ракеты ради ближайшего банкомата!
      </Text>
      <br />
      <br />
      <Text as='b' fontSize='3xl'>
        Онлайн-оплата
      </Text>
      <br />
      <Text fontSize='xl' align='justify'>
        Самый прогрессивный способ оплаты заказа - онлайн-оплата. После оформления заказа в корзине Вам будет предложено произвести оплату прямо на сайте.
      </Text>
      <br />
      <br />
      <Text fontSize='xl' align='justify'>
        P.S. Сайт и приложение созданы в некоммерческих целях, данная страница несет учебный и развлекательный характер.
      </Text>
    </Box>
  )
}

export default AboutPaymentInfo