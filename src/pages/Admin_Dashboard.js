import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyles.css';
import { useSnackbar } from 'notistack';


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


const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/search/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const data = await response.data;

        if (data && data.success) {
          setEmployees(data.result);
          enqueueSnackbar('Employees loaded succesfully!', { variant: 'success' });
        } else {
          enqueueSnackbar(data.message, { variant: 'error' });
        }
      } catch (error) {
        console.error('Failed to fetch employees: ', error);
        enqueueSnackbar('Failed to fetch employees: ' + error.message, { variant: 'error' });
      }
    };

    fetchEmployees();
  }, [enqueueSnackbar]);
  return(
    //  <EmployeeList>
    <Table>
      <TableHead>
          <TableRow>
              <TableHeaderCell colspan="2">Employees</TableHeaderCell>
          </TableRow>
          <TableRow>
              <TableHeaderCell>ID No.</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
          </TableRow>
      </TableHead>
      <tbody>
        {/* implement back-end here */}
        {employees.map((employee, index) => (
          <TableRow key={index}>
            <TableCell>{employee._id}</TableCell>
            <TableCell>{employee.name}</TableCell>
          </TableRow>
        ))}
        {/* end back-end here */}
      </tbody>
    </Table>
  //  </EmployeeList>
  );
};

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