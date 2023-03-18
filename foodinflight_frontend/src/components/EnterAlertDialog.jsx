import React from "react";
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
  InputLeftAddon,
  InputGroup,
  Stack,
  Box
} from '@chakra-ui/react'
import PasswordInput from "./EnterPassword";

const EnterAlerDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button w="200px" h="60px" bgColor="white" border="1px solid black" onClick={onOpen}>
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
              <Stack spacing={4}>
                <InputGroup>
                  <InputLeftAddon children='+7' />
                  <Input type='tel' placeholder='Номер телефона'/>
                </InputGroup>
                <PasswordInput />
                <Box >
                  <Button variant='link'>
                    Ещё не регистрировались?
                  </Button>
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
              <Button colorScheme='green' onClick ml={3}>
                Войти
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default EnterAlerDialog
