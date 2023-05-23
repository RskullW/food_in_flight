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
  IconButton
} from '@chakra-ui/react'
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"


const RegisterAlertDialog = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [disabledRegistration, setDisabledRegistration] = useState(false);
  const [registrationClicked, setRegistrationClicked] = useState(false);
  const [dataError, setDataError] = useState(null);
  const [checkedEmail, setCheckedEmail] = useState('');
  const [checkedPassword, setCheckedPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [repeatedPasswordError, setRepeatedPasswordError] = useState('Пароли не совпадают');
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
    const passw = /^[A-Za-z]\w{7,100}$/;
    return passw.test(password);
  }

  const validateRepeatedPassword = (password, repeatedPassword) => {
    if (repeatedPassword === '') {
      return false;
    }
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
      setEmailError(`Название почты введено неверно. Пример: abc@mail.ru`);
    }
  }

  const inputPassword = (event) => {
    const value = event.target.value;
    if (validatePassword(value)) {
      setCheckedPassword(value);
      setPasswordError(null);
    } else {
      setPasswordError('Пароль введён неверно. Проверьте используемые символы. Пароль должен содержать буквы латинского алфавита и цифры. Длина пароля не менее 8 символов');
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

  useEffect(() => {
    inputEmail({ target: { value: checkedEmail } });
    inputPassword({ target: { value: checkedPassword } });
    repeatPassword({ target: { value: checkedRepeatedPassword } });
  }, []);


  const setNewUser = async () => {
    setRegistrationClicked(true);
    setDisabledRegistration(true);
    if (emailError) {
      setRegistrationClicked(false);
      setDisabledRegistration(false);
      setDataError(emailError);
      return emailError;
    }
    else if (passwordError) {
      setRegistrationClicked(false);
      setDisabledRegistration(false);
      setDataError(passwordError);
      return passwordError;
    }
    else if (repeatedPasswordError) {
      setRegistrationClicked(false);
      setDisabledRegistration(false);
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


                <InputGroup>
                  <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Повторите пароль'
                    onChange={repeatPassword}
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
                    dataError || !checkedEmail || !checkedPassword || !checkedRepeatedPassword || (registrationClicked === false) ? (
                      <Text>{dataError}</Text>
                    ) : null
                  }
                </Box>

              </Stack>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>
                Закрыть
              </Button>
              <Button
                onClick={disabledRegistration ? null : setNewUser}
                ml={3}
                textColor="whiteAlpha.900"
                bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                _hover={{ bgGradient: "linear(to-r, #6E72FC, #AD1DEB)" }}
              >
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