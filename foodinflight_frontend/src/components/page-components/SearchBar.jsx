import React, { useState, useEffect } from "react";
import { FormControl, Input, Center, List, ListItem, Box, Link, Flex, Text, Spacer, Image, Button, textDecoration } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi"
import { useParams } from "react-router-dom";

const SearchBar = () => {

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
    if (allProducts.length) {
      filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
      );
    } 
    
    setResults(filteredProducts);
  }

  const handlePressKey = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      window.location.href = `${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/searchResults/${event.target.value}`
    }
  }

  return (
    <Center w="400px">
      <FormControl>
        <Input 
          value={query}
          onChange={handleSearch}
          onKeyPress={handlePressKey}
          h="50px"
          bgColor="white"
          borderRadius="10px"
          type="search" 
          placeholder="Поиск по меню"
          focusBorderColor="#CDCDCD"
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
            p="10px"
          >
            {results.slice(0, 7).map((product) => (
              
              <Link
                style={{textDecoration:"none"}}
                href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/${product.category.slug}/${product.slug}`}
              >
                <Flex 
                  key={product.id}
                  alignItems="center"
                  p="10px 10px"
                  gap="10px"
                >
                  <Flex
                    maxH="50px"
                    maxW="50px"
                    justifyContent="flex-start"
                  >
                    <Image
                      src={product.images[0]?.image}
                      objectFit="cover"
                      w="100%"
                      borderRadius="0.375rem"
                    />
                  </Flex>

                

                  <Flex fontSize="14px" justifyContent="flex-start">
                    <Text>
                      {product.title}
                    </Text>
                  </Flex>

                  <Spacer />

                  <Flex justifyContent="flex-start">
                    <Text fontSize="18px">{product.price}₽</Text>
                  </Flex>
                
                </Flex>
              </Link>
              
            ) 
            )}

            <Link
              style={{textDecoration:"none"}}
              display="inline"
              p="10px"
              href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}/searchResults/${query}`}
              textColor="whiteAlpha.900"
              bgGradient="linear(to-b, #6E72FC, #AD1DEB)"
              _hover={{bgGradient: "linear(to-b, #6E72FC, #AD1DEB)"}}
              borderRadius="10px"
              textAlign="center"
            >
              Все результаты
            </Link>
            
          </Flex>
          
        ) : null
      }
      </FormControl> 
    </Center>
  )
}

export default SearchBar;
