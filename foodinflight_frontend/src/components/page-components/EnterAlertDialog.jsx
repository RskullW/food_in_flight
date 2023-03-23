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
  Box,
} from '@chakra-ui/react'
import PasswordInput from "./EnterPassword";

const EnterAlerDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

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
          bgColor:"#F7B42C"
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
              <Stack spacing={4}>
                <InputGroup>
                  <InputLeftAddon children='+7' />
                  <Input type='number' placeholder='Номер телефона'/>
                </InputGroup>
                <PasswordInput />
                <Box>
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
