import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Button,
  Text,
  Heading,
  Wrap,
  WrapItem,
  Card
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";

import { BiArrowBack } from "react-icons/bi";

const OrdersHistory = () => {
  const [cookies] = useCookies();
  const [dataError, setDataError] = useState(null);
  const [arrayOfOrders, setArrayOfOrders] = useState([]);

  useEffect(() => {
    const getOrdersHistory = async () => {
      try {
        const ordersHistoryResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/orders/`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${cookies.access_token}`
          }
        })


        if (ordersHistoryResponse.status === 200) {
          setDataError(null);
          const ordersHistoryResponseJSON = await ordersHistoryResponse.json();
          const deliveredOrders = ordersHistoryResponseJSON.filter((order) => order.state === 'DELIVERED');
          setArrayOfOrders(deliveredOrders);
        }
        else if (ordersHistoryResponse.status === 401) {
          setDataError('Пользователь не авторизован');
        }
      } catch (error) {
        setDataError(error.message);
      }
    }

    getOrdersHistory();
  }, []);

  console.log(arrayOfOrders);

  return (
    <Box m="10px 0px 0px 0px">
      <Box p="0px 0px 0px 20px">
        <Link
          style={{ textDecoration: "none" }}
          href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}`}
        >
          <Button
            bgGradient="linear(to-l, #E8DBFC, #F8F9D2)"
            iconSpacing="0px 10px 0px 0px"
            leftIcon={<BiArrowBack />}
            textColor="black"
          >
            <Text>Главная</Text>
          </Button>
        </Link>

        <Heading
          as="h2"
          fontSize="2xl"
          p="10px 0px 0px 0px"
        >
          История заказов
        </Heading>
      </Box>

      <Wrap justify="center" margin="20px 0px" p="5px">
        <Wrap justify="left">
          <WrapItem>
            {
                dataError ? (
                  <Text>{dataError}</Text>
                ) : (
                  <Card>
                    <Text>История заказов</Text>
                  </Card>
                )
            }
          </WrapItem>
        </Wrap>
      </Wrap>
    </Box>
  )
}

export default OrdersHistory