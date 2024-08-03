import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Header from './Header';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyles.css';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { useUser } from '../components/UserContext'; // Import useUser
import { useSnackbar } from 'notistack'; // For notifications

const schema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date',
      title: 'Date'
    },
    timeIn: {
      type: 'string',
      format: 'time',
      title: 'Time In'
    },
    timeOut: {
      type: 'string',
      format: 'time',
      title: 'Time Out'
    }
  },
  required: ['date', 'timeIn', 'timeOut']
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
      scope: '#/properties/timeIn'
    },
    {
      type: 'Control',
      scope: '#/properties/timeOut'
    }
  ]
};

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const MainContent = styled('div')({
  display: 'flex',
  flex: 1,
  overflow: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
});

const MainDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '90%',
  height: '80vh',
  backgroundColor: '#F3F3F3',
  borderRadius: '10px',
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
  padding: '20px',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
});

const LeftSide = styled('div')({
  width: '50%',
  padding: '20px',
  boxSizing: 'border-box',
  textAlign: 'center',
});

const GreetingDiv = styled('div')({
  backgroundColor: '#FDFDFD',
  padding: '2vh',
  paddingBottom: '5vh',
  marginBottom: '20px',
  fontSize: '3vh',
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  fontStyle: 'italic',
  letterSpacing: '4px',
});

const RightSide = styled('div')({
  width: '50%',
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
  padding: '10px',
  height: '510px',
  width: '440px',
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
  fontSize: '6vw',
  fontWeight: 'lighter',
  whiteSpace: 'nowrap',
});

const SubmitButton = styled('button')({
  marginTop: '20px',
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
  const { user } = useUser(); // Use user context to get user info
  const { enqueueSnackbar } = useSnackbar(); // Use notistack for notifications

  const [time, setTime] = useState(new Date());
  const [data, setData] = useState({
    date: new Date().toISOString().split('T')[0], // Set today's date as the default
    timeIn: '',
    timeOut: '',
  });

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

  const handleChange = ({ data }) => {
    setData(data);
  };

  const handleSubmit = async () => {
    const payload = {
      userID: user.profile._id, // Use userID from the profile
      date: data.date,
      timeIn: data.timeIn,
      timeOut: data.timeOut,
    };

    console.log('Form data submitted:', payload);
    console.log('Token being sent:', user.token);

    try {
      const response = await fetch('http://localhost:3001/api/create/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': user.token // Include token for authentication
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        enqueueSnackbar('Time data submitted successfully!', { variant: 'success' });
      } else {
        enqueueSnackbar(result.message || 'Failed to submit time data', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting time data:', error);
      enqueueSnackbar('Error submitting time data', { variant: 'error' });
    }
  };
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <MainDiv>
          <LeftSide>
            <GreetingComponent firstName={user.profile.firstName} lastName={user.profile.lastName} />
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
    </PageContainer>
  );
}

export default DashboardPage;
