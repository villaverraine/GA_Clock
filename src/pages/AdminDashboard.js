import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdminHeader from './AdminHeader'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyles.css';
import { useSnackbar } from 'notistack';
import { useUser } from '../components/UserContext';
import EditEmployeeModal from '../components/EditEmployeeModal';
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

const AdminCalendarContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  //marginLeft:'114px',
  height: '73vh',
  maxHeight: '1300px',
});

const AdminCalendarStyled = styled(Calendar)({
  fontSize: '1.2vw',
  width: '100%',
  maxWidth: '90vw',
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
  //borderRadius: '10px',
  border: 'none',
  height: '100%', 
  maxHeight: '100%',
  padding: '20px',
  //paddingBottom: '22vh',
  '& .react-calendar__navigation button': {
    fontSize: '1.5vw', 
    //width: 'vw', 
    //height: '2vw', 
  },
  '& .react-calendar__month-view__days__day': {
    padding: '2.2vw', 
  },
});


const TableContainer = styled('div')({
  width: '100%',
  maxHeight: '100%', // Set your desired max height here
  overflowY: 'auto',
  borderRadius: '10px',
  boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
  border: '1px solid #ddd',
  backgroundColor: '#ffffff',
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
  position: 'relative',
  height: 'auto',
  '&:hover .action-items': {
    visibility: 'visible',
    opacity: 1
  },
  '&:hover:not(.emptyRow)': {
    backgroundColor: 'rgba(1, 133, 178, 0.02)',
  },
  '&:hover:not(.emptyRow) td:not(:last-child)': {
    backgroundColor: 'rgba(1, 133, 178, 0.02)', // Ensure other cells get the same highlight
  },
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(1, 133, 178, 0.10)',
  },
});

const TableCell = styled('td')({
  padding: '12px 20px',
  border: '1px solid #ddd',
  textAlign: 'left',
  height: 'auto',
  whiteSpace: 'nowrap',
  '&:first-child': {
    borderRight: 'none',
  },
  '&:last-child': {
    borderLeft: 'none',
  },
  '&:not(:first-child):not(:last-child)': {
    borderLeft: 'none',
    borderRight: 'none',
  },
  '&:nth-last-child(2)': {
    opacity: 0.25,
  },
});

const TableHeaderCell = styled(TableCell)({
  fontWeight: 'bold',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #ddd',
  borderBottom: '1px solid #ddd',
});

const ActionItems = styled('div')({
  visibility: 'hidden',
  opacity: 0,
  transition: 'opacity 0.3s',
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
});

const GreetingComponent = ({ firstName, lastName }) => {
  return <GreetingDiv>WELCOME {firstName} {lastName}!</GreetingDiv>;
};

const AdminCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <AdminCalendarContainer>
      <AdminCalendarStyled
        onChange={setDate}
        value={date}
        className="calendar"
      />
    </AdminCalendarContainer>
  );
};

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUser();
  const minimumRowsCount = 20; // Minimum number of rows to display

  useEffect(() => {
    fetchEmployees();
  }, [enqueueSnackbar, user.token]);

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
          const employees = reply.result.filter(user => user.role === 'intern');
          setEmployees(employees);
          // uncomment for developer debugging
          // enqueueSnackbar("Interns Loaded Successfully!", { variant: 'success' });
          console.log("Interns Loaded Successfully!")
        } else {
          enqueueSnackbar(reply.message || "Failed to fetch interns.", { variant: 'error' });
          console.err("API error")
        }
      } catch (error) {
        enqueueSnackbar("API error: " + error.message, { variant: 'error' });
        console.err("API error: " + error.message)
      }
    };

  const handleEditClick = (employee) => {
    // commented for dev debugging
    // console.log(employee)
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handleSave = async (updatedEmployee) => {
    
    const payload = {
      username: updatedEmployee.username,
      firstName: updatedEmployee.firstName,
      lastName: updatedEmployee.lastName,
      email: updatedEmployee.email,
      password: updatedEmployee.password
    };
    
    try {
      const response = await fetch(`http://localhost:3001/api/update/users/${updatedEmployee._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': user.token 
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        enqueueSnackbar("Profile Updated Successfully!", { variant: 'success' });
        console.log('Employee updated successfully:', result);
        fetchEmployees();
      } else {
        enqueueSnackbar(result.message || 'Failed to update profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      enqueueSnackbar('Error updating profile', { variant: 'error' });
    }
  };

  const renderEmptyRows = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <TableRow key={`empty-${index}`} className="emptyRow">
        <TableCell colSpan="4">&nbsp;</TableCell>
      </TableRow>
    ));
  };

  const emptyRowsCount = Math.max(0, minimumRowsCount - employees.length);

  const renderRowInfo = (employee, index) => {
    return (
      <TableRow key={index}>
        <TableCell>
          {employee.firstName.charAt(0).toUpperCase() + employee.firstName.slice(1)} {employee.lastName.charAt(0).toUpperCase() + employee.lastName.slice(1)}
        </TableCell>
        <TableCell>
          { employee.timeRendered }/{ employee.timeRequired } Hours
        </TableCell>
        <TableCell>
          {employee.internID}
        </TableCell>
        <ActionItems className="action-items">
          <IconButton size="small" onClick={() => handleEditClick(employee)}>
            <MenuIcon />
          </IconButton>
        </ActionItems>
      </TableRow>
    );
  };

  return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell colSpan="4">
                Employees
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {employees.map((employee, index) => (
              renderRowInfo(employee, index)
            ))}
            {renderEmptyRows(emptyRowsCount)}
          </tbody>
        </Table>
        {selectedEmployee && (
          <EditEmployeeModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            employee={selectedEmployee}
            onSave={handleSave}
          />
        )}
      </TableContainer>
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
          <GreetingComponent firstName={user.profile.firstName.charAt(0).toUpperCase() + user.profile.firstName.slice(1)} lastName={user.profile.lastName.charAt(0).toUpperCase() + user.profile.lastName.slice(1)} />
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
