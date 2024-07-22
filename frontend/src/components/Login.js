import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    VStack,
    Text,
    Link,
    FormErrorMessage,
    InputGroup,
    InputLeftElement,
    Icon
} from '@chakra-ui/react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setIsLoading(true);
            setError('');
    
            console.log('User Login', user);  // Log the user object for demonstration
    
            // Make a POST request to the /login endpoint
            const response = await axios.post('https://acm-india-backend.onrender.com/api/auth/login', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // Handle the response from the backend
            if (response.data.success) {
                console.log('User logged in', response.data);  // Log the response for demonstration
                
                // Optionally, you can store the token in localStorage or context
                localStorage.setItem('token', response.data.token);

                // Redirect to the home page
                navigate('/home');
            } else {
                // Set error if response doesn't indicate success
                setError('Login failed. Please check your credentials.');
            }
    
        } catch (error) {
            console.error('Login error:', error);  // Log error for debugging
            if (error.response && error.response.data) {
                // Backend returned an error response
                setError(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                // Network or other errors
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <VStack spacing={8} py={10} px={6} align="stretch" as="form" onSubmit={handleSubmit}>
            <FormControl isInvalid={!!error}>
                <Stack spacing={4}>
                    <FormControl id="email">
                        <FormLabel>Email Address</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={MdEmail} />
                            </InputLeftElement>
                            <Input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={MdLock} />
                            </InputLeftElement>
                            <Input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </FormControl>
                    <Button
                        isLoading={isLoading}
                        isDisabled={!user.email || !user.password || isLoading}
                        colorScheme="blue"
                        type="submit"
                    >
                        Log in
                    </Button>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </Stack>
            </FormControl>
            <Box>
                <Text>
                    Don't have an account?{' '}
                    <Link href="/register" color="teal.500">Sign up here</Link>
                </Text>
            </Box>
        </VStack>
    );
}

export default LoginForm;