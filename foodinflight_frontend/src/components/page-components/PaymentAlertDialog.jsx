import React, {useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useCartContext } from "../../contexts/CartContext";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  Text,
  Flex,
  Spacer,
  IconButton
} from "@chakra-ui/react";

import { GrClose } from "react-icons/gr";

const PaymentAlertDialog = ({ isOpen, onClose }) => {
  const [cookies] = useCookies(['access_token']);
  const [dataError, setDataError] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [userOrderStatus, setUserOrderStatus] = useState(null);
  const { clearCart } = useCartContext();

  useEffect(() => {
    const checkOrderStatus = async () => {
      while (true) {
        try {
          const orderInfo = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/orders/${JSON.parse(localStorage.getItem('order_key'))}/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${cookies.access_token}`
            }
          })
  
          const orderInfoJSON = await orderInfo.json();
  
          if (orderInfo.status === 200) {
            setOrderStatus(orderInfoJSON.state);
            setDataError(null);
          }
          if (orderInfo.status === 401) {
            console.log(orderInfo.message);
            setDataError(orderInfo.message);
          }
        } catch (error) {
          setDataError(error.message);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  
    checkOrderStatus();

    const checkUserOrderStatus = () => {
      if (orderStatus === 'PENDING') {
        setUserOrderStatus('Ожидание подтверждения оплаты.');
      }
      else if (orderStatus === 'PAID') {
        setUserOrderStatus('Заказ успешно оплачен!');
      }
      else if (orderStatus === 'COOKING') {
        setUserOrderStatus('Ваш заказ готовится!');
      }
      else if (orderStatus === 'DELIVERING') {
        setUserOrderStatus('Ваш заказ уже в пути!');
      }
      else if(orderStatus === 'DELIVERED') {
        setUserOrderStatus('Заказ успешно доставлен!');
      }
      else if (orderStatus === 'CANCELED') {
        setUserOrderStatus('Заказ отменён. Обратитесь в службу поддержки.');
      }
      else {
        setUserOrderStatus('Ваш заказ отправляется. Ожидайте.');
      }
    }

    checkUserOrderStatus();
  }, [orderStatus, userOrderStatus]); 

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        isCentered
        filter="auto"
        size="3xl"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize='3xl'
              fontWeight='bold'
              display='inline-block'
              alignContent='center'
            >
              <Flex alignItems="center">
                <Text>Статус заказа</Text>
                <Spacer />
                <IconButton
                  icon={<GrClose />}
                  bgColor="white"
                  _hover={{ bgColor: "white" }}
                  onClick={() => {onClose(); clearCart()}}
                />
              </Flex>
            </AlertDialogHeader>
            <AlertDialogBody>
              {
                dataError ? (
                  <Text>{dataError}</Text>
                ) : (
                  <>
                    <Text>{userOrderStatus}</Text>
                  </>
                )
              }
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default PaymentAlertDialog;