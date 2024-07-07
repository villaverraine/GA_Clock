import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useUser } from '../components/UserContext';
import { styled } from '@mui/material/styles';

const LoginDiv = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '60vh',
    width: '30%',
    margin: '20vh auto 0',
    // backgroundColor: '#FAFAFA',
    borderRadius: '10px'
});

const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '5px'
});


const schema = {
    type: "object",
    properties: {
        username: { 
            type: 'string',
            title: "Username"
        },
        password: { 
            type: 'string',
            format: 'password',
            title: "Password" 
        },
    },
};

const uischema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "Control",
            scope: "#/properties/username",
            options: {
                label: 'Username'
            }
        },
        {
            type: "Control",
            scope: "#/properties/password",
            options: {
                label: 'Password'
            }
        }
    ] 
}



function LoginForm() {
    const [ data, setData ] = React.useState({});
    const [ errors, setErrors ] = React.useState({});
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { setUser } = useUser();
    
    const handleRegister = () => {
        navigate('/register');  
    };
    const handleSubmit = async () => {
        if(errors && errors.length > 0) {
            for(let i = 0; i < errors.length; i++){
                enqueueSnackbar(errors[i]);
            }
        }
        
        try {
            const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
            }); 
        
        
            const reply = await response.json();
            if(reply && reply.success){
                setUser(reply.result);
                console.log("Form Submitted");   
                enqueueSnackbar("Login Successful!", {variant: 'success'});
                navigate('/home');
            } else {
                enqueueSnackbar(reply.message, {variant: 'error'});
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
            enqueueSnackbar(error.message, {variant: 'error'});
        }
        
    }; 

    return (
    <div>
        <LoginDiv>
            <JsonForms
                schema = {schema}
                uischema = {uischema}
                data = {data}
                renderers = {materialRenderers}
                onChange={({ data, errors }) => {
                    setData(data);
                    setErrors(errors);
                }}
            />
            <Button variant="contained" onClick={handleSubmit} style={{width: '100%', marginTop: '30px'}}>Login</Button>
            <ButtonContainer>
                <Button variant="text" onClick={handleRegister}>Forgot Password?</Button>
                <Button variant="text" onClick={handleRegister}>Don't have an account? Sign Up.</Button>
            </ButtonContainer>
        </LoginDiv>
    </div>
    );
    
}

export default LoginForm;