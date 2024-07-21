import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex } from '@chakra-ui/react';

const App = () => {
  const navigate = useNavigate();
  return (
    <Box>
      {/* <Box as="header" bg="teal.500" p={4} color="white">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          ACM India Dashboard
        </Text>
      </Box> */}
      <Flex as="nav" bg="black" p={4} justifyContent="center">
        <Button
          colorScheme="teal"
          variant="ghost"
          onClick={() => navigate('/home')}
          _hover={{ bg: 'teal.700' }}
          mx={2}
        >
          Home
        </Button>
        <Button
          colorScheme="teal"
          variant="ghost"
          onClick={() => navigate('/about')}
          _hover={{ bg: 'teal.700' }}
          mx={2}
        >
          About Us
        </Button>
        <Button
          colorScheme="teal"
          variant="ghost"
          onClick={() => navigate('/register')}
          _hover={{ bg: 'teal.700' }}
          mx={2}
        >
          Register
        </Button>
        <Button
          colorScheme="teal"
          variant="ghost"
          onClick={() => navigate('/login')}
          _hover={{ bg: 'teal.700' }}
          mx={2}
        >
          Login
        </Button>
        
        {/* <Button
          colorScheme="teal"
          variant="ghost"
          onClick={() => navigate('/form')}
          _hover={{ bg: 'teal.700' }}
          mx={2}
        >
          Form
        </Button> */}
      </Flex>
    </Box>
  );
};

export default App;