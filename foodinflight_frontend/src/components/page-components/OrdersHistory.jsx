import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Button,
  Text,
  Heading,
  Wrap,
  WrapItem,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Spacer
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";

import { BiArrowBack } from "react-icons/bi";

const OrdersHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies();
  const [dataError, setDataError] = useState(null);
  const [productsError, setProductsError] = useState(null);
  const [products, setProducts] = useState([]);
  const [arrayOfOrders, setArrayOfOrders] = useState([]);
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [userState, setUserState] = useState(null);
  const [orderTime, setOrderTime] = useState([]);
  const [orderDate, setOrderDate] = useState([]);

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
          const deliveredOrders = ordersHistoryResponseJSON.filter((order) => order.state !== 'PENDING');
          setArrayOfOrders(deliveredOrders);
          setNumberOfOrders(deliveredOrders.length);
        }
        else if (ordersHistoryResponse.status === 401) {
          setDataError('Пользователь не авторизован');
        }
      } catch (error) {
        setDataError(error.message);
      }
    }

    const getProducts = async () => {
      try {
        const productsResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}//api/products/`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (productsResponse.status === 200) {
          const productsJSON = await productsResponse.json();
          arrayOfOrders.forEach((order) => {
            order.items.forEach((item) => {
              const filteredProducts = productsJSON.filter((product) => product.slug === item.item_slug);
              setProducts(prevProducts => {
                const uniqueProducts = [...new Set([...prevProducts, ...filteredProducts])];
                return uniqueProducts;
              });
            })
          })
        } else {
          setProductsError(true);
        }
      } catch (error) {
        setProductsError(error.message);
      }
    }

    Promise.all([getOrdersHistory(), getProducts()]).then(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    })
  }, [numberOfOrders]);

  const checkUserState = (state) => {
    if (state === 'PAID') {
      setUserState('Оплачен');
      return 'Оплачен';
    }
    else if (state === 'COOKING') {
      setUserState('Готовится');
      return 'Готовится';
    }
    else if (state === 'DELIVERING') {
      setUserState('В доставке');
      return 'В доставке';
    }
    else if (state === 'DELIVERED') {
      setUserState('Доставлен');
      return 'Доставлен';
    }
    else if (state === 'CANCELED') {
      setUserState('Отменён');
      return 'Отменён';
    }
  }

  useEffect(() => {
    const newOrderStatuses = arrayOfOrders.map((order) => checkUserState(order.state));
    setUserState(newOrderStatuses);
    arrayOfOrders.map((order) => {
      const date = order.updated;
      const orderTime = new Date(date);
      const year = orderTime.getFullYear();
      const month = orderTime.getMonth() + 1;
      const day = orderTime.getDate();
      const hours = orderTime.getHours();
      const minutes = orderTime.getMinutes();
      const seconds = orderTime.getSeconds();
      const timeString = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      const dateString = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
      setOrderDate(prevDate => [...prevDate, dateString]);
      setOrderTime(prevTime => [...prevTime, timeString]);
    })
  }, [arrayOfOrders]);


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

      <Wrap justify="left" p="5px">
        <Wrap justify="left">
          <WrapItem>
            {
              isLoading ? (
                <Flex flexDirection="column" margin="10px" p="5px">
                  <Spinner />
                </Flex>
              ) : (
                <Flex flexDirection="column" margin="10px" p="5px">
                  {
                    !dataError ? (
                      numberOfOrders ? (
                        arrayOfOrders.map((order, index) => (
                          <Card
                            key={order.unique_uuid + index}
                            minW="650px"
                            maxW='650px'
                            mb="50px"
                            shadow="lg"
                            border="1px solid rgba(0, 0, 0, 0.2)"
                          >
                            <CardHeader bgColor="rgba(0, 0, 0, 0.05)">
                              <Flex flexDirection="column">
                                <Flex flexDirection="row">
                                  <Flex flexDirection="row" alignItems="center">
                                    <Box m="0px 10px 0px 0px">
                                      <Text color="blackAlpha.900" fontWeight="semibold" fontSize="xl">
                                        Дата заказа:
                                      </Text>
                                    </Box>
                                    <Box>
                                      <Text color="blackAlpha.600" fontWeight="bold" fontSize="xl">
                                        {orderDate[index]}
                                      </Text>
                                      <Text color="blackAlpha.600" fontWeight="bold" fontSize="xl">
                                        {orderTime[index]}
                                      </Text>
                                    </Box>
                                  </Flex>
                                  <Spacer />
                                  <Flex flexDirection="row" alignItems="center">
                                    <Box m="0px 10px 0px 0px">
                                      <Text color="blackAlpha.900" fontWeight="semibold" fontSize="xl">
                                        Сумма заказа:
                                      </Text>
                                    </Box>
                                    <Box>
                                      <Text color="blackAlpha.600" fontWeight="bold" fontSize="xl">
                                        {order.total_price} ₽
                                      </Text>
                                    </Box>
                                  </Flex>
                                </Flex>
                                <Flex flexDirection="row" mt="10px">
                                  <Flex flexDirection="row" alignItems="center">
                                    {
                                      <>
                                        <Box mr="10px">
                                          <Text color="blackAlpha.900" fontWeight="semibold" fontSize="xl">
                                            Статус:
                                          </Text>
                                        </Box>
                                        <Box>

                                          <Text color="blackAlpha.600" fontWeight="bold" fontSize="xl">
                                            {userState[index]}
                                          </Text>
                                        </Box>
                                      </>
                                    }
                                  </Flex>
                                </Flex>
                              </Flex>
                            </CardHeader>
                            {
                              products.map((product) => (
                                <Flex direction="row" alignItems="center" key={product.title}>
                                  {
                                    (order.items).map((item) => (
                                      product.slug === item.item_slug ? (
                                        <Flex key={item.item_slug}>

                                          <CardBody>
                                            <Flex>
                                              <Flex flexDirection="column">
                                                <Flex>
                                                  <Text color="blackAlpha.900" fontWeight="semibold" p="0px 10px 0px 0px">
                                                    {product.title}
                                                  </Text>
                                                  <Text color="blackAlpha.600" fontWeight="bold">
                                                    x{item.amount}
                                                  </Text>
                                                </Flex>
                                              </Flex>
                                            </Flex>
                                          </CardBody>
                                          <CardFooter>
                                            <Flex>
                                              <Text color="blackAlpha.600" fontWeight="bold">
                                                {product.price * item.amount} ₽
                                              </Text>
                                            </Flex>
                                          </CardFooter>
                                        </Flex>
                                      ) : null
                                    ))
                                  }
                                </Flex>
                              ))
                            }
                          </Card>
                        ))
                      ) : (
                        <Text>История заказов пуста</Text>
                      )
                    ) : (
                      <Text color="red">{dataError}</Text>
                    )
                  }
                </Flex>
              )
            }

          </WrapItem>
        </Wrap>
      </Wrap>
    </Box >
  )
}

export default OrdersHistory