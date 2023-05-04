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
  Image,
  Spacer
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";

import { BiArrowBack } from "react-icons/bi";

const OrdersHistory = () => {
  const [cookies] = useCookies();
  const [dataError, setDataError] = useState(null);
  const [productsError, setProductsError] = useState(null);
  const [products, setProducts] = useState([]);
  const [arrayOfOrders, setArrayOfOrders] = useState([]);
  const [numberOfOrders, setNumberOfOrders] = useState(0);

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
          ordersHistoryResponseJSON.reverse();
          const deliveredOrders = ordersHistoryResponseJSON.filter((order) => order.state === 'DELIVERED');
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

    getOrdersHistory();
    getProducts();
  }, [numberOfOrders]);


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

      <Wrap justify="left" margin="20px 0px" p="5px">
        <Wrap justify="left">
          <WrapItem>
            <Flex flexDirection="column" margin="20px 10px" p="5px">
              {
                !dataError ? (
                  numberOfOrders ? (
                    arrayOfOrders.map((order) => (
                      <Card
                        key={order.created}
                        minW="650px"
                        maxW='650px'
                        mb="50px"
                        shadow="lg"
                        border="1px solid rgba(0, 0, 0, 0.2)"
                      >
                        <CardHeader bgColor="rgba(0, 0, 0, 0.05)">
                          <Flex alignItems="center">
                            <Flex flexDirection="row" alignItems="center">
                              <Box m="0px 10px 0px 0px">
                                <Text color="blackAlpha.900" fontWeight="semibold" fontSize="xl">
                                  Дата заказа:
                                </Text>
                              </Box>
                              <Box>
                                <Text color="blackAlpha.900" fontWeight="bold" fontSize="xl">
                                  {order.created.slice(0, 10)}
                                </Text>
                              </Box>
                            </Flex>
                            <Spacer />
                            <Flex flexDirection="row">
                              <Box m="0px 10px 0px 0px">
                                <Text color="blackAlpha.900" fontWeight="semibold" fontSize="xl">
                                  Сумма заказа:
                                </Text>
                              </Box>
                              <Box>
                                <Text color="blackAlpha.900" fontWeight="bold" fontSize="xl">
                                  {order.items_price} ₽
                                </Text>
                              </Box>
                            </Flex>
                          </Flex>

                        </CardHeader>
                        {
                          products.map((product) => (
                            <Flex direction="row" alignItems="center">
                              {
                                (order.items).map((item) => (
                                  product.slug === item.item_slug ? (
                                    <>
                                      <CardBody>
                                        <Flex textAlign="left">
                                          <Flex flexDirection="column">
                                            <Flex >
                                              <Text color="blackAlpha.900" fontWeight="semibold" p="0px 10px 0px 0px">
                                                {product.title}
                                              </Text>
                                              <Text color="blackAlpha.700" fontWeight="bold">
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
                                    </>
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

          </WrapItem>
        </Wrap>
      </Wrap>
    </Box>
  )
}

export default OrdersHistory