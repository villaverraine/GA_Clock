import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#F3F3F3',
});

const Form = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '400px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#FFF',
});

const SubmitButton = styled(Button)({
    backgroundColor: '#0185B2',
    color: '#FFF',
    '&:hover': {
        backgroundColor: '#016898',
    },
});

const schema = {
    type: 'object',
    properties: {
        internID: { type: 'string', title: 'Intern ID' },
        username: { type: 'string', title: 'Username' },
        email: { type: 'string', format: 'email', title: 'Email' },
        firstName: { type: 'string', title: 'First Name' },
        lastName: { type: 'string', title: 'Last Name' },
        password: { type: 'string', title: 'Password' },
        role: { type: 'string', title: 'Role', default: 'intern' },
        timeRendered: { type: 'string', title: 'Time Rendered', default: '0' },
        timeRequired: { type: 'string', title: 'Time Required', default: '300' },
    },
    required: ['internID', 'username', 'email', 'firstName', 'lastName', 'password']
};

const uischema = {
    type: 'VerticalLayout',
    elements: [
        { type: 'Control', scope: '#/properties/internID' },
        { type: 'Control', scope: '#/properties/username' },
        { type: 'Control', scope: '#/properties/email' },
        { type: 'Control', scope: '#/properties/firstName' },
        { type: 'Control', scope: '#/properties/lastName' },
        { type: 'Control', scope: '#/properties/password' },
        { type: 'Control', scope: '#/properties/role', options: { readonly: true } },
        { type: 'Control', scope: '#/properties/timeRendered', options: { hidden: true } },
        { type: 'Control', scope: '#/properties/timeRequired', options: { hidden: true } },
    ]
};

function RegistrationForm() {
    const [data, setData] = useState({
        role: 'intern',
        timeRendered: '0',
        timeRequired: '300'
    });
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleChange = ({ data }) => {
        setData(data);
    };

    const handleSubmit = async () => {
        const submissionData = { 
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            password: data.password,
            email: data.email,
            internID: data.internID,
            role: data.role,
            timeRendered: data.timeRendered,
            timeRequired: data.timeRequired
        };

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });

            const result = await response.json();

            if (response.ok) {
                enqueueSnackbar('Registration successful!', { variant: 'success' });
                navigate('/admin'); 
            } else {
                enqueueSnackbar(result.message || 'Registration failed', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            enqueueSnackbar('Error during registration', { variant: 'error' });
        }
    };

    return (
        <FormContainer>
            <Form>
                <JsonForms
                    schema={schema}
                    uischema={uischema}
                    data={data}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={handleChange}
                />
                <SubmitButton onClick={handleSubmit}>Register</SubmitButton>
            </Form>
        </FormContainer>
    );
}

export default RegistrationForm;
