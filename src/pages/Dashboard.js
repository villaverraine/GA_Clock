import React from 'react';
import { styled } from '@mui/material/styles';

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh', // Full viewport height
});

const Header = styled('div')({
  height: '10vh', // Fixed height for header
  backgroundColor: '#FF6347', // Tomato color
  color: '#FFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
});

const MainContent = styled('div')({
  display: 'flex',
  flex: 1, // Takes the remaining space
  overflow: 'auto', // Handle content overflow
});

const LeftSide = styled('div')({
  width: '50%', 
  backgroundColor: '#87CEEB',
});

const RightSide = styled('div')({
  width: '50%', 
  backgroundColor: '#32CD32', 
});

function DashboardPage() {
  return (
    <PageContainer>
      <Header>Header Section</Header>
      <MainContent>
        <LeftSide>Left Side Content</LeftSide>
        <RightSide>Right Side Content</RightSide>
      </MainContent>
    </PageContainer>
  );
}

export default DashboardPage;