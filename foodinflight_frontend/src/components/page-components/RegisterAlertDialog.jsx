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
  Stack
} from '@chakra-ui/react'

const RegisterAlertDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef();
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
          setRepeatedPasswordError('Пароли не совпадают');
          return false;
        }
      }
      return true;
    } else {
      setRepeatedPasswordError('Пароли не совпадают');
      return false;
    }
  }

  const inputEmail = (event) => {
    const value = event.target.value;
    if (validateEmail(value)) {
      setCheckedEmail(value);
      setEmailError(null);
    } else {
      setEmailError('Название почты введено неверно. Пример: abc@mail.ru');
    }
  }

  const inputPassword = (event) => {
    const value = event.target.value;
    if (validatePassword(value)) {
      setCheckedPassword(value);
      setPasswordError(null);
    } else {
      setPasswordError('Пароль введён неверно. Проверьте используемые символы. Длина пароля не менее 8 символов');
    }
  }

  const repeatPassword = (event) => {
    const value = event.target.value;
    if (validateRepeatedPassword(checkedPassword, value)) {
      setCheckedRepeatedPassword(value);
      setRepeatedPasswordError(null);
    } else {
      setRepeatedPasswordError('Пароли не совпадают');
    }
  }

  const setNewUser = async () => {
    if (emailError) {
      setDataError();
      return emailError;
    }
    else if (passwordError) {
      setDataError();
      return passwordError;
    }
    else if (repeatedPasswordError) {
      setDataError();
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
        const userToken = userInfoJSON.token;
      }

      if (userInfo.status === 400) {
        setDataError(userInfoJSON.message);
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
              <AlertDialogHeader fontSize='lg' fontWeight='bold' display='inline-block' alignContent='center'>
                Регистрация
              </AlertDialogHeader>
            </Center>
            <AlertDialogBody>
              <Stack spacing='10px'>

                <Input
                  placeholder='Введите почту'
                  onChange={inputEmail}
                />

                <Input
                  placeholder='Введите пароль (не менее 8 символов)'
                  onChange={inputPassword}
                />

                <Input
                  placeholder='Повторите пароль'
                  onChange={repeatPassword}
                />

                <Button variant='link'>
                  Уже есть аккаунт?
                </Button>

              </Stack>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Закрыть
              </Button>
              <Button colorScheme='green' onClick={setNewUser} ml={3}>
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