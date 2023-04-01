import React from "react";
import {
  Center,
  Link,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Box,
  Spacer,
  Text,
  Heading,
  IconButton
} from "@chakra-ui/react"
import { AiOutlineShoppingCart} from "react-icons/ai"
import { GrClose } from "react-icons/gr"

const CartButton = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Center>
        <Link style={{textDecoration: "none"}}>
          <Button 
            h="50px" 
            w="150px" 
            leftIcon={<AiOutlineShoppingCart />}
            bgColor="white"
            borderRadius="10px"
            onClick={onOpen}
            bgGradient="none"
            transition="700ms"
            transitionDelay="bgColor linear"
            _hover={{
              bgColor:"#CDCDCD"
            }}
          >
            Корзина
          </Button>
        </Link>
      </Center>

      <AlertDialog
        motionPreset='slideInRight'
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        filter='auto' 
        
      >
        <AlertDialogOverlay>
          <AlertDialogContent>

            <Flex alignItems="center" p="0px 10px 0px 0px">
              <AlertDialogHeader fontSize='3xl' fontWeight='bold' display='inline-block' alignContent='center'>
                Корзина
              </AlertDialogHeader>
              <Spacer />
              <IconButton icon={<GrClose />} bgColor="white" _hover={{bgColor:"white"}} onClick={onClose}/>
            </Flex>
            
            <AlertDialogBody>
              <Flex>
                <Flex flexDirection="column">
                  <Heading as="h3" fontSize="xl">Ваш заказ</Heading>
                  
                  <Spacer />

                  <Box 
                  shadow="md"
                  transition="200ms ease-out"
                  _hover={{shadow:"lg"}}
                  >
                    Товар
                  </Box>
                </Flex>

                <Spacer />

                <Flex flexDirection="column">
                  <Heading as="h3" fontSize="xl">К оплате</Heading>
                  <Spacer />
                  <Button>Продолжить</Button>
                </Flex>
              </Flex>
              
            </AlertDialogBody>

          </AlertDialogContent>
        </AlertDialogOverlay>
        
      </AlertDialog>
    </>
  )
}

export default CartButton