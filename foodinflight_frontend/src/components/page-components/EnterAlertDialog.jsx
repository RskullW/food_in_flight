import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Center,
  Input,
  InputRightElement,
  InputGroup,
  Stack,
  Box,
  Text,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  Spacer,
  Link,
  IconButton
} from '@chakra-ui/react'
import RegisterAlertDialog from "./RegisterAlertDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ExitConfirmationDialog from "./ExitConfirmation";

import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"


const EnterAlertDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delayedIsOpen, setDelayedIsOpen] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const [show, setShow] = React.useState(false);
  const btnRef = React.useRef()

  const [checkedEmail, setCheckedEmail] = useState('');
  const [checkedPassword, setCheckedPassword] = useState('');

  const [dataError, setDataError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [message, setMessage] = useState(null);
  const [inputClicked, setInputClicked] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);

  const handleClick = () => setShow(!show)

  const handleOpenWithDelay = () => {
    setTimeout(() => {
      setDelayedIsOpen(true);
    }, 1000);
  };

  const data = {
    username: `${checkedEmail}`,
    password: `${checkedPassword}`,
  }

  const validateEmail = (email) => {
    const re = /^[\w-\.]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  }

  const validatePassword = (password) => {
    const passw = /^[A-Za-z]\w{7,100}$/;
    return passw.test(password);
  }

  const inputEmail = (event) => {
    const value = event.target.value;
    if (validateEmail(value)) {
      setCheckedEmail(value);
      setEmailError(null);
    } else {
      setMessage(`Название почты введено неверно. Пример: abc@mail.ru`)
      setEmailError(message);
    }
  }

  const inputPassword = (event) => {
    const value = event.target.value;
    if (validatePassword(value)) {
      setCheckedPassword(value);
      setPasswordError(null);
    } else {
      setMessage('Пароль введён неверно. Проверьте используемые символы. Пароль должен содержать буквы латинского алфавита и цифры. Длина пароля не менее 8 символов');
      setPasswordError(message);
    }
  }

  useEffect(() => {
    inputEmail({ target: { value: checkedEmail } });
    inputPassword({ target: { value: checkedPassword } });
  });

  const logOutUser = async () => {
    try {
      const requestData = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${cookies.access_token}`
        }
      }

      const userInfo = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/logout/`, requestData);

      if (userInfo.status === 204) {
        setDataError(null);
        setCookie(null);
        removeCookie("access_token");
        window.location.reload();

      } else if (userInfo.status === 401) {
        const userInfoJSON = await userInfo.json();
        setDataError(userInfoJSON.detail);
      }
    } catch (error) {
      setDataError(error.detail);
    }
  }

  const logInUser = async () => {
    setInputClicked(true);
    setDisabledInput(true);
    if (emailError) {
      setInputClicked(false);
      setDisabledInput(false);
      setMessage(emailError);
      setDataError(emailError);
      return emailError;
    }
    else if (passwordError) {
      setInputClicked(false);
      setDisabledInput(false);
      setMessage(passwordError);
      setDataError(passwordError);
      return passwordError;
    }

    try {
      const userInfo = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/login/`, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const userInfoJSON = await userInfo.json();

      if (userInfo.status === 200) {
        setCookie("access_token", userInfoJSON.token);
        localStorage.setItem('userEmail', checkedEmail);
        setDataError(null);
        window.location.reload();
      }

      if (userInfo.status === 400) {
        setDataError("Данные введены неверно");
        setMessage("Данные введены неверно");
        setInputClicked(false);
        setDisabledInput(false);
        return dataError;
      }

    } catch (error) {
      setDataError(error.message);
    }

  }

  return (
    <>
      {
        cookies.access_token ? (
          <Button
            w="200px"
            h="50px"
            bgColor="white"
            fontSize="lg"
            borderRadius="10px"
            border="1px solid violet"
            onClick={onOpen}
            _hover={{
              backgroundImage: "linear-gradient(to right, #e66465, #9198e5)"
            }}
          >
            Аккаунт
          </Button>
        ) : (
          <Button
            w="200px"
            h="50px"
            bgColor="white"
            fontSize="lg"
            borderRadius="10px"
            border="1px solid violet"
            onClick={onOpen}
            _hover={{
              backgroundImage: "linear-gradient(to right, #e66465, #9198e5)"
            }}
          >
            Войти
          </Button>
        )
      }

      {
        cookies.access_token ? (
          <Drawer
            isOpen={isOpen}
            placement='bottom'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <Flex flexDirection="column" alignItems="center">
                  <Box>
                    <Text fontSize='2xl' as='b'>
                      Аккаунт
                    </Text>
                  </Box>
                  <Box>
                    <Text>
                      Пользователь: {localStorage.getItem('userEmail')}
                    </Text>
                  </Box>
                </Flex>
              </DrawerHeader>

              <DrawerBody>
                <Center>
                  <Box w='600px' h='auto'>
                    <Flex>
                      <Link href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/ordersHistory`} style={{ textDecoration: "none" }}>
                        <Button
                          variant='solid'
                          textColor="whiteAlpha.900"
                          bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                          _hover={{ bgGradient: "linear(to-r, #6E72FC, #AD1DEB)" }}
                          transition="700ms"
                        >
                          История заказов
                        </Button>
                      </Link>
                      <Spacer />
                      <ChangePasswordDialog />
                      <Spacer />
                      <ExitConfirmationDialog />
                    </Flex>
                  </Box>
                </Center>
              </DrawerBody>

              <DrawerFooter>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <AlertDialog
            motionPreset='slideInRight'
            isOpen={isOpen}
            onClose={onClose}
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <Center>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold' display='inline-block' alignContent='center'>
                    Авторизация
                  </AlertDialogHeader>
                </Center>
                <AlertDialogBody>
                  <Stack spacing="10px">

                    <Input type='email'
                      placeholder='Электронная почта'
                      onChange={inputEmail}
                    />

                    <InputGroup>
                      <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Введите пароль (не менее 8 символов)'
                        onChange={inputPassword}
                      />
                      <InputRightElement width='3rem'>
                        <IconButton
                          h='2rem'
                          w='2rem'
                          bgColor="white"
                          size='xl'
                          borderRadius="50%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center" onClick={handleClick}
                        >
                          {show ? <RxEyeOpen /> : <RxEyeClosed />}
                        </IconButton>
                      </InputRightElement>
                    </InputGroup>

                    <Box>
                      {
                        message ? (
                          dataError || !checkedEmail || !checkedPassword || (disabledInput === false) ? (
                            <Text textColor='red'>{dataError}</Text>
                          ) : null
                        ) : null
                      }
                    </Box>

                    <Flex justifyContent="space-between">
                      <RegisterAlertDialog />

                      {
                        cookies.access_token ? <ChangePasswordDialog /> : null
                      }

                    </Flex>
                  </Stack>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onClose}>
                    Закрыть
                  </Button>
                  <Button
                    onClick={disabledInput ? null : (() => logInUser() && handleOpenWithDelay())}
                    ml={3}
                    textColor="whiteAlpha.900"
                    bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                    _hover={{ bgGradient: "linear(to-r, #6E72FC, #AD1DEB)" }}
                  >
                    Войти
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )
      }
    </>
  )
}

export default EnterAlertDialog
