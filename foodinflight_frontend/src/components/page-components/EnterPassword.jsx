import React from "react";
import { 
    Input,
    InputGroup,
    InputRightElement,
    Button
} from "@chakra-ui/react";

function PasswordInput() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Введите пароль'
            />
            <InputRightElement width='5rem'>
                <Button h='1.75rem' size='xs' onClick={handleClick}>
                {show ? 'Убрать' : 'Показать'}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default PasswordInput