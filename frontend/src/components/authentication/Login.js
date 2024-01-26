import { Button, FormControl, useToast, FormLabel, Input, InputGroup, InputRightElement, VStack, useStatStyles } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const {setUser} = ChatState();

    const handleClick = () => {
        setShow(!show);
    }

    const submitHandler = async () => {
        setLoading(true);
        if(!email || !password) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                }
            };

            const {data} = await axios.post('/api/user/login', 
            {email, password},
            config);

            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setUser(data)
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            navigate('/chats');
        }catch (error) {
            let errMessage = "An error occurred";
            if(error.response && error.response.data) {
                errMessage = error.response.data.message;
            }
            toast({
                title: 'Error Occurred',
                description: errMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
        }
    }

    return (
        <div>
            <VStack spacing='5px'>
                <FormControl id='' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        placeholder='Enter Your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id='' isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            type= {show? 'text' : 'password'}
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button color='white' colorScheme='blue' width='100%' style={{marginTop: 15}} onClick={submitHandler} isLoading={loading}>
                    Login
                </Button>
                <Button 
                    variant='solid' 
                    colorScheme='red' 
                    width='100%' 
                    onClick={() => {
                        setEmail("guest@example.com");
                        setPassword("123456");
                    }}
                >
                    Get Guest User Credential
                </Button>
            </VStack>
        </div>
    )
}

export default Login