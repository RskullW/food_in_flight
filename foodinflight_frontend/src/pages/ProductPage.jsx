import React, { useState } from 'react'
import { Box, Text} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Layout from '../components/page/Layout'


const ProductPage = () => {
    const { product } = useParams();
    
    return (
      <Layout>
        <Text></Text>
      </Layout>
    )
}

export default ProductPage