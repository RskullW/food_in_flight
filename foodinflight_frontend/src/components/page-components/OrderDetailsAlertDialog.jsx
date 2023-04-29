import React from "react";
import {
  useDisclosure,
  Box,
  Text,
  IconButton,
  Spacer,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex
} from "@chakra-ui/react";

import { GrClose } from "react-icons/gr";

const OrderDetailsAlertDialog = ({ isOpen, onClose }) => {
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        isCentered
        filter="auto"
        size="3xl"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='3xl' fontWeight='bold' display='inline-block' alignContent='center'>
              <Flex alignItems="center">
                <Text>Детали заказа</Text>
                <Spacer />
                <IconButton icon={<GrClose />} bgColor="white" _hover={{ bgColor: "white" }} onClick={onClose} />
              </Flex>
            </AlertDialogHeader>
            <AlertDialogBody>
              
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default OrderDetailsAlertDialog;