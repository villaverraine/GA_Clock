import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyles.css';
import { useSnackbar } from 'notistack';
import { useUser } from '../components/UserContext'

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

const RightSide = styled('div')({
  width: '50%', 
  backgroundColor: '#F3F3F3', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  padding: '20px', 
  boxSizing: 'border-box',
});

const EmployeeList = styled('div')({
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

const Table = styled('table')({
  borderRadius: '10px',
  backgroundColor: '#ffffff',
  width: '100%',
  height: '100%',
  borderCollapse: 'collapse',
  overflow: 'hidden', 
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
  border: '1px solid #ddd',
});

const TableHead = styled('thead')({
    backgroundColor: '#f5f5f5',
});

const TableRow = styled('tr')({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(1, 133, 178, 0.10)',
    },
});

const TableCell = styled('td')({
    padding: '12px 20px',
    border: '1px solid #ddd',
    textAlign: 'left',
});

const TableHeaderCell = styled(TableCell)({
    fontWeight: 'bold',
    textAlign :'center',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #ddd', // Add top border to header cell
    borderBottom: '1px solid #ddd', // Add bottom border to header cell
});

const AdminCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <Calendar
        onChange={setDate}
        value={date}
        className="calendar"
      />
    </div>
  );
};


function EmployeeTable() {
  const [employees, setEmployees] = useState([]); // Initialize with an empty array
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = React.useState({});
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchEmployees = async () => { 
      try {
        const response = await fetch('http://localhost:3001/api/search/users', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'access_token': user.token
            },
            body: JSON.stringify(data),
            
            });
        const reply = await response.json();

        if (reply && reply.success) {
          console.log(reply.result)
          setEmployees(reply.result); 
          enqueueSnackbar("Employees Loaded Successfully!", { variant: 'success' });
        } else {
          enqueueSnackbar(reply.message || "Failed to fetch employees", { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar("API error: " + error.message, { variant: 'error' });
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell colSpan="2">Employees</TableHeaderCell>
        </TableRow>
        <TableRow>
          <TableHeaderCell>ID No.</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableRow>
      </TableHead>
      <tbody>
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{employee._id}</TableCell>
              <TableCell>{employee.name}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="2">No employees found.</TableCell>
          </TableRow>
        )}
      </tbody>
    </Table>
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

function AdminDashboardPage() {
    return (
      <PageContainer>
        <Header />
        <MainContent>
          <LeftSide>
            <GreetingComponent />
            <AdminCalendar />
          </LeftSide>
          <RightSide>
            <EmployeeTable/>
          </RightSide>
        </MainContent>
      </PageContainer>
    );
  }
  
  export default AdminDashboardPage;