import React, { useState } from 'react'
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
    Text
} from '@chakra-ui/react'

function ExitConfirmationDialog() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
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

    return (
    <>
        <Button 
            bgColor='red.400' 
            textColor='whiteAlpha.900'
            _hover={{bgColor:'red.500'}}
            onClick={onOpen}
        >
            Выйти из аккаунта
        </Button>

        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
            motionPreset='slideInBottom'
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        <Text align='center'>
                            Выход из аккаунта
                        </Text>
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Text>
                            Вы действительно хотите выйти из аккаунта?
                        </Text>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Отмена
                        </Button>
                        <Button 
                            bgColor='red.400' 
                            textColor='whiteAlpha.900'
                            _hover={{bgColor:'red.500'}}
                            onClick={disabledInput ? null : (e) => { e.persist(); logOutUser(); }} 
                            ml={3}
                        >
                            Выйти
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </>
    )
}

export default ExitConfirmationDialog