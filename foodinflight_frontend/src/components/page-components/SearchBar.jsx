import React, { useState, useEffect } from "react";
import { FormControl, Input, Center, List, ListItem, Box, Link, Flex, Text, Spacer, Image } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi"

const SearchBar = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productsError, setProductsError] = useState(false);
  const [query, setQuery] = useState(''); 
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getProducts = async() => {
      try {
        const productsResponse = await fetch(`${process.env.REACT_APP_BACKEND_PROTOCOL_HOST}/api/products/`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json"
          }
        })
  
        if (productsResponse.status === 200) {
          const productsJSON = await productsResponse.json();
          setAllProducts(productsJSON);
        } else {
          setProductsError(true);
        }
      } catch (error) {
        setProductsError(true);
      }
    }

    getProducts();
  }, [])

  const handleSearch = (event) => {
    const { value } = event.target;
    setQuery(value);
    let filteredProducts = [];
    console.log(allProducts);
    if (allProducts && allProducts.length > 0) {
      filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
      );
    }
    
    setResults(filteredProducts);
  }

  return (
    <Center w="400px">
      <FormControl>
        <Input 
          value={query}
          onChange={handleSearch}
          h="50px"
          bgColor="white"
          borderRadius="10px"
          type="search" 
          placeholder="Поиск по меню"
          focusBorderColor="rgba(255, 255, 255, 1)"
        />
        {results.length && query.length ? (
          <Flex
            flexDirection="column"
            bgColor="white" 
            border="1px solid black" 
            position="absolute"
            top="55px"
            borderRadius="10px"
            left="0px"
            zIndex="10000"
            w="450px"
          >
            {results.map((product) => (
              <Link
                style={{textDecoration:"none"}}
                href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/${product.category.slug}/${product.slug}`}
              >
                <Flex 
                  key={product.id}
                  alignItems="center"
                  p="10px 10px"
                  gap="20px"
                >
                  <Box
                    maxH="50px"
                    maxW="50px"
                    
                  >
                    <Image
                      src={product.images[0]?.image}
                      objectFit="cover"
                      w="100%"
                      borderRadius="0.375rem"
                    />
                  </Box>

                  <Spacer />

                  <Box fontSize="14px">
                    <Text>
                      {product.title}
                    </Text>
                  </Box>

                  <Spacer />

                  <Box>
                    <Text fontSize="18px">{product.price}₽</Text>
                  </Box>
                
              </Flex>
              </Link>
              
            ) 
            )}
          </Flex>
          
        ) : null
      }
      </FormControl> 
    </Center>
  )
}

export default SearchBar;
