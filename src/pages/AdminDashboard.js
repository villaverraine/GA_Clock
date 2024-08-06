import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AdminHeader from './AdminHeader'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyles.css';
import { useSnackbar } from 'notistack';
import { useUser } from '../components/UserContext';
import ProfileFloatingDiv from './Profile'; 

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
  borderTop: '1px solid #ddd',
  borderBottom: '1px solid #ddd',
});

const GreetingComponent = ({ firstName, lastName }) => {
  return <GreetingDiv>WELCOME {firstName} {lastName}!</GreetingDiv>;
};

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
  const [employees, setEmployees] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUser();

  useEffect(() => {
    const fetchEmployees = async () => { 
      try {
        const response = await fetch('http://localhost:3001/api/search/users', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'access_token': user.token
          },
          body: JSON.stringify({}),
        });
        const reply = await response.json();

        if (reply && reply.success) {
          const employees = reply.result.filter(user => user.role === 'employee');
          setEmployees(employees);
          enqueueSnackbar("Employees Loaded Successfully!", { variant: 'success' });
        } else {
          enqueueSnackbar(reply.message || "Failed to fetch employees", { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar("API error: " + error.message, { variant: 'error' });
      }
    };

    fetchEmployees();
  }, [enqueueSnackbar, user.token]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell colSpan="2">Employees</TableHeaderCell>
        </TableRow>
      </TableHead>
      <tbody>
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{employee.firstName} {employee.lastName}</TableCell>
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

function AdminDashboardPage() {
  const { user } = useUser(); // Use user context to get user info
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <PageContainer>
      <AdminHeader onProfileClick={toggleProfile} />
      <MainContent>
        <LeftSide>
          <GreetingComponent firstName={user.profile.firstName} lastName={user.profile.lastName} />
          <AdminCalendar />
        </LeftSide>
        <RightSide>
          <EmployeeTable />
        </RightSide>
      </MainContent>
      {isProfileOpen && <ProfileFloatingDiv user={user} onClose={toggleProfile} />}
    </PageContainer>
  );
}

export default AdminDashboardPage;
