import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';

function AdminDashboard() {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const toast = useToast();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:5001/api/requests', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
                setError('Failed to load requests');
            } finally {
                setIsLoading(false);
            }
        };
        fetchRequests();
    }, []);

    async function handleApprove(requestId) {
        try {
            setIsLoading(true);
            await axios.put(`http://localhost:5001/requests/${requestId}/approve`, null, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            toast({
                title: 'Request approved.',
                description: 'The mentor-mentee request has been approved.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setRequests(requests.filter(request => request.id !== requestId)); // Remove approved request from UI
        } catch (error) {
            console.error('Error approving request:', error);
            toast({
                title: 'Approval failed.',
                description: 'An error occurred while approving the request.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDeny(requestId) {
        try {
            setIsLoading(true);
            await axios.put(`http://localhost:5001/requests/${requestId}/deny`, null, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            toast({
                title: 'Request denied.',
                description: 'The mentor-mentee request has been denied.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setRequests(requests.filter(request => request.id !== requestId)); // Remove denied request from UI
        } catch (error) {
            console.error('Error denying request:', error);
            toast({
                title: 'Denial failed.',
                description: 'An error occurred while denying the request.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box p={6}>
            <Text fontSize="2xl" mb={4}>Admin Dashboard</Text>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    {error && <Text color="red.500">{error}</Text>}
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Request ID</Th>
                                    <Th>Mentor</Th>
                                    <Th>Mentee</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {requests.map(request => (
                                    <Tr key={request.id}>
                                        <Td>{request.id}</Td>
                                        <Td>{request.mentorName}</Td>
                                        <Td>{request.menteeName}</Td>
                                        <Td>
                                            <Stack direction="row" spacing={4}>
                                                <Button
                                                    colorScheme="green"
                                                    onClick={() => handleApprove(request.id)}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    colorScheme="red"
                                                    onClick={() => handleDeny(request.id)}
                                                >
                                                    Deny
                                                </Button>
                                            </Stack>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Box>
    );
}

export default AdminDashboard;