import React from 'react'
import { Box, Text} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Layout from '../components/page/Layout'
import ProductMainPart from '../components/page/ProductMainPart'


const ProductPage = () => {
    return (
      <Layout>
        <ProductMainPart />
      </Layout>
    )
}

export default ProductPage