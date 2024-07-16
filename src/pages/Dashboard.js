import React, { useState, useEffect } from 'react';
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

const ClockDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#FDFDFD', // Background color for the login div
  borderRadius: '10px',
  padding: '8vh',
  width: '100%', // Ensure full width is used
  maxWidth: '454px', // Maximum width to keep the form from stretching too wide
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
  backgroundColor: '#F3F3F3', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
});

const AmpmSpan = styled('span')({
  fontSize: '24px', // Change this to the desired size
  fontWeight: 'bold', // Optional: make it bold
});

const TimeDiv = styled('div')({
  fontSize: '48px', // Change this to the desired size
});

const TimeStateDiv = styled('div')({
  fontSize: '24px', // Change this to the desired size
  marginTop: '10px', // Add some spacing
});

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const currentTime = `${hours}:${minutes}:${seconds}`;

    return { ampm, currentTime };
  };

  const { ampm, currentTime } = formatTime(time);
  const isWorking = "Working Hours";

  return (
    <div>
      <AmpmSpan>{ampm}</AmpmSpan>
      <TimeDiv>{currentTime}</TimeDiv>
      <TimeStateDiv>{isWorking}</TimeStateDiv>
    </div>
  );
}

function DashboardPage() {
  return (
    <PageContainer>
      <Header>Header Section</Header>
      <MainContent>
        <LeftSide>
          {/* Left side content */}
        </LeftSide>
        <RightSide>
          <ClockDiv>
            <Clock />
          </ClockDiv>
        </RightSide>
      </MainContent>
    </PageContainer>
  );
}

export default DashboardPage;