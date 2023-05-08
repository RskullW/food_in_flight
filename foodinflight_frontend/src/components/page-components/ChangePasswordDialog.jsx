import React, { useState } from "react";
import { useCookies } from "react-cookie";
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
  InputGroup,
  Input,
  Box,
  Stack,
  Text,
  InputRightElement,
  IconButton
} from '@chakra-ui/react'
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";

const ChangePasswordDialog = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [disabledChange, setDisabledChange] = useState(false);
  const [changePasswordClicked, setChangePasswordClicked] = useState(false);
  const [dataError, setDataError] = useState(null);
  const [checkedPassword, setCheckedPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState(null);
  const [passwordError, setPasswordError] = useState('Новый пароль введён некорректно');
  const [statusError, setStatusError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  const data = {
    old_password: `${oldPassword}`,
    new_password: `${checkedPassword}`,
  }

  const validatePassword = (password) => {
    const passw = /^[A-Za-z]\w{7,14}$/;
    return passw.test(password);
  }

  const inputOldPassword = (event) => {
    const value = event.target.value;
    if (validatePassword(value)) {
      setOldPassword(value);
      setOldPasswordError(null);
    } else {
      setOldPasswordError('Проверьте используемые символы. Пароль должен содержать буквы латинского алфавита и цифры. Длина пароля не менее 8 символов');
    }
  }

  const inputPassword = (event) => {
    const value = event.target.value;
    if (validatePassword(value)) {
      setCheckedPassword(value);
      setPasswordError(null);
    } else {
      setPasswordError('Проверьте используемые символы. Пароль должен содержать буквы латинского алфавита и цифры. Длина пароля не менее 8 символов');
    }
  }

  const changeUserPassword = async () => {
    setChangePasswordClicked(true);
    setDisabledChange(true);
    if (oldPasswordError) {
      setChangePasswordClicked(false);
      setDisabledChange(false);
      setDataError(oldPasswordError);
    }
    else if (passwordError) {
      setChangePasswordClicked(false);
      setDisabledChange(false);
      setDataError(passwordError);
    }

    try {
      const userInfo = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/change_password/`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${cookies.access_token}`,
        }
      })

      console.log(userInfo.status);

      if (userInfo.status === 204) {
        console.log(userInfo.status);
        setDataError(null);
        window.location.reload();
      }

      if (userInfo.status === 400) {
        console.log(userInfo.status);
        setStatusError('Данные введены некорректно. Проверьте правильность данных.');
        setChangePasswordClicked(false);
        setDisabledChange(false);
      }
    } catch (error) {
      setDataError(error);
    }
  }



  return (
    <>
      <Button
        onClick={onOpen}
        textColor="whiteAlpha.900"
        bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
        _hover={{ bgGradient: "linear(to-r, #6E72FC, #AD1DEB)" }}
      >
        Сменить пароль
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

            <AlertDialogHeader fontSize='3xl' fontWeight='bold' alignContent='center'>
              <Text align='center'>
                Смена пароля
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody>
              <Stack spacing='10px'>

                <InputGroup>
                  <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Введите старый пароль'
                    onChange={inputOldPassword}
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
                    placeholder='Введите новый пароль'
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
                    dataError || !oldPassword || !checkedPassword ? (
                      <Text textColor='red'>{dataError}</Text>
                    ) : null
                  }
                  {
                    statusError ? (
                      <Text textColor='red'>{statusError}</Text>
                    ) : null
                  }
                </Box>

              </Stack>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Закрыть
              </Button>
              <Button
                onClick={disabledChange ? null : changeUserPassword}
                ml={3}
                textColor="whiteAlpha.900"
                bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
                _hover={{ bgGradient: "linear(to-r, #6E72FC, #AD1DEB)" }}
              >
                Сменить пароль
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default ChangePasswordDialog