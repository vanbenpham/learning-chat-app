import React from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { Container, Box, Text, Tabs, TabList, TabPanel, TabPanels, Tab } from '@chakra-ui/react';
import Login from '../components/authentication/Login';
import SignUp from '../components/authentication/SignUp';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('userInfo');
        const user = JSON.parse(localStorage.getItem('userInfo'));

        if(user) navigate('/chats');
    }, [navigate]);

    return (
        <Container maxW='xl' centerContent>
            <Box display='flex' textAlign='center' p={3} bg='white' w='100%' m='40px 0 15px 0' borderRadius='lg' borderWidth='1px'>
                <Text fontSize='4xl' color='black'>Talk-A-Tive</Text>
            </Box>
            <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px' color='black'>
                <Tabs variant='soft-rounded'>
                    <TabList mb='1em'>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default HomePage;