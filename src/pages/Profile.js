import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(243, 243, 243, 0.7)',
  zIndex: 999,
});

const ProfileContainer = styled('div')({
  position: 'fixed',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: '300px',
  padding: '20px',
  backgroundColor: '#FDFDFD',
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '15px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ProfileCloseButton = styled('button')({
  alignSelf: 'flex-end',
  backgroundColor: '#F44336',
  color: '#FFF',
  border: 'none',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
});

const ProfileDetails = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
});

const ProfileInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '10px',
  alignSelf: 'stretch',
});

const LogoutButton = styled('button')({
  marginTop: '10px',
  backgroundColor: '#F44336',
  color: '#FFF',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
  ':hover': {
    backgroundColor: '#D32F2F',
  },
});

const Profile = ({ user, onClose }) => {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  if (!user) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ProfileContainer>
        <ProfileCloseButton onClick={onClose}>x</ProfileCloseButton>
        <ProfileDetails>
          <Typography variant="h6">{user.profile.firstName} {user.profile.lastName}</Typography>
        </ProfileDetails>
        <ProfileInfo>
          <Typography variant="body1">
            <strong>Username: </strong>
            {user.profile.username}
          </Typography>
          <Typography variant="body1">
            <strong>Email: </strong>
            {user.profile.email}
          </Typography>
          <Typography variant="body1">
            <strong>Role: </strong>
            {user.profile.role}
          </Typography>
          {user.profile.role === 'intern' && (
            <Typography variant="body1">
              <strong>Intern ID: </strong>
              {user.profile.internID}
            </Typography>
          )}
        </ProfileInfo>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ProfileContainer>
    </>
  );
};

export default Profile;
