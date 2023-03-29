import React from "react";
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
import PasswordInput from "./EnterPassword";

const RegisterAlertDialog = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

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
                                <Input placeholder='Введите почту'></Input>
                                <PasswordInput />
                                <PasswordInput />
                                <Button variant='link'>
                                    Уже есть аккаунт?
                                </Button>
                            </Stack>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Закрыть
                        </Button>
                        <Button colorScheme='green' onClick ml={3}>
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