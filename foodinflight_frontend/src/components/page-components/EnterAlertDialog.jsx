import React, { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
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
  Text
} from '@chakra-ui/react'
import RegisterAlertDialog from "./RegisterAlertDialog";

const EnterAlertDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [dataError, setDataError] = useState(null);
  const [checkedEmail, setCheckedEmail] = useState('');
  const [checkedPassword, setCheckedPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [message, setMessage] = useState(null);
  const [inputClicked, setInputClicked] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  const data = {
    username: `${checkedEmail}`,
    password: `${checkedPassword}`,
  }

  const validateEmail = (email) => {
    const re = /^[\w-\.]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  }

  const validatePassword = (password) => {
    const passw = /^[A-Za-z]\w{7,14}$/;
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

  const logOutUser = () => {
    removeCookie("access_token");
    window.location.reload();
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
      console.log(userInfoJSON);


      if (userInfo.status === 200) {
        setCookie("access_token", userInfoJSON.token);
        setDataError(null);
        window.location.reload();
      }

      if (userInfo.status === 400) {
        setDataError("Данные введены неверно");
        setInputClicked(false);
        setDisabledInput(false);
        return dataError;
      }

    } catch (error) {
      setDataError(error);
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
          borderRadius="10px"
          onClick={logOutUser}
          bgGradient="none"
          transition="700ms"
          transitionDelay="bgColor linear"
          _hover={{
            bgColor: "#CDCDCD"
          }}
        >
          Выйти
        </Button>
      ) : (
        <Button
          w="200px"
          h="50px"
          bgColor="white"
          borderRadius="10px"
          onClick={onOpen}
          bgGradient="none"
          transition="700ms"
          transitionDelay="bgColor linear"
          _hover={{
            bgColor: "#CDCDCD"
          }}
        >
          Войти
        </Button>
      )
    }  

      <AlertDialog
        motionPreset='slideInRight'
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
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
                  <InputRightElement width='5rem'>
                    <Button h='1.75rem' size='md' onClick={handleClick}>
                      {show ? 'Скрыть' : 'Показать'}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Box>
                  {
                    message ? (
                      dataError || !checkedEmail || !checkedPassword || (inputClicked === false) ? (
                        <Text>{dataError}</Text>

                      ) : null
                    ) : null

                  }
                </Box>

                <Box>
                  <RegisterAlertDialog />
                  <Button variant='link' marginLeft='55'>
                    Забыли пароль?
                  </Button>
                </Box>
              </Stack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Закрыть
              </Button>
              <Button colorScheme='green' onClick={disabledInput ? null : logInUser} ml={3}>
                Войти
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default EnterAlertDialog
