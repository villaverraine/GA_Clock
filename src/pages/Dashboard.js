import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyles.css';

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const MainContent = styled('div')({
  display: 'flex',
  flex: 1, 
  overflow: 'auto', 
});

const LeftSide = styled('div')({
  width: '50%', 
  backgroundColor: '#F3F3F3', 
  padding: '20px', 
  boxSizing: 'border-box',
});

const GreetingDiv = styled('div')({
  backgroundColor: '#FDFDFD', 
  padding: '2vh',
  paddingBottom: '5vh',
  marginBottom: '20px',
  fontSize: '3vh',
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
  textAlign: "left",
  fontStyle: 'italic', 
  letterSpacing: '4px', 
});

const AnnouncementHeader = styled('div')({
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '10px',
  textAlign: 'left',
});

const AnnouncementDiv = styled('div')({
  backgroundColor: '#FDFDFD', 
  padding: '0.1vh 2vh 2vh 2vh',
  marginBottom: '20px',
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
  height: '24vh', 
  overflow: 'auto', 
});

const SubjectTitle = styled('h2')({
  marginBottom: '10px',
  fontSize: '1.2em',
  fontWeight: 'lighter',
  fontStyle: 'italic',
  textAlign: 'left'
});

const BodyText = styled('p')({
  color: '#333',
  fontStyle: 'italic',
  fontSize: '1.2em',
  textAlign: 'left',
});

const EventDiv = styled('div')({
  backgroundColor: '#FDFDFD', 
  padding: '2vh',
  width: '100%',
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
});

const RightSide = styled('div')({
  width: '50%', 
  backgroundColor: '#F3F3F3', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  padding: '20px', 
  boxSizing: 'border-box',
});

const ClockDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FDFDFD',
  borderRadius: '10px',
  padding: '28vh 24vw', 
  maxWidth: '94%', 
  maxHeight: '100%', 
  boxSizing: 'border-box',
  overflow: 'hidden', 
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
});

const AmpmSpan = styled('span')({
  fontSize: '8vw',
  fontWeight: 'bold',
  whiteSpace: 'nowrap', 
});

const TimeDiv = styled('div')({
  fontSize: '10vw',
  fontWeight: 'lighter',
  whiteSpace: 'nowrap', 
});

const TimeStateDiv = styled('div')({
  fontSize: '2.4vw',
  fontWeight: 'lighter',
  marginTop: '2%', 
  whiteSpace: 'nowrap', 
});

const TimeInfoDiv = styled('div')({
  backgroundColor: '#00547D',
  color: '#FFF',
  padding: '10px',
  marginTop: '10px',
  fontSize: '2.4vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  width: '28vw',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
});

const InfoLabel = styled('div')({
  fontWeight: 'lighter',
  marginBottom: '5px', 
});

const InfoValue = styled('div')({
  marginBottom: '10px', 
  fontWeight: 'bold',
});

const TimeOutDiv = styled('div')({
  backgroundColor: '#0185B2',
  color: '#FFF',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  padding: '10px',
  marginTop: '10px',
  fontSize: '3vw',
  fontWeight: 'lighter',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  whiteSpace: 'nowrap', 
  width: '28vw',
  boxSizing: 'border-box', 
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
  const endTime = "10:00 PM"; //PLACEHOLDER FOR NOW

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

const GreetingComponent = () => {
  //PLACEHOLDER IMPLEMENT ON BACKEND
  var username = "USERNAME"
  return (
    <GreetingDiv>
      WELCOME {username}!
    </GreetingDiv>
  );
};

const Announcement = () => {
  //PLACEHOLDER FOR NOW (GET subjectTitle and bodyText on backend implementation)
  var subjectTitle = "Subject Title";
  var bodyText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  return (
    <AnnouncementDiv>
      <SubjectTitle>{subjectTitle}</SubjectTitle>
      <BodyText>{bodyText}</BodyText>
    </AnnouncementDiv>
  );
}

const events = [
  //PLACEHOLDERS / IMPLEMENT ON BACKEND TO RETRIEVE EVENTS
  { date: '2024-07-15', description: 'Event 1 SAMPLE' },
  { date: '2024-07-17', description: 'Event 2 SAMPLE' },
  { date: '2024-07-20', description: 'Event 3 SAMPLE' },
];

const EventsComponent = () => {
  const [date, setDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const formattedDate = newDate.toISOString().split('T')[0];
    const eventsForDate = events.filter(event => event.date === formattedDate);
    setFilteredEvents(eventsForDate);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="calendar" // Add this class
      />
      <EventDiv>
        <h3>Upcoming Events</h3>
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map((event, index) => (
              <li key={index}>{event.description}</li>
            ))}
          </ul>
        ) : (
          <p>No events for this date</p>
        )}
      </EventDiv>
    </div>
  );
};

function DashboardPage() {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <LeftSide>
          <GreetingComponent />
          <AnnouncementHeader>
            ANNOUNCEMENTS
          </AnnouncementHeader>
          <Announcement />
          <EventsComponent />
        </LeftSide>
        <RightSide>
          <Clock />
        </RightSide>
      </MainContent>
    </PageContainer>
  );
}

export default DashboardPage;