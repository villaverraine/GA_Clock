import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../components/UserContext'; 
import PersonIcon from '@mui/icons-material/Person';

const Header = styled('div')({
    height: '10vh', // Fixed height for header
    backgroundColor: '#F3F3F3',
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingTop: '2vh',
    paddingLeft: '2vh', // Padding for spacing on sides
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
});

const Logo = styled('div')({
    width: '100%',
    height: '80%',
    backgroundImage: 'url(/gallium31_logo.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    marginBottom: '2vh',
    marginLeft: '2vh',
});

const ButtonContainer = styled('div')({
    display: 'flex',
    gap: '1vh',
    marginBottom: '2vh',
    marginRight: '10vh',
});


const StyledButton = styled(Button)(({ active }) => ({
    height: '80%',
    textTransform: 'none',
    fontSize: '1rem',
    borderRadius: '4px',
    padding: '0.5rem 1.5rem',
    backgroundColor: active ? '#0185B2' : 'transparent',
    color: active ? '#FFF' : '#0185B2', 
    border: `1px solid ${active ? '#0185B2' : '#0185B2'}`, 
    whiteSpace: 'nowrap',
    '&:hover': {
        backgroundColor: active ? '#0185B2' : 'transparent',
        color: active ? '#FFF' : '#0185B2', 
        border: `1px solid ${active ? '#0185B2' : '#0185B2'}`, 
    },
}));


const UserButton =styled(Button)(({ active }) => ({
    marginLeft: '90px',
    height: '80%',
    textTransform: 'none',
    fontSize: '1rem',
    borderRadius: '4px',
    padding: '0.5rem 1.5rem',
    backgroundColor: active ? '#0185B2' : 'transparent',
    color: active ? '#FFF' : '#0185B2', 
    border: `1px solid ${active ? '#0185B2' : '#0185B2'}`, 
    whiteSpace: 'nowrap',
    '&:hover': {
        backgroundColor: active ? '#0185B2' : 'transparent',
        color: active ? '#FFF' : '#0185B2', 
        border: `1px solid ${active ? '#0185B2' : '#0185B2'}`, 
    },
}));

const UserIcon=styled(PersonIcon)({
    marginRight: '10px',
    color: '#0185B2', 
    backgroundColor: '#E0E0E0', 
    borderRadius: '50%'
})

function HeaderComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    // const { user } = useUser();

    const isActive = (path) => location.pathname === path;

    const handleViewChange = (path) => {
        navigate(path)
    };

    return (
        <Header>
            <Logo />
            <ButtonContainer>
                <StyledButton 
                    active={isActive('/dashboard')}
                    onClick = {() => handleViewChange('/dashboard')} // Change to Attendance Log
                >
                    Dashboard
                </StyledButton>

                <StyledButton 
                    active={isActive('/admin')} // Change to Attendance Log
                    onClick = {() => handleViewChange('/admin')} // Change to Attendance Log
                >
                    Attendance Log
                </StyledButton>

                <UserButton
                    active={isActive('/profile')}
                    onClick = {() => handleViewChange('/profile')} //Implement Profile
                >
                    <UserIcon/>
                    {/* {user.profile.firstName} */}
                    Username {/*PLACEHOLDER*/}

                </UserButton>
            </ButtonContainer>
            
        </Header>
    );
}
export default HeaderComponent;