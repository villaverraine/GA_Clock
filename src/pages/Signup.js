import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useUser } from '../components/UserContext';
import { styled } from '@mui/material/styles';

const PageContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full height of the viewport
    width: '100vw', // Full width of the viewport
    backgroundColor: '#F3F3F3', // Background color for the whole page
});

const SignUpDiv = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FDFDFD', // Background color for the login div
    borderRadius: '10px',
    padding: '8vh',
    width: '34vw'
});

const Logo = styled('div')({
    width: '100%',
    height: '150px',
    backgroundImage: 'url(/gallium31_logo.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginBottom: '20px'
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
        firstName: { 
            type: 'string',
            title: "First Name"
        },
        lastName: { 
            type: 'string',
            title: "Last Name"
        },
        username: { 
            type: 'string',
            title: "Username"
        },
        email: { 
            type: 'string',
            format: 'email',
            title: "Email Address"
        },
        password: { 
            type: 'string',
            format: 'password',
            title: "Password"
        },
        confirmPassword: { 
            type: 'string',
            format: 'password',
            title: "Confirm Password"
        },
    },
};

const uischema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "Control",
            scope: "#/properties/firstName",
            options: {
                label: 'First Name'
            }
        },
        {
            type: "Control",
            scope: "#/properties/lastName",
            options: {
                label: 'Last Name'
            }
        },
        {
            type: "Control",
            scope: "#/properties/username",
            options: {
                label: 'Username'
            }
        },
        {
            type: "Control",
            scope: "#/properties/email",
            options: {
                label: 'Email Address'
            }
        },
        {
            type: "Control",
            scope: "#/properties/password",
            options: {
                label: 'Password'
            }
        },
        {
            type: "Control",
            scope: "#/properties/confirmPassword",
            options: {
                label: 'Confirm Password'
            }
        }
    ] 
};

function SignupForm() {
    const [ data, setData ] = React.useState({});
    const [ errors, setErrors ] = React.useState({});
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { setUser } = useUser();

    const handleAlreadyHave = () => {
        navigate('/');  
    };

    const handleSubmit = async () => {
        if(errors && errors.length > 0) {
            for(let i = 0; i < errors.length; i++){
                enqueueSnackbar(errors[i]);
            }
        }
        
        try {
            const response = await fetch('http://localhost:3001/api/signup', {
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
                enqueueSnackbar("Signup Successful!", {variant: 'success'});
                navigate('/'); //Navigate back to login page
            } else {
                enqueueSnackbar(reply.message, {variant: 'error'});
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
            enqueueSnackbar(error.message, {variant: 'error'});
        }
        
    }; 

    return (
    <PageContainer>
        <SignUpDiv>
            <Logo />
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
            <Button variant="contained" onClick={handleSubmit} style={{width: '100%', marginTop: '30px'}}>Sign Up</Button>
            <ButtonContainer>
                <Button variant="text" onClick={handleAlreadyHave}>Already Have An Account? Log In.</Button>
            </ButtonContainer>
        </SignUpDiv>
    </PageContainer>
    );
}

export default SignupForm;