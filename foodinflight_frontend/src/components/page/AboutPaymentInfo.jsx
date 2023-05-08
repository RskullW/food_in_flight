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
        Оплата еды в Санкт-Петербурге
      </Text>
      <br />
      <br />
      <Text fontSize='xl'>
        Мы принимаем оплату:
      </Text>
      <Text fontSize='xl'>
        — Наличными курьеру
      </Text>
      <Text fontSize='xl'>
        — Онлайн с банковской карты
      </Text>
      <Text fontSize='xl'>
        — Банковской картой через терминал у курьера.
      </Text>
      <br />
      <br />
      <Text as='b' fontSize='3xl'>
        Оплата наличными
      </Text>
      <br />
      <Text fontSize='xl' align='justify'>
        Наличные — это самый привычный способ оплаты заказа по факту его получения. Если вам потребуется сдача, просто предупредите об этом оператора call-центра или оставьте соответствующий комментарий при оформлении заказа онлайн. Курьер привезет сдачу вместе с вашим заказом.
      </Text>
      <br />
      <br />
      <Text as='b' fontSize='3xl'>
        Оплата банковской картой курьеру
      </Text>
      <br />
      <Text fontSize='xl' align='justify'>
        Нет наличных, а ближайший банкомат находится в трех кварталах? Вы можете оплатить свой заказ банковской картой. У наших курьеров есть банковский терминал для приема пластиковых карт, который позволяет вам произвести оплату доставки еды без банкнот.
      </Text>
      <br />
      <br />
      <Text as='b' fontSize='3xl'>
        Онлайн-оплата
      </Text>
      <br />
      <Text fontSize='xl' align='justify'>
        Вы можете оплатить любимую пиццу или другой заказ на сайте онлайн с помощью карты любого банка.
      </Text>
    </Box>
  )
}

export default AboutPaymentInfo