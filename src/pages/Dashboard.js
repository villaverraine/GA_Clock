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

const MainContent = styled('div')({
  display: 'flex',
  flex: 1, // Takes the remaining space
  overflow: 'auto', // Handle content overflow
});

const LeftSide = styled('div')({
  width: '50%', 
  backgroundColor: '#87CEEB',
});

// const GreetingDiv = styled('div')({

// })

// const AnnouncementDiv = styled('div')({
  
// })

// const CalendarEventsDiv = styled('div')({
  
// })

// const CalendarDiv = styled('div')({
  
// })

// const EventDiv = styled('div')({
  
// })

const RightSide = styled('div')({
  width: '50%', 
  backgroundColor: '#F3F3F3', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  padding: '20px', // Ensure some padding inside the right side
  boxSizing: 'border-box', // Include padding in width calculation
});

const ClockDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FDFDFD', // Background color for the clock div
  borderRadius: '10px',
  padding: '74px', // Set a fixed padding
  maxWidth: '98%', // Max width to prevent overflow
  maxHeight: '100%', // Ensure the height does not overflow the parent div
  boxSizing: 'border-box', // Include padding and border in width calculation
  overflow: 'hidden', // Hide any overflowing content
});

const AmpmSpan = styled('span')({
  fontSize: '4vw',
  fontWeight: 'bold',
  whiteSpace: 'nowrap', // Prevent text from wrapping
});

const TimeDiv = styled('div')({
  fontSize: '6vw',
  fontWeight: 'lighter',
  whiteSpace: 'nowrap', // Prevent text from wrapping
});

const TimeStateDiv = styled('div')({
  fontSize: '2vw',
  fontWeight: 'lighter',
  marginTop: '2%', // Responsive margin
  whiteSpace: 'nowrap', // Prevent text from wrapping
});

const TimeInfoDiv = styled('div')({
  backgroundColor: '#00547D', // Updated color
  color: '#FFF',
  borderRadius: '5px',
  padding: '10px',
  marginTop: '10px',
  fontSize: '2vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center items
  whiteSpace: 'nowrap', // Prevent text from wrapping
  width: '100%', // Set width to 100% of parent container
  boxSizing: 'border-box', // Include padding and border in width calculation
});

const InfoLabel = styled('div')({
  fontWeight: 'bold',
  marginBottom: '5px', // Space between label and value
});

const InfoValue = styled('div')({
  marginBottom: '10px', // Space between entries
});

const TimeOutDiv = styled('div')({
backgroundColor: '#0185B2', // Updated color
  color: '#FFF',
  borderRadius: '5px',
  padding: '10px',
  marginTop: '10px',
  fontSize: '2vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center items
  whiteSpace: 'nowrap', // Prevent text from wrapping
  width: '100%', // Set width to 100% of parent container
  boxSizing: 'border-box', // Include padding and border in width calculation

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
  
  // Determine if current time is within working hours (9 AM - 10 PM)
  const isWithinWorkingHours = (date) => {
    const hours = date.getHours();
    return hours >= 9 && hours < 22; // 22 is 10 PM in 24-hour format
  };

  const isWorking = isWithinWorkingHours(time) ? "Working Hours" : "Overtime Hours";
  // Define start and end times
  const startTime = "09:00 AM"; //PLACEHOLDER FOR NOW
  const endTime = "10:00 PM";

  return (
    <ClockDiv>
      <AmpmSpan>{ampm}</AmpmSpan>
      <TimeDiv>{currentTime}</TimeDiv>
      <TimeStateDiv>{isWorking}</TimeStateDiv>
      <TimeInfoDiv>
        <InfoLabel>
          Start Time{String.fromCharCode(160, 160)}End Time
        </InfoLabel>
        <InfoValue>
          {startTime}{String.fromCharCode(160, 160)}{endTime}
        </InfoValue>
      </TimeInfoDiv>
      <TimeOutDiv>
        Time OUT
      </TimeOutDiv>
    </ClockDiv>
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
          <Clock />
        </RightSide>
      </MainContent>
    </PageContainer>
  );
}

export default DashboardPage;