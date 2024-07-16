import React from 'react';
import { styled } from '@mui/material/styles';

const Header = styled('div')({
    height: '10vh', // Fixed height for header
    backgroundColor: '#F3F3F3',
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '2vh',
    paddingLeft: '2vh', // Padding for spacing on sides
});

const Logo = styled('div')({
    width: '100%',
    height: '80%',
    backgroundImage: 'url(/gallium31_logo.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    marginBottom: '2vh'
});

function HeaderComponent() {
    return (
        <Header>
            <Logo />
        </Header>
    );
}

export default HeaderComponent;