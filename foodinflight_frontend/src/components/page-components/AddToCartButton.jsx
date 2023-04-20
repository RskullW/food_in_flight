// import React from "react"
// import { useCartContext } from "../../contexts/CartContext"
// import {
//   Button,
//   Flex,
//   Box,
//   Text
// } from "@chakra-ui/react"
// import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi"


// const AddToCartButton = () => {
//   const { onAddToCart, onRemoveFromCart, cartProducts, totalPrice, totalQTY } = useCartContext();

//   return (
//     <Box 
//       bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
//       _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
//       borderRadius="10px"
//     >
//         <Button 
//           onClick={onAddToCart(product)}
//           textColor="whiteAlpha.900"
//           bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
//           _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
//         >
//           В корзину
//         </Button>

//         <Flex 
//           gap="10px"
//           alignItems="center"
//           h="-moz-min-content"
//         >

//           <Button
//             onClick={onRemoveFromCart}
//             textColor="whiteAlpha.900"
//             bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
//             _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
//           >
//             <HiOutlineMinus />
//           </Button>

//           <Text textColor="whiteAlpha.900">
//             {totalQTY}
//           </Text>
              
//           <Button
//             onClick={onAddToCart}
//             textColor="whiteAlpha.900"
//             bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
//             _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
//           >
//             <HiOutlinePlus />
//           </Button>

//         </Flex>
//     </Box>
//   )
// }

// export default AddToCartButton