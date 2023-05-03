import React, { useState} from "react";
import { useCartContext } from "../../contexts/CartContext";
import {
  Text,
  IconButton,
  Spacer,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Input,
  Heading,
  Button
} from "@chakra-ui/react";

import { GrClose } from "react-icons/gr";
import PaymentAlertDialog from "./PaymentAlertDialog";

const OrderDetailsAlertDialog = ({ isOpen, onClose }) => {
  const cancelRef = React.useRef();
  const [disabledClick, setDisabledClick] = useState(false);
  const [dataError, setDataError] = useState(null);
  const [checkedAddress, setCheckedAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [checkedApartmentNumber, setCheckedApartmentNumber] = useState('');
  const [apartmentNumberError, setApartmentNumberError] = useState('');
  const [checkedName, setCheckedName] = useState('');
  const [nameError, setNameError] = useState('');
  const [checkedNumber, setCheckedNumber] = useState('');
  const [numberError, setNumberError] = useState('');
  const { cartProducts, clearCart } = useCartContext();

  const [showPaymentAlertDialog, setShowPaymentAlertDialog] = useState(false);

  const accessToken = document.cookie.split('; ')
  .find(cookie => cookie
  .startsWith('access_token='))
  ?.split('=')[1];

  const items = cartProducts.map((product) => {
    return {
      "slug": product.slug,
      "amount": product.quantity,
      "add_ice": false
    }
  })

  const data = {
    "name": checkedName,
    "phone": checkedNumber,
    "address": checkedApartmentNumber + ' ' + checkedAddress,
    "items": items
  }

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && event.target.selectionStart === 2) {
      event.preventDefault();
    }
  }

  const validateAddress = (address) => {
    const ad = /^[\p{L}\d\s.,/-]+$/u;
    return ad.test(address);
  }

  const validateApartmentNumber = (apartmentNumber) => {
    const apNum = /^\d*$/;
    return apNum.test(apartmentNumber);
  }

  const validateName = (name) => {
    const userName = /^[А-Яа-яЁё]{2,}$/u;
    return userName.test(name);
  }

  const validateNumber = (number) => {
    const num = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/
    return num.test(number);
  }

  const inputAddress = (event) => {
    const value = event.target.value;
    if (validateAddress(value)) {
      setCheckedAddress(value);
      setAddressError(null);
    } else {
      setAddressError("Адрес доставки введён неверно!");
    }
  }

  const inputApartmentNumber = (event) => {
    const value = event.target.value;
    if (validateApartmentNumber(value)) {
      setCheckedApartmentNumber(value);
      setApartmentNumberError(null);
    } else {
      setApartmentNumberError("Номер квартиры введён неверно!");
    }
  }

  const inputName = (event) => {
    const value = event.target.value;
    if (validateName(value)) {
      setCheckedName(value);
      setNameError(null);
    } else {
      setNameError("Имя введено неверно!");
    }
  }

  const inputNumber = (event) => {
    const value = event.target.value;
    if (validateNumber(value)) {
      setCheckedNumber(value);
      setNumberError(null);
    } else {
      setNumberError("Номер телефона введён неверно! Введите номер телефона без кода страны.");
    }
  }

  const setOrder = async () => {
    setDisabledClick(true);
    if (addressError) {
      setDisabledClick(false);
      setDataError(addressError);
      return dataError;
    }
    else if (apartmentNumberError) {
      setDisabledClick(false);
      setDataError(apartmentNumberError);
      return apartmentNumberError;
    }
    else if (nameError) {
      setDisabledClick(false);
      setDataError(nameError);
      return nameError;
    }
    else if (numberError) {
      setDisabledClick(false);
      setDataError(numberError);
      return numberError;
    }

    setShowPaymentAlertDialog(true);

    try {
      const orderInfo = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/orders/`, {
        method: "POST",
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`
        }
      })

      const orderInfoJSON = await orderInfo.json();

      if (orderInfo.status === 201) {
        setDataError(null);
        localStorage.setItem('order_key', JSON.stringify(orderInfoJSON.unique_uuid));
        // clearCart();
      }
      if (orderInfo.status === 401) {
        setDataError(orderInfoJSON.message);
        setDisabledClick(false);
        return dataError;
      }
    } catch (error) {
      setDataError(error.message);
    }
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
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
                <Text>Детали заказа</Text>
                <Spacer />
                <IconButton
                  icon={<GrClose />}
                  bgColor="white"
                  _hover={{ bgColor: "white" }}
                  onClick={onClose}
                />
              </Flex>
            </AlertDialogHeader>
            <AlertDialogBody>

              <Heading size="md">
                Адрес доставки
              </Heading>
              <Input
                mt="10px"
                placeholder="Введите адрес доставки в формате: город, улица, дом"
                onChange={inputAddress}
              />

              <Text size="sm" mt="10px">
                Номер квартиры
              </Text>
              <Input
                mt="10px"
                placeholder="Если вы живёте в частном доме, то оставьте поле пустым"
                onChange={inputApartmentNumber}
              />

              <Heading size="md" mt="40px">
                Контакты
              </Heading>

              <Text size="sm" mt="10px">
                Получатель
              </Text>
              <Input
                mt="10px"
                placeholder="Как вас зовут?"
                onChange={inputName}
              />

              <Text size="sm" mt="10px">
                Номер телефона
              </Text>
              <Input
                mt="10px"
                defaultValue="+7"
                onChange={inputNumber}
                onKeyDown={handleKeyDown}
              />

              <>
                {
                  dataError || !checkedAddress || !checkedApartmentNumber || !checkedName || !checkedNumber || (disabledClick) ? (
                    <Text color='red'>{dataError}</Text>
                  ) : null
                }
              </>

            </AlertDialogBody>
            <AlertDialogFooter>
              <Button 
                onClick={disabledClick ? null : setOrder}
                textColor="whiteAlpha.900"
                bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                _hover={{ bgGradient: "linear(to-r, #6E72FC, #AD1DEB)" }}
              >
                Перейти к оплате
              </Button>
              {
                showPaymentAlertDialog && (
                  <PaymentAlertDialog isOpen={true} onClose={() => { setShowPaymentAlertDialog(false); onClose() }}/>
                )
              }
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default OrderDetailsAlertDialog;