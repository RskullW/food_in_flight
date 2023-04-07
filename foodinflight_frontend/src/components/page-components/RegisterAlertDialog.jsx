import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Center,
  Alert,
  InputGroup,
  Input,
  Box,
  Stack,
  Text,
  InputRightElement,
  Flex,
  Link
} from '@chakra-ui/react'

let userToken = null;
let userEmail = null;

const RegisterAlertDialog = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const { isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = React.useRef();
  const [disabledRegistration, setDisabledRegistration] = useState(false);
  const [registrationClicked, setRegistrationClicked] = useState(false);
  const [message, setMessage] = useState('');
  const [dataError, setDataError] = useState(null);
  const [checkedEmail, setCheckedEmail] = useState('');
  const [checkedPassword, setCheckedPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [repeatedPasswordError, setRepeatedPasswordError] = useState(null);
  const [checkedRepeatedPassword, setCheckedRepeatedPassword] = useState('');

  const data = {
    username: `${checkedEmail}`,
    email: `${checkedEmail}`,
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

  const validateRepeatedPassword = (password, repeatedPassword) => {
    const passwordArray = password.split('');
    const repeatedPasswordArray = repeatedPassword.split('');
    if (repeatedPassword.length === password.length) {
      for (let i = 0; i < passwordArray.length; i++) {
        if (repeatedPasswordArray[i] !== passwordArray[i]) {
          setMessage('Пароли не совпадают');
          setRepeatedPasswordError(message);
          return false;
        }
      }
      return true;
    } else {
      setMessage('Пароли не совпадают');
      setRepeatedPasswordError(message);
      return false;
    }
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

  const repeatPassword = (event) => {
    const value = event.target.value;
    if (validateRepeatedPassword(checkedPassword, value)) {
      setCheckedRepeatedPassword(value);
      setRepeatedPasswordError(null);
    } else {
      setMessage('Пароли не совпадают');
      setRepeatedPasswordError(message);
    }
  }



  const setNewUser = async () => {
    setRegistrationClicked(true);
    setDisabledRegistration(true);
    if (emailError) {
      setRegistrationClicked(false);
      setDisabledRegistration(false);
      setMessage(emailError);
      setDataError(emailError);
      return emailError;
    }
    else if (passwordError) {
      setRegistrationClicked(false);
      setDisabledRegistration(false);
      setMessage(passwordError);
      setDataError(passwordError);
      return passwordError;
    }
    else if (repeatedPasswordError) {
      setRegistrationClicked(false);
      setDisabledRegistration(false);
      setMessage(repeatedPasswordError);
      setDataError(repeatedPasswordError);
      return repeatedPasswordError;
    }

    try {
      const userInfo = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/register/`, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const userInfoJSON = await userInfo.json();

      if (userInfo.status === 201) {
        userToken = userInfoJSON.token;
        userEmail = userInfoJSON.user.email;
        setDataError(null);
        window.location.reload();
      }

      if (userInfo.status === 400) {
        setDataError(userInfoJSON.message);
        setRegistrationClicked(false);
        setDisabledRegistration(false);
        return dataError;
      }


    } catch (error) {
      setDataError(error);
    }

  }


  return (
    <>
      <Button variant='link' onClick={onOpen}>
        Ещё не регистрировались?
      </Button>

      <AlertDialog
        motionPreset="slideInRight"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>

            <Center>
              <AlertDialogHeader fontSize='3xl' fontWeight='bold' display='inline-block' alignContent='center'>
                Регистрация
              </AlertDialogHeader>
            </Center>

            <AlertDialogBody>
              <Stack spacing='10px'>

                <Input
                  placeholder='Введите почту'
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
                

                <InputGroup>
                  <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Повторите пароль'
                    onChange={repeatPassword}
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
                      dataError || !checkedEmail || !checkedPassword || !checkedRepeatedPassword || (registrationClicked === false) ? (
                        <Text>{dataError}</Text>
                        
                      ) :  null
                    ) : null
                    
                  }
                </Box>

                <Button variant='link'>
                  Уже есть аккаунт?
                </Button>

              </Stack>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Закрыть
              </Button>
              <Button colorScheme='green' onClick={disabledRegistration ? null : setNewUser} ml={3}>
                Зарегистрироваться
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default RegisterAlertDialog

export function getUserToken(userToken) {
  console.log(userToken);
  return userToken;
}