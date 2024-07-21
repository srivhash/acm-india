import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    useToast,
    FormErrorMessage,
    VStack,
    Text,
    Link,
    InputGroup,
    InputLeftElement,
    Icon
} from '@chakra-ui/react';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import catchErrors from '../catchErrors';

const INITIAL_USER = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
};

function Signup() {
    const [user, setUser] = useState(INITIAL_USER);
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const isUser = Object.values(user).every(el => Boolean(el));
        setDisabled(!isUser);
    }, [user]);

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setIsLoading(true);
            setError('');

            // Make a POST request to the /register endpoint
            const response = await axios.post('http://localhost:5001/api/auth/register', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Handle the response from the backend
            if (response.data.message === "You have successfully registered!") {
                console.log('User registered', response.data);  // Log the response for demonstration
                setUser(INITIAL_USER);

                // Optionally, you can store the token in localStorage or context
                localStorage.setItem('token', response.data.token);

                // Show success message
                toast({
                    title: "Registration successful.",
                    description: "You have been registered successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                // Redirect to the home page
                navigate('/about');
            } else {
                setError(response.data);
            }

        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <VStack spacing={8} py={10} px={6} align="stretch" as="form" onSubmit={handleSubmit}>
            <FormControl isInvalid={!!error}>
                <Stack spacing={4}>
                    <FormControl id="firstname">
                        <FormLabel>First Name</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={MdPerson} />
                            </InputLeftElement>
                            <Input
                                type="text"
                                name="firstname"
                                value={user.firstname}
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="lastname">
                        <FormLabel>Last Name</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={MdPerson} />
                            </InputLeftElement>
                            <Input
                                type="text"
                                name="lastname"
                                value={user.lastname}
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
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
                        isDisabled={disabled || isLoading}
                        colorScheme="blue"
                        type="submit"
                        
                    >
                        Signup
                    </Button>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </Stack>
            </FormControl>
            <Box>
                <Text>
                    Already have an account?{' '}
                    <Link href="/login" color="teal.500">Login here</Link>
                </Text>
            </Box>
        </VStack>
    );
}

export default Signup;