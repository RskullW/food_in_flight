import React, { useState } from "react";
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
import PasswordInput from "./EnterPassword";
import RegisterAlertDialog from "./RegisterAlertDialog";
import { getUserToken } from "./RegisterAlertDialog";
// const userToken = getUserToken();
// console.log(userToken);

let userToken = null;
let userExpiry = null;

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
      const userInfo = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/login`, {
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
        userToken = userInfoJSON.token;
        console.log(userToken);
        userExpiry = userInfoJSON.expiry;
        setDataError(null);
        window.location.reload();
      }

      if (userInfo.status === 400) {
        setDataError(userInfoJSON.message);
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
