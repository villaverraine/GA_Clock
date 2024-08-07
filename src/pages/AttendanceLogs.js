import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Header from './Header';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyles.css';
import { useSnackbar } from 'notistack'; // Make sure this import is included
import { useUser } from '../components/UserContext';
import ProfileFloatingDiv from './Profile';

const PageContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#F3F3F3',
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
    flexDirection: 'column',
    width: '90%',
    height: '80vh',
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
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
});

const HeaderCell = styled(TableHeaderCell)({
    backgroundColor: '#f5f5f5',
});

const NavButton = styled('button')({
    margin: '0 10px',
    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
});

const MonthHeader = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Centering the content horizontally
    marginBottom: '10px',
    fontSize: '1.2rem', // Optional: Increase font size for better visibility
});

const TableTitle = styled('h2')({
    textAlign: 'center',
    marginBottom: '20px',
    marginTop: '-4vh',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
});

function AttendanceLogsTable() {
    const [attendanceLogs, setAttendanceLogs] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useUser();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        const fetchAttendanceLogs = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/search/time', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': user.token
                    },
                    body: JSON.stringify({}),
                });
                const reply = await response.json();

                if (reply && reply.success) {
                    if (user.profile && user.profile._id) {
                        // console.log(user)
                        const userLogs = reply.result.filter(log => log.userID === user.profile._id);
                        setAttendanceLogs(userLogs);
                        enqueueSnackbar("Attendance logs loaded successfully!", { variant: 'success' });
                    } else {
                        enqueueSnackbar("User ID is not defined", { variant: 'error' });
                    }
                } else {
                    enqueueSnackbar(reply.message || "Failed to fetch attendance logs", { variant: 'error' });
                }
            } catch (error) {
                enqueueSnackbar("API error: " + error.message, { variant: 'error' });
            }
        };

        fetchAttendanceLogs();
    }, [enqueueSnackbar, user.token, user]);

    const calculateTotalHours = (timeIn, timeOut) => {
        const inTime = new Date(`1970-01-01T${timeIn}Z`);
        const outTime = new Date(`1970-01-01T${timeOut}Z`);

        let duration = (outTime - inTime) / (1000 * 60); // duration in minutes
        if (duration < 0) {
            // Handle case where timeOut is less than timeIn (e.g., overnight shifts)
            duration += 24 * 60;
        }

        const totalHours = Math.floor(duration / 60);
        const remainingMinutes = duration % 60;

        return { totalHours, remainingMinutes };
    };

    const groupByMonth = (logs) => {
        const groupedLogs = {};
        logs.forEach(log => {
            const date = new Date(log.date);
            const month = `${date.getFullYear()}-${date.getMonth() + 1}`.padStart(7, '0');
            if (!groupedLogs[month]) {
                groupedLogs[month] = [];
            }
            groupedLogs[month].push(log);
        });
        return groupedLogs;
    };

    const handlePreviousMonth = () => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
            return newMonth;
        });
    };

    const handleNextMonth = () => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
            return newMonth;
        });
    };

    const getMonthYearString = () => {
        return currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' });
    };

    const groupedLogs = groupByMonth(attendanceLogs);
    const currentMonthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`.padStart(7, '0');
    const logsToDisplay = groupedLogs[currentMonthKey] || [];

    return (
        <MainDiv>
            <TableTitle>Daily Time Record</TableTitle>
            <MonthHeader>
                <NavButton onClick={handlePreviousMonth}>{'<'}</NavButton>
                <div>{getMonthYearString()}</div>
                <NavButton onClick={handleNextMonth}>{'>'}</NavButton>
            </MonthHeader>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>#</TableHeaderCell>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <HeaderCell colSpan="2">AM</HeaderCell>
                        <HeaderCell colSpan="2">PM</HeaderCell>
                        <TableHeaderCell colSpan="2">Total Time</TableHeaderCell>
                    </TableRow>
                    <TableRow>
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell>IN</TableHeaderCell>
                        <TableHeaderCell>OUT</TableHeaderCell>
                        <TableHeaderCell>IN</TableHeaderCell>
                        <TableHeaderCell>OUT</TableHeaderCell>
                        <TableHeaderCell>HOURS</TableHeaderCell>
                        <TableHeaderCell>MINS</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <tbody>
                    {logsToDisplay.length > 0 ? (
                        logsToDisplay.map((log, index) => {
                            const { totalHours: amHours, remainingMinutes: amMinutes } = calculateTotalHours(log.timeInAM, log.timeOutAM);
                            const { totalHours: pmHours, remainingMinutes: pmMinutes } = calculateTotalHours(log.timeInPM, log.timeOutPM);
                            const totalHours = amHours + pmHours;
                            const totalMinutes = amMinutes + pmMinutes;
                            const displayHours = totalHours + Math.floor(totalMinutes / 60);
                            const displayMinutes = totalMinutes % 60;

                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell> {/* Number column */}
                                    <TableCell>{log.date}</TableCell>
                                    <TableCell>{log.timeInAM || '-'}</TableCell>
                                    <TableCell>{log.timeOutAM || '-'}</TableCell>
                                    <TableCell>{log.timeInPM || '-'}</TableCell>
                                    <TableCell>{log.timeOutPM || '-'}</TableCell>
                                    <TableCell>{displayHours}</TableCell>
                                    <TableCell>{displayMinutes}</TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan="8">No attendance logs found.</TableCell>
                        </TableRow>
                    )}
                </tbody>
            </Table>
        </MainDiv>
    );
}

function AttendanceLogsPage() {
    const { user } = useUser();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <PageContainer>
            <Header onProfileClick={toggleProfile} />
            <MainContent>
                <AttendanceLogsTable />
            </MainContent>
            {isProfileOpen && <ProfileFloatingDiv user={user} onClose={toggleProfile} />}
        </PageContainer>
    );
}

export default AttendanceLogsPage;
