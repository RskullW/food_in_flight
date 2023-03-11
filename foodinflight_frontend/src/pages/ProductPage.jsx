import React, { useState } from 'react'
import { Box, Heading, Flex, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'


const ProductPage = () => {
    const { product } = useParams();
    
    return (
        <Box>
            <Heading>
                { product }
            </Heading> 
        </Box>
    )
}

export default ProductPage