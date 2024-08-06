import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { useUser } from '../components/UserContext';
const Header = styled('div')({
    height: '10vh',
    backgroundColor: '#F3F3F3',
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2vh',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    boxSizing: 'border-box',
    // gap: '2vh',
});

const Logo = styled('div')({
    width: '15%',
    height: '80%',
    backgroundImage: 'url(/gallium31_logo.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', 
});

const ButtonContainer = styled('div')({
    display: 'flex',
    width: '90%',
    gap: '1vh',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2vh',
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

const UserButton = styled(Button)(({ active }) => ({
    marginLeft: 'auto',
    marginRight:' 3vh',
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

const UserIcon = styled(PersonIcon)({
    marginRight: '10px',
    color: '#0185B2', 
    backgroundColor: '#E0E0E0', 
    borderRadius: '50%'
});

function HeaderComponent({ onProfileClick }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();
    const isActive = (path) => location.pathname === path;

    const handleViewChange = (path) => {
        navigate(path);
    };

    return (
        <Header>
            <Logo />
            <ButtonContainer>
                <StyledButton 
                    active={isActive('/registration')}
                    onClick={() => handleViewChange('/registration')}
                >
                    Register Intern
                </StyledButton>

                <UserButton
                    active={isActive('/profile')}
                    onClick={onProfileClick}
                >
                    <UserIcon/>
                    {user.profile.firstName}
                </UserButton>
            </ButtonContainer>
        </Header>
    );
}
export default HeaderComponent;
