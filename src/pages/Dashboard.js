import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Header from './Header';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyles.css';
import Calendar from 'react-calendar';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { useUser } from '../components/UserContext'; 
import { useSnackbar } from 'notistack'; 
import ProfileFloatingDiv from './Profile';

const schema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date',
      title: 'Date'
    },
    timeInAM: {
      type: 'string',
      format: 'time',
      title: 'Time In (AM)'
    },
    timeOutAM: {
      type: 'string',
      format: 'time',
      title: 'Time Out (AM)'
    },
    timeInPM: {
      type: 'string',
      format: 'time',
      title: 'Time In (PM)'
    },
    timeOutPM: {
      type: 'string',
      format: 'time',
      title: 'Time Out (PM)'
    },
    timeRendered: {
      type: 'string',
      title: 'Time Rendered'
    }
  },
  required: ['date', 'timeInAM', 'timeOutAM', 'timeInPM', 'timeOutPM']
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/date',
      options: {
        readonly: true
      }
    },
    {
      type: 'Control',
      scope: '#/properties/timeInAM'
    },
    {
      type: 'Control',
      scope: '#/properties/timeOutAM'
    },
    {
      type: 'Control',
      scope: '#/properties/timeInPM'
    },
    {
      type: 'Control',
      scope: '#/properties/timeOutPM'
    },
    {
      type: 'Control',
      scope: '#/properties/timeRendered',
      options: {
        readonly: true
      }
    }
  ]
};

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#F3F3F3'
});

const MainContent = styled('div')({
  display: 'flex',
  flex: 1,
  overflow: 'auto',
  justifyContent: 'center',
});

const MainDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
});

const LeftSide = styled('div')({
  width: '50%', 
  backgroundColor: '#F3F3F3', 
  padding: '20px', 
  boxSizing: 'border-box',
});

const GreetingDiv = styled('div')({
  borderRadius: '10px',
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

const RightSide = styled('div')({
  width: '50%', 
  backgroundColor: '#F3F3F3', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  padding: '20px', 
  boxSizing: 'border-box',
});

const CalendarContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  height: '73vh',
  maxHeight: '1230px',
});

const CalendarStyled = styled(Calendar)({
  fontSize: '1.5vw',
  width: '100%',
  maxWidth: '90vw',
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  border: 'none',
  height: '100%', 
  padding: '20px',
  '& .react-calendar__navigation button': {
    fontSize: '1.5vw', 
  },
  '& .react-calendar__month-view__days__day': {
    padding: '2.2vw', 
  },
});

const ClockDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FDFDFD',
  borderRadius: '10px',
  padding: '20px',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
});

const AmpmSpan = styled('span')({
  fontSize: '4vw',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
});

const TimeDiv = styled('div')({
  fontSize: '5vw',
  fontWeight: 'lighter',
  whiteSpace: 'nowrap',
});

const SubmitButton = styled('button')({
  marginTop: '20px',
  marginBottom: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#FFF',
  backgroundColor: '#0185B2',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  ':hover': {
    backgroundColor: '#016898',
  },
});

const GreetingComponent = ({ firstName, lastName }) => {
  return <GreetingDiv>WELCOME BACK {firstName} {lastName}!</GreetingDiv>; 
};

function DashboardPage() {
  const { user } = useUser(); 
  const { enqueueSnackbar } = useSnackbar(); 
  const [time, setTime] = useState(new Date());
  const [data, setData] = useState({
    date: new Date().toLocaleDateString('en-CA'),
    timeInAM: '',
    timeOutAM: '',
    timeInPM: '',
    timeOutPM: '',
    timeRendered: ''
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    hours = hours ? hours : 12; 

    const currentTime = `${hours}:${minutes}:${seconds}`;

    return { ampm, currentTime };
  };

  const calculateTotalHours = (timeInAM, timeOutAM, timeInPM, timeOutPM) => {
    const calculateDuration = (timeIn, timeOut) => {
      const inTime = new Date(`1970-01-01T${timeIn}Z`);
      const outTime = new Date(`1970-01-01T${timeOut}Z`);

      let duration = (outTime - inTime) / (1000 * 60);
      if (duration < 0) {
        duration += 24 * 60;
      }

      return duration;
    };

    const amDuration = calculateDuration(timeInAM, timeOutAM);
    const pmDuration = calculateDuration(timeInPM, timeOutPM);

    const totalMinutes = amDuration + pmDuration;
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return totalMinutes; // Return total minutes directly
  };

  const { ampm, currentTime } = formatTime(time);

  const handleChange = ({ data }) => {
    const totalMinutes = calculateTotalHours(data.timeInAM, data.timeOutAM, data.timeInPM, data.timeOutPM);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const timeRendered = `${totalHours}:${remainingMinutes}`;
    setData({ ...data, timeRendered });
  };

  const updateTotalTimeRendered = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/total-time/${user.profile._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': user.token
        }
      });
      const result = await response.json();

      const totalMinutes = result.totalTimeRendered;
      const totalHours = totalMinutes / 60;

      if (response.ok) {
        enqueueSnackbar('Total time rendered updated successfully!', { variant: 'success' });
        console.log('Total time rendered:', totalHours);
        
        await fetch(`http://localhost:3001/api/update/users/${user.profile._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access_token': user.token
          },
          body: JSON.stringify({ timeRendered: totalHours })
        });

      } else {
        enqueueSnackbar(result.message || 'Failed to update total time rendered', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating total time rendered:', error);
      enqueueSnackbar('Error updating total time rendered', { variant: 'error' });
    }
  };

  const handleSubmit = async () => {
    const payload = {
      userID: user.profile._id,
      date: data.date,
      timeInAM: data.timeInAM,
      timeOutAM: data.timeOutAM,
      timeInPM: data.timeInPM,
      timeOutPM: data.timeOutPM,
      timeRendered: data.timeRendered
    };

    console.log('Form data submitted:', payload);
    console.log('Token being sent:', user.token);

    try {
      const response = await fetch('http://localhost:3001/api/create/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': user.token 
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        enqueueSnackbar('Time data submitted successfully!', { variant: 'success' });
        updateTotalTimeRendered(); 
      } else {
        enqueueSnackbar(result.message || 'Failed to submit time data', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting time data:', error);
      enqueueSnackbar('Error submitting time data', { variant: 'error' });
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };


  return (
    <PageContainer>
      <Header onProfileClick={toggleProfile}/>
      <MainContent>
        <MainDiv>
          <LeftSide>
            <GreetingComponent firstName={user.profile.firstName} lastName={user.profile.lastName} />
            <CalendarContainer>
              <CalendarStyled/>
            </CalendarContainer>
          </LeftSide>
          <RightSide>
            <ClockDiv>
              <AmpmSpan>{ampm}</AmpmSpan>
              <TimeDiv>{currentTime}</TimeDiv>
              <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={handleChange}
              />
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </ClockDiv>
          </RightSide>
        </MainDiv>
      </MainContent>

      {isProfileOpen && <ProfileFloatingDiv user={user} onClose={toggleProfile} />}

    </PageContainer>
  );
}

export default DashboardPage;
