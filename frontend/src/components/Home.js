import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, VStack, useToast, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user profile data from backend
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data');
            }
        };
        fetchUserData();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleSave() {
        try {
            setIsLoading(true);
            setError('');

            // Update profile data
            const response = await axios.put('http://localhost:5001/api/users/profile', user, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('Profile update response:', response.data);
            if (response.data.message === 'Profile updated successfully') {
                toast({
                    title: 'Profile updated.',
                    description: 'Your profile information has been updated successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                setError('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('An error occurred while updating profile');
        } finally {
            setIsLoading(false);
        }
    }

    function handleRequestForm() {
        navigate('/form'); // Redirect to the request form page
    }

    return (
        <VStack spacing={8} py={10} px={6} align="stretch">
            <Box>
                <Text fontSize="2xl" mb={4}>Dashboard</Text>
                <FormControl isInvalid={!!error}>
                    <Stack spacing={4}>
                        <FormControl id="firstname">
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                name="firstname"
                                value={user.firstname}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="lastname">
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                name="lastname"
                                value={user.lastname}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            colorScheme="blue"
                            onClick={handleSave}
                        >
                            Save Changes
                        </Button>
                        {error && <Text color="red.500">{error}</Text>}
                    </Stack>
                </FormControl>
            </Box>
            <Box>
                <Button colorScheme="teal" onClick={handleRequestForm}>
                    Request Form
                </Button>
            </Box>
        </VStack>
    );
}

export default Dashboard;